import { works } from '../../data/works'
import ProjectCard from '../ProjectCard/ProjectCard'

const Work = () => {
	const visibleWorks = works.filter(({ visible = true }) => visible)

	return (
		<section id='work' className='section'>
			<div className='container'>
				<h2 className='headline-2 mb-8 reveal-up'>My portfolio highlights</h2>

				<div className='grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]'>
					{visibleWorks.map(({ imgSrc, title, tags, projectLink }, key) => (
						<ProjectCard
							key={key}
							imgSrc={imgSrc}
							title={title}
							tags={tags}
							projectLink={projectLink}
							classes='reveal-up'
						/>
					))}

					{visibleWorks.length === 0 && (
						<div className='work-coming-soon col-span-full'>
							<div className='work-coming-soon-icon' aria-hidden='true'>
								<span className='material-symbols-rounded'>construction</span>
							</div>
							<div className='work-coming-soon-content'>
								<div className='work-coming-soon-heading'>
									<p>Portfolio in progress</p>
									<span>Coming soon</span>
								</div>
								<h3 className='title-1 mb-2'>New projects are on the way</h3>
								<p>
									Selected work will appear here as each project is ready to share.
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}

export default Work
