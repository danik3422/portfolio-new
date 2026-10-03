import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

const siteUrl = 'https://danylodev.com'
const name = 'Danylo Syloats'
const skills =
	'Java, Spring Boot, JavaScript, TypeScript, React, Next.js, Node.js, Express, REST APIs, PostgreSQL, MongoDB, Docker, Git, Linux, Redux, Tailwind CSS, testing, CI/CD'
const aboutText =
	"I'm Danylo, a Java and JavaScript developer who enjoys turning business ideas into software people can use every day. I build clear interfaces with React and reliable backend services with Node.js, Java, REST APIs, and PostgreSQL. I'm looking for a junior-to-mid-level Java or JavaScript role where I can contribute from day one."

const esc = (value) =>
	String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')

const loadData = async (root, file) =>
	import(pathToFileURL(path.join(root, 'src/data', file)).href)

const setTag = (html, pattern, replacement) =>
	pattern.test(html) ? html.replace(pattern, replacement) : html

const applyMeta = (html, { title, description, path: pagePath, type, robots }) => {
	const url = `${siteUrl}${pagePath}`
	const t = esc(title)
	const d = esc(description)
	let out = html
	out = setTag(out, /<title>[\s\S]*?<\/title>/, `<title>${t}</title>`)
	out = setTag(out, /(<meta name="description" content=")[^"]*"/, `$1${d}"`)
	out = setTag(out, /(<meta property="og:title" content=")[^"]*"/, `$1${t}"`)
	out = setTag(out, /(<meta property="og:description" content=")[^"]*"/, `$1${d}"`)
	out = setTag(out, /(<meta property="og:type" content=")[^"]*"/, `$1${type}"`)
	out = setTag(out, /(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
	out = setTag(out, /(<meta name="twitter:title" content=")[^"]*"/, `$1${t}"`)
	out = setTag(out, /(<meta name="twitter:description" content=")[^"]*"/, `$1${d}"`)
	out = setTag(out, /(<meta name="twitter:url" content=")[^"]*"/, `$1${url}"`)
	out = setTag(out, /(<link rel="canonical" href=")[^"]*"/, `$1${url}"`)
	if (robots) {
		out = setTag(
			out,
			/<meta name="robots" content="[^"]*" \/>/,
			`<meta name="robots" content="${robots}" />`,
		)
		out = out.replace(/\s*<meta name="googlebot"[^>]*>/, '')
	}
	return out
}

const setSchema = (html, schema) =>
	html.replace(
		/<script type="application\/ld\+json" data-page-schema>[\s\S]*?<\/script>/,
		`<script type="application/ld+json" data-page-schema>${JSON.stringify(schema)}</script>`,
	)

const setFallback = (html, body) =>
	html.replace('<!--app-fallback-->', body)

const write = (distDir, route, html) => {
	const target =
		route === '/404'
			? path.join(distDir, '404.html')
			: path.join(distDir, route, 'index.html')
	fs.mkdirSync(path.dirname(target), { recursive: true })
	fs.writeFileSync(target, html)
}

export const seoPrerender = () => {
	let root = process.cwd()
	let outDir = 'dist'

	return {
		name: 'seo-prerender',
		apply: 'build',
		configResolved(config) {
			root = config.root
			outDir = config.build.outDir
		},
		async closeBundle() {
			const distDir = path.resolve(root, outDir)
			const indexPath = path.join(distDir, 'index.html')
			if (!fs.existsSync(indexPath)) return

			const base = fs.readFileSync(indexPath, 'utf8')
			const { works } = await loadData(root, 'works.js')
			const { education } = await loadData(root, 'education.js')
			const { certifications } = await loadData(root, 'certifications.js')
			const { blogPosts } = await loadData(root, 'blog.js')
			const projects = works.filter((work) => work.visible !== false)

			const home = `<main>
<h1>${name} — Java and JavaScript full-stack developer in Warsaw, Poland</h1>
<p>${esc(aboutText)}</p>
<h2>Skills</h2><p>${esc(skills)}</p>
<h2>Projects</h2>
${projects
	.map(
		(p) =>
			`<article><h3>${esc(p.title)}</h3><p>${esc(p.longDescription || p.description)}</p><p>Technologies: ${esc((p.technologies || p.tags).join(', '))}</p><p><a href="${esc(p.projectLink)}">${esc(p.projectLinkLabel || 'Live project')}</a>${p.repoLink ? ` · <a href="${esc(p.repoLink)}">Source code</a>` : ''}</p></article>`,
	)
	.join('\n')}
<h2>Education</h2>
<ul>${education.map((e) => `<li>${esc(e.title)}, ${esc(e.institution)} (${esc(e.period)})</li>`).join('')}</ul>
<h2>Languages</h2>
<ul>${certifications.map((c) => `<li>${esc(c.title)}</li>`).join('')}</ul>
<h2>Blog</h2>
<ul>${blogPosts.map((b) => `<li><a href="/blog/${esc(b.slug)}">${esc(b.title)}</a></li>`).join('')}</ul>
<h2>Links</h2>
<ul><li><a href="mailto:danylo.syloats@gmail.com">danylo.syloats@gmail.com</a></li><li><a href="https://github.com/danik3422">GitHub</a></li><li><a href="https://www.linkedin.com/in/danylo-syloats/">LinkedIn</a></li><li><a href="https://t.me/enuxe">Telegram</a></li></ul>
</main>`
			fs.writeFileSync(indexPath, setFallback(base, home))

			const blogTitle = `Blog | ${name} - Java & JavaScript Developer`
			const blogDescription =
				'Notes by Danylo Syloats on building software with React, Node.js and Java, designing clear interfaces, and shipping better work.'
			let blog = applyMeta(base, {
				title: blogTitle,
				description: blogDescription,
				path: '/blog',
				type: 'website',
			})
			blog = setSchema(blog, {
				'@context': 'https://schema.org',
				'@type': 'Blog',
				'@id': `${siteUrl}/blog#blog`,
				'url': `${siteUrl}/blog`,
				'name': `${name} Blog`,
				'description': blogDescription,
				'author': { '@id': `${siteUrl}/#person` },
				'inLanguage': 'en',
			})
			blog = setFallback(
				blog,
				`<main><h1>Blog</h1><ul>${blogPosts.map((b) => `<li><a href="/blog/${esc(b.slug)}">${esc(b.title)}</a> — ${esc(b.excerpt)}</li>`).join('')}</ul><p><a href="/">Back to portfolio</a></p></main>`,
			)
			write(distDir, '/blog', blog)

			for (const post of blogPosts) {
				const route = `/blog/${post.slug}`
				let page = applyMeta(base, {
					title: `${post.title} | ${name}`,
					description: post.excerpt,
					path: route,
					type: 'article',
				})
				page = setSchema(page, {
					'@context': 'https://schema.org',
					'@type': 'Article',
					'@id': `${siteUrl}${route}#article`,
					'url': `${siteUrl}${route}`,
					'headline': post.title,
					'description': post.excerpt,
					'author': { '@id': `${siteUrl}/#person` },
					'publisher': { '@id': `${siteUrl}/#person` },
					'mainEntityOfPage': `${siteUrl}${route}`,
					'inLanguage': 'en',
				})
				page = setFallback(
					page,
					`<main><article><h1>${esc(post.title)}</h1><p>${esc(post.category)} · ${esc(post.date)} · ${esc(post.readTime)}</p>${post.content.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}</article><p><a href="/blog">All posts</a></p></main>`,
				)
				write(distDir, route, page)
			}

			let notFound = applyMeta(base, {
				title: `Page not found | ${name}`,
				description: 'This page does not exist. Return to the portfolio of Danylo Syloats.',
				path: '/',
				type: 'website',
				robots: 'noindex, follow',
			})
			notFound = setSchema(notFound, { '@context': 'https://schema.org' })
			notFound = setFallback(
				notFound,
				'<main><h1>Page not found</h1><p><a href="/">Back to the portfolio</a></p></main>',
			)
			write(distDir, '/404', notFound)

			const today = new Date().toISOString().slice(0, 10)
			const urls = [
				{ loc: '/', priority: '1.0', changefreq: 'monthly' },
				{ loc: '/blog', priority: '0.6', changefreq: 'monthly' },
				...blogPosts.map((post) => ({
					loc: `/blog/${post.slug}`,
					priority: '0.5',
					changefreq: 'yearly',
				})),
			]
			fs.writeFileSync(
				path.join(distDir, 'sitemap.xml'),
				`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
					.map(
						(u) =>
							`  <url>\n    <loc>${siteUrl}${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
					)
					.join('\n')}\n</urlset>\n`,
			)

			fs.writeFileSync(
				path.join(distDir, 'llms.txt'),
				`# ${name}

> Java and JavaScript full-stack developer based in Warsaw, Poland, open to junior-to-mid-level roles. Builds React, Spring Boot, Node.js and PostgreSQL applications.

- Portfolio: ${siteUrl}/
- Email: danylo.syloats@gmail.com
- GitHub: https://github.com/danik3422
- LinkedIn: https://www.linkedin.com/in/danylo-syloats/
- Telegram: https://t.me/enuxe

## Skills
${skills}

## Projects
${projects.map((p) => `- [${p.title}](${p.projectLink}): ${p.description}${p.repoLink ? ` Source: ${p.repoLink}` : ''}`).join('\n')}

## Education
${education.map((e) => `- ${e.title}, ${e.institution} (${e.period})`).join('\n')}

## Languages
${certifications.map((c) => `- ${c.title}`).join('\n')}

## Blog
${blogPosts.map((b) => `- [${b.title}](${siteUrl}/blog/${b.slug}): ${b.excerpt}`).join('\n')}
`,
			)
		},
	}
}
