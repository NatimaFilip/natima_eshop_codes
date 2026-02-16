/*

//body html
const storedhal = JSON.parse(localStorage.getItem("halloween"));
const nowhal = Date.now();

if (storedhal && storedhal.value && storedhal.expires > nowhal) {
	document.body.classList.add("halloween");
} else {
	// Optional: cleanup expired data
	localStorage.removeItem("halloween");
}

//kategorie
const oneWeek = 7 * 24 * 60 * 60 * 1000; // 1 week in ms
const now = Date.now();

localStorage.setItem("halloween", JSON.stringify({ value: true, expires: now + oneWeek }));


*/

//body html
const storedhal = JSON.parse(localStorage.getItem("valentyn"));
const nowhal = Date.now();

if (storedhal && storedhal.value && storedhal.expires > nowhal) {
	document.body.classList.add("valentyn");
	inicializeMenu();
} else {
	// Optional: cleanup expired data
	localStorage.removeItem("valentyn");
}

//kategorie
const oneWeek = 7 * 24 * 60 * 60 * 1000; // 1 week in ms
const now = Date.now();

localStorage.setItem("valentyn", JSON.stringify({ value: true, expires: now + oneWeek }));
