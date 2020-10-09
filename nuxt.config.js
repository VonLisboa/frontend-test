
export default {
	mode: 'universal',
	/*
	 * Headers of the page
	 */
	head: {
		title: process.env.npm_package_name || '',
		titleTemplate: '%s - Test',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
		]
	},
	/*
	 * Plugins to load before mounting the App
	 */
	plugins: [
		//{src: '~/plugins/vue-notifications', ssr: false},
    	//{src: '~/plugins/vee-validate'},
	],

	future: {
		removeDeprecatedGapUtilities: true,
	},
	
	/*
	 * Nuxt.js dev-modules
	 */
	buildModules: [
		// Doc: https://github.com/nuxt-community/nuxt-tailwindcss
		'@nuxtjs/tailwindcss'
	],

	/*
	 * Nuxt.js modules
	 */
	modules: [
		['nuxt-vuex-localstorage', {
			mode: 'debug',
			localStorage: ['listElements'] 
		}]
	],

	/*
	 * Build configuration
	 */
	build: {
		/*
		 * You can extend webpack config here
		 */
		transpile: [
			'nuxt-vuex-localstorage'
		],
		extend (config, ctx) {
		}
	}
}
