(function () {
	var FORM_ID = "aQaQQW"; // doplnit ID exit-intent formu z Tally
	var MIN_TIME = 60 * 1000; // ≥60 s na webu
	var MIN_PAGES = 2; // ≥2 navštívené stránky
	var COOLDOWN = 30; // dní — frequency cap
	var fired = false;

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
		} else if (document.referrer) {
			try {
				var refHost = new URL(document.referrer).hostname;
				if (refHost && refHost !== location.hostname) {
					sessionStorage.setItem("natima_utm", refHost);
				}
			} catch (e) {}
		}
	}

	// --- frequency cap: už zobrazeno / zodpovězeno? ---
	if (getCookie("natima_exit_shown") || getCookie("natima_exit_answered")) return;

	// --- počítadlo stránek za session ---
	var pages = parseInt(sessionStorage.getItem("natima_pages") || "0", 10) + 1;
	sessionStorage.setItem("natima_pages", pages);
	var sessionStart = parseInt(sessionStorage.getItem("natima_start") || "0", 10);
	if (!sessionStart) {
		sessionStart = Date.now();
		sessionStorage.setItem("natima_start", sessionStart);
	}

	// --- načíst Tally embed knihovnu ---
	var s = document.createElement("script");
	s.src = "https://tally.so/widgets/embed.js";
	document.head.appendChild(s);

	// --- splněny vstupní podmínky (čas + stránky)? ---
	function eligible() {
		return Date.now() - sessionStart >= MIN_TIME && pages >= MIN_PAGES;
	}

	// --- prázdný / neaktivní košík? (uprav selektor dle DOM Natima/Shoptet) ---
	function cartEmptyOrStale() {
		var c = document.querySelector(".cart-count, [data-cart-count]");
		return !c || parseInt(c.textContent || "0", 10) === 0;
	}

	// --- otevřít popup ---
	function openPopup() {
		if (fired || !eligible() || !cartEmptyOrStale()) return;
		if (document.body.classList.contains("ordering-process")) return;
		if (typeof Tally === "undefined" || !Tally.openPopup) return;
		fired = true;
		var params = new URLSearchParams({
			context: "exit",
			last_url: location.pathname,
			session_pages: String(pages),
			time_on_site: String(Math.round((Date.now() - sessionStart) / 1000)),
			entry_source: sessionStorage.getItem("natima_utm") || "direct",
		});
		Tally.openPopup(FORM_ID, {
			layout: "modal",
			width: 540,
			hideTitle: true,
			hiddenFields: Object.fromEntries(params),
			onClose: function () {
				setCookie("natima_exit_shown", "1", COOLDOWN);
			},
			onSubmit: function () {
				setCookie("natima_exit_answered", "1", 365);
			},
		});
		setCookie("natima_exit_shown", "1", COOLDOWN);
	}

	// --- DESKTOP: mouse-leave intent (horní hrana okna) ---
	document.addEventListener("mouseout", function (e) {
		if (!e.relatedTarget && e.clientY <= 0) openPopup();
	});

	// --- MOBIL: rychlý scroll nahoru jako proxy za exit ---
	var lastY = window.scrollY,
		lastT = Date.now();
	window.addEventListener(
		"scroll",
		function () {
			var now = Date.now(),
				dy = lastY - window.scrollY,
				dt = now - lastT || 1;
			var velocity = dy / dt; // px/ms směrem nahoru
			if (velocity > 1.5 && window.scrollY < 300) openPopup();
			lastY = window.scrollY;
			lastT = now;
		},
		{ passive: true },
	);
})();
