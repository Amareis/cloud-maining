import { fileURLToPath, URL } from "node:url";

const path = require('path')
import { defineConfig } from 'vite'

export default defineConfig({
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	build: {
		rollupOptions: {
			input: {
				home: path.resolve(__dirname, 'index.html'),
			},
		}
	},
});
