import logo from '@images/logo.svg'
import Blog from '../Blog/Blog'

const BlogPage = () => {
	return (
		<div className='min-h-screen bg-zinc-900'>
			<header className='flex h-20 items-center'>
				<div className='container flex w-full items-center justify-between'>
					<a href='/' className='logo' aria-label='Danylo Syloats home'>
						<img src={logo} width={40} height={40} alt='' />
					</a>
					<a href='/' className='btn btn-secondary'>
						<span className='material-symbols-rounded' aria-hidden='true'>
							arrow_back
						</span>
						Back to portfolio
					</a>
				</div>
			</header>
			<main>
				<Blog />
			</main>
		</div>
	)
}

export default BlogPage