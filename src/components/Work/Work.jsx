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
			<div className='container'>
				<h2 className='headline-2 mb-8 reveal-up'>My portfolio highlights</h2>

				<div className='grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]'>
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
						className='project-details-modal relative max-h-[calc(100dvh-2rem)] w-full max-w-3xl touch-pan-y overscroll-contain overflow-y-auto rounded-2xl bg-gradient-to-b from-zinc-800 via-zinc-800 to-zinc-900 p-3 shadow-2xl shadow-black/50 ring-1 ring-inset ring-zinc-50/10 sm:p-5'
					>
						<button
							type='button'
							aria-label='Close project details'
							onClick={() => setSelectedProject(null)}
							className='absolute right-5 top-5 z-10 grid h-9 w-9 place-items-center rounded-full bg-zinc-950/55 text-zinc-400 shadow-lg shadow-zinc-950/20 ring-1 ring-inset ring-zinc-50/15 backdrop-blur-md transition-[background-color,color,transform] hover:scale-105 hover:bg-zinc-950/80 hover:text-sky-300 active:scale-95'
						>
							<span className='material-symbols-rounded text-[21px]' aria-hidden='true'>close</span>
						</button>

						<figure className='img-box mb-7 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl bg-zinc-950/70 ring-1 ring-inset ring-zinc-50/10 md:aspect-[16/8]'>
							<img
								src={selectedProject.imgSrc}
								alt={`${selectedProject.title} preview`}
								className='h-full w-full object-contain'
							/>
						</figure>

						<div className='px-1 pb-3 sm:px-2 sm:pb-5'>
							<div className='mb-3 flex items-center justify-between gap-4'>
								<p className='text-xs font-semibold uppercase tracking-[0.16em] text-sky-300'>
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
												<span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300' aria-hidden='true'></span>
												{feature}
											</li>
										))}
									</ul>
								</div>
							)}

							{selectedProject.security && (
								<div className='mt-7 rounded-xl bg-zinc-950/30 p-4 ring-1 ring-inset ring-zinc-50/5'>
									<h4 className='mb-2 text-sm font-semibold text-zinc-100'>Security by design</h4>
									<p className='text-sm leading-6 text-zinc-400'>{selectedProject.security}</p>
								</div>
							)}

							<div className='mt-7'>
								<h4 className='mb-3 text-sm font-semibold text-zinc-100'>Technology stack</h4>
								<div className='flex flex-wrap gap-2'>
									{(selectedProject.technologies || selectedProject.tags).map((tag) => (
										<span key={tag} className='rounded-md bg-zinc-50/5 px-3 py-2 text-sm text-zinc-400 ring-1 ring-inset ring-zinc-50/5'>
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
									className='inline-flex w-fit items-center gap-2 rounded-lg bg-sky-400 px-4 py-3 font-medium text-zinc-950 shadow-lg shadow-sky-950/20 transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-sky-300 active:translate-y-0'
								>
									Visit live project
									<span className='material-symbols-rounded' aria-hidden='true'>arrow_outward</span>
								</a>
								<p className='text-xs text-zinc-500'>Opens in a new tab</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	)
}

export default Work
