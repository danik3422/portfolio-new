const siteUrl = 'https://danylodev.com'
const defaultImage = `${siteUrl}/images/projects/kanbanhub.png`

const setMeta = (attribute, key, content) => {
	let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
	if (!element) {
		element = document.createElement('meta')
		element.setAttribute(attribute, key)
		document.head.appendChild(element)
	}
	element.setAttribute('content', content)
}

export const setPageMetadata = ({
	title,
	description,
	path,
	type = 'website',
	image = defaultImage,
	imageAlt = 'Danylo Syloats portfolio preview',
}) => {
	const canonicalUrl = `${siteUrl}${path}`
	document.title = title
	document.head
		.querySelector('link[rel="canonical"]')
		?.setAttribute('href', canonicalUrl)
	setMeta('name', 'description', description)
	setMeta('property', 'og:title', title)
	setMeta('property', 'og:description', description)
	setMeta('property', 'og:type', type)
	setMeta('property', 'og:url', canonicalUrl)
	setMeta('property', 'og:image', image)
	setMeta('property', 'og:image:alt', imageAlt)
	setMeta('name', 'twitter:title', title)
	setMeta('name', 'twitter:description', description)
	setMeta('name', 'twitter:url', canonicalUrl)
	setMeta('name', 'twitter:image', image)
	setMeta('name', 'twitter:image:alt', imageAlt)
}

export const setStructuredData = (data) => {
	let script = document.head.querySelector('script[data-page-schema]')
	if (!script) {
		script = document.createElement('script')
		script.type = 'application/ld+json'
		script.dataset.pageSchema = 'true'
		document.head.appendChild(script)
	}
	script.textContent = JSON.stringify(data)
}

export { siteUrl }
