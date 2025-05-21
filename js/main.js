/*-------------------------------------- CS SK PL*/
const csLang = true;
const skLang = false;
const plLang = false;

/*-------------------------------------- Custom events*/
let resizeTimer;

// Create a custom debounced resize event
window.addEventListener("resize", function () {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function () {
		// Dispatch a custom event when resize is complete
		console.log("CUSTOM EVENT DISPATCHED: debouncedResize");
		document.dispatchEvent(new CustomEvent("debouncedResize"));
	}, 250);
});

// Now you can trigger the same debounced behavior with:
// document.dispatchEvent(new CustomEvent("debouncedResize"));

/*-------------------------------------- HEADER*/

let header = document.getElementById("header");
let headerTop = header.querySelector(".header-top");
let topNavigationContacts = document.querySelector(".top-navigation-contacts");

addContactToHeaderTop();
addAccountToHeaderTop();

function addContactToHeaderTop() {
	headerTop.appendChild(topNavigationContacts);
	headerTop.classList.add("header-loaded");

	let projectPhone = headerTop.querySelector(".project-phone");

	const contactHoursSpan = document.createElement("span");
	contactHoursSpan.className = "contact-hours";

	if (csLang) {
		projectPhone.innerHTML = projectPhone.innerHTML.replace("+420 ", "");
		contactHoursSpan.innerHTML = "Po–Pá 8:00–16:00";
	}
	if (skLang) {
		projectPhone.innerHTML = projectPhone.innerHTML.replace("+421 ", "");
		contactHoursSpan.innerHTML = "Po–Pá 8:00–16:00";
	}
	if (plLang) {
		projectPhone.innerHTML = projectPhone.innerHTML.replace("+48 ", "");
		contactHoursSpan.innerHTML = "Pn–Pt 8:00–16:00";
	}

	projectPhone.appendChild(contactHoursSpan);
}

function addAccountToHeaderTop() {
	const accountButton = document.createElement("a");
	accountButton.className = "login-button-custom";
	accountButton.setAttribute("data-target", "login");
	headerTop.appendChild(accountButton);
}

/*-------------------------------------- MENU OVERFLOW DETECTION*/
let mainCategoryMenu = header.querySelector(".menu-level-1");
let mainCategoryMenuItems = mainCategoryMenu.querySelectorAll(":scope > li");
let mainCategoryMenuItemsWidth = [];
let cumulativeMainCategoryMenuItemWidth = 0;

const originalMainCategoryMenuHelper = header.querySelector(".menu-helper");
const textOfOriginalMainCategoryMenuHelper = originalMainCategoryMenuHelper.innerHTML;
header.querySelector(".menu-helper").remove();
let mainCategoryMenuHelper = document.createElement("div");
mainCategoryMenuHelper.className = "menu-helper-custom";
mainCategoryMenuHelper.innerHTML = textOfOriginalMainCategoryMenuHelper;
const mainCategoryMenuHelperSubmenuDiv = document.createElement("div");
mainCategoryMenuHelperSubmenuDiv.className = "menu-helper-submenu";
mainCategoryMenuHelper.appendChild(mainCategoryMenuHelperSubmenuDiv);
let mainCategoryMenuHelperSubmenu = mainCategoryMenuHelper.querySelector(".menu-helper-submenu");

mainCategoryMenu.appendChild(mainCategoryMenuHelper);
let mainCategoryMenuHelperWidth = mainCategoryMenuHelper.offsetWidth;

mainCategoryMenuItems.forEach((item) => {
	let itemWidth = item.offsetWidth;
	cumulativeMainCategoryMenuItemWidth += itemWidth;
	mainCategoryMenuItemsWidth.push(cumulativeMainCategoryMenuItemWidth);
});

function inicializeMenu() {
	let mainCategoryMenuItemsInSubmenu = mainCategoryMenuHelperSubmenu.querySelectorAll(":scope > li");
	if (mainCategoryMenuItemsInSubmenu.length > 0) {
		mainCategoryMenuItemsInSubmenu.forEach((item) => {
			mainCategoryMenu.appendChild(item);
		});
		mainCategoryMenu.appendChild(mainCategoryMenuHelper);
	}

	let mainCategoryMenuWidth = mainCategoryMenu.offsetWidth;
	console.log("menuWidth", mainCategoryMenuWidth);
	console.log("menuItemsWidth", mainCategoryMenuItemsWidth);
	console.log("menuHelperWidth", mainCategoryMenuHelperWidth);

	if (mainCategoryMenuWidth < cumulativeMainCategoryMenuItemWidth) {
		mainCategoryMenuHelper.classList.remove("menu-helper-hidden");
		let indexOfOverflowItem = mainCategoryMenuItemsWidth.findIndex(
			(itemWidth) => itemWidth > mainCategoryMenuWidth - mainCategoryMenuHelperWidth
		);
		console.log("indexOfOverflowItem", indexOfOverflowItem);
		console.log("mainCategoryMenuItemsWidth Idex", mainCategoryMenuItemsWidth[indexOfOverflowItem]);

		// from this index onwards, hide the items with style.display = "none"
		for (let i = indexOfOverflowItem; i < mainCategoryMenuItems.length; i++) {
			mainCategoryMenuHelperSubmenu.appendChild(mainCategoryMenuItems[i]);
		}
	} else {
		mainCategoryMenuHelper.classList.add("menu-helper-hidden");
	}
}
// Add listener for the custom event

inicializeMenu();
document.addEventListener("debouncedResize", function () {
	inicializeMenu();
});

/*-------------------------------------- MENU MAXIMUM POLOŽEK*/
function removeCommasFromMenu() {
	mainCategoryMenuItems.forEach((item) => {
		let menuLinkHref = item.querySelector(":scope > a")?.getAttribute("href") || null;

		console.log("menuLink href:", menuLinkHref);
		let menuLevelTwo = item.querySelector(".menu-level-2");
		let menuLevelTwoLi = item.querySelectorAll(".menu-level-2 > li");

		if (menuLevelTwoLi.length > 0) {
			if (menuLevelTwoLi.length > 12) {
				for (let i = 11; i < menuLevelTwoLi.length; i++) {
					menuLevelTwoLi[i].style.display = "none";
				}
				const numberOfHiddenItems = menuLevelTwoLi.length - 12 + 1;
				const showAllCategoriesButton = document.createElement("a");
				showAllCategoriesButton.setAttribute("href", menuLinkHref);
				showAllCategoriesButton.className = "show-all-categories";
				if (csLang) {
					showAllCategoriesButton.innerHTML = "<span>Zobrazit další kategorie (" + numberOfHiddenItems + ")</span>";
				}
				if (skLang) {
					showAllCategoriesButton.innerHTML = "<span>Zobraziť ďalšie kategórie (" + numberOfHiddenItems + ")</span>";
				}
				if (plLang) {
					showAllCategoriesButton.innerHTML = "<span>Pokaż więcej kategorii (" + numberOfHiddenItems + ")</span>";
				}

				menuLevelTwo.appendChild(showAllCategoriesButton);
			}

			menuLevelTwoLi.forEach((li, index) => {
				let menuLevelThreeLinkHref = li.querySelector(":scope > a")?.getAttribute("href") || null;
				let menuLevelThree = li.querySelector(".menu-level-3");
				let menuLevelThreeLi = li.querySelectorAll(".menu-level-3 > li");

				//Odstranení čárky z menu level 3
				if (menuLevelThreeLi.length > 0) {
					if (menuLevelThreeLi.length > 4) {
						for (let i = 3; i < menuLevelThreeLi.length; i++) {
							menuLevelThreeLi[i].style.display = "none";
						}

						const numberOfHiddenItems = menuLevelThreeLi.length - 4 + 1;
						const showAllSubcategoriesButton = document.createElement("a");
						showAllSubcategoriesButton.setAttribute("href", menuLevelThreeLinkHref);
						showAllSubcategoriesButton.className = "show-all-subcategories";

						if (csLang) {
							if (numberOfHiddenItems > 4) {
								showAllSubcategoriesButton.innerHTML = "+ dalších " + numberOfHiddenItems;
							} else {
								showAllSubcategoriesButton.innerHTML = "+ další " + numberOfHiddenItems;
							}
						}
						if (skLang) {
							if (numberOfHiddenItems > 4) {
								showAllSubcategoriesButton.innerHTML = "+ ďalších " + numberOfHiddenItems;
							} else {
								showAllSubcategoriesButton.innerHTML = "+ ďalšie " + numberOfHiddenItems;
							}
						}
						if (plLang) {
							if (numberOfHiddenItems > 4) {
								showAllSubcategoriesButton.innerHTML = "+ dalszych " + numberOfHiddenItems;
							} else {
								showAllSubcategoriesButton.innerHTML = "+ dalsze " + numberOfHiddenItems;
							}
						}

						menuLevelThree.appendChild(showAllSubcategoriesButton);
					}
					menuLevelThreeLi.forEach((li) => {
						let liHTML = li.innerHTML;
						liHTML = liHTML.replace(/<\/a>,\s*<\/li>$/, "</a></li>");
						liHTML = liHTML.replace(/<\/a>,\s*$/, "</a>");
						li.innerHTML = liHTML;
					});
				}
			});
		}
	});
	/* 	menuLevelThreeAElements.forEach((item) => {
		// Get the text content of the item
		let itemHTML = item.innerHTML;

		// Replace any comma followed by whitespace at the end of links
		itemHTML = itemHTML.replace(/<\/a>,\s*<\/li>$/, "</a></li>");
		itemHTML = itemHTML.replace(/<\/a>,\s*$/, "</a>");

		// Update the item's HTML
		item.innerHTML = itemHTML;
	}); */
}
removeCommasFromMenu();
