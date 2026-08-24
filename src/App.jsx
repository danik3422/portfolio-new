import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect, useState } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

import About from './components/About/About.jsx'
import Blog from './components/Blog/Blog.jsx'
import BlogPage from './components/BlogPage/BlogPage.jsx'
import Certifications from './components/Certifications/Certifications'
import Contact from './components/Contact/Contact.jsx'
import Education from './components/Education/Education'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import NotFound from './components/NotFound/NotFound.jsx'
import Skill from './components/Skill/Skill'
import Work from './components/Work/Work'

const ScrollToTopButton = () => {
	const [showScrollTop, setShowScrollTop] = useState(false)
	const lenis = useLenis()

	const scrollToTop = () => {
		if (lenis) {
			lenis.scrollTo(0, { duration: 1 })
		} else {
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
		}
		setShowScrollTop(false)
	}

	useEffect(() => {
		const handleScroll = () => setShowScrollTop(window.scrollY > 400)

		handleScroll()
		window.addEventListener('scroll', handleScroll, { passive: true })

		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return showScrollTop ? (
		<button
			type='button'
			aria-label='Scroll to top'
			onClick={scrollToTop}
			className='fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-xl bg-sky-400 text-zinc-950 shadow-lg shadow-zinc-950/30 transition-transform hover:bg-sky-300 active:scale-95 md:bottom-8 md:right-8'
		>
			<span className='material-symbols-rounded' aria-hidden='true'>
				arrow_upward
			</span>
		</button>
	) : null
}

const ResetScrollOnLoad = () => {
	const lenis = useLenis()

	useEffect(() => {
		window.history.scrollRestoration = 'manual'
		const resetScroll = () => {
			window.scrollTo(0, 0)
			document.documentElement.scrollTop = 0
			document.body.scrollTop = 0
			lenis?.scrollTo(0, { immediate: true })
		}

		resetScroll()
		const frame = requestAnimationFrame(resetScroll)
		return () => cancelAnimationFrame(frame)
	}, [lenis])

	return null
}

const CleanInternalNavigation = () => {
	const lenis = useLenis()

	useEffect(() => {
		const handleInternalLink = (event) => {
			if (event.defaultPrevented) return
			const link = event.target.closest('a[href^="#"]')
			if (!link) return
			if (link.closest('#primary-navigation')) return

			const targetId = link.getAttribute('href').slice(1)
			const targetSection = document.getElementById(targetId)
			if (!targetSection) return

			event.preventDefault()
			if (lenis) {
				lenis.scrollTo(targetSection, { duration: 1 })
			} else {
				targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
			}
			window.history.replaceState(
				null,
				'',
				window.location.pathname + window.location.search,
			)
		}

		document.addEventListener('click', handleInternalLink)
		return () => document.removeEventListener('click', handleInternalLink)
	}, [lenis])

	return null
}

const App = () => {
	useGSAP(() => {
		const elements = gsap.utils.toArray('.reveal-up')

		elements.forEach((element) => {
			gsap.to(element, {
				scrollTrigger: {
					trigger: element,
					start: '-200 bottom',
					end: 'bottom 80%',
					scrub: true,
				},
				y: 0,
				opacity: 1,
				duration: 1,
				ease: 'power2.out',
			})
		})
	})

	if (window.location.pathname === '/blog') return <BlogPage />
	if (window.location.pathname !== '/') return <NotFound />

	return (
		<ReactLenis root options={{ smoothWheel: false }}>
			<ResetScrollOnLoad />
			<CleanInternalNavigation />
			<Header />
			<main>
				<Hero />
				<About />
				<Education />
				<Certifications />
				<Skill />
				<Work />
				<Blog />
				<Contact />
			</main>
			<Footer />
			<ScrollToTopButton />
		</ReactLenis>
	)
}

export default App
