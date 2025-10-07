document.addEventListener("dkLabFavouriteProductsLoaded", function () {
	let favoriteDiv = document.querySelector("#dkLabFavouriteDiv");

	let pImage = document.querySelector(".p-image");

	if (favoriteDiv && pImage) {
		pImage.appendChild(favoriteDiv);
	}
});
