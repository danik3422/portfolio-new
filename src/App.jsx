import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactLenis } from 'lenis/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Skill from './components/Skill/Skill'
import Work from './components/Work/Work'

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

	return (
		<ReactLenis root>
			<Header />
			<main>
				<Hero />
				<About />
				<Skill />
				<Work />
				<Contact />
			</main>
			<Footer />
		</ReactLenis>
	)
}

export default App
