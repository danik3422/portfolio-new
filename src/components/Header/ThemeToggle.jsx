import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const getSystemTheme = () =>
	window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const ThemeToggle = () => {
	const [theme, setTheme] = useState(() => {
		if (typeof window === 'undefined') return 'light'
		const savedTheme = window.localStorage.getItem('portfolio-theme')
		return savedTheme === 'dark' ? 'dark' : 'light'
	})

	useEffect(() => {
		const root = document.documentElement
		root.dataset.theme = theme
		root.classList.toggle('dark', theme === 'dark')
		window.localStorage.setItem('portfolio-theme', theme)
	}, [theme])

	useEffect(() => {
		const root = document.documentElement
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		if (window.localStorage.getItem('portfolio-theme')) return undefined

		const syncSystemTheme = () => {
			const systemTheme = getSystemTheme()
			setTheme(systemTheme)
			root.dataset.systemTheme = systemTheme
		}
		syncSystemTheme()
		mediaQuery.addEventListener('change', syncSystemTheme)
		return () => mediaQuery.removeEventListener('change', syncSystemTheme)
	}, [])

	const nextTheme = theme === 'dark' ? 'light' : 'dark'
	const icon = theme === 'dark' ? 'light_mode' : 'dark_mode'
	const label = `Switch to ${nextTheme} theme`

	return (
		<button
			type='button'
			className='grid h-8 w-8 place-items-center rounded-full bg-black/5 text-neutral-800 border border-black/5 transition-colors hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 dark:text-neutral-200 dark:border-white/10'
			aria-label={label}
			title={label}
			onClick={() => setTheme(nextTheme)}
		>
			<motion.span
				key={theme}
				initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
				animate={{ rotate: 0, scale: 1, opacity: 1 }}
				transition={{ duration: 0.2 }}
				className='material-symbols-rounded text-[18px]'
				aria-hidden='true'
			>
				{icon}
			</motion.span>
		</button>
	)
}

export default ThemeToggle
