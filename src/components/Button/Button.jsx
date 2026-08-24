import PropTypes from 'prop-types'

const ButtonPrimary = ({
	href,
	target = '_self',
	rel,
	label,
	icon,
	classes,
	onClick,
}) => {
	if (href) {
		return (
			<a
				href={href}
				target={target}
				rel={rel}
				onClick={onClick}
				className={'btn btn-primary ' + classes}
			>
				{label}

				{icon ? (
					<span className='material-symbols-rounded' aria-hidden='true'>
						{icon}
					</span>
				) : undefined}
			</a>
		)
	} else {
		return (
			<button
				type='button'
				onClick={onClick}
				className={'btn btn-primary ' + classes}
			>
				{label}

				{icon ? (
					<span className='material-symbols-rounded' aria-hidden='true'>
						{icon}
					</span>
				) : undefined}
			</button>
		)
	}
}

ButtonPrimary.propTypes = {
	label: PropTypes.string.isRequired,
	href: PropTypes.string,
	target: PropTypes.string,
	rel: PropTypes.string,
	icon: PropTypes.string,
	classes: PropTypes.string,
	onClick: PropTypes.func,
}

/**
 * Outline Button
 */

const ButtonOutline = ({
	href,
	target = '_self',
	label,
	icon,
	classes,
	onClick,
}) => {
	if (href) {
		return (
			<a
				href={href}
				target={target}
				onClick={onClick}
				className={'btn btn-outline ' + classes}
			>
				{label}

				{icon ? (
					<span className='material-symbols-rounded' aria-hidden='true'>
						{icon}
					</span>
				) : undefined}
			</a>
		)
	} else {
		return (
			<button className={'btn btn-outline ' + classes}>
				{label}

				{icon ? (
					<span className='material-symbols-rounded' aria-hidden='true'>
						{icon}
					</span>
				) : undefined}
			</button>
		)
	}
}

ButtonOutline.propTypes = {
	label: PropTypes.string.isRequired,
	href: PropTypes.string,
	target: PropTypes.string,
	onClick: PropTypes.func,
	icon: PropTypes.string,
	classes: PropTypes.string,
}

export { ButtonOutline, ButtonPrimary }
