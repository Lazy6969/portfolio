import { useEffect, useRef } from 'react'

const CELL = 36
const DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]

function buildPath(W, H) {
  let x = Math.round((Math.random() * W) / CELL) * CELL
  let y = Math.round((Math.random() * H) / CELL) * CELL
  let d = Math.floor(Math.random() * 4)
  const pts = [[x, y]]
  const n = 5 + Math.floor(Math.random() * 9)
  for (let i = 0; i < n; i++) {
    // tourne de 0 / ±45° / ±90° maximum, jamais demi-tour
    const turn = [0, 0, 0, 1, -1, 2, -2][Math.floor(Math.random() * 7)]
    d = (d + turn + 8) % 8
    const len = 1 + Math.floor(Math.random() * 4)
    x += DIRS[d][0] * CELL * len
    y += DIRS[d][1] * CELL * len
    pts.push([x, y])
  }
  const cum = [0]
  for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]))
  return { pts, cum, total: cum[cum.length - 1], pos: Math.random() * cum[cum.length - 1], speed: 40 + Math.random() * 90 }
}

function pointAt(p, s) {
  if (s < 0 || s > p.total) return null
  let i = 1
  while (i < p.cum.length - 1 && p.cum[i] < s) i++
  const t = (s - p.cum[i - 1]) / (p.cum[i] - p.cum[i - 1] || 1)
  return [p.pts[i - 1][0] + (p.pts[i][0] - p.pts[i - 1][0]) * t, p.pts[i - 1][1] + (p.pts[i][1] - p.pts[i - 1][1]) * t]
}

export default function Circuit() {
  const ref = useRef(null)
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let W, H, paths, base, raf, last = performance.now()

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = window.innerWidth; H = window.innerHeight
      cv.width = W * dpr; cv.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      paths = Array.from({ length: Math.round((W * H) / 14000) }, () => buildPath(W, H))
      // couche statique : pistes + pastilles + puces
      base = document.createElement('canvas'); base.width = cv.width; base.height = cv.height
      const b = base.getContext('2d'); b.setTransform(dpr, 0, 0, dpr, 0, 0)
      b.lineJoin = 'round'; b.lineCap = 'round'
      paths.forEach((p) => {
        b.strokeStyle = 'rgba(255,214,10,.16)'; b.lineWidth = 1.5
        b.beginPath(); p.pts.forEach(([x, y], i) => (i ? b.lineTo(x, y) : b.moveTo(x, y))); b.stroke()
        const [sx, sy] = p.pts[0], [ex, ey] = p.pts[p.pts.length - 1]
        b.fillStyle = '#0c0c0d'; b.strokeStyle = 'rgba(255,214,10,.4)'
        ;[[sx, sy], [ex, ey]].forEach(([x, y]) => { b.beginPath(); b.arc(x, y, 4, 0, 7); b.fill(); b.stroke() })
      })
      for (let i = 0; i < Math.round((W * H) / 90000); i++) {
        const x = Math.round((Math.random() * W) / CELL) * CELL, y = Math.round((Math.random() * H) / CELL) * CELL
        const w = CELL * (1 + Math.floor(Math.random() * 2)), h = CELL * (1 + Math.floor(Math.random() * 2))
        b.fillStyle = '#101012'; b.strokeStyle = 'rgba(255,214,10,.3)'; b.lineWidth = 1.5
        b.fillRect(x, y, w, h); b.strokeRect(x, y, w, h)
        b.strokeStyle = 'rgba(255,214,10,.25)'
        for (let k = 8; k < w; k += 10) { b.beginPath(); b.moveTo(x + k, y); b.lineTo(x + k, y - 7); b.moveTo(x + k, y + h); b.lineTo(x + k, y + h + 7); b.stroke() }
      }
    }

    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05); last = now
      ctx.clearRect(0, 0, W, H)
      ctx.drawImage(base, 0, 0, W, H)
      paths.forEach((p) => {
        p.pos += p.speed * dt
        if (p.pos > p.total + 90) p.pos = -20
        for (let k = 0; k < 22; k++) {
          const pt = pointAt(p, p.pos - k * 4)
          if (!pt) continue
          const a = 1 - k / 22
          ctx.fillStyle = `rgba(255,214,10,${a * 0.9})`
          ctx.shadowColor = '#FFD60A'; ctx.shadowBlur = k === 0 ? 14 : 0
          ctx.beginPath(); ctx.arc(pt[0], pt[1], 2.6 * a + 0.6, 0, 7); ctx.fill()
        }
      })
      ctx.shadowBlur = 0
      raf = requestAnimationFrame(frame)
    }

    setup()
    if (reduce) { ctx.drawImage(base, 0, 0, W, H) } else raf = requestAnimationFrame(frame)
    let t
    const onResize = () => { clearTimeout(t); t = setTimeout(() => { cancelAnimationFrame(raf); setup(); if (!reduce) raf = requestAnimationFrame(frame) }, 200) }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])
  return <canvas ref={ref} className="circuit" aria-hidden />
}
