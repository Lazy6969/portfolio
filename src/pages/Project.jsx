import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects, slug } from '../data.js'
import { useLang } from '../i18n.jsx'

export default function Project() {
  const { id } = useParams()
  const { t } = useLang()
  const p = projects.find((x) => slug(x.name) === id)
  if (!p) return <section className="detail"><h2>{t.notFound}</h2><Link className="btn" to="/">←</Link></section>
  return (
    <section className="detail">
      <Link className="back" to="/#projects">{t.back}</Link>
      <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>{p.name}</motion.h1>
      <div className="tags">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
      <p className="big-p">{t.desc[slug(p.name)] || p.desc}</p>
      <div className="cta">
        <a className="btn primary" href={p.url} target="_blank" rel="noreferrer">{t.source}</a>
        {p.live && <a className="btn" href={p.live} target="_blank" rel="noreferrer">{t.live}</a>}
      </div>
    </section>
  )
}
