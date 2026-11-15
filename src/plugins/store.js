import { defineStore } from 'pinia'

const THEMES = ['dark', 'light'];
let transitionTimer = null;
let osListener = null;

function storedTheme() {
	try {
		const value = localStorage.getItem('theme');
		return THEMES.includes(value) ? value : null;
	} catch {
		return null; // blocked storage (private mode etc.)
	}
}

// Global UI state (Pinia is the recommended store for Vue 3).
export const useUiStore = defineStore('ui', {
	state: () => ({
		menuOpen: false,
		theme: 'dark'
	}),
	actions: {
		setMenuOpen(value) {
			this.menuOpen = value;
		},
		// The inline script in index.html sets data-theme before first paint, so
		// the attribute is the source of truth.
		initTheme() {
			const current = document.documentElement.dataset.theme;
			this.theme = THEMES.includes(current) ? current : 'dark';

			// Follow the OS live until the user makes an explicit choice.
			if (!osListener && window.matchMedia) {
				const query = window.matchMedia('(prefers-color-scheme: dark)');
				osListener = e => {
					if (!storedTheme()) {
						this.setTheme(e.matches ? 'dark' : 'light', false);
					}
				};
				query.addEventListener('change', osListener);
			}
		},
		setTheme(value, persist = true) {
			if (!THEMES.includes(value)) return;
			const root = document.documentElement;
			this.theme = value;

			root.classList.add('theme-transition');
			clearTimeout(transitionTimer);
			transitionTimer = setTimeout(() => root.classList.remove('theme-transition'), 300);
			root.dataset.theme = value;

			if (persist) {
				try {
					localStorage.setItem('theme', value);
				} catch {
					// Storage unavailable: the choice still applies for this session.
				}
			}
		},
		toggleTheme() {
			this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
		}
	}
});
