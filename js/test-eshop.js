let carousel = document.querySelector("#carousel");
if (carousel) {
	carousel.classList.add("test-element");
}

let carouselInner = document.querySelector(".carousel-inner");
let carouselItems = document.querySelectorAll("#carousel .item");

inicializeSliderElement(carousel, carouselInner, carouselItems, false);

let productsBlock = document.querySelectorAll(".products-block");

productsBlock.forEach((block) => {
	let productsBlockItems = block.querySelectorAll(".product");
	inicializeSliderElement(null, block, productsBlockItems, false);
});

/* function inicializeSliderElement(sliderWrapper, sliderParent, sliderItem, hasDifferentDimensions) {
	if (!sliderWrapper || !sliderParent || !sliderItem || sliderItem.length === 0) {
		console.warn("inicializeSliderElement has been tried to be initialized with invalid parameters.");
		return;
	}

	function createControls() {
		let initialControls = sliderWrapper.querySelectorAll(".carousel-control");
		if (initialControls && initialControls.length > 0) {
			initialControls.forEach((control) => control.remove());
		}

		const leftControl = document.createElement("div");
		leftControl.classList.add("carousel-control", "left");
		leftControl.setAttribute("role", "button");
		leftControl.setAttribute("data-slide", "prev");

		const rightControl = document.createElement("div");
		rightControl.classList.add("carousel-control", "right");
		rightControl.setAttribute("role", "button");
		rightControl.setAttribute("data-slide", "next");

		sliderWrapper.appendChild(leftControl);
		sliderWrapper.appendChild(rightControl);

		leftControl.addEventListener("click", () => slide("left"));
		rightControl.addEventListener("click", () => slide("right"));
	}
	createControls();
	function slide(direction) {
		if (sliderParent.classList.contains("sliding")) {
			return;
		}
		sliderParent.classList.add("sliding");

		// Amount to scroll (e.g., width of one item or a fixed px value)
		const scrollAmount = sliderParent.querySelector(".item")?.offsetWidth || 200;

		if (direction === "left") {
			sliderParent.scrollTo({
				left: sliderParent.scrollLeft - scrollAmount,
				behavior: "smooth",
			});
		} else if (direction === "right") {
			sliderParent.scrollTo({
				left: sliderParent.scrollLeft + scrollAmount,
				behavior: "smooth",
			});
		}

		// Remove the "sliding" class after scroll (optional, for animation)
		setTimeout(() => {
			sliderParent.classList.remove("sliding");
		}, 300); // adjust timeout as needed
	}

	// on grab add .grabbing class and scroll with mouse move
	let isDragging = false;
	let startX;
	let scrollLeft;
	sliderWrapper.addEventListener("mousedown", (e) => {
		isDragging = true;
		sliderParent.classList.add("grabbing");
		startX = e.pageX - sliderParent.offsetLeft;
		scrollLeft = sliderParent.scrollLeft;
	});
	sliderWrapper.addEventListener("mouseleave", () => {
		isDragging = false;
		sliderParent.classList.remove("grabbing");
	});
	sliderWrapper.addEventListener("mouseup", () => {
		isDragging = false;
		sliderParent.classList.remove("grabbing");
	});
} */

function inicializeSliderElement(sliderWrapper, sliderParent, sliderItem, hasDifferentDimensions) {
	if (!sliderParent || !sliderItem || sliderItem.length === 0) {
		console.warn("inicializeSliderElement has been tried to be initialized with invalid parameters.");
		return;
	}

	if (!sliderWrapper) {
		const sliderWrapperElement = document.createElement("div");
		sliderWrapperElement.classList.add("slider-custom-wrapper");
		sliderParent.parentNode.insertBefore(sliderWrapperElement, sliderParent);
		sliderWrapperElement.appendChild(sliderParent);
		sliderWrapper = sliderWrapperElement;
	}

	createControls();
	enableDragging();

	function createControls() {
		let initialControls = sliderWrapper.querySelectorAll(".carousel-control");
		if (initialControls && initialControls.length > 0) {
			initialControls.forEach((control) => control.remove());
		}

		const leftControl = document.createElement("div");
		leftControl.classList.add("carousel-control", "left", "hidden-control");
		leftControl.setAttribute("role", "button");
		leftControl.setAttribute("data-slide", "prev");

		const rightControl = document.createElement("div");
		rightControl.classList.add("carousel-control", "right");
		rightControl.setAttribute("role", "button");
		rightControl.setAttribute("data-slide", "next");

		sliderWrapper.appendChild(leftControl);
		sliderWrapper.appendChild(rightControl);

		leftControl.addEventListener("click", () => slide("left"));
		rightControl.addEventListener("click", () => slide("right"));

		setTopPositionOfControls();
		document.addEventListener("DOMContentLoaded", setTopPositionOfControls);
		window.addEventListener("resize", setTopPositionOfControls);

		function setTopPositionOfControls() {
			const heightOfItem = sliderItem[1].querySelector("a")?.offsetHeight || 0;
			leftControl.style.top = heightOfItem / 2 + "px";
			rightControl.style.top = heightOfItem / 2 + "px";
			console.log("heightOfItem", heightOfItem);
		}
	}

	function slide(direction) {
		if (sliderParent.classList.contains("sliding")) return;
		sliderParent.classList.add("sliding");

		const numberOfItems = parseInt(getComputedStyle(sliderWrapper).getPropertyValue("--number-of-items")) || 1;
		const gapValue = parseInt(getComputedStyle(sliderWrapper).getPropertyValue("--gap")) || 0;
		const largeItemMultiplier =
			parseFloat(getComputedStyle(sliderWrapper).getPropertyValue("--width-multiplier-of-1st-item")) - 1 || 0;

		const scrollAmount =
			sliderItem[1]?.offsetWidth * numberOfItems + gapValue * (numberOfItems - largeItemMultiplier) || 200;

		const to = direction === "left" ? sliderParent.scrollLeft - scrollAmount : sliderParent.scrollLeft + scrollAmount;

		sliderParent.scrollTo({ left: to, behavior: "smooth" });

		setTimeout(() => {
			sliderParent.classList.remove("sliding");
		}, 300);
	}

	function enableDragging() {
		let isDragging = false;
		let startX = 0;
		let startScrollLeft = 0;
		let moved = false;
		let activePointerId = null;
		let moveThreshold = 5; // px

		// Start drag
		const onPointerDown = (e) => {
			// Only primary button if mouse
			if (e.pointerType === "mouse" && e.button !== 0) return;

			isDragging = true;
			moved = false;
			activePointerId = e.pointerId;

			startX = e.clientX;
			startScrollLeft = sliderParent.scrollLeft;

			sliderParent.classList.add("grabbing");

			// Attach move/up/cancel to window for robust dragging
			window.addEventListener("pointermove", onPointerMove);
			window.addEventListener("pointerup", endDrag);
			window.addEventListener("pointercancel", endDrag);
			window.addEventListener("pointerleave", endDrag);
		};

		// Drag move
		const onPointerMove = (e) => {
			if (!isDragging || e.pointerId !== activePointerId) return;

			const dx = e.clientX - startX;
			if (Math.abs(dx) > moveThreshold) moved = true;
			sliderParent.scrollLeft = startScrollLeft - dx;

			e.preventDefault();
		};

		// End/cancel drag
		const endDrag = (e) => {
			if (e && activePointerId !== null && e.pointerId !== activePointerId) return;
			isDragging = false;
			activePointerId = null;
			sliderParent.classList.remove("grabbing");

			window.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("pointerup", endDrag);
			window.removeEventListener("pointercancel", endDrag);
			window.removeEventListener("pointerleave", endDrag);
		};

		// Suppress clicks if a drag happened (avoids accidental link/card clicks)
		const onClick = (e) => {
			if (moved) {
				e.preventDefault();
				e.stopPropagation();
				moved = false; // reset
			}
		};

		// Attach pointerdown to sliderWrapper so dragging works from wrapper or any child
		sliderWrapper.addEventListener("pointerdown", onPointerDown);
		sliderParent.addEventListener("click", onClick);

		function removeHiddenControl(element) {
			element.classList.remove("hidden-control");
		}
		function addHiddenControl(element) {
			element.classList.add("hidden-control");
		}

		let leftControl = sliderWrapper.querySelector(".carousel-control.left");
		let rightControl = sliderWrapper.querySelector(".carousel-control.right");
		if (leftControl && rightControl) {
			sliderParent.addEventListener("scroll", () => {
				if (sliderParent.scrollLeft <= 0) {
					addHiddenControl(leftControl);
				} else {
					removeHiddenControl(leftControl);
				}

				if (sliderParent.scrollLeft >= sliderParent.scrollWidth - sliderParent.clientWidth - 1) {
					addHiddenControl(rightControl);
				} else {
					removeHiddenControl(rightControl);
				}
			});
		}
	}
}
