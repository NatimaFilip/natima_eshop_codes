/* let vanocniBalickyKody = [
	"VB-001",
	"VB-002",
	"VB-003",
	"VB-004",
	"VB-005",
	"VB-006",
	"VB-007",
	"VB-008",
	"VB-009",
	"VB-010",
	"VB-011",
	"VB-012",
	"VB-013",
	"VB-014",
	"VB-015",
	"VB-016",
	"VB-017",
	"VB-018",
	"VB-019",
	"VB-020",
	"VBK-AZPM",
	"VBK-BK",
	"VBK-CK",
	"VBK-EC",
	"VBK-EDPM",
	"VBK-CHPS",
	"VBK-KR",
	"VBK-LP",
	"VBK-PKK",
	"VBK-POAVV",
	"VBK-PSAZV",
	"VBK-RK",
	"VBK-SSPM",
	"VBK-TEPM",
];

let pocetVanocnichBalicku = 0;

// Get all cart-item elements
const cartItems = document.querySelectorAll('.cart-item');

cartItems.forEach(item => {
    const sku = item.getAttribute('data-micro-sku');
    if (vanocniBalickyKody.includes(sku)) {
        const amountElem = item.querySelector('.cart-item-amount');
        if (amountElem) {
            const amount = parseInt(amountElem.textContent, 10);
            if (!isNaN(amount)) {
                pocetVanocnichBalicku += amount;
            }
        }
    }
});

console.log("Celkem vánočních balíčků:", pocetVanocnichBalicku);
if (pocetVanocnichBalicku > 2) {
	let zasilkovnaElement = document.querySelector("#shipping-32 .payment-info");
	if (zasilkovnaElement) {
		const warningMessage = document.createElement("p");
		warningMessage.innerHTML = "<b>POZOR</b>: Vaše objednávka se <b>nevleze do Z-BOXU!</b> Při volbě Z-BOXU bude Vaše objednávka přesměrována na nejbližší odběrné místo Zásilkovny.";
		warningMessage.classList.add("warning-message");
		zasilkovnaElement.appendChild(warningMessage);
	}

	let dpdPickupElement = document.querySelector("#shipping-35 .payment-info");
	if (dpdPickupElement) {
		const warningMessage = document.createElement("p");
		warningMessage.innerHTML = "<b>POZOR</b>: Vaše objednávka se <b>nevleze do výdejních boxů!</b> Při volbě výdejního boxu bude Vaše objednávka přesměrována na nejbližší fyzické odběrné místo.";
		warningMessage.classList.add("warning-message");
		dpdPickupElement.appendChild(warningMessage);
	}
}

 */
