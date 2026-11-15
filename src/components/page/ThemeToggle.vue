<template>
	<button
		type="button"
		class="theme-toggle"
		data-testid="theme-toggle"
		:aria-label="label"
		:title="label"
		@click.stop="toggleTheme"
	>
		<!-- Sun in dark mode, moon in light mode -->
		<svg v-if="theme === 'dark'" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
			<circle cx="12" cy="12" r="4" fill="currentColor" />
			<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
		</svg>
		<svg v-else viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
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

<style lang="scss" scoped>
@use "../../styles/_globals" as *;

// Top-left so it never collides with the hex menu (top-right), which fans out
// to the left on mobile. Above #page, which sits at z-index 2 inside #app.
.theme-toggle {
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 10px;
	left: 16px;
	z-index: 10;
	width: 44px;
	height: 44px;
	padding: 0;

	cursor: pointer;

	color: var(--text);
	background: var(--surface);
	border: 1px solid var(--line-strong);
	border-radius: 50%;

	@media only screen and (min-width: $breakpoint-m + $grid-gutters) {
		top: 60px;
		left: 70px;
	}

	&:hover {
		color: var(--accent);
		border-color: var(--accent);
	}
}
</style>
