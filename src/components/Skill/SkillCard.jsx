import PropTypes from 'prop-types'

const SkillCard = ({ imgSrc, label, desc, classes }) => {
	return (
		<article className={'skill-card bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/70 dark:border-neutral-800 shadow-sm rounded-2xl group ' + classes}>
			<figure className='skill-card-icon'>
				<img src={imgSrc} width={32} height={32} alt={label} />
			</figure>

			<div className='skill-card-content'>
				<h3>{label}</h3>

				<p>{desc}</p>
			</div>
		</article>
	)
}

SkillCard.propTypes = {
	imgSrc: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired,
	classes: PropTypes.string,
}

export default SkillCard
