import { useLenis } from 'lenis/react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef, useState } from 'react'

const Navbar = ({ navOpen, onNavigate, onActiveSection }) => {
	const lastActiveLink = useRef()
	const activeBox = useRef()
	const navbar = useRef()
	const [activeLink, setActiveLinkState] = useState('#home')
	const isBlogPage = window.location.pathname === '/blog'

	const setActiveLink = useCallback((selectedLink) => {
		setActiveLinkState(selectedLink.getAttribute('href'))
	}, [])

	const positionActiveBox = useCallback(() => {
		if (!activeBox.current || !navbar.current) return
		const selectedLink = navbar.current.querySelector(`a[href="${activeLink}"]`)
		if (!selectedLink || selectedLink.offsetParent === null) {
			activeBox.current.style.opacity = '0'
			return
		}

		lastActiveLink.current = selectedLink
		activeBox.current.style.opacity = '1'
		activeBox.current.style.top = selectedLink.offsetTop + 'px'
		activeBox.current.style.left = selectedLink.offsetLeft + 'px'
		activeBox.current.style.width = selectedLink.offsetWidth + 'px'
		activeBox.current.style.height = selectedLink.offsetHeight + 'px'
	}, [activeLink])

	const updateActiveLink = useCallback(() => {
		if (!navbar.current) return
		const sections = Array.from(
			document.querySelectorAll('main section[id], footer[data-nav-section]'),
		)
		let currentSection = sections[0]

		sections.forEach((section) => {
			if (section.getBoundingClientRect().top <= 200) currentSection = section
		})

		if (!currentSection) return
		const atPageEnd =
			window.innerHeight + window.scrollY >= document.body.offsetHeight - 50
		const footer = document.querySelector('footer[data-nav-section="contact"]')
		const footerIsVisible =
			footer && footer.getBoundingClientRect().top < window.innerHeight
		const id = atPageEnd || footerIsVisible
			? 'contact'
			: currentSection.id || currentSection.dataset.navSection
		onActiveSection?.(id)
		const link = navbar.current.querySelector(`a[href="#${id}"]`)
		if (link) setActiveLink(link)
	}, [onActiveSection, setActiveLink])

	const lenis = useLenis(updateActiveLink)

	useEffect(() => {
		positionActiveBox()
		window.addEventListener('resize', positionActiveBox)
		updateActiveLink()
		window.addEventListener('scroll', updateActiveLink, { passive: true })
		window.addEventListener('resize', updateActiveLink)
		return () => {
			window.removeEventListener('scroll', updateActiveLink)
			window.removeEventListener('resize', updateActiveLink)
			window.removeEventListener('resize', positionActiveBox)
		}
	}, [positionActiveBox, updateActiveLink])

	useEffect(() => {
		positionActiveBox()
	}, [positionActiveBox])

	const activeCurrentLink = (event) => {
		if (!event.currentTarget.getAttribute('href').startsWith('#')) {
			onNavigate()
			return
		}
		event.preventDefault()
		const selectedLink = event.currentTarget
		const target = document.getElementById(
			selectedLink.getAttribute('href').slice(1),
		)
		setActiveLink(selectedLink)
		onNavigate()
		if (!target) return
		const isAboutLink = selectedLink.getAttribute('href') === '#about'
		const centeredPosition = Math.max(
			0,
			target.getBoundingClientRect().top +
				window.scrollY -
				(window.innerHeight - target.offsetHeight) / 2,
		)
		if (lenis) {
			lenis.scrollTo(isAboutLink ? centeredPosition : target, {
				duration: 1,
				...(isAboutLink ? {} : { offset: -80 }),
				lock: false,
			})
		} else {
			window.scrollTo({
				top: isAboutLink ? centeredPosition : target.offsetTop - 80,
				behavior: 'smooth',
			})
		}
		window.history.replaceState(
			null,
			'',
			window.location.pathname + window.location.search,
		)
	}

	const navItems = [
		{
			label: 'Home',
			link: '#home',
			className: 'nav-link',
			ref: lastActiveLink,
		},
		{
			label: 'About',
			link: '#about',
			className: 'nav-link',
		},
		{
			label: 'Education',
			link: '#education',
			className: 'nav-link',
		},
		{
			label: 'Certifications',
			link: '#certifications',
			className: 'nav-link',
		},
		{
			label: 'Work',
			link: '#work',
			className: 'nav-link',
		},
		{
			label: 'Contact',
			link: '#contact',
			className: 'nav-link md:hidden',
		},
	]

	return (
		<nav
			ref={navbar}
			id='primary-navigation'
			className={'navbar hidden md:flex md:items-center md:gap-1 md:relative bg-transparent border-0 shadow-none ' + (navOpen ? 'active' : '')}
		>
			{navItems.map(({ label, link, className, ref }, key) => (
				<a
					href={link}
					key={key}
					ref={ref}
					className={`${className} text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white font-medium text-sm transition-colors duration-200 ${
						(isBlogPage && link === '/blog') ||
						(!isBlogPage && activeLink === link)
							? 'active relative text-white dark:text-neutral-900'
							: ''
					}`}
					aria-current={
						(isBlogPage && link === '/blog') ||
						(!isBlogPage && activeLink === link)
							? 'page'
							: undefined
					}
					onClick={activeCurrentLink}
				>
					{((isBlogPage && link === '/blog') ||
						(!isBlogPage && activeLink === link)) && (
						<motion.span
							layoutId='activePill'
							className='absolute inset-0 -z-10 rounded-full bg-neutral-900 dark:bg-white shadow-sm'
							transition={{ type: 'spring', stiffness: 380, damping: 30 }}
						/>
					)}
					{label}
				</a>
			))}
		</nav>
	)
}

Navbar.propTypes = {
	navOpen: PropTypes.bool.isRequired,
	onNavigate: PropTypes.func.isRequired,
	onActiveSection: PropTypes.func.isRequired,
}

export default Navbar
