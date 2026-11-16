import { defineStore } from 'pinia'

// public/js/theme-init.js has already set data-theme on <html> before the app
// loads (saved choice, else the OS preference), so the store starts from it.
function initialTheme() {
	const theme = document.documentElement.getAttribute('data-theme');
	return theme === 'light' || theme === 'dark' ? theme : 'dark';
}

// Global UI state (Pinia is the recommended store for Vue 3).
export const useUiStore = defineStore('ui', {
	state: () => ({
		menuOpen: false,
		theme: initialTheme()
	}),
	actions: {
		setMenuOpen(value) {
			this.menuOpen = value;
		},
		setTheme(value) {
			this.theme = value;
			document.documentElement.setAttribute('data-theme', value);
			try {
				localStorage.setItem('theme', value);
			} catch {
				// Storage blocked: the choice just won't survive a reload.
			}
		},
		toggleTheme() {
			this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
		}
	}
});
