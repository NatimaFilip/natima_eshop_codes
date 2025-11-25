/* document.addEventListener("DOMContentLoaded", function () {
	if (document.querySelector("body").classList.contains("type-product")) {
		let tabsWrapper = document.querySelector(".p-detail-tabs-wrapper");
		if (tabsWrapper) {
			const productBottomBlockDiv = document.createElement("div");
			productBottomBlockDiv.classList.add("product-bottom-block");
			productBottomBlockDiv.innerHTML = `
		<h4>
		"Zálezí nám na tom, aby nákup u nás byl stejně spoléhlivý jako vaše práce v dílně."
		</h4>
		<div class="product-bottom-block-grid">
	<div class="product-bottom-block-image">
		<img src="/product-bottom-block-tomas-kyselka.webp" alt="Tomáš Kyselka" width="557" height="786" loading="lazy"
			fetchpriority="low">
		<div class="product-bottom-block-image-text">
			<span class="product-bottom-block-image-text-name">Tomáš Kyselka</span>
			<span class="product-bottom-block-image-text-owner">Majitel a garant spokojenosti</span>
		</div>
	</div>
	<div class="product-bottom-block-texts">
		<ul>
			<li><b>Většinu zboží máme skutečně skladem</b> – žádný dropshipping, žádné čekání. Objednávky přijaté do
				15:00 odesíláme ještě ten samý den, <b>takže se můžete pustit do práce bez zbytečných prodlev.</b></li>
			<li><b>Když se přece jen něco pokazí, neotáčíme se zády.</b> Reklamace řešíme rychle, jednoduše a se svozem
				zdarma – stačí nahlásit problém a zbytek už necháte na nás.</li>
			<li><b>Na nákup se u nás můžete spolehnout bez obav.</b> Na vrácení nebo výměnu zboží máte celých 90 dní, a
				to s dopravou zdarma. Chceme, abyste byli spokojení a měli jistotu, že vám vše perfektně sedne. </li>
			<li><b>A pokud nakupujete na IČO, máme pro vás speciální výhody</b> – férové ceny, snadnou fakturaci i
				individuální přístup.</li>
		</ul>
		<p class="product-bottom-block-last-text">Za všechno, co děláme, ručím osobně.</p>
	</div>
	</div>
		`;

			tabsWrapper.parentNode.insertBefore(productBottomBlockDiv, tabsWrapper.nextSibling);
		}
	}
});


.product-bottom-block {
    background: #f8f8f8;
    border: 1px solid #dfdddd;
    border-radius: 5px;
    padding: 20px;
}
.product-bottom-block h4 {
    color: var(--color-primary);
    text-align: center;
    padding: 10px 0;
    font-size: 20px;
}
.product-bottom-block-grid {
    display: grid;
    grid-template-columns: 25% 75%;
}

.product-bottom-block-texts {
    padding: 0 5% 0 20px;
}

.product-bottom-block-texts ul {
    list-style: none;
    padding: 0;
}
.product-bottom-block-texts li {
    padding: 5px 0 5px 30px;
    position: relative;
}
.product-bottom-block-texts li::before {
    content: "x";
    position: absolute;
    width: 25px;
    height: 18px;
    left: 0;
    top: 3px;
    background: url("https://632262.myshoptet.com/user/product-bottom-block/product-bottom-block-checkmark.webp");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}
.product-bottom-block-image {
    position: relative;
}
.product-bottom-block-image-text {
    position: absolute;
    background: url("https://632262.myshoptet.com/user/product-bottom-block/product-bottom-block-bg.svg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    font-size: 18px;
    line-height: 1.4;
    padding: 10px;
    left: -20px;
    bottom: 20px;

}

.product-bottom-block-image-text-name {
    font-weight: 700;
}
.product-bottom-block-image-text-owner {
    color: white;
}
 */
