import logo from '@images/logo.svg'
import Footer from '../Footer/Footer'

const NotFound = () => {
	return (
		<div className='flex min-h-screen flex-col bg-zinc-900'>
			<header className='flex h-20 items-center'>
				<div className='container w-full'>
					<a href='/' className='logo' aria-label='Danylo Syloats home'>
						<img src={logo} width={40} height={40} alt='' />
					</a>
				</div>
			</header>
			<main className='container flex flex-1 items-center py-20'>
				<div className='max-w-xl'>
					<p className='mb-4 text-sm uppercase tracking-[0.2em] text-sky-400'>Error 404</p>
					<h1 className='headline-1 mb-6'>Looks like you&apos;re lost</h1>
					<p className='mb-8 text-lg text-zinc-400'>Maybe try a different page?</p>
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