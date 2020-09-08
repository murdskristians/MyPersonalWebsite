import Vue from "vue";
import router from "./plugins/router";
import store from "./plugins/store";
import st from "./plugins/st";
import VueScrollReveal from 'vue-scroll-reveal';

import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(VueScrollReveal, {
	class: 'v-scroll-reveal', // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.
	duration: 1000,
	scale: 1,
	distance: '10px',
	mobile: false
});

//Globally register components that are used almost everywhere so we don't have to keep importing them.
import { GridContainer, GridRow, GridCol } from "./components/grid/";
Vue.component("GridContainer", GridContainer);
Vue.component("GridRow", GridRow);
Vue.component("GridCol", GridCol);

new Vue({
	router,
	store,
	st,
	render: (h) => h(App),
}).$mount("#app");
