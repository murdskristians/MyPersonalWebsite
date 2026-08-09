// Loads the Roboto stylesheet without blocking first paint. A <link
// rel="stylesheet"> in <head> would block rendering until it downloads;
// injecting it here instead runs after the initial parse, so the page paints
// text in the fallback font immediately and swaps to Roboto once this loads
// (display=swap in the URL keeps that swap non-flashing).
(function () {
	var link = document.createElement("link");
	link.rel = "stylesheet";
	link.href = "https://fonts.googleapis.com/css2?family=Roboto&display=swap";
	document.head.appendChild(link);
})();
