import { Particles } from '@tsparticles/react'

export default function BandParticles({ id }) {
  return (
    <Particles id={id} className="particles" options={{
      fullScreen: { enable: false }, fpsLimit: 60, detectRetina: true,
      particles: {
        number: { value: 55, density: { enable: true, area: 900 } },
        color: { value: '#111111' }, opacity: { value: 0.5 }, size: { value: { min: 1.5, max: 3.5 } },
        links: { enable: true, color: '#111111', opacity: 0.25, distance: 140 },
        move: { enable: true, speed: 1.1, outModes: 'bounce' },
      },
      interactivity: { events: { onHover: { enable: true, mode: 'grab' }, onClick: { enable: true, mode: 'push' } }, modes: { grab: { distance: 160, links: { opacity: 0.6 } }, push: { quantity: 3 } } },
    }} />
  )
}
