import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

// @filename: index.js
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		vite: {
			resolve: {
				alias: {
					$src: path.resolve('./src')
				}
			}
		},
		adapter: adapter()
	}
};

export default config;
