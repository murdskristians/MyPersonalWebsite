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
