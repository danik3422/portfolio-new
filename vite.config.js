import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

// Manually recreate __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@images': path.resolve(__dirname, 'src/images'),
		},
	},
	plugins: [react()],
})
