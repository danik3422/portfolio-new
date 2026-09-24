import { ReactLenis, useLenis } from 'lenis/react'
import { lazy, Suspense, useEffect, useState } from 'react'

import About from './components/About/About.jsx'
import Certifications from './components/Certifications/Certifications'
import Contact from './components/Contact/Contact.jsx'
import Education from './components/Education/Education'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Skill from './components/Skill/Skill'
import Work from './components/Work/Work'

const BlogPage = lazy(() => import('./components/BlogPage/BlogPage.jsx'))
const BlogPost = lazy(() => import('./components/BlogPost/BlogPost.jsx'))
const NotFound = lazy(() => import('./components/NotFound/NotFound.jsx'))

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
			className='fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-xl bg-[var(--coral)] text-white shadow-lg shadow-black/20 transition-transform hover:bg-[var(--coral-dark)] active:scale-95 md:bottom-8 md:right-8'
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
	useEffect(() => {
		const elements = document.querySelectorAll('.reveal-up')
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible')
						observer.unobserve(entry.target)
					}
				})
			},
			{ rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
		)

		elements.forEach((element) => observer.observe(element))
		return () => observer.disconnect()
	}, [])

	if (window.location.pathname === '/blog') return (
		<Suspense fallback={null}>
			<BlogPage />
		</Suspense>
	)
	if (window.location.pathname.startsWith('/blog/')) {
		return (
			<Suspense fallback={null}>
				<BlogPost slug={window.location.pathname.slice('/blog/'.length)} />
			</Suspense>
		)
	}
	if (window.location.pathname !== '/') return (
		<Suspense fallback={null}>
			<NotFound />
		</Suspense>
	)

	return (
		<ReactLenis
			root
			options={{
				smoothWheel: true,
				lerp: 0.1,
				wheelMultiplier: 0.85,
				duration: 1.2,
			}}
		>
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
				<Contact />
			</main>
			<Footer />
			<ScrollToTopButton />
		</ReactLenis>
	)
}

export default App
