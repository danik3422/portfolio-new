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
						<div className='col-span-full rounded-2xl bg-zinc-800 p-6 ring-1 ring-inset ring-zinc-50/5'>
							<h3 className='title-1 mb-2'>New project</h3>
							<p className='text-zinc-400'>In progress</p>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}

export default Work
