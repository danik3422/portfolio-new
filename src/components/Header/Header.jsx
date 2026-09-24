import logo from '@images/logo.svg'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { LiquidGlassSurface } from '../Common/LiquidGlassSurface'
import Navbar from '../Navbar/Navbar'
import ThemeToggle from './ThemeToggle'

const Header = () => {
	const [navOpen, setNavOpen] = useState(false)
	const [activeSection, setActiveSection] = useState('home')
	const menuRef = useRef(null)

	useEffect(() => {
		if (!navOpen) return
		const closeOnOutsideTap = (event) => {
			if (!menuRef.current?.contains(event.target)) setNavOpen(false)
		}
		document.addEventListener('pointerdown', closeOnOutsideTap)
		return () => document.removeEventListener('pointerdown', closeOnOutsideTap)
	}, [navOpen])

	useEffect(() => {
		const closeOnEscape = (event) => {
			if (event.key === 'Escape') setNavOpen(false)
		}
		window.addEventListener('keydown', closeOnEscape)
		return () => window.removeEventListener('keydown', closeOnEscape)
	}, [])

	return (
		<motion.header
			className='fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none'
			initial={{ y: -12, opacity: 1 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ type: 'spring', stiffness: 220, damping: 22 }}
		>
			<div
				className='relative pointer-events-auto w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2 rounded-full overflow-hidden bg-white/70 dark:bg-neutral-900/60 backdrop-blur-2xl backdrop-saturate-[180%] border border-white/80 dark:border-white/10 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_16px_40px_-10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] transform-gpu will-change-transform mobile-island'
			>
				<LiquidGlassSurface className='-z-10' />
				<div className='relative z-10 flex items-center justify-between w-full'>
				<h1>
					<a href='/' className='logo logo-lockup'>
						<img src={logo} width={40} height={40} alt='Danylo Syloats home' />
					</a>
				</h1>

				<div
					ref={menuRef}
					className='site-header-menu relative min-w-0 ml-auto md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2'
				>
					<button
						type='button'
						aria-label={
							navOpen ? 'Close navigation menu' : 'Open navigation menu'
						}
						aria-expanded={navOpen}
						aria-controls='primary-navigation'
						className='menu-btn md:hidden'
						onClick={() => setNavOpen((prev) => !prev)}
					>
						<span className='material-symbols-rounded'>
							{navOpen ? 'close' : 'menu'}
						</span>
					</button>

					<Navbar
						navOpen={navOpen}
						onNavigate={() => setNavOpen(false)}
						onActiveSection={setActiveSection}
					/>
				</div>

				<div className='site-header-actions flex items-center gap-2.5'>
					<ThemeToggle />
					<a
						href='#contact'
						aria-current={activeSection === 'contact' ? 'page' : undefined}
						className={`btn rounded-full px-4 py-1.5 text-xs font-semibold bg-neutral-950 text-white hover:bg-neutral-800 shadow-sm transition-all hover:scale-[1.02] active:scale-95 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 max-md:hidden ${activeSection === 'contact' ? 'contact-button-active' : ''}`}
					>
						Contact Me
					</a>
				</div>
				</div>
			</div>
		</motion.header>
	)
}

export default Header
