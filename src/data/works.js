export const works = [
	{
		imgSrc: '/images/projects/kanbanhub.png',
		title: 'KanbanHub',
		visible: true,
		description:
			'A calm, collaborative workspace for capturing tasks, aligning a team, and keeping progress visible from first idea to final update.',
		longDescription:
			'KanbanHub is a team workspace for managing tasks and workflows with clarity. It helps growing teams keep ownership, progress, decisions, and next actions visible in one place instead of scattered across chats and manual updates.',
		features: [
			'Realtime collaboration powered by Socket.IO',
			'Role-based access with private, workspace, and public boards',
			'Task details with assignees, labels, priority, checklists, due dates, and comments',
			'Invitations, realtime activity, email notifications, and a filterable notification center',
			'Social login, passkey authentication, and session security controls',
		],
		security:
			'I paid special attention to security: board and task access checks, CSRF protection, rate limiting, secure cookies, input validation, provider ownership checks, and protected WebAuthn challenges.',
		technologies: [
			'React',
			'Vite',
			'Tailwind CSS',
			'Node.js',
			'Express',
			'MongoDB',
			'Mongoose',
			'Socket.IO',
			'Firebase Authentication',
			'WebAuthn',
			'SimpleWebAuthn',
			'Brevo API',
			'Cloudinary',
			'Zod',
			'JWT',
			'HttpOnly cookies',
			'Helmet',
			'CORS',
			'CSRF protection',
			'Rate limiting',
		],
		tags: ['SaaS', 'Realtime', 'Team productivity'],
		projectLink: 'https://kanbanhub.app/',
	},
]
