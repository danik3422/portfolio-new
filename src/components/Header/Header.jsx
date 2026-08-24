import logo from '@images/logo.svg'
import { useEffect, useRef, useState } from 'react'
import Navbar from '../Navbar/Navbar'
const Header = () => {
	const [navOpen, setNavOpen] = useState(false)
	const [footerVisible, setFooterVisible] = useState(false)
	const [navVisible, setNavVisible] = useState(true)
	const menuRef = useRef(null)

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
		if (!navOpen) return
		const closeOnOutsideTap = (event) => {
			if (!menuRef.current?.contains(event.target)) setNavOpen(false)
		}
		document.addEventListener('pointerdown', closeOnOutsideTap)
		return () => document.removeEventListener('pointerdown', closeOnOutsideTap)
	}, [navOpen])

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
			<div className='site-header-inner w-full mx-auto px-4 flex flex-nowrap justify-between items-center md:px-[5.4vw]'>
				<h1>
					<a href='/' className='logo'>
						<img src={logo} width={40} height={40} alt='Danylo Syloats home' />
					</a>
				</h1>

				<div
					ref={menuRef}
					className='site-header-menu relative min-w-0 ml-auto'
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

					<Navbar navOpen={navOpen} onNavigate={() => setNavOpen(false)} />
				</div>

				<div className='site-header-actions flex items-center gap-2'>
					<a href='/blog' className='btn btn-outline max-md:hidden'>
						Blog
						<span className='material-symbols-rounded' aria-hidden='true'>
							arrow_outward
						</span>
					</a>
					<a href='#contact' className='btn btn-secondary max-md:hidden'>
						Contact Me
					</a>
				</div>
			</div>
		</header>
	)
}

export default Header
