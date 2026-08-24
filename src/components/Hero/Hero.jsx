import heroBanner from '@images/banners/hero-banner.webp'
import { useLenis } from 'lenis/react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { ButtonOutline, ButtonPrimary } from '../Button/Button'

const cvFileId = '1h565UCMGr9IJnIOvGhoMfd6vognMuGnM'
const cvPreviewUrl = `https://drive.google.com/file/d/${cvFileId}/preview`
const cvViewUrl = `https://drive.google.com/file/d/${cvFileId}/view`
const cvDownloadUrl = `https://drive.google.com/uc?export=download&id=${cvFileId}`

const Hero = () => {
	const [isCvPreviewOpen, setIsCvPreviewOpen] = useState(false)
	const lenis = useLenis()

	const scrollToAbout = (event) => {
		event.preventDefault()
		const target = document.getElementById('about')
		if (!target) return
		if (lenis) {
			lenis.scrollTo(target, { duration: 1, offset: -80 })
		} else {
			target.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
		window.history.replaceState(
			null,
			'',
			window.location.pathname + window.location.search,
		)
	}

	useEffect(() => {
		if (!isCvPreviewOpen) return
		const previousOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		lenis?.stop()
		const closeOnEscape = (event) => {
			if (event.key === 'Escape') setIsCvPreviewOpen(false)
		}
		window.addEventListener('keydown', closeOnEscape)
		return () => {
			document.body.style.overflow = previousOverflow
			lenis?.start()
			window.removeEventListener('keydown', closeOnEscape)
		}
	}, [isCvPreviewOpen, lenis])

	return (
		<>
			<section
				id='home'
				className='hero-section flex items-center pt-28 lg:pt-36'
			>
				<div className='container items-center lg:grid lg:grid-cols-2 lg:gap-10'>
					<div>
						<div className='flex items-center gap-3'>
							<div className='flex items-center gap-1.5 text-zinc-400 text-sm tracking-wide'>
								<span className='relative w-2 h-2 rounded-full bg-emerald-400'>
									<span className='absolute inset-0 rounded-full bg-emerald-400 animate-ping'></span>
								</span>
								Available for work
							</div>
						</div>

						<h2 className='headline-1 max-w-[15ch] sm:max-w-[20ch] lg:max-w-[15ch] mt-5 mb-8 lg:mb-10'>
							Building scalable websites for both front-end and back-end
							challenges.
						</h2>

						<div className='flex items-center gap-3'>
							<ButtonPrimary
								label='View CV'
								icon='visibility'
								onClick={() => setIsCvPreviewOpen(true)}
							/>

							<ButtonOutline
								href='#about'
								label='Scroll down'
								icon='arrow_downward'
								onClick={scrollToAbout}
							/>
						</div>
					</div>

					<div className='hidden lg:block'>
						<figure className='w-full max-w-[480px] ml-auto bg-gradient-to-t from-sky-400 via-25% via-sky-400/40 to-65% rounded-[60px] overflow-hidden'>
							<img
								src={heroBanner}
								width={656}
								height={800}
								className='w-full'
							/>
						</figure>
					</div>
				</div>
			</section>

			{isCvPreviewOpen &&
				createPortal(
					<div
						className='fixed inset-0 z-50 grid place-items-center bg-zinc-950/85 backdrop-blur-sm sm:p-4'
						onMouseDown={(event) => {
							if (event.target === event.currentTarget)
								setIsCvPreviewOpen(false)
						}}
					>
						<div
							role='dialog'
							aria-modal='true'
							aria-labelledby='cv-preview-title'
							aria-describedby='cv-preview-description'
							className='flex h-[100dvh] w-full max-w-4xl flex-col overflow-hidden bg-zinc-800 ring-1 ring-inset ring-zinc-50/10 sm:h-[min(85vh,800px)] sm:rounded-2xl'
						>
							<div className='flex items-center justify-between gap-4 border-b border-zinc-50/10 px-4 py-3'>
								<div>
									<h2 id='cv-preview-title' className='text-lg font-medium'>
										My CV
									</h2>
									<p
										id='cv-preview-description'
										className='text-sm text-zinc-400'
									>
										Preview in your browser
									</p>
								</div>
								<button
									type='button'
									aria-label='Close CV preview'
									onClick={() => setIsCvPreviewOpen(false)}
									className='grid h-9 w-9 place-items-center rounded-lg text-zinc-400 hover:bg-zinc-50/10 hover:text-zinc-50'
								>
									<span className='material-symbols-rounded' aria-hidden='true'>
										close
									</span>
								</button>
							</div>
							<iframe
								src={cvPreviewUrl}
								title='Danylo Syloats CV'
								className='min-h-0 flex-1 bg-white'
							>
								<p className='p-6 text-center text-zinc-700'>
									Your browser cannot display this preview.{' '}
									<a
										href={cvViewUrl}
										target='_blank'
										rel='noopener noreferrer'
										className='text-sky-600 underline'
									>
										Open the CV
									</a>
								</p>
							</iframe>
							<div className='flex items-center justify-end gap-4 border-t border-zinc-50/10 px-4 py-3'>
								<a
									href={cvViewUrl}
									target='_blank'
									rel='noopener noreferrer'
									className='text-sm text-zinc-300 hover:text-zinc-50'
								>
									Open in new tab
								</a>
								<a
									href={cvDownloadUrl}
									className='text-sm text-sky-400 hover:text-sky-300'
								>
									Download PDF
								</a>
							</div>
						</div>
					</div>,
					document.body,
				)}
		</>
	)
}

export default Hero
