import { blogPosts } from '../../data/blog'

const Blog = () => {
	return (
		<section id='blog' className='section'>
			<div className='container'>
				<div className='mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
					<div>
						<p className='mb-3 text-sm uppercase tracking-[0.2em] text-sky-400 reveal-up'>
							From the notebook
						</p>
						<h2 className='headline-2 reveal-up'>Thoughts on building for people</h2>
					</div>
					<p className='max-w-sm text-sm leading-6 text-zinc-400 reveal-up'>
						Short notes about design, development, and the work behind the work.
					</p>
				</div>

				<div className='grid gap-4 lg:grid-cols-3'>
					{blogPosts.map(({ category, title, excerpt, date, readTime }) => (
						<article
							key={title}
							className='group flex min-h-72 flex-col rounded-2xl bg-zinc-800 p-5 ring-1 ring-inset ring-zinc-50/5 transition-colors hover:bg-zinc-700/60 reveal-up'
						>
							<div className='mb-10 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.15em]'>
								<span className='text-sky-400'>{category}</span>
								<span className='text-zinc-500'>{date}</span>
							</div>
							<h3 className='mb-3 text-xl font-medium leading-snug text-zinc-50'>{title}</h3>
							<p className='mb-8 text-sm leading-6 text-zinc-400'>{excerpt}</p>
							<div className='mt-auto flex items-center justify-between border-t border-zinc-50/10 pt-4 text-sm'>
								<span className='text-zinc-500'>{readTime}</span>
								<span className='inline-flex items-center gap-2 text-zinc-300 transition-colors group-hover:text-sky-400'>
									Read soon
									<span className='material-symbols-rounded text-[18px]' aria-hidden='true'>
										arrow_forward
									</span>
								</span>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}

export default Blog