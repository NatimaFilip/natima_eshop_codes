/* document.addEventListener("DOMContentLoaded", function () {
	kioskMode();
	if (body.classList.contains("id--16")) {
		selectOsobniOdberKisokMode();
		function selectOsobniOdberKisokMode() {
			if (document.body.classList.contains("kioskmode")) {
				let osobniOdberDeliveryInput = document.querySelector("#shipping-4");
				if (osobniOdberDeliveryInput) {
					document.addEventListener(
						"ShoptetBillingMethodUpdated",
						function () {
							let osobniOdberPaymentInput = document.querySelector(".radio-wrapper[data-id='billing-164']");
							setTimeout(() => {
								if (osobniOdberPaymentInput) {
									osobniOdberPaymentInput.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
								}
							}, 100);
						},
						{ once: true },
					);

					osobniOdberDeliveryInput.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
				}
			}
		}
	}
});
 */
