document.addEventListener("dkLabFavouriteProductsLoaded", function () {
	let headerFavoritesIcon = document.querySelector("#dkLabFavHeaderWrapper");
	let topNavTools = document.querySelector(".top-navigation-tools");
	if (headerFavoritesIcon && topNavTools) {
		topNavTools.prepend(headerFavoritesIcon);
	}

	if (document.body.classList.contains("type-product")) {
		let favoriteDiv = document.querySelector("#dkLabFavouriteDiv");
		let pImage = document.querySelector(".p-image");
		if (favoriteDiv && pImage) {
			pImage.appendChild(favoriteDiv);
		}
	}
});
