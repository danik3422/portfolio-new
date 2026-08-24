import logo from '@images/logo.svg'
import { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
const Header = () => {
	const [navOpen, setNavOpen] = useState(false)
	const [footerVisible, setFooterVisible] = useState(false)
	const [navVisible, setNavVisible] = useState(true)

	useEffect(() => {
		const footer = document.querySelector('footer[data-nav-section="contact"]')
		if (!footer) return
		const updateFooterVisibility = () => {
			const isVisible = footer.getBoundingClientRect().top < window.innerHeight
			setFooterVisible(isVisible)
			if (!isVisible) setNavVisible(true)
		}
		updateFooterVisibility()
		window.addEventListener('scroll', updateFooterVisibility, { passive: true })
		window.addEventListener('resize', updateFooterVisibility)
		return () => {
			window.removeEventListener('scroll', updateFooterVisibility)
			window.removeEventListener('resize', updateFooterVisibility)
		}
	}, [])

	useEffect(() => {
		if (!footerVisible) return
		let timer
		const showNavigation = () => {
			setNavVisible(true)
			clearTimeout(timer)
			timer = setTimeout(() => setNavVisible(false), 2000)
		}
		showNavigation()
		document.addEventListener('mousemove', showNavigation)
		return () => {
			clearTimeout(timer)
			document.removeEventListener('mousemove', showNavigation)
		}
	}, [footerVisible])

	useEffect(() => {
		const closeOnEscape = (event) => {
			if (event.key === 'Escape') setNavOpen(false)
		}
		window.addEventListener('keydown', closeOnEscape)
		return () => window.removeEventListener('keydown', closeOnEscape)
	}, [])

	return (
		<header
			className={`fixed top-0 left-0 w-full h-20 flex items-center z-40 bg-gradient-to-b from-zinc-900 to-zinc-900/0 transition-opacity duration-300 ${footerVisible && !navVisible ? 'md:opacity-0 md:pointer-events-none' : 'opacity-100'}`}
		>
			<div className='max-w-screen-2xl w-full mx-auto px-4 flex justify-between items-center md:px-6 md:grid md:grid-cols-[minmax(0,1fr),auto,minmax(0,1fr)]'>
				<h1>
					<a href='/' className='logo'>
						<img src={logo} width={40} height={40} alt='Danylo Syloats home' />
					</a>
				</h1>

				<div className='relative md:justify-self-center'>
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

					<Navbar navOpen={navOpen} onNavigate={() => setNavOpen(false)} />
				</div>

				<a
					href='#contact'
					className='btn btn-secondary max-md:hidden md:justify-self-end'
				>
					Contact Me
				</a>
			</div>
		</header>
	)
}

export default Header
