if (body.classList.contains("id--9")) {
	sidebarEdit();
	giftEdit();
	giftSelectCustom();

	document.addEventListener("ShoptetDOMContentLoaded", function () {
		sidebarEdit();
		giftEdit();
		giftSelectCustom();
	});
	function sidebarEdit() {
		let sidebarInCart = document.querySelector(".sidebar-in-cart");
		if (!sidebarInCart) return;

		let discountCoupon = document.querySelector(".discount-coupon");
		if (discountCoupon) {
			sidebarInCart.prepend(discountCoupon);
		}

		let deliveryTime = document.querySelector(".delivery-time");
		if (deliveryTime) {
			sidebarInCart.prepend(deliveryTime);
		}

		let extraDiscount = document.querySelector(".extra.discount");
		if (extraDiscount) {
			sidebarInCart.prepend(extraDiscount);
		}

		let extraDelivery = document.querySelector(".extra.delivery");
		if (extraDelivery) {
			sidebarInCart.prepend(extraDelivery);
		}
	}
	function giftEdit() {
		let freeGift = document.querySelector(".free-gift");
		if (!freeGift) return;

		let giftHeader = document.querySelector(".cart-summary h4");
		if (csLang) {
			giftHeader.textContent = "Dárky k objednávce";
		}
		if (skLang) {
			giftHeader.textContent = "Darčeky k objednávke";
		}
		if (plLang) {
			giftHeader.textContent = "Prezenty do zamówienia";
		}

		let extraGift = document.querySelector(".extra.gift");
		if (!extraGift) {
			return;
		}
		freeGift.prepend(extraGift);

		let darkyTextObjednejte = "";
		let darkyTextHodnotnejsi = "";
		let giftSpan = document.querySelector(".extra.gift > span");
		if (giftSpan) {
			let darkyPrice = document.querySelector(".extra.gift > span > strong").textContent;
			if (csLang) {
				darkyTextObjednejte = "Objednejte ještě za ";
				darkyTextHodnotnejsi = " a vyberte si z hodnotnějších dárků.";
			}
			if (skLang) {
				darkyTextObjednejte = "Objednajte si ešte za ";
				darkyTextHodnotnejsi = " a vyberte si z hodnotnejších darčekov.";
			}
			if (plLang) {
				darkyTextObjednejte = "Zamów jeszcze za ";
				darkyTextHodnotnejsi = " i wybierz bardziej wartościowy prezent.";
			}
			giftSpan.innerHTML = darkyTextObjednejte + "<strong>" + darkyPrice + "</strong>" + darkyTextHodnotnejsi;
		}
	}
	/* 	function giftSelectCustom() {
		var t = $("html");
		t.on("click", ".free-gifts-wrapper .free-gifts label", function (t) {
			t.preventDefault();
			var e = $(this).attr("for");
			$(".free-gifts input").each(function () {
				e == $(this).attr("id") ? $(this).prop("checked", !0) : $(this).prop("checked", !1);
			});
			var i = $(".free-gifts-wrapper form");
			shoptet.cart.ajaxSubmitForm(i.attr("action"), i[0], "functionsForCart", "cart", !0);
		});
	} */
	function giftSelectCustom() {
		document.querySelectorAll(".free-gifts-wrapper .free-gifts label").forEach((label) => {
			label.addEventListener("click", function (event) {
				event.preventDefault();
				const forId = label.getAttribute("for");
				document.querySelectorAll(".free-gifts input").forEach((input) => {
					input.checked = input.id === forId;
				});
				const form = document.querySelector(".free-gifts-wrapper form");
				if (form && window.shoptet && shoptet.cart && typeof shoptet.cart.ajaxSubmitForm === "function") {
					shoptet.cart.ajaxSubmitForm(form.getAttribute("action"), form, "functionsForCart", "cart", true);
				}
			});
		});
	}
}

if (body.classList.contains("id--16")) {
	let deliveryMethodWrapper = document.querySelector(".co-delivery-method");
	let paymentMethodWrapper = document.querySelector(".co-payment-method");

	document.addEventListener("DOMContentLoaded", function () {
		if (deliveryMethodWrapper) {
			disableInputs(deliveryMethodWrapper);
			removeDeliveryFromRecap();
		}
		if (paymentMethodWrapper) {
			paymentMethodWrapper.classList.add("disabled");
			disableInputs(paymentMethodWrapper);
			removePaymentFromRecap();
		}
		document.addEventListener("ShoptetShippingMethodUpdated", function () {
			let activeDeliveryMethod = document.querySelector("#order-shipping-methods > .radio-wrapper.active");
			let activePaymentMethod = document.querySelector("#order-billing-methods > .radio-wrapper.active");

			if (!activePaymentMethod) {
				setTimeout(() => {
					removePaymentFromRecap();
					disableInputs(paymentMethodWrapper);
				}, 200);
			}

			if (activeDeliveryMethod) {
				paymentMethodWrapper.classList.remove("disabled");
				deliveryMethodWrapper.classList.add("selected");
			} else {
				deliveryMethodWrapper.classList.remove("selected");
			}
		});
		document.addEventListener("ShoptetBillingMethodUpdated", function () {
			let activeDeliveryMethod = document.querySelector("#order-shipping-methods > .radio-wrapper.active");
			let activePaymentMethod = document.querySelector("#order-billing-methods > .radio-wrapper.active");

			if (!activePaymentMethod) {
				setTimeout(() => {
					removePaymentFromRecap();
					disableInputs(paymentMethodWrapper);
				}, 200);
			}

			if (activeDeliveryMethod) {
				paymentMethodWrapper.classList.remove("disabled");
				deliveryMethodWrapper.classList.add("selected");
			} else {
				deliveryMethodWrapper.classList.remove("selected");
			}
		});
	});

	function disableInputs(method) {
		let allInputs = method.querySelectorAll("input");

		if (!allInputs) return;
		allInputs.forEach((input) => {
			input.checked = false;
			input.parentElement.classList.remove("active");
		});
	}
	function removeDeliveryFromRecap() {
		let recapText = document.querySelector(".recapitulation-shipping-billing .recapitulation-shipping-billing-info");
		if (recapText) {
			if (csLang) {
				recapText.textContent = "Zvolte způsob dopravy";
			}
			if (skLang) {
				recapText.textContent = "Zvoľte spôsob dopravy";
			}
			if (plLang) {
				recapText.textContent = "Wybierz sposób dostawy";
			}
		}
	}
	function removePaymentFromRecap() {
		let recapText = document.querySelector(
			".recapitulation-shipping-billing.last .recapitulation-shipping-billing-info"
		);
		if (recapText) {
			if (csLang) {
				recapText.textContent = "Zvolte způsob platby";
			}
			if (skLang) {
				recapText.textContent = "Zvoľte spôsob platby";
			}
			if (plLang) {
				recapText.textContent = "Wybierz sposób płatności";
			}
		}
	}

	rearangeRecap();

	fetchImagesOfProductsInCart();
}

if (body.classList.contains("id--17")) {
	rearangeRecap();
	fetchImagesOfProductsInCart();

	try {
		let boxContact = document.querySelector(".co-contact-information");
		let boxBilling = document.querySelector(".co-billing-address");
		let boxDelivery = document.querySelector(".co-shipping-address");
		let boxAdditional = document.querySelector(".co-box-additional");
		let companyShopping = document.querySelector(".company-shopping");

		boxBilling.appendChild(companyShopping);

		const anotherShippingElem = boxDelivery.querySelector("#another-shipping");
		if (anotherShippingElem) {
			anotherShipping = anotherShippingElem.parentElement;
			boxBilling.appendChild(anotherShipping);
		}
		boxContact.appendChild(boxAdditional);

		if (boxBilling) {
			let billingAddressH4 = boxBilling.querySelector("h4");

			if (csLang) {
				billingAddressH4.textContent = "Doručovací a fakturační adresa";
			}
			if (skLang) {
				billingAddressH4.textContent = "Doručovacia a fakturačná adresa";
			}
			if (plLang) {
				billingAddressH4.textContent = "Adresy dostawy i fakturowania";
			}
		}
	} catch (error) {
		console.error("There has been a problem with your query:", error);
	}
}

function rearangeRecap() {
	let checkoutSidebar = document.querySelector("#checkoutSidebar");
	if (!checkoutSidebar) return;

	recapTitle = checkoutSidebar.querySelector("h4");
	cartItems = checkoutSidebar.querySelectorAll(".cart-items");
	const recapWrapper = document.createElement("div");
	recapWrapper.classList.add("recap-wrapper");
	if (recapTitle) {
		recapWrapper.appendChild(recapTitle);
	}

	if (cartItems) {
		cartItems.forEach((item) => {
			if (item.querySelector(".recapitulation-single")) {
				if (!item.querySelector(".recapitulation-single").textContent.toUpperCase().includes("KUPON")) {
					return;
				} else {
					let summaryInner = document.querySelector("#checkoutSidebar .summary-inner");
					summaryInner.appendChild(item.querySelector(".recapitulation-single"));
				}
			}
			recapWrapper.appendChild(item);
		});
		checkoutSidebar.insertAdjacentElement("beforeBegin", recapWrapper);
	}
}

async function fetchImagesOfProductsInCart() {
	let itemNames = document.querySelectorAll(".cart-item .cart-item-name");
	if (!itemNames) return;

	itemNames.forEach(async (itemName) => {
		let productLink = itemName.querySelector("a");
		if (!productLink) return;

		const imageBlock = document.createElement("div");
		imageBlock.classList.add("image-block");
		itemName.prepend(imageBlock);

		let productUrl = productLink.href;

		try {
			let response = await fetch(productUrl);
			/* let response = await fetch(window.location.origin + productUrl); */

			if (!response.ok) throw new Error("Network response was not ok");

			let html = await response.text();

			// Parse the HTML string into a document
			let parser = new DOMParser();
			let doc = parser.parseFromString(html, "text/html");

			// Get the image element
			let img = doc.querySelector(".p-main-image > img");

			if (img) {
				// Clone the image so it can be used in the current DOM
				let newImg = document.createElement("img");
				newImg.src = img.src.replace("/big/", "/detail/");
				newImg.alt = img.alt || "";

				// Prepend to itemName
				itemName.querySelector(".image-block").append(newImg);
			}
		} catch (error) {
			console.error("There has been a problem with your fetch operation:", error);
		}
	});
}
