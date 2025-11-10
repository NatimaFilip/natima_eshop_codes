// Save the original userAgent
const originalUserAgent = navigator.userAgent;
const originalScreenWidth = window.screen.width;

// Override the userAgent
Object.defineProperty(navigator, "userAgent", {
	value:
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
	writable: true,
});

Object.defineProperty(window.screen, "width", {
	get: function () {
		return 1920;
	},
});

window.getDeviceType = function () {
	return "desktop";
};

// Execute your script
var _hwq = _hwq || [];
_hwq.push(["setKey", "FF90AA48811B562F9CE0FE5B4328FC41"]);
_hwq.push(["showWidget", "11", "71751", "Natima", "natima-cz"]);
(function () {
	var ho = document.createElement("script");
	ho.type = "text/javascript";
	ho.async = true;
	ho.src = "https://cz.im9.cz/direct/i/gjs.php?n=wdgt&sak=FF90AA48811B562F9CE0FE5B4328FC41";

	ho.onload = function () {
		// Restore the original userAgent after the script is loaded
		Object.defineProperty(navigator, "userAgent", {
			value: originalUserAgent ? originalUserAgent : "",
			writable: false,
		});
		Object.defineProperty(window.screen, "width", {
			get: function () {
				return originalScreenWidth;
			},
		});
	};

	// Restore the original userAgent on error
	ho.onerror = function () {
		console.error("Failed to load the script.");
		Object.defineProperty(navigator, "userAgent", {
			value: originalUserAgent ? originalUserAgent : "",
			writable: false,
		});
	};

	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(ho, s);
})();
