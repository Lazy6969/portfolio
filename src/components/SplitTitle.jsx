import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Titre dont chaque lettre arrive en 3D au scroll (GSAP + ScrollTrigger)
export default function SplitTitle({ children }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('.ch'), {
        yPercent: 120, rotateX: -80, opacity: 0, stagger: 0.04, duration: 0.9, ease: 'power4.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <h2 ref={ref} aria-label={children}>
      {[...String(children)].map((c, i) => (
        <span key={i} className="mask" aria-hidden><span className="ch">{c === ' ' ? ' ' : c}</span></span>
      ))}
    </h2>
  )
}
