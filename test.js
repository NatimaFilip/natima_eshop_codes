if (document.body.classList.contains("in-index")) {
	carouselSlider();
}

function carouselSlider() {
	let scrolledAmount = 0;
	let carousel = document.querySelector("#carousel");
	if (!carousel) {
		console.warn("Carousel element not found");
		return;
	}
	let carouselItems = carousel.querySelectorAll(".item");
	if (!carouselItems || carouselItems.length === 0) {
		console.warn("No carousel items found");
		return;
	}

	let totalCarouselItems = carouselItems.length;
	let carouselItemWidth = window.getComputedStyle(carouselItems[0]).getPropertyValue("flex-basis");
	let carouselItemWidthFloat = parseFloat(carouselItemWidth); // Extracts the numeric value as a float

	let visibleItems = Math.round(100 / carouselItemWidthFloat);

	let carouselControlLeft = carousel.querySelector(".carousel-control.left");
	let carouselControlRight = carousel.querySelector(".carousel-control.right");

	if (carouselControlLeft) {
		carouselControlLeft.classList.add("display-none");
		carouselControlLeft.removeAttribute("href");

		carouselControlLeft.addEventListener("click", function () {
			scrolledAmount = Math.max(scrolledAmount - 1, 0);
			carouselItems.forEach((item) => {
				carouselControlRight.classList.remove("display-none");
				if (scrolledAmount <= 0) {
					item.style.transform = "translateX(0)";
					carouselControlLeft.classList.add("display-none");
				} else {
					item.style.transform = "translateX(-" + 100 * scrolledAmount + "%)";
				}
			});
		});
	}

	if (carouselControlRight) {
		if (totalCarouselItems <= visibleItems) {
			carouselControlRight.classList.add("display-none");
		}
		carouselControlRight.removeAttribute("href");
		carouselControlRight.addEventListener("click", function () {
			scrolledAmount = Math.min(scrolledAmount + 1, totalCarouselItems - visibleItems);
			carouselItems.forEach((item) => {
				carouselControlLeft.classList.remove("display-none");
				if (scrolledAmount >= totalCarouselItems - visibleItems) {
					item.style.transform = "translateX(-" + 100 * (totalCarouselItems - visibleItems) + "%)";
					carouselControlRight.classList.add("display-none");
				} else {
					item.style.transform = "translateX(-" + 100 * scrolledAmount + "%)";
				}
			});
		});
	}
}
