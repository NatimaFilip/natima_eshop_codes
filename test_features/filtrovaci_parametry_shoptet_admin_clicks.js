// ...existing code...
function clickAllClosedNodesOrCheckboxes() {
	const nodes = Array.from(document.querySelectorAll(".node-closed"));
	if (nodes.length > 0) {
		nodes.forEach((el, i) => {
			setTimeout(() => {
				try {
					if (el && typeof el.click === "function") el.click();
				} catch (e) {}
			}, i * 10);
		});
		console.warn(`Opened ${nodes.length} closed nodes`);
		return;
	}

	console.warn("No closed nodes found — clicking unchecked .v2FormField__static checkboxes");
	const checkboxes = Array.from(document.querySelectorAll('.v2FormField__static input[type="checkbox"]:not(:checked)'));
	if (checkboxes.length === 0) {
		console.warn("No unchecked checkboxes found");
		return;
	}

	checkboxes.forEach((cb, i) => {
		setTimeout(() => {
			try {
				if (cb && typeof cb.click === "function") cb.click();
			} catch (e) {}
		}, i * 10);
	});
	console.warn(`Clicked ${checkboxes.length} unchecked checkboxes`);
}
clickAllClosedNodesOrCheckboxes();
// ...existing code...
