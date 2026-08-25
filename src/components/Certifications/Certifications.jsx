import { certifications } from '../../data/certifications'

const Certifications = () => {
	return (
		<section id='certifications' className='section'>
			<div className='container'>
				<h2 className='headline-2 mb-8 reveal-up'>Licenses &amp; certifications</h2>
				<p className='certification-intro reveal-up'>
					A growing collection of credentials that support my work across software,
					technology, and digital products.
				</p>

				<div className='certification-list'>
					{certifications.map(({ title, category, status, description }, key) => (
						<article
							key={key}
							className='certification-card reveal-up'
							style={{ '--certification-index': key }}
						>
							<div className='certification-card-icon' aria-hidden='true'>
								<span className='material-symbols-rounded'>verified</span>
							</div>
							<div className='certification-card-content'>
								<div className='certification-card-meta'>
									<span>{category}</span>
									<span className='certification-status'>{status}</span>
								</div>
								<h3 className='title-1'>{title}</h3>
								<p>{description}</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}

export default Certifications
