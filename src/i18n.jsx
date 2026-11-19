import { createContext, useContext, useEffect, useState } from 'react'

export const LANGS = [['fr', 'FR'], ['mg', 'MG'], ['en', 'EN']]

const dict = {
  fr: {
    nav: { about: 'À propos', skills: 'Compétences', projects: 'Projets', contact: 'Contact' },
    hi: 'Salut, je suis',
    roles: ['Développeur Full-Stack', 'Développeur Laravel & React', 'Beatmaker', 'Vidéaste', 'Photographe'],
    lead: "Étudiant en Génie Informatique à l'ISSTM. Je construis des plateformes web modernes, de la base de données à l'animation. Je crée aussi de la musique, des vidéos et des photos.",
    ctaContact: 'Me contacter ✉', ctaProjects: 'Mes projets',
    about: 'À propos',
    aboutText: "Je m'appelle Mirindra, alias **LAZY**. Je transforme des idées en applications web concrètes : plateformes musicales, sites institutionnels, outils de gestion et financement participatif. Et je donne vie à mes idées par le son, la vidéo et la photo.",
    stats: ['Dépôts GitHub', 'Langages maîtrisés', 'Génie Informatique'],
    drag: '↺ glisse pour tourner', loading3d: 'Chargement 3D…',
    skills: 'Compétences', dev: 'Développement', media: 'Multimédia',
    groups: { front: 'Frontend', back: 'Backend', sys: 'Systèmes & outils', beat: 'Beatmaker', video: 'Vidéaste', photo: 'Photographe' },
    projects: 'Projets', all: 'Tous', featured: '★ Projet phare', more: 'Voir le détail →',
    contactTitle: 'Travaillons ensemble', contactText: 'Un projet, une idée, une collaboration ? Écrivons-nous.',
    footer: 'Fait avec React & Framer Motion',
    back: '← Tous les projets', source: 'Code source ↗', live: 'Voir en ligne ↗', notFound: 'Projet introuvable.',
    desc: {
      'gona-vibe': 'Plateforme musicale full-stack.',
      'fandrik-i-mirindra': "Jeu 3D malgache pour Android : 80 niveaux, 25 personnages, pièges cachés.",
      'mirindra-funding': 'Financement participatif pour les projets de classe.',
      'site-isstm': "Nouvelle version du site de l'établissement.",
      'game-lazy': 'Jeu web interactif.',
      'convertisseur-mondial': 'Convertisseur de devises et d\'unités.',
      'gestion-boutique': 'Gestion de boutique côté client.',
      'gestion-bibliotheque': 'Application console de gestion de bibliothèque.',
      'elci-cours-du-soir': 'Plateforme de gestion de cours du soir.',
    },
  },
  mg: {
    nav: { about: 'Momba ahy', skills: 'Fahaizana', projects: 'Tetikasa', contact: 'Fifandraisana' },
    hi: 'Manao ahoana, izaho dia',
    roles: ['Mpamorona rindrambaiko Full-Stack', 'Mpamorona Laravel & React', 'Beatmaker', 'Mpamorona horonan-tsary', 'Mpaka sary'],
    lead: "Mpianatra amin'ny Injeniera Informatika (Génie Informatique) ao amin'ny ISSTM aho. Manamboatra tranokala maoderina aho, manomboka amin'ny tahiry ka hatramin'ny animation. Mamorona mozika, horonan-tsary ary sary ihany koa aho.",
    ctaContact: 'Mifandraisa amiko ✉', ctaProjects: 'Ny tetikasako',
    about: 'Momba ahy',
    aboutText: "Mirindra no anarako, na **LAZY**. Mamadika hevitra ho rindrambaiko web tena izy aho: sehatra mozika, tranokalan'ny fikambanana, fitaovana fitantanana ary famatsiam-bola iombonana. Ary mampiaina ny hevitro amin'ny feo, horonan-tsary ary sary koa aho.",
    stats: ['Tahiry GitHub', 'Fiteny fantatro', 'Injeniera Informatika'],
    drag: '↺ ataovy mihodina', loading3d: 'Mampiditra 3D…',
    skills: 'Fahaizana', dev: 'Fampandrosoana', media: 'Multimedia',
    groups: { front: 'Frontend', back: 'Backend', sys: 'Rafitra & fitaovana', beat: 'Beatmaker', video: 'Mpamorona horonan-tsary', photo: 'Mpaka sary' },
    projects: 'Tetikasa', all: 'Rehetra', featured: '★ Tetikasa lehibe', more: 'Hijery bebe kokoa →',
    contactTitle: 'Andao hiara-miasa', contactText: 'Tetikasa, hevitra, fiaraha-miasa? Andao hifampiresaka.',
    footer: "Natao tamin'ny React & Framer Motion",
    back: '← Tetikasa rehetra', source: 'Kaody loharano ↗', live: 'Hijery an-tserasera ↗', notFound: 'Tsy hita ny tetikasa.',
    desc: {
      'gona-vibe': 'Sehatra mozika full-stack.',
      'fandrik-i-mirindra': "Lalao 3D malagasy ho an'ny Android : dingana 80, biby 25, fandrika miafina.",
      'mirindra-funding': "Famatsiam-bola iombonana ho an'ny tetikasan'ny kilasy.",
      'site-isstm': "Dikan-teny vaovao amin'ny tranokalan'ny sekoly.",
      'game-lazy': "Lalao interactive amin'ny web.",
      'convertisseur-mondial': "Mpanova vola sy refy.",
      'gestion-boutique': "Fitantanana fivarotana amin'ny lafiny client.",
      'gestion-bibliotheque': "Rindranasa console fitantanana trano-bokin'ny sekoly.",
      'elci-cours-du-soir': 'Sehatra fitantanana fampianarana hariva.',
    },
  },
  en: {
    nav: { about: 'About', skills: 'Skills', projects: 'Projects', contact: 'Contact' },
    hi: "Hi, I'm",
    roles: ['Full-Stack Developer', 'Laravel & React Developer', 'Beatmaker', 'Video Editor', 'Photographer'],
    lead: 'Computer Engineering student at ISSTM. I build modern web platforms, from the database to the animation. I also make music, videos and photos.',
    ctaContact: 'Contact me ✉', ctaProjects: 'My projects',
    about: 'About',
    aboutText: "My name is Mirindra, a.k.a. **LAZY**. I turn ideas into real web applications: music platforms, institutional sites, management tools and crowdfunding. And I bring my ideas to life through sound, video and photography.",
    stats: ['GitHub repositories', 'Languages mastered', 'Computer Engineering'],
    drag: '↺ drag to rotate', loading3d: 'Loading 3D…',
    skills: 'Skills', dev: 'Development', media: 'Multimedia',
    groups: { front: 'Frontend', back: 'Backend', sys: 'Systems & tools', beat: 'Beatmaker', video: 'Video Editor', photo: 'Photographer' },
    projects: 'Projects', all: 'All', featured: '★ Featured project', more: 'View details →',
    contactTitle: "Let's work together", contactText: "A project, an idea, a collaboration? Let's talk.",
    footer: 'Made with React & Framer Motion',
    back: '← All projects', source: 'Source code ↗', live: 'View live ↗', notFound: 'Project not found.',
    desc: {
      'gona-vibe': 'Full-stack music platform.',
      'fandrik-i-mirindra': "Malagasy 3D game for Android: 80 levels, 25 characters, hidden traps.",
      'mirindra-funding': 'Crowdfunding for class projects.',
      'site-isstm': 'New version of the school website.',
      'game-lazy': 'Interactive web game.',
      'convertisseur-mondial': 'Currency and unit converter.',
      'gestion-boutique': 'Client-side shop management.',
      'gestion-bibliotheque': 'Library management console app.',
      'elci-cours-du-soir': 'Evening classes management platform.',
    },
  },
}

const Ctx = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => { try { return localStorage.getItem('lang') || 'fr' } catch { return 'fr' } })
  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem('lang', lang) } catch {}
  }, [lang])
  return <Ctx.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</Ctx.Provider>
}

export const useLang = () => useContext(Ctx)

// "texte **gras** texte" -> éléments React
export function bold(str) {
  return str.split('**').map((p, i) => (i % 2 ? <b key={i}>{p}</b> : p))
}
