import ScrollReveal from 'scrollreveal'

/*
 * Vue 3 replacement for the (Vue 2-only) `vue-scroll-reveal` package.
 * Registers a `v-scroll-reveal` directive backed by the `scrollreveal` library.
 *
 * Usage mirrors the old plugin:
 *   v-scroll-reveal                      -> reveal with global defaults
 *   v-scroll-reveal="{ origin: 'top' }"  -> per-element option overrides
 *   v-scroll-reveal.reset                -> re-animate every time it re-enters the viewport
 */
export default {
	install(app, globalOptions = {}) {
		// `class` is applied to the element (not a ScrollReveal option), keep it separate.
		const { class: revealClass, ...defaults } = globalOptions;
		const sr = ScrollReveal();

		app.directive('scroll-reveal', {
			mounted(el, binding) {
				const options = { ...defaults, ...(binding.value || {}) };

				// The `.reset` modifier maps to ScrollReveal's `reset: true`.
				if (binding.modifiers.reset) {
					options.reset = true;
				}

				if (revealClass) {
					el.classList.add(revealClass);
				}

				sr.reveal(el, options);
			},
			unmounted(el) {
				// Best-effort cleanup so removed elements don't linger in ScrollReveal's store.
				try {
					sr.clean(el);
				} catch {
					// ignore — element was never revealed
				}
			}
		});
	}
};
