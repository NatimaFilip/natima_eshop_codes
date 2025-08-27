if (body.classList.contains("id--9")) {
	sidebarEdit();
	giftEdit();
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
}
