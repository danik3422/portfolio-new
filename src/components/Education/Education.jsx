import { useRef, useState } from 'react'
import { education } from '../../data/education'

const Education = () => {
	const [activeEducation, setActiveEducation] = useState(0)
	const [slideDirection, setSlideDirection] = useState('next')
	const [isDragging, setIsDragging] = useState(false)
	const [dragOffset, setDragOffset] = useState(0)
	const swipeStart = useRef(null)
	const wasDragged = useRef(false)
	const suppressClickUntil = useRef(0)
	const activePointerId = useRef(null)
	const wheelLockUntil = useRef(0)

	const item = education[activeEducation]

	const clearTextSelection = () => {
		window.getSelection()?.removeAllRanges()
	}

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
		clearTextSelection()
		swipeStart.current = event.clientX
		activePointerId.current = event.pointerId
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
			event.preventDefault()
		}
		if (isDragging || Math.abs(distance) > 8) setDragOffset(distance)
	}

	const handlePointerUp = (event) => {
		if (swipeStart.current === null) return
		const distance = event.clientX - swipeStart.current
		swipeStart.current = null
		if (activePointerId.current !== null && event.currentTarget.hasPointerCapture(activePointerId.current)) {
			event.currentTarget.releasePointerCapture(activePointerId.current)
		}
		activePointerId.current = null
		setIsDragging(false)
		setDragOffset(0)
		clearTextSelection()
		if (wasDragged.current) {
			suppressClickUntil.current = performance.now() + 350
		}
		if (Math.abs(distance) < 50) return
		if (distance < 0) showNext()
		else showPrevious()
	}

	const handleCardClick = () => {
		if (performance.now() < suppressClickUntil.current) return
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
			<div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<h2 className='headline-2 mb-8 reveal-up'>Education</h2>

				<div
					className='education-carousel'
					role='region'
					aria-label='Education history'
				>
					<article
						key={activeEducation}
						className={`education-card bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/70 dark:border-neutral-800 shadow-sm rounded-2xl education-card-${slideDirection} ${isDragging ? 'education-card-dragging' : ''} flex w-full min-w-0 cursor-pointer flex-col p-6`}
						style={
							isDragging
								? {
												transform: `translate3d(${Math.max(-180, Math.min(180, dragOffset * 0.75))}px, 0, 0) rotate(${dragOffset / 140}deg)`,
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
							activePointerId.current = null
							wasDragged.current = false
							suppressClickUntil.current = performance.now() + 350
							setIsDragging(false)
							setDragOffset(0)
							clearTextSelection()
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

					<div className='education-controls'>
						<button
							type='button'
							className='education-control'
							aria-label='Show previous education entry'
						title='Previous entry'
							onClick={showPrevious}
						>
							<span className='material-symbols-rounded' aria-hidden='true'>
								arrow_back
							</span>
						</button>

						<div className='education-dots' aria-label='Education entries'>
						{education.map((entry, index) => (
							<button
								key={entry.title}
								type='button'
								aria-label={`Show ${entry.title}`}
								aria-pressed={activeEducation === index}
								className={`h-2 rounded-full transition-all ${activeEducation === index ? 'w-6 bg-[var(--coral)]' : 'w-2 bg-[var(--line)]'}`}
								onClick={() => {
									setSlideDirection(
										index > activeEducation ? 'next' : 'previous',
									)
									setActiveEducation(index)
								}}
							/>
						))}
						</div>

						<button
							type='button'
							className='education-control'
							aria-label='Show next education entry'
							title='Next entry'
							onClick={showNext}
						>
							<span className='material-symbols-rounded' aria-hidden='true'>
								arrow_forward
							</span>
						</button>
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
