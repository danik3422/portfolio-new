/** @type {import('tailwindcss').Config} */

import tailwindScrollbar from 'tailwind-scrollbar'

export default {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['DM Sans', 'sans-serif'],
				display: ['Manrope', 'sans-serif'],
			},
		},
	},
	plugins: [tailwindScrollbar],
}
