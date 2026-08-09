<template>
	<div class="st_pageScroller" @click="$emit('click')" :class="{ flip : flip, hideOnMobile : hideOnMobile }">
		<img class="carrot" src="../../assets/images/icons/carrot-down.svg" alt="">
		<img class="carrot" src="../../assets/images/icons/carrot-down.svg" alt="">
		<img class="carrot" src="../../assets/images/icons/carrot-down.svg" alt="">
	</div>
</template>

<script>
export default {
	name: 'PageScroller',
	props: {
		flip: {
			type: Boolean,
			default: false
		},
		hideOnMobile: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style lang="scss">
@use "../../styles/_globals" as *;

.st_pageScroller {
	position: relative;
	top: -64px;
	left: 50%;
	width: 64px;
	height: 64px;

	cursor: pointer;

	transform: translateX(-50%);

	&.hideOnMobile {
		display: none;

		@media only screen and (min-width: $breakpoint-m + $grid-gutters) {
			display: block;
		}
	}

	&.flip {
		transform: rotate(180deg);
	}

	> .carrot {
		display: block;
		position: absolute;
		opacity: 0;
		bottom: 100%;
		left: -2px;
		width: 100%;
		height: 100%;

		animation: scrollerCarrot 2s linear infinite;

		&:nth-of-type(1) {
			animation-delay: 0;
		}
		&:nth-of-type(2) {
			animation-delay: 400ms;
		}
		&:nth-of-type(3) {
			animation-delay: 800ms;
		}
	}
}

// Animates transform instead of bottom (same visual motion — .carrot's
// resting "bottom: 100%" is the 0% baseline transform gets offset from, and
// since each carrot's own height equals its container's, translateY(%) and
// the old bottom(%) deltas land on the same pixel amounts) so the browser
// can run it on the compositor instead of laying out every frame.
@keyframes scrollerCarrot {
	0% {
		transform: translateY(30%);
		opacity: 0;
	}
	20% {
		opacity: 1;
	}
	50% {
		transform: translateY(80%);
		opacity: 1;
	}
	80% {
		opacity: 1;
	}
	100% {
		transform: translateY(130%);
		opacity: 0;
	}
}
</style>
