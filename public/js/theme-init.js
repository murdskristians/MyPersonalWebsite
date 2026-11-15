/* Resolves and applies the initial theme before first paint.
   External (not inline) because netlify.toml's CSP is script-src 'self'.
   Loaded synchronously in <head>; keep it tiny. */
(function () {
  var theme = null;
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') theme = saved;
  } catch (e) { /* storage blocked: fall through to OS preference */ }

  if (!theme) {
    theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  document.documentElement.setAttribute('data-theme', theme);

  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'light' ? '#f4f6f8' : '#262626');
})();
