import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { motion, useScroll, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import Circuit from './components/Circuit.jsx'
import SmoothScroll from './components/SmoothScroll.jsx'
import SplitTitle from './components/SplitTitle.jsx'
import BandParticles from './components/Particles.jsx'
import Loader from './components/Loader.jsx'
import Project from './pages/Project.jsx'
const Globe3D = lazy(() => import('./components/Globe3D.jsx'))
import { projects, skills, contacts, slug, GH } from './data.js'
import { LangProvider, LANGS, useLang, bold } from './i18n.jsx'

const MLink = motion.create(Link)

const fade = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } } }
const Reveal = ({ children, delay = 0, className }) => (
  <motion.div className={className} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} transition={{ delay }}>
    {children}
  </motion.div>
)

function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40 }), sy = useSpring(y, { stiffness: 500, damping: 40 })
  const [big, setBig] = useState(false)
  useEffect(() => {
    const m = (e) => { x.set(e.clientX); y.set(e.clientY); setBig(!!e.target.closest('a,button,.card')) }
    window.addEventListener('mousemove', m)
    return () => window.removeEventListener('mousemove', m)
  }, [])
  return <motion.div className="cursor" style={{ x: sx, y: sy }} animate={{ scale: big ? 2.6 : 1 }} />
}

function Magnetic({ children }) {
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 200, damping: 15 }), y = useSpring(0, { stiffness: 200, damping: 15 })
  const move = (e) => { const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.3); y.set((e.clientY - r.top - r.height / 2) * 0.3) }
  return <motion.div ref={ref} style={{ x, y, display: 'inline-block' }} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0) }}>{children}</motion.div>
}

function Typing({ words }) {
  const [i, setI] = useState(0), [t, setT] = useState(''), [del, setDel] = useState(false)
  useEffect(() => {
    const w = words[i % words.length]
    const id = setTimeout(() => {
      if (!del) { setT(w.slice(0, t.length + 1)); if (t.length + 1 === w.length) setTimeout(() => setDel(true), 1200) }
      else { setT(w.slice(0, t.length - 1)); if (t.length - 1 === 0) { setDel(false); setI(i + 1) } }
    }, del ? 35 : 80)
    return () => clearTimeout(id)
  }, [t, del, i])
  return <span className="typing">{t}<i>|</i></span>
}

function Tilt({ children, className, to }) {
  const rx = useMotionValue(0), ry = useMotionValue(0)
  const sRx = useSpring(rx, { stiffness: 200, damping: 20 }), sRy = useSpring(ry, { stiffness: 200, damping: 20 })
  const move = (e) => { const r = e.currentTarget.getBoundingClientRect(); ry.set(((e.clientX - r.left) / r.width - 0.5) * 14); rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14) }
  return (
    <MLink to={to} className={className} style={{ rotateX: sRx, rotateY: sRy, transformPerspective: 800 }}
      onMouseMove={move} onMouseLeave={() => { rx.set(0); ry.set(0) }} whileHover={{ scale: 1.03 }}>
      {children}
    </MLink>
  )
}

const Blobs = () => (
  <div className="blobs" aria-hidden>
    <motion.i animate={{ x: [0, 400, 0], y: [0, 120, 0], scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }} />
    <motion.i animate={{ x: [0, -380, 0], y: [0, -150, 0], scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }} />
    <motion.i animate={{ x: [0, 250, -200, 0], y: [0, -120, 100, 0], scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }} />
  </div>
)

function Home() {
  const { t, lang } = useLang()
  const { scrollY } = useScroll()
  const photoY = useTransform(scrollY, [0, 600], [0, 80])
  const [filter, setFilter] = useState('all')
  const stacks = ['all', ...new Set(projects.flatMap((p) => p.stack))]
  const list = projects.filter((p) => filter === 'all' || p.stack.includes(filter))

  return (
    <>

      <header className="hero">
        <div className="hero-text">
          <motion.p className="mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>// Mahajanga · Moramanga, Madagascar</motion.p>
          <h1>
            {t.hi.split(' ').map((w, i) => (
              <motion.span key={i} initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.1, duration: 0.7 }} style={{ display: 'inline-block', marginRight: '.25em' }}>{w}</motion.span>
            ))}
            <br />
            <motion.span className="big" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.7, type: 'spring' }}>LAZY</motion.span>
          </h1>
          <motion.p className="fullname" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }}>RAMANANA Mirindra Michel</motion.p>
          <p className="role"><Typing key={lang} words={t.roles} /></p>
          <p className="lead">{t.lead} <b>CODE IS LIFE.</b></p>
          <div className="cta">
            <Magnetic><a className="btn primary" href="#contact">{t.ctaContact}</a></Magnetic>
            <Magnetic><a className="btn" href="#projects">{t.ctaProjects}</a></Magnetic>
            <Magnetic><a className="btn" href={GH} target="_blank" rel="noreferrer">GitHub</a></Magnetic>
          </div>
        </div>
        <motion.div className="photo" style={{ y: photoY }} initial={{ opacity: 0, scale: 0.85, rotate: 4 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.4, duration: 0.9 }}>
          <img src="/lazy.jpg" alt="Portrait de LAZY" />
          <motion.span className="chip c1" animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 4 }}>React</motion.span>
          <motion.span className="chip c2" animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 5 }}>Laravel</motion.span>
          <motion.span className="chip c3" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3.5 }}>C++</motion.span>
        </motion.div>
      </header>

      <div className="marquee"><div>{Array(4).fill('REACT ✦ LARAVEL ✦ PHP ✦ JAVASCRIPT ✦ C++ ✦ MYSQL ✦ GIT ✦ FL STUDIO ✦ PREMIERE PRO ✦ AFTER EFFECTS ✦ PHOTOSHOP ✦ LIGHTROOM ✦ ').join('')}</div></div>

      <section id="about">
        <SplitTitle key={lang}>{t.about}</SplitTitle>
        <div className="about-grid">
          <Reveal><p className="big-p">{bold(t.aboutText)}</p></Reveal>
          <div className="stats">
            {[['13+', t.stats[0]], ['5', t.stats[1]], ['ISSTM', t.stats[2]]].map(([n, l], i) => (
              <Reveal key={l} delay={i * 0.12}><div className="stat"><strong>{n}</strong><span>{l}</span></div></Reveal>
            ))}
          </div>
        </div>
        <Reveal>
          <div className="globe">
            <Suspense fallback={<p className="mono">{t.loading3d}</p>}><Globe3D /></Suspense>
            <span className="mono">{t.drag}</span>
          </div>
        </Reveal>
      </section>

      <div className="band"><Blobs /><BandParticles id="p1" /><section id="skills">
        <SplitTitle key={lang}>{t.skills}</SplitTitle>
        {['dev', 'media'].map((kind) => (
          <div key={kind}>
            <Reveal><h3 className="subtitle">{kind === 'dev' ? '</>' : '♪'} {t[kind]}</h3></Reveal>
            <div className="skill-grid">
              {skills.filter((s) => s.kind === kind).map((s, i) => (
                <Reveal key={s.id} delay={i * 0.1}>
                  <div className="skill">
                    <h3>{t.groups[s.id]}</h3>
                    <div className="tags">{s.items.map((it) => <motion.span key={it.n} className="tech" whileHover={{ y: -4, rotate: -3, backgroundColor: '#ffffff22' }}><img src={it.i} alt="" loading="lazy" />{it.n}</motion.span>)}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </section>

      </div>

      <section id="projects">
        <SplitTitle key={lang}>{t.projects}</SplitTitle>
        <div className="filters">
          {stacks.map((s) => <button key={s} className={filter === s ? 'on' : ''} onClick={() => setFilter(s)}>{s === 'all' ? t.all : s}</button>)}
        </div>
        <motion.div layout className="grid">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.div layout key={p.name} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className={p.featured ? 'wrap feat' : 'wrap'}>
                <Tilt to={`/projet/${slug(p.name)}`} className="card">
                  {p.featured && <em>{t.featured}</em>}
                  <h3>{p.name}</h3>
                  <p>{t.desc[slug(p.name)] || p.desc}</p>
                  <div className="tags small">{p.stack.map((t) => <span key={t}>{t}</span>)}</div>
                  <span className="arrow">{t.more}</span>
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <div className="band"><Blobs /><BandParticles id="p2" /><section id="contact" className="contact">
        <Reveal>
          <SplitTitle key={lang}>{t.contactTitle}</SplitTitle>
          <p className="big-p">{t.contactText}</p>
          <div className="contacts">
            {contacts.map((c, i) => (
              <motion.a key={c.n} href={c.href} target="_blank" rel="noreferrer" className="ccard" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6, scale: 1.03 }}>
                <img src={c.i} alt="" /><div><b>{c.n}</b><span>{c.v}</span></div>
              </motion.a>
            ))}
          </div>
        </Reveal>
      </section></div>
      <footer>© {new Date().getFullYear()} LAZY — {t.footer}</footer>
    </>
  )
}

const LINKS = ['about', 'skills', 'projects', 'contact']

function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -60 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

function Shell() {
  const loc = useLocation(), nav = useNavigate()
  const { scrollYProgress } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  const [loading, setLoading] = useState(true)
  const { t, lang, setLang } = useLang()

  useEffect(() => { const t = setTimeout(() => setLoading(false), 1800); return () => clearTimeout(t) }, [])
  useEffect(() => {
    if (loc.hash) { const t = setTimeout(() => scrollToId(loc.hash.slice(1)), 450); return () => clearTimeout(t) }
    window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0)
  }, [loc.pathname, loc.hash])

  const go = (e, id) => { e.preventDefault(); loc.pathname === '/' ? scrollToId(id) : nav('/#' + id) }

  return (
    <>
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
      <SmoothScroll />
      <Circuit />
      <Cursor />
      <motion.div className="progress" style={{ scaleX: bar }} />
      <nav>
        <Link to="/" className="logo"><img src="/lazy.jpg" alt="LAZY" className="avatar" /><b>LAZY<span>.</span></b></Link>
        <div>
          {LINKS.map((id) => <a key={id} href={'/#' + id} onClick={(e) => go(e, id)}>{t.nav[id]}</a>)}
          <div className="langs">{LANGS.map(([c, l]) => <button key={c} className={lang === c ? 'on' : ''} onClick={() => setLang(c)}>{l}</button>)}</div>
        </div>
      </nav>
      <AnimatePresence mode="wait">
        <motion.main key={loc.pathname} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.35 }}>
          <Routes location={loc}>
            <Route path="/" element={<Home />} />
            <Route path="/projet/:id" element={<Project />} />
            <Route path="*" element={<Project />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return <ParticlesProvider init={async (e) => { await loadSlim(e) }}><LangProvider><BrowserRouter><Shell /></BrowserRouter></LangProvider></ParticlesProvider>
}
