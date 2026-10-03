const CONTACT_API_URL = 'https://contact-telegram.vercel.app/api/contact'

export const handler = async (event) => {
	if (event.httpMethod !== 'POST') {
		return {
			statusCode: 405,
			headers: { Allow: 'POST', 'Content-Type': 'application/json' },
			body: JSON.stringify({ error: 'Method not allowed' }),
		}
	}

	const token = process.env.CONTACT_API_TOKEN
	if (!token) {
		console.error('CONTACT_API_TOKEN is not configured')
		return {
			statusCode: 500,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ error: 'Contact service is not configured' }),
		}
	}

	let payload
	try {
		payload = JSON.parse(event.body || '')
	} catch {
		return {
			statusCode: 400,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ error: 'Invalid JSON body' }),
		}
	}

	if (payload?.website) {
		return {
			statusCode: 400,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ error: 'Spam submission rejected' }),
		}
	}

	const { name, email, message } = payload ?? {}
	if (
		typeof name !== 'string' ||
		typeof email !== 'string' ||
		typeof message !== 'string'
	) {
		return {
			statusCode: 400,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ error: 'Name, email, and message are required' }),
		}
	}

	const url = new URL(CONTACT_API_URL)
	url.searchParams.set('token', token)

	try {
		const upstreamResponse = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...(event.headers.origin ? { Origin: event.headers.origin } : {}),
			},
			body: JSON.stringify({ name, email, message }),
		})

		return {
			statusCode: upstreamResponse.status,
			headers: {
				'Content-Type':
					upstreamResponse.headers.get('content-type') || 'application/json',
			},
			body: await upstreamResponse.text(),
		}
	} catch (error) {
		console.error('Contact API request failed:', error)
		return {
			statusCode: 502,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ error: 'Contact service is unavailable' }),
		}
	}
}
