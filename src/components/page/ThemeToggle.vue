<template>
	<button
		type="button"
		class="theme-toggle"
		data-testid="theme-toggle"
		:aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
		@click.stop="toggleTheme"
	>
		<svg v-if="theme === 'dark'" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
		</svg>
		<svg v-else viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
		</svg>
	</button>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUiStore } from '@/plugins/store'

export default {
	name: 'ThemeToggle',
	computed: {
		...mapState(useUiStore, ['theme'])
	},
	methods: {
		...mapActions(useUiStore, ['toggleTheme'])
	}
}
</script>

<style lang="scss">
@use '../../styles/_globals' as *;

.theme-toggle {
	position: fixed;
	top: 10px;
	left: 16px;
	z-index: 10;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 44px;
	height: 44px;
	padding: 0;

	cursor: pointer;

	color: var(--toggle-icon);
	background: var(--toggle-bg);
	border: 1px solid var(--toggle-border);
	border-radius: 50%;

	// The global outline reset kills outlines, so the focus ring is a box-shadow.
	&:focus-visible {
		box-shadow: 0 0 0 3px var(--bg), 0 0 0 5px var(--accent);
	}

	@media only screen and (max-width: $breakpoint-m + $grid-gutters) {
		left: 8px;
	}
}
</style>
