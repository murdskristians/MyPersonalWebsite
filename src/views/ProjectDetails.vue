<template>
	<div data-page="ProjectDetails">
		<!-- YIP is a bespoke interactive project page; everything else is a
		     data-driven case study rendered by the shared CaseStudy component. -->
		<component v-if="curProjectId === 'yip'" id="project" v-bind:is="curProjectId" />
		<CaseStudy v-else-if="caseStudy" id="project" :data="caseStudy" />
	</div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import CaseStudy from './projects/CaseStudy.vue'
import { caseStudies } from './projects/caseStudies.js'

export default {
	name: 'ProjectDetails',
	components: {
		CaseStudy,
		'yip': defineAsyncComponent(() => import('./projects/YIP.vue'))
	},
	data() {
		return {
			curProjectId: "",
			caseStudy: null
		}
	},
	mounted: function() {
		this.$st.CurPage = this;
		this.$nextTick(this.init);
	},
	watch: {
		'$route' (to) {
			this.setCurrentProject(to.params.id);
		}
	},
	methods: {
		init: function() {
			this.setCurrentProject(this.$route.params.id);
		},
		setCurrentProject(id) {
			let safeId = id.replace(/[^0-9a-zA-Z.,_-]+/g, "");
			this.curProjectId = "";
			this.caseStudy = null;
			if (safeId === "yip") {
				this.curProjectId = "yip";
			} else if (caseStudies[safeId]) {
				this.caseStudy = caseStudies[safeId];
			} else {
				this.$router.push({ name : 'NotFound', params : { pathMatch : ['projects', safeId] }});
			}
		}
	}
}
</script>

<style lang="scss">
@use "../styles/_globals" as *;

#page[data-page="ProjectDetails"] {
	#project {
		margin-top: 60px;
	}
	#projectTitle {
		font-size: 2rem;

		@media only screen and (min-width: $breakpoint-m + $grid-gutters) {
			font-size: 4rem;
		}
	}
}
</style>
