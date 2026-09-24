import PropTypes from 'prop-types'

const ProjectCard = ({ imgSrc, title, description, tags, onSelect, classes }) => {
	return (
		<div
			className={
				'project-card bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/70 dark:border-neutral-800 shadow-sm rounded-2xl relative group overflow-hidden p-4 transition-[transform,background-color,box-shadow] hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20 active:bg-zinc-700/60 ' +
				classes
			}
		>
			<figure className='img-box mb-5 flex aspect-[3024/1666] items-center justify-center overflow-hidden rounded-xl bg-[var(--ink)]/5'>
				<img src={imgSrc} alt={`${title} preview`} loading='lazy' decoding='async' className='h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]' />
			</figure>

			<div className='flex items-start justify-between gap-4'>
				<div className='min-w-0'>
					<div className='mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300'>
						<span className='h-1.5 w-1.5 rounded-full bg-emerald-400' aria-hidden='true'></span>
						Live product
					</div>
					<h3 className='title-1 mb-2'>{title}</h3>

					{description && (
						<p className='mb-4 max-w-[42ch] text-sm leading-6 text-zinc-400'>
							{description}
						</p>
					)}

					<div className='flex flex-wrap items-center gap-2'>
						{tags.map((label, key) => (
							<span
								key={key}
								className='grid h-7 items-center rounded-md bg-zinc-50/5 px-2.5 text-xs text-zinc-400'
							>
								{label}
							</span>
						))}
					</div>
				</div>

				<div className='project-card-action grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[var(--coral)] text-white transition-[background-color,transform] duration-300 group-hover:-translate-y-0.5'>
					<span className='material-symbols-rounded' aria-hidden='true'>
						arrow_outward
					</span>
				</div>
			</div>

			<button
				type='button'
				onClick={onSelect}
				aria-label={`Open ${title} project details`}
				className='absolute inset-0 z-10 cursor-pointer'
			></button>
		</div>
	)
}

ProjectCard.propTypes = {
	imgSrc: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	tags: PropTypes.array.isRequired,
	onSelect: PropTypes.func.isRequired,
	classes: PropTypes.string,
}

export default ProjectCard
