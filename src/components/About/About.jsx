import logo from '@images/logo.svg'
import { aboutItems } from '../../data/aboutItems'
const About = () => {
	return (
		<section id='about' className='section'>
			<div className='container'>
				<div className='bg-zinc-800/50 p-7 rounded-2xl md:p-12 reveal-up'>
					<p className='text-zinc-300 mb-4 md:mb-8 md:text-xl md:max-w-[100wh]'>
						I&apos;m Danylo — a full-stack web developer dedicated to building
						fast, reliable, and user-friendly websites. From intuitive frontends
						to powerful backends, I turn ideas into digital experiences that are
						as functional as they are beautiful.
					</p>

					<div className='flex flex-wrap items-center gap-4 md:gap-7'>
						{aboutItems.map(({ label, number }, key) => (
							<div key={key}>
								<div className='flex items-center md:mb-2'>
									<span className='text-2xl font-semibold md:text-4xl'>
										{number}
									</span>
									<span className='text-sky-400 font-semibold md:text-3xl'>
										+
									</span>
								</div>

								<p className='text-sm text-zinc-400'>{label}</p>
							</div>
						))}

						<img
							src={logo}
							alt='Logo'
							width={30}
							height={30}
							className='ml-auto md:w-[40px] md:h-[40px]'
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

export default About
