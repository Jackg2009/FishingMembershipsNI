import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteZip } from 'vite-plugin-zip-file'

export default defineConfig({
	plugins: [
		react(),
		viteZip({
			folderPath: './build',
			outPath: './build',
			zipName: `Build-${new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}.zip`,
		}),
	],
	server: { port: 3000 },
})