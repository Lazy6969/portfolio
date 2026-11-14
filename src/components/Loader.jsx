import { Lottie } from 'lottie-react'
import { motion } from 'framer-motion'

const ease = { i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } }
const tr = { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
const yellow = { a: 0, k: [1, 0.839, 0.039, 1] }
const layer = (ind, nm, ks, shapes) => ({ ddd: 0, ind, ty: 4, nm, sr: 1, ao: 0, ip: 0, op: 60, st: 0, bm: 0, ks, shapes })

// Animation Lottie générée à la main : carré qui tourne + point qui pulse
const anim = {
  v: '5.7.0', fr: 30, ip: 0, op: 60, w: 200, h: 200, nm: 'loader', ddd: 0, assets: [],
  layers: [
    layer(1, 'square', {
      o: { a: 0, k: 100 }, p: { a: 0, k: [100, 100, 0] }, a: { a: 0, k: [0, 0, 0] },
      r: { a: 1, k: [{ t: 0, s: [0], ...ease }, { t: 60, s: [360] }] },
      s: { a: 1, k: [{ t: 0, s: [100, 100, 100], ...ease }, { t: 30, s: [62, 62, 100], ...ease }, { t: 60, s: [100, 100, 100] }] },
    }, [{ ty: 'gr', it: [
      { ty: 'rc', d: 1, s: { a: 0, k: [90, 90] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 22 } },
      { ty: 'st', c: yellow, o: { a: 0, k: 100 }, w: { a: 0, k: 9 }, lc: 2, lj: 2 }, tr] }]),
    layer(2, 'dot', {
      o: { a: 0, k: 100 }, r: { a: 0, k: 0 }, p: { a: 0, k: [100, 100, 0] }, a: { a: 0, k: [0, 0, 0] },
      s: { a: 1, k: [{ t: 0, s: [60, 60, 100], ...ease }, { t: 30, s: [140, 140, 100], ...ease }, { t: 60, s: [60, 60, 100] }] },
    }, [{ ty: 'gr', it: [
      { ty: 'el', d: 1, s: { a: 0, k: [26, 26] }, p: { a: 0, k: [0, 0] } },
      { ty: 'fl', c: yellow, o: { a: 0, k: 100 }, r: 1 }, tr] }]),
  ],
}

export default function Loader() {
  return (
    <motion.div className="loader" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.6 }}>
      <Lottie src={anim} autoplay loop style={{ width: 160, height: 160 }} />
      <motion.p className="mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>&lt;LAZY /&gt;</motion.p>
    </motion.div>
  )
}
