import { defineStore } from 'pinia'

// Global UI state (Pinia is the recommended store for Vue 3).
export const useUiStore = defineStore('ui', {
	state: () => ({
		menuOpen: false
	}),
	actions: {
		setMenuOpen(value) {
			this.menuOpen = value;
		}
	}
});

const THEMES = ['dark', 'light'];

// Light/dark theme. The inline script in index.html sets data-theme before
// first paint; this store adopts it and persists only explicit user choices.
export const useThemeStore = defineStore('theme', {
	state: () => ({
		theme: 'dark'
	}),
	actions: {
		init() {
			const current = document.documentElement.dataset.theme;
			let theme = current;
			if (!THEMES.includes(theme)) {
				theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
			}
			this.apply(theme);
		},
		apply(theme) {
			this.theme = theme;
			document.documentElement.dataset.theme = theme;
			window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
		},
		toggle() {
			const next = this.theme === 'dark' ? 'light' : 'dark';
			this.apply(next);
			try {
				localStorage.setItem('theme', next);
			} catch {
				// Storage unavailable (private mode): the choice lasts for this session only.
			}
		}
	}
});
