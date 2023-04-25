import { fileURLToPath, URL } from "node:url";

const fs = require('fs')
const path = require('path')
import { defineConfig } from 'vite'

const PAGES = fs.readdirSync('./pages');

const getInputs = () => {
	return PAGES.reduce((inputs, page) => {
		inputs[page.replace('.html', '')] = path.resolve(__dirname, `./pages/${page}`);

		return inputs;
	}, {});
}

const INPUTS = getInputs();


export default defineConfig({
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	base: '/cloud-maning/',
	build: {
		rollupOptions: {
			input: {
				home: path.resolve(__dirname, 'index.html'),
				...INPUTS
			},
		}
	}
});
