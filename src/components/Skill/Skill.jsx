import { skillItem } from '../../data/skillItem'
import SkillCard from './SkillCard'

const Skill = () => {
	const coreGroups = [
		{
			label: 'Frontend',
			items: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'CSS', 'TailwindCSS'],
		},
		{
			label: 'Backend & APIs',
			items: ['Java', 'Spring Boot', 'NodeJS', 'ExpressJS', 'REST APIs'],
		},
		{
			label: 'Data',
			items: ['PostgreSQL', 'MongoDB'],
		},
	]
	const coreLabels = new Set(coreGroups.flatMap(({ items }) => items))
	const supportingSkills = skillItem.filter(({ label }) => !coreLabels.has(label))

	return (
		<section id='skills' className='section skill-section'>
			<div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='skill-section-heading reveal-up'>
					<div>
						<p className='skill-eyebrow'>The toolkit</p>
						<h2 className='headline-2'>What I build with</h2>
						<p className='skill-intro'>
							A focused stack for shipping clear interfaces, reliable APIs, and
							maintainable products.
						</p>
					</div>
					<span className='skill-count'>{skillItem.length} tools</span>
				</div>

				<div className='skill-layout'>
					<div className='skill-core-panel bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/70 dark:border-neutral-800 shadow-sm rounded-2xl reveal-up'>
						<div className='skill-panel-heading'>
							<div>
								<span className='skill-panel-kicker'>01</span>
								<h3>Core stack</h3>
							</div>
							<span>Daily drivers</span>
						</div>
						<div className='skill-core-groups'>
							{coreGroups.map(({ label, items }) => (
								<div className='skill-core-group' key={label}>
									<h4>{label}</h4>
									<div className='skill-grid skill-core-grid'>
										{skillItem
											.filter(({ label: skillLabel }) => items.includes(skillLabel))
											.map(({ imgSrc, label: skillLabel, desc }) => (
												<SkillCard
													key={skillLabel}
													imgSrc={imgSrc}
													label={skillLabel}
													desc={desc}
													classes='reveal-up'
												/>
												))}
									</div>
								</div>
							))}
						</div>
					</div>

					<aside className='skill-supporting-panel bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/70 dark:border-neutral-800 shadow-sm rounded-2xl reveal-up'>
						<div className='skill-panel-heading'>
							<div>
								<span className='skill-panel-kicker'>02</span>
								<h3>Supporting tools</h3>
							</div>
							<span>When needed</span>
						</div>
						<div className='skill-supporting-list'>
							{supportingSkills.map(({ imgSrc, label, desc }) => (
								<SkillCard
									key={label}
									imgSrc={imgSrc}
									label={label}
									desc={desc}
									classes='skill-supporting-card'
								/>
							))}
						</div>
					</aside>
				</div>
			</div>
		</section>
	)
}

export default Skill
