import { aboutItems } from '../../data/aboutItems'
const About = () => {
	return (
		<section id='about' className='section'>
			<div className='container'>
				<div className='about-panel reveal-up'>
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
							<div
								key={key}
								className='about-stat'
								style={{ '--stat-index': key }}
							>
								<div className='about-stat-number'>
									<span>
										{number}
									</span>
									<span className='about-stat-plus'>+</span>
								</div>

								<p>{label}</p>
							</div>
						))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default About
