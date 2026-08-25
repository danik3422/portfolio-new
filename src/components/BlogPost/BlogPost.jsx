import logo from '@images/logo.svg'
import { blogPosts } from '../../data/blog'
import PropTypes from 'prop-types'
import Footer from '../Footer/Footer'
import NotFound from '../NotFound/NotFound'

const BlogPost = ({ slug }) => {
	const post = blogPosts.find((entry) => entry.slug === slug)

	if (!post) return <NotFound />

	return (
		<div className='min-h-screen bg-zinc-900'>
			<header className='flex h-20 items-center'>
				<div className='container flex w-full items-center justify-between'>
					<a href='/' className='logo' aria-label='Danylo Syloats home'>
						<img src={logo} width={40} height={40} alt='' />
					</a>
					<a href='/blog' className='btn btn-secondary'>
						<span className='material-symbols-rounded' aria-hidden='true'>
							arrow_back
						</span>
						All posts
					</a>
				</div>
			</header>

			<main>
				<article className='blog-post container'>
					<div className='blog-post-meta'>
						<span>{post.category}</span>
						<span>{post.date}</span>
						<span>{post.readTime}</span>
					</div>
					<h1 className='headline-1 blog-post-title'>{post.title}</h1>
					<p className='blog-post-excerpt'>{post.excerpt}</p>
					<div className='blog-post-body'>
						{post.content.map((paragraph) => (
							<p key={paragraph}>{paragraph}</p>
						))}
					</div>
					<a href='/blog' className='blog-post-back'>
						<span className='material-symbols-rounded' aria-hidden='true'>
							arrow_back
						</span>
						Back to all posts
					</a>
				</article>
			</main>

			<Footer />
		</div>
	)
}

BlogPost.propTypes = {
	slug: PropTypes.string.isRequired,
}

export default BlogPost
