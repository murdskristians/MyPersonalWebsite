// Sets data-theme on <html> before the first paint: the saved choice if there
// is one, else the OS preference, else dark. It must stay a synchronous
// (no defer/async) script in <head> so the right colours apply from the first
// frame, and a self-hosted file because the CSP allows no inline scripts.
// It never writes to storage; only the theme toggle saves a choice.
(function () {
	var theme = null;
	try {
		theme = localStorage.getItem("theme");
	} catch (e) {
		// Storage blocked: fall through to the OS preference.
	}
	if (theme !== "light" && theme !== "dark") {
		theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
	}
	document.documentElement.setAttribute("data-theme", theme);
})();
