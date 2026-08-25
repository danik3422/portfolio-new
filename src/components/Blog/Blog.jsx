import { blogPosts } from '../../data/blog'
import PropTypes from 'prop-types'

const Blog = ({ vertical = false, showPosts = true }) => {
	return (
		<section id='blog' className='section'>
			<div className='container'>
				<div className='blog-section-heading mb-8'>
					<div className='w-full'>
						<p className='mb-3 text-sm uppercase tracking-[0.2em] text-sky-400 reveal-up'>
							From the notebook
						</p>
						<h2 className='headline-2 reveal-up'>Thoughts on building for people</h2>
					</div>
				</div>

				{showPosts && blogPosts.length > 0 ? (
					<div className={`blog-post-list ${vertical ? 'blog-post-list-vertical' : ''}`}>
						{blogPosts.map(({ slug, category, title, excerpt, date, readTime }) => (
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
								<a
									href={`/blog/${slug}`}
									className='inline-flex items-center gap-2 text-zinc-300 transition-colors group-hover:text-sky-400'
								>
									Read post
									<span className='material-symbols-rounded text-[18px]' aria-hidden='true'>
										arrow_forward
									</span>
								</a>
							</div>
						</article>
						))}
					</div>
				) : (
					<div className='blog-coming-soon reveal-up'>
						<div className='blog-coming-soon-icon' aria-hidden='true'>
							<span className='material-symbols-rounded'>edit_note</span>
						</div>
						<div className='blog-coming-soon-content'>
							<div className='blog-coming-soon-heading'>
								<p className='blog-coming-soon-label'>The notebook is open</p>
								<span className='blog-coming-soon-status'>In progress</span>
							</div>
							<h3 className='mb-2 text-2xl font-medium text-zinc-50'>Coming soon</h3>
							<p className='max-w-lg text-sm leading-6 text-zinc-400'>
								New posts will appear here as soon as they are available. I&apos;m
								preparing practical notes on design, development, and building better
								digital products.
							</p>
							<div className='blog-coming-soon-topics' aria-label='Upcoming topics'>
								<span>Design</span>
								<span>Development</span>
								<span>Process</span>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	)
}

Blog.propTypes = {
	vertical: PropTypes.bool,
	showPosts: PropTypes.bool,
}

export default Blog