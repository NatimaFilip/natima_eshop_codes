(function () {
	var LOG = "[tally-exit]";
	var FORM_ID = "aQaQQW"; // doplnit ID exit-intent formu z Tally
	var MIN_TIME = 5 * 1000; // ≥60 s na webu
	var MIN_PAGES = 2; // ≥2 navštívené stránky
	var COOLDOWN = 30; // dní — frequency cap
	var fired = false;

	console.log(LOG, "skript inicializován na", location.pathname);

	// --- helper: cookie ---
	function getCookie(n) {
		var m = document.cookie.match("(^|;)\\s*" + n + "\\s*=\\s*([^;]+)");
		return m ? m.pop() : "";
	}
	function setCookie(n, v, d) {
		var e = new Date();
		e.setTime(e.getTime() + d * 864e5);
		document.cookie = n + "=" + v + ";expires=" + e.toUTCString() + ";path=/";
	}

	// --- UTM capture (first-touch attribution v rámci session) ---
	if (!sessionStorage.getItem("natima_utm")) {
		var utmSource = new URLSearchParams(location.search).get("utm_source");
		if (utmSource) {
			sessionStorage.setItem("natima_utm", utmSource);
			console.log(LOG, "UTM zachycen z URL:", utmSource);
		} else if (document.referrer) {
			try {
				var refHost = new URL(document.referrer).hostname;
				if (refHost && refHost !== location.hostname) {
					sessionStorage.setItem("natima_utm", refHost);
					console.log(LOG, "UTM zachycen z referreru:", refHost);
				} else {
					console.log(LOG, "referrer je vlastní doména, ignoruji");
				}
			} catch (e) {
				console.log(LOG, "chyba při parsování referreru:", e);
			}
		} else {
			console.log(LOG, "žádný UTM ani referrer — bude direct");
		}
	} else {
		console.log(LOG, "UTM už v session je:", sessionStorage.getItem("natima_utm"));
	}

	// --- frequency cap: už zobrazeno / zodpovězeno? ---
	var shownCookie = getCookie("natima_exit_shown");
	var answeredCookie = getCookie("natima_exit_answered");
	if (shownCookie || answeredCookie) {
		console.warn(LOG, "BLOKOVÁNO: frequency cap cookie existuje", {
			shown: shownCookie,
			answered: answeredCookie,
		});
		return;
	}
	console.log(LOG, "frequency cap OK (žádná blokující cookie)");

	// --- počítadlo stránek za session ---
	var pages = parseInt(sessionStorage.getItem("natima_pages") || "0", 10) + 1;
	sessionStorage.setItem("natima_pages", pages);
	var sessionStart = parseInt(sessionStorage.getItem("natima_start") || "0", 10);
	if (!sessionStart) {
		sessionStart = Date.now();
		sessionStorage.setItem("natima_start", sessionStart);
		console.log(LOG, "nová session, start =", new Date(sessionStart).toISOString());
	}
	console.log(LOG, "session stav:", {
		pages: pages,
		potreba_pages: MIN_PAGES,
		sekund_na_webu: Math.round((Date.now() - sessionStart) / 1000),
		potreba_sekund: MIN_TIME / 1000,
	});

	// --- načíst Tally embed knihovnu ---
	var s = document.createElement("script");
	s.src = "https://tally.so/widgets/embed.js";
	s.onload = function () {
		console.log(LOG, "Tally embed knihovna načtena, Tally =", typeof Tally);
	};
	s.onerror = function () {
		console.error(LOG, "CHYBA: Tally embed knihovna se nepodařilo načíst");
	};
	document.head.appendChild(s);

	// --- splněny vstupní podmínky (čas + stránky)? ---
	function eligible() {
		var timeOk = Date.now() - sessionStart >= MIN_TIME;
		var pagesOk = pages >= MIN_PAGES;
		if (!timeOk || !pagesOk) {
			console.log(LOG, "eligible() = false", {
				timeOk: timeOk,
				pagesOk: pagesOk,
				sekund: Math.round((Date.now() - sessionStart) / 1000),
				pages: pages,
			});
		}
		return timeOk && pagesOk;
	}

	// --- prázdný / neaktivní košík? (uprav selektor dle DOM Natima/Shoptet) ---
	function cartEmptyOrStale() {
		var c = document.querySelector("i[data-testid='headerCartCount']");
		var empty = !c || parseInt(c.textContent || "0", 10) === 0;
		if (!empty) {
			console.log(LOG, "košík není prázdný:", c.textContent);
		}
		return empty;
	}

	// --- otevřít popup ---
	function openPopup() {
		console.log(LOG, "openPopup() voláno");
		if (fired) {
			console.log(LOG, "BLOKOVÁNO: popup už byl spuštěn v této session");
			return;
		}
		if (!eligible()) {
			console.log(LOG, "BLOKOVÁNO: nesplněny vstupní podmínky (čas/stránky)");
			return;
		}
		if (!cartEmptyOrStale()) {
			console.log(LOG, "BLOKOVÁNO: košík obsahuje položky");
			return;
		}
		if (document.body.classList.contains("ordering-process")) {
			console.log(LOG, "BLOKOVÁNO: body má class 'ordering-process' (checkout)");
			return;
		}
		if (typeof Tally === "undefined" || !Tally.openPopup) {
			console.warn(LOG, "BLOKOVÁNO: Tally knihovna ještě není načtená");
			return;
		}
		fired = true;
		var params = new URLSearchParams({
			context: "exit",
			last_url: location.pathname,
			session_pages: String(pages),
			time_on_site: String(Math.round((Date.now() - sessionStart) / 1000)),
			entry_source: sessionStorage.getItem("natima_utm") || "direct",
		});
		console.log(LOG, "OTEVÍRÁM POPUP, parametry:", Object.fromEntries(params));
		Tally.openPopup(FORM_ID, {
			layout: "modal",
			width: 540,
			hideTitle: true,
			hiddenFields: Object.fromEntries(params),
			onClose: function () {
				console.log(LOG, "popup zavřen bez odeslání");
				setCookie("natima_exit_shown", "1", COOLDOWN);
			},
			onSubmit: function () {
				console.log(LOG, "popup odeslán — ukládám 365denní cookie");
				setCookie("natima_exit_answered", "1", 365);
			},
		});
		setCookie("natima_exit_shown", "1", COOLDOWN);
	}

	// --- DESKTOP: mouse-leave intent (horní hrana okna, s 20px tolerancí) ---
	var TOP_EDGE_TOLERANCE = 10; // px — kolik nad/pod horní hranou ještě počítáme jako exit
	document.addEventListener("mouseout", function (e) {
		if (!e.relatedTarget && e.clientY <= TOP_EDGE_TOLERANCE) {
			console.log(LOG, "DESKTOP exit signál: mouseleave přes horní hranu, clientY =", e.clientY);
			openPopup();
		}
	});

	// --- MOBIL: rychlý scroll nahoru jako proxy za exit (jen ≤768 px) ---
	if (window.matchMedia("(max-width: 768px)").matches) {
		var lastY = window.scrollY,
			lastT = Date.now();
		window.addEventListener(
			"scroll",
			function () {
				var now = Date.now(),
					dy = lastY - window.scrollY,
					dt = now - lastT || 1;
				var velocity = dy / dt; // px/ms směrem nahoru
				if (velocity > 1.5 && window.scrollY < 300) {
					console.log(LOG, "MOBIL exit signál: rychlý scroll nahoru, velocity =", velocity.toFixed(2));
					openPopup();
				}
				lastY = window.scrollY;
				lastT = now;
			},
			{ passive: true },
		);
		console.log(LOG, "mobilní scroll listener aktivní (šířka ≤768 px)");
	} else {
		console.log(LOG, "mobilní scroll listener přeskočen (šířka >768 px)");
	}

	console.log(LOG, "listenery (mouseout + scroll) navěšeny, čekám na exit signál");
})();
