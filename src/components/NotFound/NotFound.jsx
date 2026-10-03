import logo from '@images/logo.svg'
import { useEffect } from 'react'

import { setPageMetadata } from '../../utils/seo'
import Footer from '../Footer/Footer'

const NotFound = () => {
	useEffect(() => {
		setPageMetadata({
			title: 'Page not found | Danylo Syloats',
			description: 'This page does not exist. Return to the portfolio of Danylo Syloats.',
			path: window.location.pathname,
			robots: 'noindex, follow',
		})
	}, [])

	return (
		<div className='flex min-h-screen flex-col'>
			<header className='flex h-20 items-center'>
				<div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<a href='/' className='logo' aria-label='Danylo Syloats home'>
						<img src={logo} width={40} height={40} alt='' />
					</a>
				</div>
			</header>
			<main className='mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-20 sm:px-6 lg:px-8'>
				<div className='max-w-xl'>
					<p className='mb-4 text-sm uppercase tracking-[0.2em] text-[var(--coral)]'>Error 404</p>
					<h1 className='headline-1 mb-6'>Looks like you&apos;re lost</h1>
					<p className='mb-8 text-lg text-[var(--muted)]'>Maybe try a different page?</p>
					<a href='/' className='btn btn-primary'>
						<span className='material-symbols-rounded' aria-hidden='true'>
							arrow_back
						</span>
						Back to home
					</a>
				</div>
			</main>
			<Footer />
		</div>
	)
}

export default NotFound