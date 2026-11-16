<template>
	<button id="st_themeToggle" type="button" :aria-label="label" @click="toggleTheme">
		<!-- The icon shows the current theme; the label names the action. -->
		<svg v-if="theme === 'dark'" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
			<circle cx="12" cy="12" r="4.5" fill="currentColor" />
			<g stroke="currentColor" stroke-width="2" stroke-linecap="round">
				<line x1="12" y1="1.5" x2="12" y2="4" />
				<line x1="12" y1="20" x2="12" y2="22.5" />
				<line x1="1.5" y1="12" x2="4" y2="12" />
				<line x1="20" y1="12" x2="22.5" y2="12" />
				<line x1="4.6" y1="4.6" x2="6.3" y2="6.3" />
				<line x1="17.7" y1="17.7" x2="19.4" y2="19.4" />
				<line x1="4.6" y1="19.4" x2="6.3" y2="17.7" />
				<line x1="17.7" y1="6.3" x2="19.4" y2="4.6" />
			</g>
		</svg>
		<svg v-else viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
			<path fill="currentColor" d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1z" />
		</svg>
	</button>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUiStore } from '@/plugins/store'

export default {
	name: 'ThemeToggle',
	computed: {
		...mapState(useUiStore, ['theme']),
		label() {
			return this.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
		}
	},
	methods: {
		...mapActions(useUiStore, ['toggleTheme'])
	}
}
</script>

<style lang="scss">
@use '../../styles/_globals' as *;

// Lives outside #page (next to HexNav) so it stays clickable while the menu
// is open. Bottom-left on small screens, where the open menu fans out across
// the top row; top-left once there is room.
#st_themeToggle {
	position: fixed;
	bottom: 16px;
	left: 16px;
	z-index: 10;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 48px;
	height: 48px;
	padding: 0;

	cursor: pointer;

	color: var(--c-accent);
	background: var(--c-toggle-bg);
	border: 1px solid rgba(var(--c-accent-rgb), 0.55);
	border-radius: 50%;

	@media only screen and (min-width: $breakpoint-m + $grid-gutters) {
		top: 24px;
		bottom: auto;
		left: 24px;
	}

	&:hover {
		border-color: var(--c-accent);
	}

	// The ID beats the global `outline: none !important` reset in App.vue.
	&:focus-visible {
		outline: 3px solid var(--c-accent) !important;
		outline-offset: 3px;
	}
}
</style>
