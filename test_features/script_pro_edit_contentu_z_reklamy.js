const oneWeek = 7 * 24 * 60 * 60 * 1000; // 1 week in ms
const now = Date.now();

(function () {
	const url = window.location.href;
	const isSwansonPage = url.includes("natima.cz/doplnky-stravy-swanson/");
	const hasUtm = window.location.search.includes("utm_");

	if (isSwansonPage && hasUtm) {
		localStorage.setItem("swanson10", JSON.stringify({ value: true, expires: now + oneWeek }));
	}
})();
