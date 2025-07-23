/*--------------------------------------- Přepsání funkcí*/
function moveFilters() {
	console.log("moveFilters");
}

/*-------------------------------------- CS SK PL*/
const csLang = true;
const skLang = false;
const plLang = false;

/*-------------------------------------- Custom events*/
// Debounce function to limit the rate at which a function can fire
let resizeTimer;
/* window.addEventListener("resize", function () {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function () {
		// Dispatch a custom event when resize is complete
		console.log("CUSTOM EVENT DISPATCHED: debouncedResize");
		document.dispatchEvent(new CustomEvent("debouncedResize"));
	}, 250);
});
 */

/*-------------------------------------- Media sizes*/
const mediaSizes = {
	desktop: 1280,
	tablet: 768,
};
let isMobile = false;
let isTablet = false;
let isDesktop = false;

let body = document.querySelector("body");

function checkMediaSizes() {
	if (window.innerWidth < mediaSizes.tablet) {
		isMobile = true;
		isTablet = false;
		isDesktop = false;
	}
	if (window.innerWidth >= mediaSizes.tablet && window.innerWidth < mediaSizes.desktop) {
		isMobile = false;
		isTablet = true;
		isDesktop = false;
	}
	if (window.innerWidth >= mediaSizes.desktop) {
		isMobile = false;
		isTablet = false;
		isDesktop = true;
	}
}

checkMediaSizes();
window.addEventListener("resize", function () {
	checkMediaSizes();
});

/*-------------------------------------- Custom functions*/
//click and touchstart listener for elements that should work on both desktop and mobile
/* function addSmartTouchClickListener(element, handler) {
	let touched = false;
	["touchstart", "click"].forEach((event) => {
		element.addEventListener(event, function (e) {
			if (event === "touchstart") {
				touched = true;
				handler(e);
			} else if (event === "click") {
				if (touched) {
					touched = false;
					return; // Skip this click, already handled by touchstart
				}
				handler(e);
			}
		});
	});

	 //	element.addEventListener("pointerdown", function (e) {
		//handler(e);
	//	e.preventDefault();
	//}); 
} */

function addSmartTouchClickListener(element, handler) {
	let touched = false;
	let touchTimer = null;

	/* 	element.addEventListener("touchstart"
	, function () {
		touched = true;
		// Reset touch if touchend doesn't happen soon
		touchTimer = setTimeout(() => {
			touched = false;
		}, 100);

		console.log("touchstart on element:", element);
	});

	element.addEventListener("touchend", function (e) {
		if (touched) {
			handler(e);
			touched = false;
			clearTimeout(touchTimer);
		}

		console.log("touchend on element:", element);
	}); */

	element.addEventListener("click", function (e) {
		if (touched) {
			// Click after touch, skip
			touched = false;
			return;
		}
		handler(e);
	});
}
/*-------------------------------------- HEADER*/

let header = document.getElementById("header");
let headerTop = header.querySelector(".header-top");
let topNavigationContacts = document.querySelector(".top-navigation-contacts");

addContactToHeaderTop();
addAccountToHeaderTop();
stickyHeaderToggle();

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

	let originalAccountButton = document.querySelector(".top-navigation-tools .top-nav-button-login");
	addSmartTouchClickListener(accountButton, function (event) {
		event.preventDefault();
		originalAccountButton.click();
	});
}

function stickyHeaderToggle() {
	const header = document.getElementById("header");
	if (!header) return;

	let lastScrollPosition = 0;
	let lastScrollUp = 0;
	let lastScrollDown = 0;
	let scrolledUp = false;

	const headerHeight = header.offsetHeight;
	const headerTopPosition = header.getBoundingClientRect().top + window.pageYOffset;
	const scrollThreshold = 150;

	let scrollDifference = 0;

	const handleScroll = () => {
		const currentScrollPosition = Math.round(window.pageYOffset || document.documentElement.scrollTop);

		// Scrolling up
		if (currentScrollPosition < lastScrollPosition) {
			lastScrollUp = currentScrollPosition;

			if (scrollDifference > scrollThreshold) {
				deactivateStickyHeader();
				scrolledUp = true;
			}
			if (currentScrollPosition <= headerTopPosition) {
				// If scrolled to the top
				removeStickyHeader();

				scrolledUp = false;
			}
		}
		// Scrolling down
		else {
			lastScrollDown = currentScrollPosition;
			scrollDifference = lastScrollDown - lastScrollUp;
			if (currentScrollPosition > headerHeight && scrollDifference > scrollThreshold) {
				if (scrolledUp) {
					activateStickyHeader();
				} /* else {
					document.body.classList.add("sticky-header-off");
				} */
			}
		}

		lastScrollPosition = Math.max(currentScrollPosition, 0); // Prevent negative scroll
	};

	const activateStickyHeader = () => {
		document.body.classList.add("sticky-header-off");
		document.body.classList.remove("sticky-header-on");
	};

	const deactivateStickyHeader = () => {
		document.body.classList.add("sticky-header-on");
		document.body.classList.remove("sticky-header-off");
	};

	const removeStickyHeader = () => {
		document.body.classList.remove("sticky-header-on");
		document.body.classList.remove("sticky-header-off");
	};

	window.addEventListener("scroll", handleScroll);
}

/*-------------------------------------- MENU OVERFLOW DETECTION*/
let mainCategoryMenu = header.querySelector(".menu-level-1");
let mainCategoryMenuItems = mainCategoryMenu.querySelectorAll(":scope > li");
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
let menuLevelsTwo;
let menuLevelsThree;

mainCategoryMenu.appendChild(mainCategoryMenuHelper);

let mobileMenuIsTriggered = false;

function inicializeMenu() {
	if (isMobile) {
		if (mobileMenuIsTriggered) {
			return;
		}
		mobileMenuIsTriggered = true;
		mainCategoryMenuItems.forEach((item) => {
			mainCategoryMenuHelperSubmenu.appendChild(item);
		});
		mainCategoryMenu.append(mainCategoryMenuHelperSubmenu);

		mainCategoryMenuHelper.classList.remove("active");
		mainCategoryMenuHelperSubmenuDiv.classList.remove("active");

		menuLevelsTwo = mainCategoryMenu.querySelectorAll(".menu-level-2");
		menuLevelsTwo.forEach((menuLevelTwo) => {
			addSmartTouchClickListener(menuLevelTwo, function (event) {
				if (isMobile) {
					menuLevelTwo.classList.add("active");
					menuLevelTwo.parentElement.classList.add("active");
					mainCategoryMenuHelperSubmenu.classList.add("level-two-active");

					//mainCategoryMenuHelperSubmenuDiv scroll to top
					mainCategoryMenuHelperSubmenuDiv.scrollTop = 0;
				}
			});
		});

		menuLevelsThree = mainCategoryMenu.querySelectorAll(".menu-level-3");
		menuLevelsThree.forEach((menuLevelThree) => {
			addSmartTouchClickListener(menuLevelThree, function (event) {
				if (!isMobile) {
					return;
				}
				menuLevelThree.classList.add("active");
				menuLevelThree.parentElement.parentElement.classList.add("active");
				mainCategoryMenuHelperSubmenu.classList.add("level-three-active");

				mainCategoryMenuHelperSubmenuDiv.scrollTop = 0;
			});
		});

		let liHasThirdLevel = mainCategoryMenu.querySelectorAll(".has-third-level");
		liHasThirdLevel.forEach((item) => {
			let aElement = item.querySelector(":scope > div > a");
			addSmartTouchClickListener(aElement, function (event) {
				if (!isMobile) {
					return;
				}
				if (item.classList.contains("active")) {
					event.preventDefault();
					mainCategoryMenuHelperSubmenu.classList.remove("level-three-active");
					item.querySelector(".menu-level-3").classList.remove("active");
					item.classList.remove("active");
					mainCategoryMenuHelperSubmenuDiv.scrollTop = 0;
				}
			});
		});

		let liHasSecondLevel = mainCategoryMenu.querySelectorAll("li.ext");
		liHasSecondLevel.forEach((item) => {
			let aElement = item.querySelector(":scope > a");
			addSmartTouchClickListener(aElement, function (event) {
				if (!isMobile) {
					return;
				}
				if (item.classList.contains("active")) {
					event.preventDefault();
					mainCategoryMenuHelperSubmenu.classList.remove("level-two-active");
					item.querySelector(".menu-level-2").classList.remove("active");
					item.classList.remove("active");
					mainCategoryMenuHelperSubmenuDiv.scrollTop = 0;
				}
			});
		});

		return;
	}

	if (!isMobile && mobileMenuIsTriggered) {
		mainCategoryMenuHelper.append(mainCategoryMenuHelperSubmenu);
		mainCategoryMenu.querySelectorAll(".active").forEach((activeItems) => {
			activeItems.classList.remove("active");
		});
		mainCategoryMenuHelperSubmenu.classList.remove("level-two-active");
		mainCategoryMenuHelperSubmenu.classList.remove("level-three-active");
		document.body.classList.remove("scroll-lock");
		document.body.classList.remove("content-hidden");
		mobileMenuIsTriggered = false;
	}

	let mainCategoryMenuItemsInSubmenu = mainCategoryMenuHelperSubmenu.querySelectorAll(":scope > li");
	if (mainCategoryMenuItemsInSubmenu.length > 0) {
		mainCategoryMenuItemsInSubmenu.forEach((item) => {
			mainCategoryMenu.appendChild(item);
		});
		mainCategoryMenu.appendChild(mainCategoryMenuHelper);
	}

	let mainCategoryMenuItemsWidth = [];
	let cumulativeMainCategoryMenuItemWidth = 0;
	let mainCategoryMenuHelperWidth = mainCategoryMenuHelper.offsetWidth;

	mainCategoryMenuItems.forEach((item) => {
		let itemWidth = item.offsetWidth;
		cumulativeMainCategoryMenuItemWidth += itemWidth;
		mainCategoryMenuItemsWidth.push(cumulativeMainCategoryMenuItemWidth);
	});

	let mainCategoryMenuWidth = mainCategoryMenu.offsetWidth;
	/* 	console.log("menuWidth", mainCategoryMenuWidth);
	console.log("cumulativeMainCategoryMenuItemWidth", cumulativeMainCategoryMenuItemWidth);
	console.log("menuItemsWidth", mainCategoryMenuItemsWidth);
	console.log("menuHelperWidth", mainCategoryMenuHelperWidth); */

	if (mainCategoryMenuWidth < cumulativeMainCategoryMenuItemWidth) {
		mainCategoryMenuHelper.classList.remove("menu-helper-hidden");
		let indexOfOverflowItem = mainCategoryMenuItemsWidth.findIndex(
			(itemWidth) => itemWidth > mainCategoryMenuWidth - mainCategoryMenuHelperWidth
		);
		/* 		console.log("indexOfOverflowItem", indexOfOverflowItem);
		console.log("mainCategoryMenuItemsWidth Idex", mainCategoryMenuItemsWidth[indexOfOverflowItem]); */

		// from this index onwards, hide the items with style.display = "none"
		for (let i = indexOfOverflowItem; i < mainCategoryMenuItems.length; i++) {
			mainCategoryMenuHelperSubmenu.appendChild(mainCategoryMenuItems[i]);
		}
	} else {
		mainCategoryMenuHelper.classList.add("menu-helper-hidden");
	}
}

inicializeMenu();

window.addEventListener("resize", function () {
	inicializeMenu();
});

/*-------------------------------------- HEADER SUBMENU LISTENER (hlavně pro mobil)*/
let addedListenerToClickOutsideOfMenu = false;
addSmartTouchClickListener(mainCategoryMenuHelper, function (event) {
	mainCategoryMenuHelper.classList.toggle("active");
	mainCategoryMenuHelperSubmenuDiv.classList.toggle("active");

	if (isMobile) {
		document.body.classList.toggle("scroll-lock");
		document.body.classList.toggle("content-hidden");
		mainCategoryMenu.querySelectorAll(".menu-helper-submenu .active").forEach((activeItems) => {
			activeItems.classList.remove("active");
		});
		mainCategoryMenuHelperSubmenu.classList.remove("level-two-active");
		mainCategoryMenuHelperSubmenu.classList.remove("level-three-active");
	}

	if (!addedListenerToClickOutsideOfMenu) {
		addedListenerToClickOutsideOfMenu = true;
		addSmartTouchClickListener(document, function (event) {
			if (!mainCategoryMenuHelperSubmenuDiv.contains(event.target) && !mainCategoryMenuHelper.contains(event.target)) {
				mainCategoryMenuHelper.classList.remove("active");
				mainCategoryMenuHelperSubmenuDiv.classList.remove("active");
				if (isMobile) {
					document.body.classList.remove("scroll-lock");
					document.body.classList.remove("content-hidden");
				}
			}
		});
	}
});

/*-------------------------------------- MENU MAXIMUM POLOŽEK*/
function removeCommasFromMenu() {
	mainCategoryMenuItems.forEach((item) => {
		let menuLinkHref = item.querySelector(":scope > a")?.getAttribute("href") || null;

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

/*----------------------------------------HEADER Calculate to free shipping*/
function calculateFreeShipping() {
	if (
		!window.dataLayer[0].shoptet.cartInfo ||
		typeof window.dataLayer[0].shoptet.cartInfo.freeShipping === "undefined"
	) {
		console.warn("Cart info or freeShipping is not available in the data layer.");
		return;
	}

	let freeShippingBoolean = window.dataLayer[0].shoptet.cartInfo.freeShipping;
	if (freeShippingBoolean == true) {
		document.body.classList.add("has-free-shipping");
	}
	if (freeShippingBoolean == false) {
		document.body.classList.remove("has-free-shipping");

		let cartWidget = document.querySelector("#cart-widget");
		if (!cartWidget) {
			return;
		}
		let percentageProgressToFreeShipping = 0;
		let leftToFreeShipping = window.dataLayer[0].shoptet.cartInfo.leftToFreeShipping.priceLeft || 0;
		let cartTotal = window.dataLayer[0].shoptet.cartInfo.getNoBillingShippingPrice.withVat || 0;

		leftToFreeShipping = Math.round(leftToFreeShipping);
		cartTotal = Math.round(cartTotal);

		percentageProgressToFreeShipping = 100 - Math.round((leftToFreeShipping / (cartTotal + leftToFreeShipping)) * 100);
		cartWidget.style.setProperty("--free-shipping-progress", percentageProgressToFreeShipping + "%");
		if (leftToFreeShipping <= 0) {
			document.body.classList.add("has-free-shipping");
		}
	}
}

document.addEventListener("DOMContentLoaded", function () {
	calculateFreeShipping();
});

document.addEventListener("ShoptetDOMCartContentLoaded", function () {
	calculateFreeShipping();
	document.body.classList.add("cart-widget-has-loaded");
});

/*------------------------------------------------- KOSIK WIDGET - cena celkem do widgetu*/
document.addEventListener("ShoptetDOMCartContentLoaded", function () {
	insertTotalPriceToCartWidget();
});
let priceAddedToCartWidget = false;
function insertTotalPriceToCartWidget() {
	let totalPrice = header.querySelector(".cart-price").textContent.trim();
	if (!totalPrice) {
		return;
	}

	let cartWidgetButton = document.querySelector("#cart-widget .cart-widget-button");
	if (!cartWidgetButton) {
		return;
	}

	if (priceAddedToCartWidget) {
		const existingTotalPriceElement = cartWidgetButton.querySelector(".cart-total-price-wrapper");
		if (existingTotalPriceElement) {
			const totalPriceStrong = existingTotalPriceElement.querySelector(".cart-total-price");
			if (totalPriceStrong) {
				totalPriceStrong.innerHTML = totalPrice;
			}
		}
		return;
	}

	const totalPriceInCartWidgetElement = document.createElement("div");
	totalPriceInCartWidgetElement.className = "cart-total-price-wrapper";

	const totalPriceStrong = document.createElement("strong");
	totalPriceStrong.className = "cart-total-price";
	totalPriceStrong.innerHTML = totalPrice;

	const totalPriceLabel = document.createElement("span");
	if (csLang) {
		totalPriceLabel.innerHTML = "Cena celkem";
	}
	if (skLang) {
		totalPriceLabel.innerHTML = "Cena spolu";
	}
	if (plLang) {
		totalPriceLabel.innerHTML = "Cena całkowita";
	}
	totalPriceInCartWidgetElement.appendChild(totalPriceLabel);
	totalPriceInCartWidgetElement.appendChild(totalPriceStrong);
	cartWidgetButton.appendChild(totalPriceInCartWidgetElement);
	priceAddedToCartWidget = true;
}

/*-------------------------------------- KOSIK WIDGET - na mobilu rovnou do kosiku*/
addCartWidgetToCartMobileListener();
function addCartWidgetToCartMobileListener() {
	let cartButton = header.querySelector(".navigation-buttons");
	if (!cartButton) {
		console.warn("Cart button not found.");
		return;
	}
	let cartHrefA = cartButton.querySelector("a");
	if (!cartHrefA) {
		console.warn("Cart button href not found.");
		return;
	}
	let cartHref = cartHrefA.getAttribute("href");
	if (!cartHref) {
		console.warn("Cart button href is empty.");
		return;
	}

	addSmartTouchClickListener(cartButton, function (event) {
		console.log("Cart button clicked, checking if mobile.");
		if (isMobile) {
			console.log("Cart button clicked on mobile, redirecting to cart page.");
			event.preventDefault();
			window.location.href = cartHref;
		} else {
			console.log("Cart button clicked on desktop, no action needed.");
		}
	});
}

/*------------------------------------------------- CATEGORY Filtry*/
if (body.classList.contains("type-category")) {
	/*------------------------------FILTRY*/
	let categoryTop = document.querySelector(".category-top");
	let filterInOriginalPosition = true;
	let filtersElement = document.querySelector("#filters");
	/* 	let filtersWrapperElement = document.querySelector(".filters-wrapper"); */
	let filterSections = filtersElement.querySelectorAll(".filter-section");
	let asideElement = document.querySelector("aside");
	let categoryContentWrapper = document.querySelector(".category-content-wrapper");
	let selectedFiltersInSidebar = true;
	let customOpenFilterButtonListenerAdded = false;

	const customOpenFilterButton = document.createElement("a");
	customOpenFilterButton.className = "custom-open-filter-button";
	if (csLang) {
		customOpenFilterButton.innerHTML = "Filtrování výsledků";
	}
	if (skLang) {
		customOpenFilterButton.innerHTML = "Filtrovanie výsledkov";
	}
	if (plLang) {
		customOpenFilterButton.innerHTML = "Filtrowanie wyników";
	}

	moveAsideToCategoryContent();

	customOpenFilterButtonListener();
	customMoveFilter();
	editClearFiltersButton();

	moveSelectedFilters();
	editManufacturerFilter();
	cleanEmptyFilters();
	editProductSorting();

	document.addEventListener("DOMContentLoaded", function () {
		addPriceFitlerClearButton();
		cleanEmptyActiveFiltersSection();
	});

	window.addEventListener("resize", function () {
		customMoveFilter();
		moveSelectedFilters();
	});

	document.addEventListener("ShoptetDOMPageContentLoaded", function (event) {
		// potřebuje znovu definovat, protože se to z nějakého důvodu přepíše
		categoryTop = document.querySelector(".category-top");
		filterInOriginalPosition = true;
		filtersElement = document.querySelector("#filters");
		/* 	filtersWrapperElement = document.querySelector(".filters-wrapper"); */
		filterSections = filtersElement.querySelectorAll(".filter-section");
		categoryContentWrapper = document.querySelector(".category-content-wrapper");
		selectedFiltersInSidebar = true;

		customOpenFilterButtonListener();
		customMoveFilter();
		editClearFiltersButton();
		addPriceFitlerClearButton();
		cleanEmptyActiveFiltersSection();
		moveSelectedFilters();
		editManufacturerFilter();
		cleanEmptyFilters();
		editProductSorting();

		if (customOpenFilterButton.classList.contains("active")) {
			filtersElement.classList.add("active");
		} else {
			filtersElement.classList.remove("active");
		}
	});

	function moveAsideToCategoryContent() {
		if (asideElement) {
			categoryContentWrapper.prepend(asideElement);
		}
	}

	function customMoveFilter() {
		if (!isDesktop) {
			if (filterInOriginalPosition) {
				filterInOriginalPosition = false;
				customOpenFilterButton.insertAdjacentElement("afterend", filtersElement);
			}
		}
		if (isDesktop) {
			if (!filterInOriginalPosition) {
				filterInOriginalPosition = true;
				categoryContentWrapper.appendChild(filtersElement);
			}
		}
	}

	function customOpenFilterButtonListener() {
		/* 	categoryTop.insertAdjacentElement("afterend", customOpenFilterButton); */
		categoryTop.appendChild(customOpenFilterButton);

		if (customOpenFilterButtonListenerAdded) {
			return;
		}
		customOpenFilterButtonListenerAdded = true;
		addSmartTouchClickListener(customOpenFilterButton, function () {
			filtersElement.classList.toggle("active");
			customOpenFilterButton.classList.toggle("active");
		});
	}

	function editClearFiltersButton() {
		let clearFilterButton = filtersElement.querySelector("#clear-filters");
		if (!clearFilterButton) {
			body.classList.remove("has-filters-active");
			return;
		}
		body.classList.add("has-filters-active");
		const selectedFiltersDiv = document.createElement("div");
		selectedFiltersDiv.className = "selected-filters";
		const selectedFiltersSpan = document.createElement("span");
		selectedFiltersSpan.className = "selected-filters-text";

		if (csLang) {
			selectedFiltersSpan.innerHTML = "Vybrané filtry";
		}
		if (skLang) {
			selectedFiltersSpan.innerHTML = "Vybrané filtre";
		}
		if (plLang) {
			selectedFiltersSpan.innerHTML = "Wybrane filtry";
		}

		filtersElement.prepend(selectedFiltersDiv);
		selectedFiltersDiv.appendChild(selectedFiltersSpan);

		//for each fieldset get active labels, create copies of them and append tgem to selectedFiltersDiv
		filterSections.forEach((section) => {
			let fieldsetHeader = section.querySelector("h4 > span");
			let activeLabels = section.querySelectorAll("fieldset > div > label.active");
			if (activeLabels.length === 0) {
				return;
			}
			const activeFilterSection = document.createElement("div");
			activeFilterSection.className = "active-filter-section";

			if (fieldsetHeader) {
				activeFilterSection.innerHTML = `<span class="active-filter-section-header">${fieldsetHeader.textContent}</span>`;
			} else {
				let defaultHeader = "";
				if (csLang) {
					defaultHeader = "Produkt";
				}
				if (skLang) {
					defaultHeader = "Produkt";
				}
				if (plLang) {
					defaultHeader = "Produkt";
				}
				activeFilterSection.innerHTML = `<span class="active-filter-section-header">${defaultHeader}</span>`;
			}
			selectedFiltersDiv.appendChild(activeFilterSection);
			activeLabels.forEach((label) => {
				// Extract only the text node, excluding the .filter-count
				let labelText = Array.from(label.childNodes)
					.filter((node) => node.nodeType === Node.TEXT_NODE) // Get only text nodes
					.map((node) => node.textContent.trim()) // Trim the text content
					.join(""); // Combine the text if there are multiple text nodes

				const activeNewLabel = document.createElement("span");
				activeNewLabel.className = "active-filter-label";
				activeNewLabel.textContent = labelText;

				//on click also click the original label
				activeFilterSection.appendChild(activeNewLabel);
				addSmartTouchClickListener(activeNewLabel, function () {
					label.click();
				});
			});
		});

		selectedFiltersDiv.appendChild(clearFilterButton);
	}

	function addPriceFitlerClearButton() {
		/* 	setTimeout(() => { */
		let sliderWrapper = filtersElement.querySelector(".slider-wrapper");
		let priceSlider = document.querySelector(".ui-slider-range");
		console.log("sliderWrapper:", sliderWrapper);
		console.log("priceSlider:", priceSlider);
		console.log("priceSlider width:", priceSlider.style.width);

		if (sliderWrapper && priceSlider && priceSlider.style.width !== "100%") {
			let minFilterValue = sliderWrapper.querySelector(".slider-header .from").textContent.trim();
			let maxFilterValue = sliderWrapper.querySelector(".slider-header .to").textContent.trim();

			minFilterValue = minFilterValue.replace(/  +/g, " ");
			maxFilterValue = maxFilterValue.replace(/  +/g, " ");

			const sliderHeader = sliderWrapper.querySelector("h4 > span");
			const activeFilterSection = document.createElement("div");

			activeFilterSectionElement = document.querySelector(".active-filter-section");
			activeFilterSection.className = "active-filter-section";
			activeFilterSection.innerHTML = `<span class="active-filter-section-header">${sliderHeader.textContent}</span>`;
			selectedFiltersDiv = document.querySelector(".selected-filters");

			selectedFiltersDiv.appendChild(activeFilterSection);
			if (!selectedFiltersDiv) {
				return;
			}
			selectedFilterText = selectedFiltersDiv.querySelector(".selected-filters-text");
			if (!selectedFilterText) {
				return;
			}

			const activeNewLabel = document.createElement("span");
			activeNewLabel.className = "active-filter-label";
			activeNewLabel.setAttribute("data-filter-type", "price");
			activeNewLabel.textContent = `${minFilterValue} - ${maxFilterValue}`;
			activeFilterSection.appendChild(activeNewLabel);

			selectedFiltersDiv.insertBefore(activeFilterSection, selectedFilterText.nextSibling);
			/* 
				addSmartTouchClickListener(activeNewLabel, function () {
					label.click();
				}); */
		}
		/* 	}, 500); */
	}

	function cleanEmptyActiveFiltersSection() {
		if (
			document.querySelector(".selected-filters") &&
			document.querySelectorAll(".active-filter-section").length === 0
		) {
			document.querySelector(".selected-filters").remove();
		}
	}

	function moveSelectedFilters() {
		let selectedFiltersDiv = document.querySelector(".selected-filters");
		if (!selectedFiltersDiv) {
			return;
		}
		if (isDesktop) {
			if (selectedFiltersInSidebar) {
				selectedFiltersInSidebar = false;
				categoryContentWrapper.prepend(selectedFiltersDiv);
			}
		} else {
			if (!selectedFiltersInSidebar) {
				selectedFiltersInSidebar = true;
				filtersElement.prepend(selectedFiltersDiv);
			}
		}
	}

	function editManufacturerFilter() {
		let manufacturerFilter = document.querySelector("#manufacturer-filter");
		if (!manufacturerFilter) {
			return;
		}
		let manufacturerFilterFieldset = manufacturerFilter.querySelector("fieldset");

		//remove disabled manufacturers
		let disabledManufacturers = manufacturerFilterFieldset.querySelectorAll(":scope >div > label.disabled");
		disabledManufacturers.forEach((label) => {
			label.parentElement.remove();
		});
		//move natios to the top
		let natiosManufacturer = manufacturerFilterFieldset.querySelector(
			":scope > div > label[for='manufacturerId[]natios']"
		);
		if (natiosManufacturer) {
			manufacturerFilterFieldset.prepend(natiosManufacturer.parentElement);
		}
		let manufacturers = manufacturerFilterFieldset.querySelectorAll(":scope > div");
		let manufacturersNumber = manufacturers.length;
		let manufacturersNumberMinusVisible = manufacturersNumber - 5;

		// If there are more than 5 active manufacturers, hide the rest
		if (manufacturersNumber <= 5) {
			return;
		}
		const showAllManufacturersButton = document.createElement("a");
		showAllManufacturersButton.className = "show-all-manufacturers";
		if (csLang) {
			if (manufacturersNumberMinusVisible > 4) {
				showAllManufacturersButton.innerHTML = "+ dalších " + manufacturersNumberMinusVisible;
			} else {
				showAllManufacturersButton.innerHTML = "+ další " + manufacturersNumberMinusVisible;
			}
		}
		if (skLang) {
			if (manufacturersNumberMinusVisible > 4) {
				showAllManufacturersButton.innerHTML = "+ ďalších " + manufacturersNumberMinusVisible;
			} else {
				showAllManufacturersButton.innerHTML = "+ ďalšie " + manufacturersNumberMinusVisible;
			}
		}
		if (plLang) {
			if (manufacturersNumberMinusVisible > 4) {
				showAllManufacturersButton.innerHTML = "+ dalszych " + manufacturersNumberMinusVisible;
			} else {
				showAllManufacturersButton.innerHTML = "+ dalsze " + manufacturersNumberMinusVisible;
			}
		}
		manufacturerFilter.appendChild(showAllManufacturersButton);
		addSmartTouchClickListener(showAllManufacturersButton, function () {
			manufacturerFilter.classList.add("active");
		});
	}

	function cleanEmptyFilters() {
		filterSections.forEach((section) => {
			let filterItems = section.querySelectorAll("fieldset > div > label:not(.disabled)");
			if (filterItems.length === 0) {
				section.remove();
			}
			let disabletFilterItems = section.querySelectorAll("fieldset > div > label.disabled");
			let sectionAppendingPlace = section.querySelector("fieldset");
			disabletFilterItems.forEach((disabledItem) => {
				sectionAppendingPlace.appendChild(disabledItem.parentElement);
			});
		});
	}

	function editProductSorting() {
		let categoryHeader = document.querySelector("#category-header");
		if (!categoryHeader) return;

		let sortingForm = categoryHeader.querySelector("form");
		if (!sortingForm) return;

		const toggleOpenSortingForm = document.createElement("span");
		toggleOpenSortingForm.className = "toggle-open-sorting-form";
		sortingForm.append(toggleOpenSortingForm);

		// Find all inputs within the category header
		let sortingInputs = sortingForm.querySelectorAll("fieldset input[type='radio']");

		sortingInputs.forEach((input) => {
			let label = categoryHeader.querySelector(`label[for='${input.id}']`);
			if (input.checked && label) {
				label.classList.add("active"); // Add 'active' class to the label of the checked input
				if (!isDesktop) {
					sortingForm.querySelector("fieldset").prepend(label); // Move the label to the end of the fieldset
				}
			} else if (label) {
				label.classList.remove("active"); // Remove 'active' class from other labels
			}
		});

		// Add event listener to the toggle button
		addSmartTouchClickListener(toggleOpenSortingForm, function () {
			sortingForm.classList.toggle("active");
			toggleOpenSortingForm.classList.toggle("active");
		});
	}
}
/*------------------------------------------------- CATEGORY Obecné*/
if (body.classList.contains("type-category")) {
	/*------------------------------PEREX*/
	let perexTrimmedIsVisible = false;
	if (isMobile) {
		trimPerex();
	}
	function trimPerex() {
		const maxLength = 130;
		const perexElement = document.querySelector(".category-perex");
		if (!perexElement) return;

		const paragraphElement = perexElement.querySelector(":scope > p");
		if (!paragraphElement) return;

		let originalText = paragraphElement.textContent;
		originalText = originalText.replace(/\s+/g, " ").trim();

		if (originalText.length <= maxLength) {
			// If the text is already short enough, do nothing
			return;
		}
		perexElement.classList.add("category-perex-has-shortened");
		// Find the last full word within the maxLength
		let truncatedText = originalText.slice(0, maxLength);
		const lastSpaceIndex = truncatedText.lastIndexOf(" ");
		if (lastSpaceIndex !== -1) {
			truncatedText = truncatedText.slice(0, lastSpaceIndex);
		}

		const categoryPerexShortened = document.createElement("p");
		categoryPerexShortened.innerHTML = truncatedText;
		categoryPerexShortened.className = "category-perex-shortened";
		perexElement.appendChild(categoryPerexShortened);

		const readMoreButton = document.createElement("span");
		readMoreButton.className = "read-more-perex";
		if (csLang) {
			readMoreButton.innerHTML = "Více";
		}
		if (skLang) {
			readMoreButton.innerHTML = "Viac";
		}
		if (plLang) {
			readMoreButton.innerHTML = "Więcej";
		}
		categoryPerexShortened.appendChild(readMoreButton);

		addSmartTouchClickListener(readMoreButton, function () {
			perexElement.classList.add("active");
			perexTrimmedIsVisible = true;
		});
		//make it so it trims after 3 lines and saves the rest of the text in a data attribute
	}

	/*------------------------------ZOBRAZENÝ POČET POLOŽEK*/
	showAmountOfProducts();
	function showAmountOfProducts() {
		let allProducts = document.querySelectorAll(".product");
		const amountOfProducts = allProducts.length;
		let categoryHeaderInsideDiv = document.querySelector("#category-header > div");
		if (!amountOfProducts) return;
		if (!categoryHeaderInsideDiv) return;
		let amountOfProductsText = "";

		if (csLang) {
			amountOfProductsText = "z";
		}
		if (skLang) {
			amountOfProductsText = "z";
		}
		if (plLang) {
			amountOfProductsText = "z";
		}

		if (document.querySelector(".amount-of-products")) {
			document.querySelector(".amount-of-products").remove();
		}

		const amountOfProductsSpan = document.createElement("span");
		amountOfProductsSpan.className = "amount-of-products";
		amountOfProductsSpan.textContent = amountOfProducts.toString() + " " + amountOfProductsText;

		categoryHeaderInsideDiv.prepend(amountOfProductsSpan);
	}

	/*------------------------------DOM PAGE CONTET LOADED FUNKCE*/
	document.addEventListener("ShoptetDOMContentLoaded", function (event) {
		if (isMobile) {
			if (!perexTrimmedIsVisible) {
				trimPerex();
			}
		}
		allProducts = document.querySelectorAll(".product");
		showAmountOfProducts();
	});
}

/*---------------------------------------------------------Uprava zobrazení produktu v product listu*/
document.addEventListener("ShoptetDOMContentLoaded", function (event) {
	actionPriceToFinalPriceAndReviewsNumber();
	measureUnitFromAppendixProducts();
});
/*---------ACTION PRICE AND REVIEWS NUMBER*/

actionPriceToFinalPriceAndReviewsNumber();
function actionPriceToFinalPriceAndReviewsNumber() {
	let allProductsInProductsBlock = document.querySelectorAll(".products-block .product");
	if (!allProductsInProductsBlock || allProductsInProductsBlock.length === 0) {
		return; // No products found
	}
	allProductsInProductsBlock.forEach((product) => {
		if (product.classList.contains("product-edited-price-reviews")) {
			return; // Skip if already processed
		}
		product.classList.add("product-edited-price-reviews");
		let priceStandard = product.querySelector(".flag-discount .price-standard");
		let priceFinal = product.querySelector(".price-final");
		if (priceStandard && priceFinal) {
			priceFinal.appendChild(priceStandard);
		}
		let starWrapper = product.querySelector(".stars-wrapper");
		if (starWrapper) {
			let reviewsNumber = starWrapper.getAttribute("data-micro-rating-count");
			if (reviewsNumber) {
				const reviewsNumberSpan = document.createElement("span");
				reviewsNumberSpan.className = "reviews-number";
				reviewsNumberSpan.innerHTML = reviewsNumber + "x";
				starWrapper.appendChild(reviewsNumberSpan);
			}
		}
	});
}

/*--------------------MEASURE UNIT FROM APENDIX INTO CAPSULE*/
measureUnitFromAppendixProducts();
function measureUnitFromAppendixProducts() {
	let allProductsInProductsBlock = document.querySelectorAll(".products-block .product");
	if (!allProductsInProductsBlock || allProductsInProductsBlock.length === 0) {
		return; // No products found
	}
	allProductsInProductsBlock.forEach((product) => {
		if (product.classList.contains("product-edited-measure")) {
			return; // Skip if already processed
		}
		product.classList.add("product-edited-measure");
		let productAppendix = product.querySelector(".product-appendix");
		if (!productAppendix) return;

		let productMeasureUnitComplet;
		let productMeasureAmount;
		let appendixText = productAppendix.textContent;

		// Use a regular expression to extract the desired value
		let match = appendixText.match(/^([^;]*);/);
		if (match) {
			productMeasureUnitComplet = match[1].trim(); // Save the extracted value
			productMeasureAmount = productMeasureUnitComplet.replace(/[^\d]/g, ""); //keep only digits from the measure unit
			productMeasureUnit = productMeasureUnitComplet.replace(/[\d\s]/g, ""); //keep only letters from the measure unit

			let ratingsWrapper = product.querySelector(".ratings-wrapper");
			if (ratingsWrapper) {
				// Create a new span element to display the amount
				let measureUnitSpan = document.createElement("span");
				measureUnitSpan.className = "product-measure-unit";
				measureUnitSpan.textContent = productMeasureUnitComplet;

				// Append the amount span to the ratings wrapper
				ratingsWrapper.appendChild(measureUnitSpan);
			}

			const pricePerUnitDiv = document.createElement("div");
			pricePerUnitDiv.className = "product-price-per-unit";
			let prices = product.querySelector(".prices");

			let priceFinal = product.querySelector(".price-final strong");
			let priceFinalValue;

			if (priceFinal) {
				// Extract the text content, trim it, and remove everything but numbers
				priceFinalValue = priceFinal.textContent.trim().replace(/[^\d.,]/g, ""); // Keep only digits, commas, and dots
				priceFinalValue = parseFloat(priceFinalValue.replace(",", ".")).toFixed(2);
			}

			let signleMeasuringUnit = {
				kapslí: "kapsle",
				tablet: "tableta",
				tobolek: "tobolka",
				tabletek: "tabletka",
			};

			let pricePerUnit_Unit;

			let foundUnitMatch = false;

			// Iterate over the keys in the object
			for (let key in signleMeasuringUnit) {
				if (productMeasureUnit.includes(key)) {
					foundUnitMatch = true;
					pricePerUnit_Unit = signleMeasuringUnit[key];
					break; // Exit the loop once a match is found
				}
			}
			if (!foundUnitMatch) {
				// If no match is found, use the original measure unit
				pricePerUnit_Unit = productMeasureUnit;
			}

			const pricePerUnit_Value = priceFinalValue / productMeasureAmount;

			const pricePerUnit_ValueSpan = document.createElement("span");
			pricePerUnit_ValueSpan.className = "product-price-per-unit-value";

			pricePerUnit_ValueSpan.textContent =
				pricePerUnit_Value.toFixed(2).replace(".", ",") + " Kč / 1 " + pricePerUnit_Unit;

			prices.appendChild(pricePerUnitDiv);
			pricePerUnitDiv.appendChild(pricePerUnit_ValueSpan);

			// Remove "Množství ...;" from the text
			appendixText = appendixText.replace(/Množství:\s*[^;]+;/, "").trim();
			productAppendix.textContent = appendixText; // Update the element's text content
		}
	});
}

/*------------------------------------------------- FOOTER*/
let footer = document.querySelector("#footer");
if (footer) {
	//Edit sledovat na instagramu tlačítko ve widgetu
	editFollowOnInstagramWidgetButton();
	function editFollowOnInstagramWidgetButton() {
		let instagramWidgetFollowBtn = footer.querySelector(".instagram-follow-btn a");
		if (!instagramWidgetFollowBtn) return;

		const instagramProfileName = footer
			.querySelector("a.footer-social-link.instagram")
			.getAttribute("href")
			.replace("https://www.instagram.com/", "")
			.replace("/", "");
		if (!instagramProfileName) return;

		const instagramProfileNameElement = document.createElement("span");
		instagramProfileNameElement.className = "instagram-profile-name";
		instagramProfileNameElement.textContent = instagramProfileName;

		const instagramImagePlaceholder = document.createElement("span");
		instagramImagePlaceholder.className = "instagram-image-placeholder";

		instagramWidgetFollowBtn.prepend(instagramProfileNameElement);
		instagramWidgetFollowBtn.prepend(instagramImagePlaceholder);
	}
}

/*------------------------------------------------- DOWNLOAD HEUREKA REVIES*/
let heurekaReviewsData;
let numberOfTotalViableReviews = 0;
let heurekaScrolled = false;

document.addEventListener("DOMContentLoaded", async function () {
	await downloadAndSaveHeurekaReviews();
	insertHeurekaReviews();
	heurekaReviewsScroll();
});

window.addEventListener("resize", function () {
	heurekaReviewsScroll();
});

async function insertHeurekaReviews() {
	let heurekaInsertElement = footer.querySelector("#heureka-reviews-insert");
	if (!heurekaInsertElement) {
		console.warn("Heureka reviews insert element not found.");
		return;
	}
	if (!heurekaReviewsData || heurekaReviewsData.length === 0) {
		console.warn("No Heureka reviews data available.");
		return;
	}

	heurekaReviewsData.forEach((review) => {
		const reviewElement = document.createElement("div");
		reviewElement.className = "heureka-review";
		let contentLength = 0;

		//review stars
		const reviewRatingWrapper = document.createElement("div");
		reviewRatingWrapper.className = "heureka-review-rating-wrapper";
		for (let i = 0; i < review.total_rating._text; i++) {
			const starIcon = document.createElement("i");
			starIcon.className = "heureka-icon-star";
			reviewRatingWrapper.appendChild(starIcon);
		}
		reviewElement.appendChild(reviewRatingWrapper);

		//review summary
		if (review.summary && review.summary._cdata) {
			if (review.summary._cdata.length < 100) {
				const reviewText = document.createElement("p");
				reviewText.className = "heureka-review-summary";
				reviewText.textContent = review.summary._cdata;
				reviewElement.appendChild(reviewText);
				contentLength += review.summary._cdata.length;
			}
		}

		//review pros
		if (review.pros && review.pros._cdata) {
			let reviesEditedProData = [];
			const reviewPros = document.createElement("div");
			reviewPros.className = "heureka-review-pros";
			let prosString = review.pros._cdata; // Extract the string from _cdata
			let prosStringEdited = prosString.match(/[A-Z][^A-Z]*/g); // Split by sequences starting with a capital letter

			if (prosStringEdited && prosStringEdited.length > 0) {
				reviesEditedProData = prosStringEdited;
			} else {
				reviesEditedProData[0] = prosString;
			}
			//return if there are more than 3 pros (praveděpodobně chyba)

			if (reviesEditedProData.length > 3) {
				return;
			}
			reviesEditedProData.forEach((pro) => {
				const proElement = document.createElement("span");
				proElement.className = "heureka-review-pro";
				proElement.textContent = pro.trim();
				reviewPros.appendChild(proElement);
			});
			reviewElement.appendChild(reviewPros);
			contentLength += review.pros._cdata.length * 1.5;
		}

		// Review cons
		if (review.cons && review.cons._cdata) {
			let reviewsEditedConsData = [];
			const reviewCons = document.createElement("div");
			let consString = review.cons._cdata; // Extract the string from _cdata
			let consStringEdited = consString.match(/[A-Z][^A-Z]*/g); // Split by sequences starting with a capital letter

			if (consStringEdited && consStringEdited.length > 0) {
				reviewsEditedConsData = consStringEdited;
			} else {
				reviewsEditedConsData[0] = consString;
			}

			// Return if there are more than 3 cons (likely an error)
			if (reviewsEditedConsData.length > 3) {
				return;
			}

			reviewsEditedConsData.forEach((con) => {
				const conElement = document.createElement("span");
				conElement.className = "heureka-review-con";
				conElement.textContent = con.trim();
				reviewCons.appendChild(conElement);
			});

			reviewElement.appendChild(reviewCons);
			contentLength += review.pros._cdata.length * 1.5;
		}

		//return if content is less than 40 and more than 150
		if (contentLength < 50 || contentLength > 100) {
			return;
		}
		numberOfTotalViableReviews = numberOfTotalViableReviews + 1;

		/* 	// review date
		const reviewDate = document.createElement("span");
		reviewDate.className = "heureka-review-date";
		const reviewTimestamp = parseInt(review.unix_timestamp._text, 10) * 1000; // Convert to milliseconds
		const reviewDateObject = new Date(reviewTimestamp);
		// Format the date as DD-MM-YYYY
		const formattedDate = `${reviewDateObject.getDate().toString().padStart(2, "0")}.${(reviewDateObject.getMonth() + 1)
			.toString()
			.padStart(2, "0")}.${reviewDateObject.getFullYear()}`;
		reviewDate.textContent = formattedDate;
		reviewElement.appendChild(reviewDate);
*/
		//add to heurekaInsertElement
		heurekaInsertElement.appendChild(reviewElement);
	});
}

function heurekaReviewsScroll() {
	let heurekaReviewlements = footer.querySelectorAll(".heureka-review");
	let heurekaInsertElement = footer.querySelector("#heureka-reviews-insert");
	if (!heurekaReviewlements.length || !heurekaInsertElement) {
		return;
	}

	// Get the computed style
	let styles = window.getComputedStyle(heurekaReviewlements[0]);
	// Get the CSS variable
	let heurekaReviewWidthProperty = styles.getPropertyValue("--width").trim();
	//remove % from the value
	heurekaReviewWidthProperty = heurekaReviewWidthProperty.replace("%", "");
	// calculate how many to 100
	heurekaReviewVisibleAmount = (100 / heurekaReviewWidthProperty).toFixed(0);

	//figure if there are more reviews than visible amount
	if (numberOfTotalViableReviews <= heurekaReviewVisibleAmount) {
		return;
	}

	let scrolledAmount = 0;
	let arrowRight = footer.querySelector("#heureka-reviews-scroll-right");
	let arrowLeft = footer.querySelector("#heureka-reviews-scroll-left");
	if (!arrowRight || !arrowLeft) {
		console.warn("Heureka reviews scroll arrows not found.");
		return;
	}
	arrowRight.classList.add("active");
	arrowRight.addEventListener("click", function () {
		scrolledAmount += 1;
		scrollHeurekaReviews();
	});
	arrowLeft.addEventListener("click", function () {
		scrolledAmount -= 1;
		scrollHeurekaReviews();
	});

	function scrollHeurekaReviews() {
		heurekaScrolled = true;
		if (scrolledAmount > 0) {
			arrowLeft.classList.add("active");
		}
		if (scrolledAmount <= 0) {
			arrowLeft.classList.remove("active");
		}
		if (scrolledAmount >= numberOfTotalViableReviews - heurekaReviewVisibleAmount) {
			arrowRight.classList.remove("active");
		} else {
			arrowRight.classList.add("active");
		}
		heurekaInsertElement.style.transform = `translateX(-${scrolledAmount * parseFloat(heurekaReviewWidthProperty)}%)`;
	}
	if (heurekaScrolled) {
		heurekaInsertElement.style.transform = "translateX(0)";
		arrowLeft.classList.remove("active");
	}
}

async function downloadAndSaveHeurekaReviews() {
	const url =
		"https://raw.githubusercontent.com/NatimaFilip/natima_eshop_files/refs/heads/main/heureka_reviews_cz.json";
	const storageKey = "heurekaReviewsCZ";
	const expiryKey = "heurekaReviewsCZ_expiry";

	// Check if data is already in localStorage and not expired
	const now = Date.now();
	const expiry = localStorage.getItem(expiryKey);
	const cached = localStorage.getItem(storageKey);
	if (expiry && cached && now < parseInt(expiry)) {
		// Data is still valid
		console.log("Heureka reviews loaded from localStorage.");
		heurekaReviewsData = JSON.parse(cached).reviews.review;
		return;
	}

	// Fetch and save
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error("Network response was not ok");
		const data = await response.json();
		localStorage.setItem(storageKey, JSON.stringify(data));
		localStorage.setItem(expiryKey, (now + 24 * 60 * 60 * 1000).toString());
		console.log("Heureka reviews saved to localStorage.");
		heurekaReviewsData = data.reviews.review;
	} catch (error) {
		console.error("Failed to fetch Heureka reviews:", error);
	}
}

/*------------------------------------------------- FOOTER Jazyky*/
footerLanguagesToggle();
function footerLanguagesToggle() {
	let footerLanguagesWrapper = footer.querySelector(".footer-languages-wrapper");
	if (!footerLanguagesWrapper) {
		return;
	}
	let footerLanguagesToggleButton = footerLanguagesWrapper.querySelector(".footer-languages-current");
	if (!footerLanguagesToggleButton) {
		return;
	}
	addSmartTouchClickListener(footerLanguagesToggleButton, function () {
		footerLanguagesWrapper.classList.toggle("active");
	});
}

/*------------------------------------------------- FOOTER Platby*/
footerPaymentsMove();
function footerPaymentsMove() {
	let footerPaymentsWrapper = footer.querySelector(".footer-online-payments");
	if (!footerPaymentsWrapper) {
		return;
	}
	let footerBottom = footer.querySelector(".footer-bottom");
	if (!footerBottom) {
		return;
	}
	footerBottom.appendChild(footerPaymentsWrapper);
}

/*------------------------------------------------- Produkty change add to cart button to + - 1170*/
function changeAddToCartButtonToIncreaseDecrease() {
	// Check if cartItems exist in the dataLayer
	let cartItems = window.dataLayer[0]?.shoptet?.cartInfo?.cartItems || [];
	console.log("Cart Items from dataLayer:", cartItems);
	if (!cartItems || cartItems.length === 0) {
		console.warn("No cart items found in the dataLayer.");
		return;
	}
	// Extract all the codes and quantities into an array of objects
	let cartItemCodesAndQuantities = cartItems.map((item) => ({
		code: item.code,
		quantity: item.quantity,
		priceId: item.priceId, // Include priceId if needed
		itemId: item.itemId, // Include itemId if needed
	}));

	// Log the result
	console.log("Cart Item Codes and Quantities:", cartItemCodesAndQuantities);

	let allProducts = document.querySelectorAll(".product");
	if (!allProducts || allProducts.length === 0) {
		console.warn("No products found on the page.");
		return;
	}

	allProducts.forEach((product) => {
		const productCode = product.querySelector(".p-code > span").textContent.trim();
		if (!productCode) {
			console.warn("Product code not found for a product.");
			return;
		}
		if (!cartItemCodesAndQuantities.some((item) => item.code === productCode)) {
			return; // Skip products not in the cart
		}
		productAddButton = product.querySelector(".p-tools form button");
		if (!productAddButton) {
			console.warn(`Add to cart button not found for product with code ${productCode}.`);
			return; // Skip if no add to cart button
		}
		let selectedProductFromCart = cartItemCodesAndQuantities.find((item) => item.code === productCode);
		if (product.classList.contains("product-in-cart")) {
			if (selectedProductFromCart.quantity === 0) {
				shoptet.cartShared.removeFromCart({ itemId: selectedProductFromCart.itemId });
				product.classList.remove("product-in-cart");
				product.querySelector(".increase-decrease-wrapper").remove();
				return; // Skip if quantity is 0
			}
			product.querySelector(".quantity-input").value = selectedProductFromCart.quantity || "1"; // Default to 1 if not found
			return; // Skip if already processed
		}
		product.classList.add("product-in-cart");

		const increaseDecreaseWrapper = document.createElement("div");
		increaseDecreaseWrapper.className = "increase-decrease-wrapper";
		const increaseButton = document.createElement("div");
		increaseButton.className = "increase-button";
		increaseButton.innerHTML = "+";
		const decreaseButton = document.createElement("div");
		decreaseButton.className = "decrease-button";
		decreaseButton.innerHTML = "-";
		const quantityInput = document.createElement("input");
		quantityInput.className = "quantity-input";
		quantityInput.type = "number";

		quantityInput.value = selectedProductFromCart.quantity || "1"; // Default to 1 if not found
		quantityInput.min = "1"; // Minimum value
		quantityInput.max = "999"; // Maximum value
		quantityInput.setAttribute("data-product-code", productCode); // Store the product code
		increaseDecreaseWrapper.appendChild(decreaseButton);

		increaseDecreaseWrapper.appendChild(quantityInput);
		increaseDecreaseWrapper.appendChild(increaseButton);

		product.querySelector(".p-tools form").appendChild(increaseDecreaseWrapper);

		increaseButton.addEventListener("click", function () {
			quantityInput.value = parseInt(quantityInput.value) + 1;
			quantityInput.dispatchEvent(new Event("change")); // Manually trigger the change event
		});
		decreaseButton.addEventListener("click", function () {
			if (parseInt(quantityInput.value) <= 1) {
				quantityInput.value = 0;
				quantityInput.dispatchEvent(new Event("change")); // Manually trigger the change event
				return;
			}
			quantityInput.value = parseInt(quantityInput.value) - 1;
			quantityInput.dispatchEvent(new Event("change")); // Manually trigger the change event
		});

		function debounce(func, delay) {
			let timeout;
			return function (...args) {
				clearTimeout(timeout);
				timeout = setTimeout(() => func.apply(this, args), delay);
			};
		}

		quantityInput.addEventListener(
			"change",
			debounce(function () {
				const quantityInputValue = parseInt(quantityInput.value);
				if (parseInt(quantityInputValue) < 1) {
					shoptet.cartShared.removeFromCart({ itemId: selectedProductFromCart.itemId });
					product.classList.remove("product-in-cart");
					product.querySelector(".increase-decrease-wrapper").remove();
				} else {
					shoptet.cartShared.updateQuantityInCart({
						itemId: selectedProductFromCart.itemId,
						priceId: selectedProductFromCart.priceId,
						amount: quantityInputValue,
					});
				}
			}, 1000) // Debounce delay of 200ms
		);
	});
}
document.addEventListener("ShoptetCartUpdated", function () {
	changeAddToCartButtonToIncreaseDecrease();
	/* 	ShoptetCartUpdated
	ShoptetDOMCartContentLoaded */
});
document.addEventListener("DOMContentLoaded", function () {
	changeAddToCartButtonToIncreaseDecrease();
});

/*------------------------------------------------- Shorten breadcrumbs*/
shortenBreadcrumbs();
function shortenBreadcrumbs() {
	if (isDesktop) {
		return; // Skip if on desktop
	}
	let breadcrumbs = document.querySelectorAll(".breadcrumbs > span");
	if (!breadcrumbs || breadcrumbs.length === 0) {
		return;
	}
	breadcrumbs.forEach((breadcrumb) => {
		if (breadcrumb.getAttribute("id") === "navigation-first") {
			return; // Skip the home breadcrumb
		}
		let breadcrumbTextElement = breadcrumb.querySelector("span[itemprop='name']");
		console.log("breadcrumbTextElement:", breadcrumbTextElement);
		let breadcrumbText = breadcrumbTextElement.textContent.trim();
		if (breadcrumbText.length > 20) {
			breadcrumb.textContent = breadcrumbText.slice(0, 20) + "...";
		}
	});
}

/*------------------------------------------------- Detail produktu*/
if (body.classList.contains("type-product")) {
	moveElementsInProduct();
	moveFlagsToImageWrapper();
	measureUnitFromAppendixDetail();

	function moveElementsInProduct() {
		let infoWrapper = document.querySelector(".product-top .p-info-wrapper");
		let productName = document.querySelector(".p-detail-inner-header h1");
		let productCode = document.querySelector(".p-detail-inner-header .p-code");

		let productBrand = document.querySelector(".product-top a[data-testid='productCardBrandName']");
		let starsWrapper = document.querySelector(".product-top .stars-wrapper");

		let detailParameters = document.querySelector(".description-inner .detail-parameters");
		let shortDescription = document.querySelector(".p-short-description");

		let dostupnost = document.querySelector(".product-top .availability-value");
		let doruceniDo = document.querySelector(".product-top .delivery-time-label").closest("table");

		let addToCartBtn = document.querySelector(".product-top .add-to-cart");
		let priceWrapper = document.querySelector(".product-top .p-final-price-wrapper");

		let finalProductPrice = document.querySelector(".product-top .price-final");

		let continueReadingShortDescription = document.querySelector(".product-top p[data-testid='productCardDescr']");

		let souvisejiciProdukty = document.querySelector(".products-block.products-related");
		let souvisejiciProduktyTitle = document.querySelector(".products-related-header");

		let benefitBanner = document.querySelector(".benefitBanner");

		if (!infoWrapper) {
			console.warn("Info wrapper not found.");
			return; // Exit if any of the elements are not found
		}

		if (productName) {
			infoWrapper.prepend(productName);
		}

		const rightContentWrapper = document.createElement("div");
		rightContentWrapper.className = "right-content-wrapper";

		const shortBenefitsWrapper = document.createElement("div");
		shortBenefitsWrapper.className = "short-benefits-wrapper";

		const vhodneProWrapper = document.createElement("div");
		vhodneProWrapper.className = "vhodne-pro-wrapper";

		const manufacturerAndCodeWrapper = document.createElement("div");
		manufacturerAndCodeWrapper.className = "manufacturer-and-code-wrapper";

		rightContentWrapper.appendChild(shortBenefitsWrapper);
		rightContentWrapper.appendChild(vhodneProWrapper);
		rightContentWrapper.appendChild(manufacturerAndCodeWrapper);
		infoWrapper.appendChild(rightContentWrapper);

		if (shortDescription) {
			let shortDescriptionFirstUl = shortDescription.querySelector("ul");
			if (shortDescriptionFirstUl) {
				shortBenefitsWrapper.appendChild(shortDescriptionFirstUl);
				shortBenefitsWrapper.classList.add("active");
			}
		}

		if (productBrand) {
			manufacturerAndCodeWrapper.appendChild(productBrand);
			manufacturerAndCodeWrapper.classList.add("active");
			if (productBrand.textContent.toLowerCase().includes("natios")) {
				if (csLang || skLang) {
					productBrand.classList.add("natios");
				}
				productBrand.setAttribute("href", "/natios");
				const natiosBrandBlock = document.createElement("div");
				natiosBrandBlock.className = "natios-brand-description-block-wrapper";
				if (csLang) {
					natiosBrandBlock.innerHTML = `<div id="natios-brand-description-block"><div class="natios-brand-description-block-logo"><img src="https://cdn.myshoptet.com/usr/www.natima.cz/user/documents/upload/assets/icon_logo_natios_no_bg.svg" width="140px" height="auto" alt="Natios Logo"></div><div class="natios-brand-description-block-text"><p>Natios je česká značka, která se zaměřuje na výrobu kvalitních doplňků stravy s čistým složením bezzbytečných příměsí, konzervantů a éček. <a href="/blog/natios-pomaha-hematoonkologii-v-ostrave/">Více</a></p></div><div class="natios-brand-description-block-donation"><div class="natios-brand-description-block-donation-icon"><img src="https://cdn.myshoptet.com/usr/www.natima.cz/user/documents/upload/assets/icon_natios_donate.svg" width="47px" height="auto" alt="Přispíváme"></div><p>Nákupem <b>přispějete</b> 1 Kč dětské hematoonkologii. <a href="/blog/natios-pomaha-hematoonkologii-v-ostrave/">Více</a></p></div></div>`;
					if (benefitBanner) {
						benefitBanner.classList.add("natios-block-added");
					}
				}
				if (skLang) {
					natiosBrandBlock.innerHTML = `<div id="natios-brand-description-block"><div class="natios-brand-description-block-logo"><img src="https://cdn.myshoptet.com/usr/www.natima.cz/user/documents/upload/assets/icon_logo_natios_no_bg.svg" width="140px" height="auto" alt="Natios Logo"></div><div class="natios-brand-description-block-text"><p>Natios je česká značka, ktorá sa zameriava na výrobu kvalitných výživových doplnkov s čistým zložením bez zbytočných prísad, konzervantov a éčok. <a href="/blog/natios-pomaha-hematoonkologii-v-ostrave/">Viac</a></p></div><div class="natios-brand-description-block-donation"><div class="natios-brand-description-block-donation-icon"><img src="https://cdn.myshoptet.com/usr/www.natima.cz/user/documents/upload/assets/icon_natios_donate.svg" width="47px" height="auto" alt="Prispievame"></div><p>Nákupom <b>prispejete</b> 1 Kč detskej hematoonkologii. <a href="/blog/natios-pomaha-hematoonkologii-v-ostrave/">Viac</a></p></div></div>`;
					if (benefitBanner) {
						benefitBanner.classList.add("natios-block-added");
					}
				}
				if (plLang) {
					return;
				}
				document.querySelector(".product-top").insertAdjacentElement("afterend", natiosBrandBlock);
			}
		}

		if (productCode) {
			manufacturerAndCodeWrapper.appendChild(productCode);
			manufacturerAndCodeWrapper.classList.add("active");
		}

		if (starsWrapper) {
			infoWrapper.appendChild(starsWrapper);
			let starsElement = starsWrapper.querySelector(".star");

			if (starsElement) {
				let starsScore = starsElement.getAttribute("title") || starsElement.getAttribute("data-original-title");
				if (starsScore) {
					starsScore = starsScore.split(":")[1].split("/")[0].trim();
					starsScore = parseFloat(starsScore).toFixed(2).replace(".", ",");
					const starsScoreElement = document.createElement("div");
					starsScoreElement.className = "stars-score";
					starsScoreElement.innerHTML = `<span class="stars-score-text">${starsScore}</span> / 5`;
					starsWrapper.appendChild(starsScoreElement);
				}
			}
		}
		if (detailParameters) {
			let parametersInProductTop = document.createElement("div");
			parametersInProductTop.className = "product-parameters-product-top";
			parametersInProductTop.innerHTML = detailParameters.outerHTML;
			infoWrapper.appendChild(parametersInProductTop);
		}

		const dostupnostADoruceniDoWrapper = document.createElement("div");
		dostupnostADoruceniDoWrapper.className = "dostupnost-doruceni-wrapper";
		if (dostupnost) {
			dostupnostADoruceniDoWrapper.appendChild(dostupnost);
			dostupnostADoruceniDoWrapper.classList.add("active");

			let availabilityAmount = dostupnost.querySelector(".availability-amount");
			//jestlize je skladem
			if (availabilityAmount) {
				body.classList.add("product-is-available");
				availabilityAmount.textContent = availabilityAmount.textContent.replace(/[()]/g, "");
				if (csLang) {
					availabilityAmount.textContent = availabilityAmount.textContent.replace(">", "více než ");
				}
				if (skLang) {
					availabilityAmount.textContent = availabilityAmount.textContent.replace(">", "viac ako ");
				}
				if (plLang) {
					availabilityAmount.textContent = availabilityAmount.textContent.replace(">", "więcej niż ");
				}

				if (souvisejiciProdukty) {
					document.querySelector(".p-detail").appendChild(souvisejiciProdukty);
					souvisejiciProdukty.classList.add("available");
					if (souvisejiciProduktyTitle) {
						souvisejiciProdukty.insertAdjacentElement("beforebegin", souvisejiciProduktyTitle);
						souvisejiciProduktyTitle.classList.add("available");
					}
				}
			}
			//když není skladem
			if (!availabilityAmount) {
				body.classList.add("product-not-available");
				if (souvisejiciProdukty) {
					document.querySelector(".p-detail-inner").insertAdjacentElement("afterend", souvisejiciProdukty);
					souvisejiciProdukty.classList.add("not-available");
					if (souvisejiciProduktyTitle) {
						souvisejiciProdukty.insertAdjacentElement("beforebegin", souvisejiciProduktyTitle);
						souvisejiciProduktyTitle.classList.add("not-available");
					}
				}
			}
		}
		if (doruceniDo) {
			dostupnostADoruceniDoWrapper.appendChild(doruceniDo);
			dostupnostADoruceniDoWrapper.classList.add("active");
		}
		infoWrapper.appendChild(dostupnostADoruceniDoWrapper);

		if (addToCartBtn) {
			priceWrapper.appendChild(addToCartBtn);
		} else {
			//tady bude co se stane když není k prodeji
			console.warn("Add to cart button not found.");
		}

		if (finalProductPrice) {
			const withVATElement = document.createElement("span");
			withVATElement.className = "with-vat";
			if (csLang) {
				withVATElement.textContent = "s DPH";
			}
			if (skLang) {
				withVATElement.textContent = "s DPH";
			}
			if (plLang) {
				withVATElement.textContent = "z VAT";
			}
			finalProductPrice.appendChild(withVATElement);
		}

		if (continueReadingShortDescription) {
			let continueReadingShortDescriptionA = continueReadingShortDescription.querySelector("a");
			if (continueReadingShortDescriptionA) {
				if (csLang) {
					continueReadingShortDescriptionA.textContent = "Číst dále";
				}
				if (skLang) {
					continueReadingShortDescriptionA.textContent = "Čítať ďalej";
				}
				if (plLang) {
					continueReadingShortDescriptionA.textContent = "Czytaj dalej";
				}
			}
		}
	}

	function moveFlagsToImageWrapper() {
		let imageElement = document.querySelector(".p-image-wrapper .p-image");
		let flagsWrapper = document.querySelector(".product-top .flags.flags-default");

		if (!imageElement || !flagsWrapper) {
			console.warn("Image wrapper or flags wrapper not found.");
			return;
		}

		imageElement.appendChild(flagsWrapper);
	}

	//merne jednotky v detailu produktu
	try {
		measureUnitFromAppendixDetail();
	} catch (error) {
		console.error("Error in measureUnitFromAppendixDetail:", error);
	}
	function measureUnitFromAppendixDetail() {
		let product = document.querySelector(".product-top ");

		if (product.classList.contains("product-edited-measure")) {
			return; // Skip if already processed
		}
		product.classList.add("product-edited-measure");
		let productAppendix = product.querySelector(".product-appendix");
		if (!productAppendix) return;

		let productMeasureUnitComplet;
		let productMeasureAmount;
		let appendixText = productAppendix.textContent;

		// Use a regular expression to extract the desired value
		let match = appendixText.match(/^([^;]*);/);
		if (match) {
			productMeasureUnitComplet = match[1].trim(); // Save the extracted value
			productMeasureAmount = productMeasureUnitComplet.replace(/[^\d]/g, ""); //keep only digits from the measure unit
			productMeasureUnit = productMeasureUnitComplet.replace(/[\d\s]/g, ""); //keep only letters from the measure unit

			let priceFinalWrapper = product.querySelector(".p-final-price-wrapper");

			const pricePerUnitDiv = document.createElement("div");
			pricePerUnitDiv.className = "product-price-per-unit-detail";
			let prices = product.querySelector(".prices");

			let priceFinal = product.querySelector(".price-final");

			let priceFinalValue;

			if (priceFinal) {
				// Extract the text content, trim it, and remove everything but numbers
				priceFinalValue = priceFinal.textContent.trim().replace(/[^\d.,]/g, ""); // Keep only digits, commas, and dots
				priceFinalValue = parseFloat(priceFinalValue.replace(",", ".")).toFixed(2);
			}

			let signleMeasuringUnit = {
				kapslí: "kapsle",
				tablet: "tableta",
				tobolek: "tobolka",
				tabletek: "tabletka",
			};

			let pricePerUnit_Unit;

			let foundUnitMatch = false;

			// Iterate over the keys in the object
			for (let key in signleMeasuringUnit) {
				if (productMeasureUnit.includes(key)) {
					foundUnitMatch = true;
					pricePerUnit_Unit = signleMeasuringUnit[key];
					break; // Exit the loop once a match is found
				}
			}
			if (!foundUnitMatch) {
				// If no match is found, use the original measure unit
				pricePerUnit_Unit = productMeasureUnit;
			}

			const pricePerUnit_Value = priceFinalValue / productMeasureAmount;

			const pricePerUnit_ValueSpan = document.createElement("span");
			pricePerUnit_ValueSpan.className = "product-price-per-unit-value-detail";

			pricePerUnit_ValueSpan.textContent =
				pricePerUnit_Value.toFixed(2).replace(".", ",") + " Kč / 1 " + pricePerUnit_Unit;

			priceFinalWrapper.appendChild(pricePerUnitDiv);
			pricePerUnitDiv.appendChild(pricePerUnit_ValueSpan);

			// Remove "Množství ...;" from the text
			appendixText = appendixText.replace(/Množství:\s*[^;]+;/, "").trim();
			productAppendix.textContent = appendixText; // Update the element's text content
		}
	}

	document.addEventListener("DOMContentLoaded", function () {
		productThumbnailInNavigation();
	});
	function productThumbnailInNavigation() {
		let navigaceProduktu = document.querySelector(".shp-tabs-row");
		let productMainImage = document.querySelector(".p-image-wrapper .p-main-image");
		let productName = document.querySelector("h1");
		let productPrice = document.querySelector(".product-top .price-final");

		if (!navigaceProduktu || !productMainImage || !productName || !productPrice) {
			console.warn("Product main image, name, or price not found.");
			return; // Exit if any of the elements are not found
		}

		const productAddToCartButton = document.createElement("div");
		productAddToCartButton.className = "product-add-to-cart-button";
		if (csLang) {
			productAddToCartButton.textContent = "Do košíku";
		}
		if (skLang) {
			productAddToCartButton.textContent = "Do košíka";
		}
		if (plLang) {
			productAddToCartButton.textContent = "Do koszyka";
		}

		const noticeMeButton = document.createElement("div");
		noticeMeButton.className = "product-notice-me-button";
		if (csLang) {
			noticeMeButton.textContent = "Upozornit";
		}
		if (skLang) {
			noticeMeButton.textContent = "Upozorniť";
		}
		if (plLang) {
			noticeMeButton.textContent = "Powiadom";
		}

		const productThumbnail = document.createElement("div");
		productThumbnail.className = "product-thumbnail";
		productThumbnail.innerHTML = `
			<div class="product-thumbnail-image-wrapper">
				${productMainImage.innerHTML}
			</div>
			<div class="product-thumbnail-info-wrapper">
				<div class="product-thumbnail-name">
					${productName.innerHTML}
				</div>
				<div class="product-thumbnail-price-button-wrapper">
					<div class="product-thumbnail-price">
						${productPrice.innerHTML}
						</div>
					<div class="product-thumbnail-buttons">
						${productAddToCartButton.outerHTML}
							${noticeMeButton.outerHTML}
					</div>
				</div>
			</div>
		`;

		navigaceProduktu.prepend(productThumbnail);
	}
}
