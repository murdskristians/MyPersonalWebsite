<template>
	<button
		type="button"
		class="themeToggle"
		data-testid="theme-toggle"
		:aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
		@click.stop="toggle"
	>
		<svg v-if="theme === 'dark'" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
		</svg>
		<svg v-else viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
		</svg>
	</button>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useThemeStore } from '@/plugins/store'

export default {
	name: 'ThemeToggle',
	computed: {
		...mapState(useThemeStore, ['theme'])
	},
	methods: {
		...mapActions(useThemeStore, ['toggle'])
	}
}
</script>

<style lang="scss" scoped>
.themeToggle {
	position: fixed;
	top: 20px;
	left: 20px;
	z-index: 10;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 44px;
	height: 44px;
	padding: 0;
	cursor: pointer;

	color: var(--color-accent);
	background: var(--color-panel);
	border: 1px solid rgba(var(--accent-rgb), 0.55);
	border-radius: 50%;

	transition: background-color 250ms ease, color 250ms ease, border-color 250ms ease;

	&:hover {
		background: rgba(var(--accent-rgb), 0.18);
	}
	&:focus-visible {
		outline: 2px solid var(--color-accent) !important;
		outline-offset: 3px;
	}
}
</style>
