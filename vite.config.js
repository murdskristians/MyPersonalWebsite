import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		// Ensure a single instance of these is shared app-wide. Under pnpm's strict
		// node_modules, Vite's dev pre-bundling can otherwise give vue-router/pinia a
		// different `vue` instance than the app, so <router-view> silently renders nothing.
		dedupe: ['vue', 'vue-router', 'pinia'],
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	optimizeDeps: {
		include: ['vue', 'vue-router', 'pinia', 'chart.js', 'vue-chartjs', 'scrollreveal', 'decimal.js']
	},
	server: {
		port: 8080
	}
})
