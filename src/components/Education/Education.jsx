import { useRef, useState } from 'react'
import { education } from '../../data/education'

const Education = () => {
	const [activeEducation, setActiveEducation] = useState(0)
	const [slideDirection, setSlideDirection] = useState('next')
	const [isDragging, setIsDragging] = useState(false)
	const [dragOffset, setDragOffset] = useState(0)
	const swipeStart = useRef(null)
	const wasDragged = useRef(false)
	const wheelLockUntil = useRef(0)

	const item = education[activeEducation]

	const showPrevious = () => {
		setSlideDirection('previous')
		setActiveEducation(
			(current) => (current - 1 + education.length) % education.length,
		)
	}

	const showNext = () => {
		setSlideDirection('next')
		setActiveEducation((current) => (current + 1) % education.length)
	}

	const handlePointerDown = (event) => {
		swipeStart.current = event.clientX
		wasDragged.current = false
		setIsDragging(false)
		setDragOffset(0)
		event.currentTarget.setPointerCapture(event.pointerId)
	}

	const handlePointerMove = (event) => {
		if (swipeStart.current === null) return
		const distance = event.clientX - swipeStart.current
		if (Math.abs(distance) > 8) {
			wasDragged.current = true
			setIsDragging(true)
		}
		if (isDragging || Math.abs(distance) > 8) setDragOffset(distance)
	}

	const handlePointerUp = (event) => {
		if (swipeStart.current === null) return
		const distance = event.clientX - swipeStart.current
		swipeStart.current = null
		setIsDragging(false)
		setDragOffset(0)
		if (wasDragged.current) {
			window.setTimeout(() => {
				wasDragged.current = false
			}, 0)
		}
		if (Math.abs(distance) < 50) return
		if (distance < 0) showNext()
		else showPrevious()
	}

	const handleCardClick = () => {
		if (wasDragged.current) {
			wasDragged.current = false
			return
		}
		showNext()
	}

	const handleCardKeyDown = (event) => {
		if (event.key === 'ArrowLeft') showPrevious()
		if (
			event.key === 'ArrowRight' ||
			event.key === 'Enter' ||
			event.key === ' '
		) {
			event.preventDefault()
			showNext()
		}
	}

	const handleWheel = (event) => {
		const horizontalDistance = Math.abs(event.deltaX)
		const verticalDistance = Math.abs(event.deltaY)
		if (horizontalDistance < 12 || horizontalDistance <= verticalDistance) return

		const now = Date.now()
		if (now < wheelLockUntil.current) return
		wheelLockUntil.current = now + 550
		if (event.cancelable) event.preventDefault()
		if (event.deltaX > 0) showNext()
		else showPrevious()
	}

	return (
		<section id='education' className='section'>
			<div className='container'>
				<h2 className='headline-2 mb-8 reveal-up'>Education</h2>

				<div
					className='education-carousel'
					role='region'
					aria-label='Education history'
				>
					<article
						key={activeEducation}
						className={`education-card education-card-${slideDirection} ${isDragging ? 'education-card-dragging' : ''} flex h-80 w-full min-w-0 cursor-pointer flex-col overflow-y-auto rounded-2xl bg-zinc-800 p-6 ring-1 ring-inset ring-zinc-50/5 md:h-72`}
						style={
							isDragging
								? {
										transform: `translate3d(${Math.max(-180, Math.min(180, dragOffset * 0.75))}px, 0, 0) rotate(${dragOffset / 70}deg)`,
									}
								: undefined
						}
						role='button'
						tabIndex={0}
						aria-label={`Education: ${item.title}. Click to view the next entry.`}
						onPointerDown={handlePointerDown}
						onPointerMove={handlePointerMove}
						onPointerUp={handlePointerUp}
						onWheel={handleWheel}
						onKeyDown={handleCardKeyDown}
						onClick={handleCardClick}
						onPointerCancel={() => {
							swipeStart.current = null
							wasDragged.current = false
							setIsDragging(false)
							setDragOffset(0)
						}}
					>
						<div className='education-card-header'>
							<div className='education-card-period'>
								<span className='material-symbols-rounded' aria-hidden='true'>
									event
								</span>
								{item.period}
							</div>
							<span className='education-card-index'>
								{String(activeEducation + 1).padStart(2, '0')}
							</span>
						</div>

						<div className='education-card-content'>
							<p className='education-card-kicker'>Academic journey</p>
							<h3 className='title-1 break-words'>{item.institution}</h3>
							<p className='education-card-degree break-words'>{item.title}</p>
							<p className='education-card-description break-words'>
								{item.description}
							</p>
						</div>

						<div className='education-card-footer'>
							{item.grade ? (
								<span className='education-card-grade'>Grade {item.grade}</span>
							) : (
								<span className='education-card-current'>In progress</span>
							)}
							<span className='education-card-hint'>Swipe to explore</span>
						</div>
					</article>

					<div
						className='mt-4 flex items-center justify-center gap-2'
						aria-label='Education entries'
					>
						{education.map((entry, index) => (
							<button
								key={entry.title}
								type='button'
								aria-label={`Show ${entry.title}`}
								aria-pressed={activeEducation === index}
								className={`h-2 rounded-full transition-all ${activeEducation === index ? 'w-6 bg-sky-400' : 'w-2 bg-zinc-600'}`}
								onClick={() => {
									setSlideDirection(
										index > activeEducation ? 'next' : 'previous',
									)
									setActiveEducation(index)
								}}
							/>
						))}
					</div>
					<p className='sr-only' aria-live='polite'>
						Education entry {activeEducation + 1} of {education.length}:{' '}
						{item.title}
					</p>
				</div>
			</div>
		</section>
	)
}

export default Education
