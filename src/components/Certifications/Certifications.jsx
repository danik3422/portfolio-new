import { certifications } from '../../data/certifications'

const Certifications = () => {
	return (
		<section id='certifications' className='section'>
			<div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='certification-section-heading reveal-up'>
					<div>
						<p className='certification-eyebrow'>Proof of growth</p>
						<h2 className='headline-2'>Licenses &amp; certifications</h2>
						<p className='certification-intro'>
							Credentials that support how I communicate, collaborate, and build
							digital products.
						</p>
					</div>
					<div className='certification-count' aria-label={`${certifications.length} credentials`}>
						<strong>{String(certifications.length).padStart(2, '0')}</strong>
						<span>credentials</span>
					</div>
				</div>

				<div className='certification-list'>
					{certifications.map(({ title, category, status, description }, key) => (
						<article
							key={key}
							className='certification-card bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/70 dark:border-neutral-800 shadow-sm rounded-2xl reveal-up'
							style={{ '--certification-index': key }}
						>
							<span className='certification-card-number'>0{key + 1}</span>
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
