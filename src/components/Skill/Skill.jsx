import { skillItem } from '../../data/skillItem'
import SkillCard from './SkillCard'

const Skill = () => {
	return (
		<section className='section'>
			<div className='container'>
				<div className='skill-heading reveal-up'>
					<h2 className='headline-2'>Essential Tools I use</h2>
					<span className='skill-count'>{skillItem.length} tools</span>
				</div>

				<p className='skill-intro text-zinc-400 mt-3 mb-8 max-w-[50ch] reveal-up'>
					Discover the powerful tools and technologies I use to create
					exceptional, high-performing websites & applications.
				</p>

				<div className='skill-grid'>
					{skillItem.map(({ imgSrc, label, desc }, key) => (
						<SkillCard
							key={key}
							imgSrc={imgSrc}
							label={label}
							desc={desc}
							classes='reveal-up'
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default Skill
