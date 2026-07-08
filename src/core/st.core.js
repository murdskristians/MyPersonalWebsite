export default class ST_Core {
	constructor() {
		//eslint-disable-next-line
		if (!!ST_Core.instance) {
			return ST_Core.instance;
		}

		ST_Core.instance = this;

		this.App = null;
		this.CurPage = null;

		return this;
	}

	// Vue 3 plugin install hook — expose this instance as `this.$st` on every component.
	install(app) {
		app.config.globalProperties.$st = this;
	}

	log(msg) {
		if (import.meta.env.DEV) {
			 
			console.log(msg);
		}
	}

	throttle(func, delay) {
		let prev = Date.now() - delay;
		return (...args) => {
			let cur = Date.now();
			if (cur - prev >= delay) {
				prev = cur;
				func.apply(null, args);
			}
		};
	}
}
