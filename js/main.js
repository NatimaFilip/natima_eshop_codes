/*--------------------------------------- Přepsání funkcí*/
function moveFilters() {
	console.log("moveFilters");
}

/*-------------------------------------- CS SK PL*/
const csLang = true;
const skLang = false;
const plLang = false;

// Create a custom debounced resize event
window.addEventListener("resize", function () {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function () {
		// Dispatch a custom event when resize is complete
		console.log("CUSTOM EVENT DISPATCHED: debouncedResize");
		document.dispatchEvent(new CustomEvent("debouncedResize"));
	}, 250);
});

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
document.addEventListener("debouncedResize", function () {
	checkMediaSizes();
});

/*-------------------------------------- Custom events*/
let resizeTimer;

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

/*-------------------------------------- CATEGORY*/
if (body.classList.contains("type-category")) {
	let perexTrimmedIsVisible = false;
	let filterInSidebar = true;
	let filtersElement = document.querySelector("#filters");
	let filtersPositionSidebar = document.querySelector(".sidebar-inner .box-filters");
	let filtersPositionContent = document.querySelector(".category-content-wrapper");
	let filterSections = filtersElement.querySelectorAll(".filter-section");
	let allProducts = document.querySelectorAll(".product");

	/*--------------------FILTRY*/
	customMoveFilter();
	moveAndEditClearFilters();
	editManufacturerFilter();
	cleanEmptyFilters();
	editProductSorting();
	measureUnitFromAppendix();

	actionPriceToFinalPriceAndReviewsNumber();

	if (isMobile) {
		trimPerex();
	}

	document.addEventListener("ShoptetDOMPageContentLoaded", function (event) {
		allProducts = document.querySelectorAll(".product");

		if (!isDesktop) {
			filterInSidebar = true;
			filtersElement = document.querySelector("#filters");
			filtersElement.classList.add("active");
			filtersPositionContent = document.querySelector(".category-content-wrapper");
			filterSections = filtersElement.querySelectorAll(".filter-section");
			customMoveFilter();
		}
		moveAndEditClearFilters();
		editManufacturerFilter();
		cleanEmptyFilters();
		editProductSorting();
		actionPriceToFinalPriceAndReviewsNumber();
		if (isMobile) {
			if (!perexTrimmedIsVisible) {
				trimPerex();
			}
		}
	});

	document.addEventListener("debouncedResize", function () {
		customMoveFilter();
	});

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

		// Listen for both "click" and "touchstart" events
		["click", "touchstart"].forEach((event) => {
			readMoreButton.addEventListener(event, function () {
				perexElement.classList.add("active");
				perexTrimmedIsVisible = true;
			});
		});
		//make it so it trims after 3 lines and saves the rest of the text in a data attribute
	}

	function customMoveFilter() {
		if (isDesktop) {
			if (filterInSidebar) {
				return;
			}
			filtersPositionSidebar.appendChild(filtersElement);
			filterInSidebar = true;
		} else {
			if (!filterInSidebar) {
				return;
			}
			filtersPositionContent.prepend(filtersElement);
			filterInSidebar = false;

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
			["click", "touchstart"].forEach((event) => {
				customOpenFilterButton.addEventListener(event, function () {
					filtersElement.classList.toggle("active");
					customOpenFilterButton.classList.toggle("active");
				});
			});
			filtersPositionContent.prepend(customOpenFilterButton);
		}
	}

	function moveAndEditClearFilters() {
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
				["click", "touchstart"].forEach((event) => {
					activeNewLabel.addEventListener(event, function () {
						label.click();
					});
				});
			});
		});

		selectedFiltersDiv.appendChild(clearFilterButton);
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
		["click", "touchstart"].forEach((event) => {
			showAllManufacturersButton.addEventListener(event, function () {
				manufacturerFilter.classList.add("active");
			});
		});
	}

	function cleanEmptyFilters() {
		filterSections.forEach((section) => {
			let filterItems = section.querySelectorAll("fieldset > div > label:not(.disabled)");
			if (filterItems.length === 0) {
				section.remove();
			}
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
				sortingForm.querySelector("fieldset").prepend(label); // Move the label to the end of the fieldset
			} else if (label) {
				label.classList.remove("active"); // Remove 'active' class from other labels
			}
		});

		// Add event listener to the toggle button
		["click", "touchstart"].forEach((event) => {
			toggleOpenSortingForm.addEventListener(event, function () {
				sortingForm.classList.toggle("active");
				toggleOpenSortingForm.classList.toggle("active");
			});
		});
	}

	function measureUnitFromAppendix() {
		allProducts.forEach((product) => {
			let productAppendix = product.querySelector(".product-appendix");
			if (!productAppendix) return;

			let productMeasureUnitComplet;
			let productMeasureAmount;
			let appendixText = productAppendix.textContent;

			// Use a regular expression to extract the desired value
			let match = appendixText.match(/Množství:\s*([^;]+);/);
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
				pricePerUnit_ValueSpan.className = "product-price-per-unit-value";

				pricePerUnit_ValueSpan.textContent =
					pricePerUnit_Value.toFixed(1).replace(".", ",") + " Kč / 1 " + pricePerUnit_Unit;

				prices.appendChild(pricePerUnitDiv);
				pricePerUnitDiv.appendChild(pricePerUnit_ValueSpan);

				// Remove "Množství ...;" from the text
				appendixText = appendixText.replace(/Množství:\s*[^;]+;/, "").trim();
				productAppendix.textContent = appendixText; // Update the element's text content
			}
		});
	}

	function actionPriceToFinalPriceAndReviewsNumber() {
		allProducts.forEach((product) => {
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
}
