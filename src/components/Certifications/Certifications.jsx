import { certifications } from '../../data/certifications'

const Certifications = () => {
	return (
		<section id='certifications' className='section'>
			<div className='container'>
				<h2 className='headline-2 mb-8 reveal-up'>Licenses &amp; certifications</h2>

				<div className='grid gap-4 md:grid-cols-2'>
					{certifications.map(({ title, description }, key) => (
						<article
							key={key}
							className='rounded-2xl bg-zinc-800 p-6 ring-1 ring-inset ring-zinc-50/5 reveal-up'
						>
							<h3 className='title-1 mb-3'>{title}</h3>
							<p className='text-zinc-400'>{description}</p>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}

export default Certifications
