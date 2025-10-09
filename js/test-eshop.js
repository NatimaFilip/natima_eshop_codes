/* 
		if ($(".rc-parameter__header-right").length > 0) {
			let poboH2vTabulce = $(
				"#pobo-all-content .widget-projector .rc-parameter-small-left__box .rc-parameter__header-right"
			);

			poboH2vTabulce.each(function () {
				let poboH2vTabulceText = $(this).html();

			
				let characters = poboH2vTabulceText.split("");
				let whichHashtag = 0;
				for (var i = 0; i < characters.length; i++) {
					if (characters[i] === "#") {
						if (whichHashtag % 2 === 0) {
							characters[i] = "<b>";
						} else {
							characters[i] = "</b>";
						}
						whichHashtag = whichHashtag + 1;
					} else if (characters[i] === "$") {
						characters[i] = "</br>";
					}
				}
				// Join the array back into a string
				poboH2vTabulceText = characters.join("");
				$(this).replaceWith("<p class='rc-parameter__header-right'><span>" + poboH2vTabulceText + "</span></p>");
			});
		} */
