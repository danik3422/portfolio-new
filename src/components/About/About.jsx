import logo from '@images/logo.svg'
import { aboutItems } from '../../data/aboutItems'
const About = () => {
	return (
		<section id='about' className='section'>
			<div className='container'>
				<div className='about-panel bg-zinc-800/50 p-7 rounded-2xl md:p-12 reveal-up'>
					<p className='text-zinc-300 mb-4 md:mb-8 md:text-xl md:max-w-[70ch]'>
						I&apos;m Danylo, a Java and JavaScript developer who enjoys turning
						business ideas into software people can use every day. I build clear
						interfaces with React and reliable backend services with Node.js,
						Java, REST APIs, and PostgreSQL. I care about understanding the
						problem before writing code, delivering work that is easy to
						maintain, and being dependable as part of a team. I&apos;m looking
						for a junior-to-mid-level Java or JavaScript role where I can
						contribute from day one, take ownership of my work, and continue
						growing with the product and the people building it.
					</p>

					<div className='flex flex-wrap items-center gap-4 md:gap-7'>
						{aboutItems.map(({ label, number }, key) => (
							<div
								key={key}
								className='about-stat'
								style={{ '--stat-index': key }}
							>
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
