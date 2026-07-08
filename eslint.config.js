import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
	{
		ignores: ['dist/**', 'node_modules/**', 'public/js/**']
	},
	js.configs.recommended,
	...pluginVue.configs['flat/essential'],
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				THREE: 'readonly'
			}
		},
		rules: {
			// The codebase mixes tabs and 2-space indentation across files;
			// don't fail lint on style, focus on real problems.
			'no-unused-vars': 'warn',
			'vue/multi-word-component-names': 'off',
			'vue/no-reserved-component-names': 'off'
		}
	}
]
