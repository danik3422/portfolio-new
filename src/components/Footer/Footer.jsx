import logo from '@images/logo.svg'
import { useEffect, useState } from 'react'
import { sitemap } from '../../data/sitemap'
import { socials } from '../../data/socials'
import { ButtonPrimary } from '../Button/Button'
const Footer = () => {
	const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)

	useEffect(() => {
		if (!isProjectModalOpen) return
		const closeOnEscape = (event) => {
			if (event.key === 'Escape') setIsProjectModalOpen(false)
		}
		window.addEventListener('keydown', closeOnEscape)
		return () => window.removeEventListener('keydown', closeOnEscape)
	}, [isProjectModalOpen])

	return (
		<footer className='section' data-nav-section='contact'>
			<div className='container'>
				<div className='lg:grid lg:grid-cols-2'>
					<div className='mb-10'>
						<h2 className='headline-1 mb-8 lg:max-w-[12ch] reveal-up'>
							Let&apos;s work together today!
						</h2>

						<ButtonPrimary
							label='Start project'
							icon='chevron_right'
							classes='reveal-up'
							onClick={() => setIsProjectModalOpen(true)}
						/>
					</div>

					<div className='grid grid-cols-2 gap-4 lg:pl-20'>
						<div>
							<p className='mb-2 reveal-up'>Sitemap</p>

							<ul>
								{sitemap.map(({ label, href }, key) => (
									<li key={key}>
										<a
											href={href}
											className='block text-sm text-zinc-400 py-1 transition-colors hover:text-zinc-200 reveal-up'
										>
											{label}
										</a>
									</li>
								))}
							</ul>
						</div>

						<div>
							<p className='mb-2 reveal-up'>Socials</p>

							<ul>
								{socials.map(({ label, href }, key) => (
									<li key={key}>
										<a
											href={href}
											target='_blank'
											className='block text-sm text-zinc-400 py-1 transition-colors hover:text-zinc-200 reveal-up'
										>
											{label}
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				<div className='flex items-center justify-between pt-10 mb-8'>
					<a href='/' className='logo'>
						<img
							src={logo}
							width={40}
							height={41}
							alt='Logo'
							className='block h-[41px] w-10 shrink-0'
						/>
					</a>

					<p className='text-zinc-500 text-sm'>
						&copy; {new Date().getFullYear()}{' '}
						<a
							href='/'
							aria-label='Visit danylodev.com home'
							className='text-zinc-200 transition-colors hover:text-sky-400'
						>
							danylodev.com
						</a>
					</p>
				</div>
			</div>

			{isProjectModalOpen && (
				<div
					className='project-modal-backdrop fixed inset-0 z-50 grid place-items-center bg-zinc-950/80 p-4 backdrop-blur-sm'
					onMouseDown={(event) => {
						if (event.target === event.currentTarget) setIsProjectModalOpen(false)
					}}
				>
					<div role='dialog' aria-modal='true' aria-labelledby='project-modal-title' className='project-modal'>
						<div className='project-modal-header'>
							<div>
								<p className='project-modal-kicker'>Let&apos;s talk</p>
								<h2 id='project-modal-title' className='headline-2'>Start a project</h2>
							</div>
							<button type='button' aria-label='Close project form' onClick={() => setIsProjectModalOpen(false)} className='project-modal-close'>
								<span className='material-symbols-rounded' aria-hidden='true'>close</span>
							</button>
						</div>
						<form action='mailto:danylo.syloats@gmail.com' method='post' encType='text/plain' className='project-modal-form'>
							<label>Name<input name='name' required className='text-field' placeholder='Your name' /></label>
							<label>Email<input type='email' name='email' required className='text-field' placeholder='you@example.com' /></label>
							<label>Project details<textarea name='message' required className='text-field min-h-32 resize-y' placeholder='Tell me a little about your project' /></label>
							<button type='submit' className='btn btn-primary w-full justify-center'>Send inquiry<span className='material-symbols-rounded' aria-hidden='true'>arrow_forward</span></button>
						</form>
					</div>
			</div>
			)}
		</footer>
	)
}

export default Footer
