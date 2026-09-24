import { aboutItems } from '../../data/aboutItems'
const About = () => {
	return (
		<section id='about' className='section'>
			<div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<h2 className='headline-2 mb-8 reveal-up'>About me</h2>

				<div className='about-panel bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/70 dark:border-neutral-800 shadow-sm rounded-2xl reveal-up'>
					<div className='about-panel-content'>
						<div className='about-intro'>
							<p className='about-kicker'>A little about me</p>
							<p className='about-copy'>
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
						</div>

						<div className='about-summary'>
							<p className='about-summary-label'>By the numbers</p>
							<div className='about-stats'>
								{aboutItems.map(({ label, number }, key) => (
									<div key={key} className='about-stat'>
										<div className='about-stat-number'>
											<span>{number}</span>
											<span className='about-stat-plus'>+</span>
										</div>

										<p>{label}</p>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className='about-panel-footer'>
						<span>React</span>
						<span>Node.js</span>
						<span>Java</span>
						<span>PostgreSQL</span>
					</div>
				</div>
			</div>
		</section>
	)
}

export default About
