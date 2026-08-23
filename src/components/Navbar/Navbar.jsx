import { useLenis } from 'lenis/react'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef, useState } from 'react'

const Navbar = ({ navOpen, onNavigate }) => {
	const lastActiveLink = useRef()
	const activeBox = useRef()
	const navbar = useRef()
	const [activeLink, setActiveLinkState] = useState('#home')

	const setActiveLink = useCallback((selectedLink) => {
		setActiveLinkState(selectedLink.getAttribute('href'))
	}, [])

	const positionActiveBox = useCallback(() => {
		if (!activeBox.current || !navbar.current) return
		const selectedLink = navbar.current.querySelector(
			`a[href="${activeLink}"]`
		)
		if (!selectedLink) return

		lastActiveLink.current = selectedLink
		activeBox.current.style.top = selectedLink.offsetTop + 'px'
		activeBox.current.style.left = selectedLink.offsetLeft + 'px'
		activeBox.current.style.width = selectedLink.offsetWidth + 'px'
		activeBox.current.style.height = selectedLink.offsetHeight + 'px'
	}, [activeLink])

	const updateActiveLink = useCallback(() => {
		if (!navbar.current) return
		const sections = Array.from(
			document.querySelectorAll('main section[id], footer[data-nav-section]')
		)
		let currentSection = sections[0]

		sections.forEach((section) => {
			if (section.getBoundingClientRect().top <= 200) currentSection = section
		})

		if (!currentSection) return
		const footer = document.querySelector('footer[data-nav-section="contact"]')
		const footerIsVisible = footer && footer.getBoundingClientRect().top < window.innerHeight
		const id = footerIsVisible
			? window.innerWidth < 768
				? 'contact'
				: 'work'
			: currentSection.id || currentSection.dataset.navSection
		const link = navbar.current.querySelector(`a[href="#${id}"]`)
		if (link) setActiveLink(link)
	}, [setActiveLink])

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
		event.preventDefault()
		const selectedLink = event.currentTarget
		const target = document.getElementById(selectedLink.getAttribute('href').slice(1))
		setActiveLink(selectedLink)
		if (!target) return
		if (lenis) {
			lenis.scrollTo(target, {
				duration: 1,
				offset: -80,
				lock: false,
			})
		} else {
			window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' })
		}
		window.history.replaceState(null, '', window.location.pathname + window.location.search)
		onNavigate()
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
			className={'navbar md:relative ' + (navOpen ? 'active' : '')}
		>
			{navItems.map(({ label, link, className, ref }, key) => (
				<a
					href={link}
					key={key}
					ref={ref}
					className={`${className} ${activeLink === link ? 'active' : ''}`}
					onClick={activeCurrentLink}
				>
					{label}
				</a>
			))}
			<div className='active-box' ref={activeBox}></div>
		</nav>
	)
}

Navbar.propTypes = {
	navOpen: PropTypes.bool.isRequired,
	onNavigate: PropTypes.func.isRequired,
}

export default Navbar
