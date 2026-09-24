import logo from '@images/logo.svg'
import { blogPosts } from '../../data/blog'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import Footer from '../Footer/Footer'
import NotFound from '../NotFound/NotFound'
import { setPageMetadata, setStructuredData, siteUrl } from '../../utils/seo'

const BlogPost = ({ slug }) => {
	const post = blogPosts.find((entry) => entry.slug === slug)

	useEffect(() => {
		if (!post) return
		setPageMetadata({
			title: `${post.title} | Danylo Syloats`,
			description: post.excerpt,
			path: `/blog/${post.slug}`,
			type: 'article',
		})
		setStructuredData({
			'@context': 'https://schema.org',
			'@type': 'Article',
			'@id': `${siteUrl}/blog/${post.slug}#article`,
			'url': `${siteUrl}/blog/${post.slug}`,
			'headline': post.title,
			'description': post.excerpt,
			'author': {
				'@type': 'Person',
				'name': 'Danylo Syloats',
				'url': siteUrl,
			},
			'inLanguage': 'en',
		})
	}, [post])

	if (!post) return <NotFound />

	return (
		<div className='min-h-screen'>
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
