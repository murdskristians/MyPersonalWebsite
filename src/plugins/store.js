import { defineStore } from 'pinia'

const THEME_KEY = 'theme';
const TRANSITION_MS = 350;
let transitionTimer = null;

function currentTheme() {
	return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function hasSavedTheme() {
	try {
		const saved = localStorage.getItem(THEME_KEY);
		return saved === 'dark' || saved === 'light';
	} catch {
		return false;
	}
}

// Global UI state (Pinia is the recommended store for Vue 3).
export const useUiStore = defineStore('ui', {
	state: () => ({
		menuOpen: false,
		theme: currentTheme()
	}),
	actions: {
		setMenuOpen(value) {
			this.menuOpen = value;
		},
		// persist only for an explicit user choice; animate only when asked to.
		setTheme(value, persist = false, animate = false) {
			this.theme = value;
			const root = document.documentElement;
			if (animate) {
				root.setAttribute('data-theme-transition', '');
				clearTimeout(transitionTimer);
				transitionTimer = setTimeout(() => root.removeAttribute('data-theme-transition'), TRANSITION_MS);
			}
			root.dataset.theme = value;
			if (persist) {
				try {
					localStorage.setItem(THEME_KEY, value);
				} catch { /* storage blocked: theme still applies for this session */ }
			}
		},
		toggleTheme() {
			this.setTheme(this.theme === 'dark' ? 'light' : 'dark', true, true);
		},
		// Follow the OS live until the user makes an explicit choice.
		watchSystemTheme() {
			if (!window.matchMedia) return;
			const mq = window.matchMedia('(prefers-color-scheme: light)');
			mq.addEventListener('change', e => {
				if (!hasSavedTheme()) {
					this.setTheme(e.matches ? 'light' : 'dark', false, true);
				}
			});
		}
	}
});
