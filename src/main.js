import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./plugins/router";
import st from "./plugins/st";
import VueScrollReveal from "./plugins/scroll-reveal";

import App from "./App.vue";

//Globally register components that are used almost everywhere so we don't have to keep importing them.
import { GridContainer, GridRow, GridCol } from "./components/grid/";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(st);
app.use(VueScrollReveal, {
	class: "v-scroll-reveal", // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.
	duration: 1000,
	scale: 1,
	distance: "10px",
	mobile: false
});

app.component("GridContainer", GridContainer);
app.component("GridRow", GridRow);
app.component("GridCol", GridCol);

app.mount("#app");
