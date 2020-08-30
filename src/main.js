import Vue from "vue";
import router from "./plugins/router";
import store from "./plugins/store";
import st from "./plugins/st";
import AOS from 'aos'
import 'aos/dist/aos.css'

import App from "./App.vue";

Vue.config.productionTip = false;

//Globally register components that are used almost everywhere so we don't have to keep importing them.
import { GridContainer, GridRow, GridCol } from "./components/grid/";
Vue.component("GridContainer", GridContainer);
Vue.component("GridRow", GridRow);
Vue.component("GridCol", GridCol);

new Vue({
	created () {
		AOS.init()
	},
	// mounted() {
	// 	AOS.init({
	// 		disable: "mobile",
	// 		// Global settings:
	// 		debounceDelay: 50, // the delay on debounce used while resizing window (advanced)

	// 		// Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
	// 		once: false, // whether animation should happen only once - while scrolling down
	// 		mirror: true, // whether elements should animate out while scrolling past them
	// 	});
	// 	if (document.readyState == "complete") {
	// 		AOS.refresh();
	// 	}
	// },
	router,
	store,
	st,
	render: (h) => h(App),
}).$mount("#app");
