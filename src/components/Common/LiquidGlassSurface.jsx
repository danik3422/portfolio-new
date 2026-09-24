import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import PropTypes from 'prop-types'

export const LiquidGlassSurface = ({ className = '', cornerRadius = 9999 }) => {
	const mountRef = useRef(null)

	useEffect(() => {
		const container = mountRef.current
		if (!container) return undefined

		const scene = new THREE.Scene()
		const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			premultipliedAlpha: false,
			antialias: true,
		})
		renderer.setClearColor(0x000000, 0)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		container.appendChild(renderer.domElement)

		const vertexShader = `
			varying vec2 vUv;
			void main() {
				vUv = uv;
				gl_Position = vec4(position, 1.0);
			}
		`

		const fragmentShader = `
			uniform vec2 u_resolution;
			uniform float u_time;
			varying vec2 vUv;

			void main() {
				vec2 uv = gl_FragCoord.xy / u_resolution.xy;
				vec2 aspectUv = (uv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);
				float distanceFromCenter = length(aspectUv);
				float edgeRefract = pow(clamp(distanceFromCenter * 1.35, 0.0, 1.0), 3.0);
				float redShift = edgeRefract * 0.045;
				float blueShift = edgeRefract * 0.015;
				float topHighlight = smoothstep(0.18, 0.0, distance(uv, vec2(0.5, 0.98)));
				gl_FragColor = vec4(1.0, 1.0, 1.0, topHighlight * 0.12 + edgeRefract * 0.04);
			}
		`

		const geometry = new THREE.PlaneGeometry(2, 2)
		const material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: {
				u_resolution: { value: new THREE.Vector2(1, 1) },
				u_time: { value: 0 },
			},
			transparent: true,
			blending: THREE.NormalBlending,
			depthWrite: false,
		})
		const mesh = new THREE.Mesh(geometry, material)
		scene.add(mesh)

		const resize = () => {
			const width = Math.max(container.clientWidth, 1)
			const height = Math.max(container.clientHeight, 1)
			renderer.setSize(width, height, false)
			material.uniforms.u_resolution.value.set(width, height)
		}

		let animationId
		const animate = (time) => {
			material.uniforms.u_time.value = time * 0.001
			renderer.render(scene, camera)
			animationId = requestAnimationFrame(animate)
		}

		resize()
		animate(0)
		window.addEventListener('resize', resize, { passive: true })

		return () => {
			window.removeEventListener('resize', resize)
			cancelAnimationFrame(animationId)
			geometry.dispose()
			material.dispose()
			renderer.dispose()
			if (renderer.domElement.parentNode === container) {
				container.removeChild(renderer.domElement)
			}
		}
	}, [])

	return (
		<div
			ref={mountRef}
			className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
			style={{ borderRadius: `${cornerRadius}px` }}
			aria-hidden='true'
		/>
	)
}

LiquidGlassSurface.propTypes = {
	className: PropTypes.string,
	cornerRadius: PropTypes.number,
}
