import { useEffect, useState } from 'react'
import { useLenis } from 'lenis/react'
import { works } from '../../data/works'
import ProjectCard from '../ProjectCard/ProjectCard'

const Work = () => {
	const visibleWorks = works.filter(({ visible = true }) => visible)
	const [selectedProject, setSelectedProject] = useState(null)
	const lenis = useLenis()

	useEffect(() => {
		if (!selectedProject) return
		const previousBodyOverflow = document.body.style.overflow
		const previousDocumentOverflow = document.documentElement.style.overflow
		lenis?.stop()
		document.body.style.overflow = 'hidden'
		document.documentElement.style.overflow = 'hidden'

		const closeOnEscape = (event) => {
			if (event.key === 'Escape') setSelectedProject(null)
		}
		window.addEventListener('keydown', closeOnEscape)
		return () => {
			window.removeEventListener('keydown', closeOnEscape)
			document.body.style.overflow = previousBodyOverflow
			document.documentElement.style.overflow = previousDocumentOverflow
			lenis?.start()
		}
	}, [selectedProject, lenis])

	return (
		<section id='work' className='section'>
			<div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='work-section-heading reveal-up'>
					<div>
						<p className='work-eyebrow'>Selected work</p>
						<h2 className='headline-2'>Built for real teams</h2>
					</div>
					<span className='work-count'>
						{String(visibleWorks.length).padStart(2, '0')} / shipped
					</span>
				</div>

				<div className='work-grid'>
					{visibleWorks.map((project, key) => (
						<ProjectCard
							key={project.title || key}
							{...project}
							onSelect={() => setSelectedProject(project)}
							classes='reveal-up'
						/>
					))}

					{visibleWorks.length === 0 && (
						<div className='work-coming-soon col-span-full reveal-up'>
							<div className='work-coming-soon-icon' aria-hidden='true'>
								<span className='material-symbols-rounded'>construction</span>
							</div>
							<div className='work-coming-soon-content'>
								<div className='work-coming-soon-heading'>
									<p>Portfolio in progress</p>
									<span>Coming soon</span>
								</div>
								<h3 className='title-1 mb-2'>New projects are on the way</h3>
								<p>
									Selected work will appear here as each project is ready to share.
								</p>
							</div>
						</div>
					)}
				</div>
			</div>

			{selectedProject && (
				<div
					className='fixed inset-0 z-50 grid place-items-center bg-zinc-950/80 p-4 backdrop-blur-sm'
					onMouseDown={(event) => {
						if (event.target === event.currentTarget) setSelectedProject(null)
					}}
				>
					<div
						role='dialog'
						aria-modal='true'
						aria-labelledby='project-details-title'
						aria-describedby='project-details-description'
						onWheel={(event) => event.stopPropagation()}
						onTouchMove={(event) => event.stopPropagation()}
						className='project-details-modal relative max-h-[calc(100dvh-2rem)] w-full max-w-3xl touch-pan-y overscroll-contain overflow-y-auto rounded-2xl border border-[var(--line)] p-3 shadow-2xl shadow-black/30 sm:p-5'
					>
						<button
							type='button'
							aria-label='Close project details'
							onClick={() => setSelectedProject(null)}
							className='absolute right-5 top-5 z-10 grid h-9 w-9 place-items-center rounded-full bg-[var(--ink)]/10 text-[var(--muted)] shadow-lg shadow-black/10 ring-1 ring-inset ring-[var(--line)] backdrop-blur-md transition-[background-color,color,transform] hover:scale-105 hover:bg-[var(--ink)]/20 hover:text-[var(--coral)] active:scale-95'
						>
							<span className='material-symbols-rounded text-[21px]' aria-hidden='true'>close</span>
						</button>

						<figure className='img-box mb-7 flex aspect-[3024/1666] items-center justify-center overflow-hidden rounded-xl bg-[var(--ink)]/5 ring-1 ring-inset ring-[var(--line)]'>
							<img
								src={selectedProject.imgSrc}
								alt={`${selectedProject.title} preview`}
								className='h-full w-full object-cover object-center'
							/>
						</figure>

						<div className='px-1 pb-3 sm:px-2 sm:pb-5'>
							<div className='mb-3 flex items-center justify-between gap-4'>
								<p className='text-xs font-semibold uppercase tracking-[0.16em] text-[var(--coral-dark)]'>
									Project highlight
								</p>
								<span className='inline-flex items-center gap-2 text-xs font-medium text-emerald-300'>
									<span className='h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.12)]' aria-hidden='true'></span>
									Live product
								</span>
							</div>
							<h3 id='project-details-title' className='headline-2 mb-3 pr-12'>
								{selectedProject.title}
							</h3>
							<p id='project-details-description' className='max-w-[58ch] text-base leading-7 text-zinc-300'>
								{selectedProject.longDescription || selectedProject.description || 'A selected project from my portfolio.'}
							</p>

							{selectedProject.features && (
								<div className='mt-8'>
									<h4 className='mb-3 text-sm font-semibold text-zinc-100'>What I built</h4>
									<ul className='grid gap-2 text-sm leading-6 text-zinc-400 sm:grid-cols-2'>
										{selectedProject.features.map((feature) => (
											<li key={feature} className='flex gap-2'>
											<span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--coral)]' aria-hidden='true'></span>
												{feature}
											</li>
										))}
									</ul>
								</div>
							)}

							{selectedProject.security && (
								<div className='mt-7 rounded-xl bg-[var(--ink)]/5 p-4 ring-1 ring-inset ring-[var(--line)]'>
									<h4 className='mb-2 text-sm font-semibold text-zinc-100'>Security by design</h4>
									<p className='text-sm leading-6 text-zinc-400'>{selectedProject.security}</p>
								</div>
							)}

							<div className='mt-7'>
								<h4 className='mb-3 text-sm font-semibold text-zinc-100'>Technology stack</h4>
								<div className='flex flex-wrap gap-2'>
									{(selectedProject.technologies || selectedProject.tags).map((tag) => (
										<span key={tag} className='rounded-md bg-[var(--ink)]/5 px-3 py-2 text-sm text-[var(--muted)] ring-1 ring-inset ring-[var(--line)]'>
											{tag}
										</span>
									))}
								</div>
							</div>

							<div className='mt-8 flex flex-col gap-4 border-t border-zinc-50/10 pt-5 sm:flex-row sm:items-center sm:justify-between'>
								<a
									href={selectedProject.projectLink}
									target='_blank'
									rel='noopener noreferrer'
									className='inline-flex w-fit items-center gap-2 rounded-lg bg-[var(--coral)] px-4 py-3 font-medium text-white shadow-lg shadow-black/10 transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-[var(--coral-dark)] active:translate-y-0'
								>
									Visit live project
									<span className='material-symbols-rounded' aria-hidden='true'>arrow_outward</span>
								</a>
								<p className='text-xs text-[var(--muted)]'>Opens in a new tab</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	)
}

export default Work
