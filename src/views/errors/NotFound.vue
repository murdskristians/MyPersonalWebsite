<template>
	<div data-page="NotFound">
		<GridContainer class="st_fullPageContainer">
			<GridRow>
				<GridCol :small="12">
					<h1 id="heroTitle">Oh no!</h1>
					<h2 id="heroSummary">The page at the location: "{{ notFoundPath }}" could not be found!</h2>
					<a id="heroReturn" @click="gotoPage('/')" class="st_hexButton">go home</a>
				</GridCol>
			</GridRow>
		</GridContainer>
	</div>
</template>

<script>
export default {
	name: 'NotFound',
	computed: {
		notFoundPath() {
			const p = this.$route.params.pathMatch;
			return '/' + (Array.isArray(p) ? p.join('/') : (p || ''));
		}
	},
	mounted: function() {
		this.$st.CurPage = this;
	},
	methods: {
		gotoPage: function(path) {
			this.$router.push(path);
		}
	}
}
</script>

<style lang="scss">
@use "../../styles/_globals" as *;

#page[data-page="NotFound"] {
	#heroTitle {
		font-size: 2rem;

		@media only screen and (min-width: $breakpoint-m + $grid-gutters) {
			font-size: 4rem;
		}
	}
	#heroSummary {
		margin-top: 20px;
		font-size: 1.5rem;

		@media only screen and (min-width: $breakpoint-m + $grid-gutters) {
			font-size: 2rem;
		}
	}
	#heroReturn {
		margin-top: 40px;
	}
}
</style>
