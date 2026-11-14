export const GH = 'https://github.com/Lazy6969'
export const projects = [
  { name: 'Gôna Vibe', desc: 'Plateforme musicale full-stack.', stack: ['Laravel', 'Inertia', 'React'], url: `${GH}/gona-vibe`, featured: true },
  { name: 'Mirindra Funding', desc: 'Financement participatif pour les projets de classe.', stack: ['PHP'], url: `${GH}/Mirindra_Funding`, featured: true },
  { name: 'Site ISSTM', desc: "Nouvelle version du site de l'établissement.", stack: ['JavaScript'], url: `${GH}/site-isstm` },
  { name: 'Game Lazy', desc: 'Jeu web interactif.', stack: ['HTML', 'JS'], url: `${GH}/Game_Lazy` },
  { name: 'Convertisseur mondial', desc: 'Convertisseur de devises/unités.', stack: ['JavaScript'], url: `${GH}/Convertisseur-_mondiale` },
  { name: 'Gestion boutique', desc: 'Gestion de boutique côté client.', stack: ['HTML', 'JS'], url: `${GH}/Gestion_boutique_Js` },
  { name: 'Gestion bibliothèque', desc: 'Application console de gestion de bibliothèque.', stack: ['C++'], url: `${GH}/Gestion_biblioth-que_cpp` },
  { name: 'ELCI cours du soir', desc: 'Plateforme de gestion de cours du soir.', stack: ['PHP'], url: `${GH}/ELCI_cours_du_soir` },
]
const ic = (slug, color) => `https://cdn.simpleicons.org/${slug}${color ? '/' + color : ''}`
export const skills = [
  { id: 'front', kind: 'dev', items: [
    { n: 'React', i: ic('react') }, { n: 'JavaScript', i: ic('javascript') },
    { n: 'HTML5', i: ic('html5') }, { n: 'CSS3', i: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/css3/css3-original.svg' }, { n: 'Inertia', i: ic('inertia', '9553E9') } ] },
  { id: 'back', kind: 'dev', items: [
    { n: 'Laravel', i: ic('laravel') }, { n: 'PHP', i: ic('php') },
    { n: 'MySQL', i: ic('mysql', '4479A1') }, { n: 'Vercel', i: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/vercel/vercel-original.svg' } ] },
  { id: 'sys', kind: 'dev', items: [
    { n: 'C++', i: ic('cplusplus') }, { n: 'Cisco', i: ic('cisco', '1BA0D7') },
    { n: 'Arduino', i: ic('arduino') }, { n: 'Git', i: ic('git') }, { n: 'GitHub', i: ic('github', 'white') } ] },
  { id: 'beat', kind: 'media', items: [{ n: 'FL Studio', i: '/flstudio.svg' }, { n: 'Cubase 5', i: '/cubase.svg' }] },
  { id: 'video', kind: 'media', items: [{ n: 'Premiere Pro', i: '/premiere.svg' }, { n: 'After Effects', i: '/aftereffects.svg' }] },
  { id: 'photo', kind: 'media', items: [{ n: 'Photoshop', i: '/photoshop.svg' }, { n: 'Lightroom', i: '/lightroom.svg' }] },
]
export const contacts = [
  { n: 'WhatsApp', v: '038 07 469 87', href: 'https://wa.me/261380746987', i: ic('whatsapp') },
  { n: 'Facebook', v: 'lauthner.ramanana', href: 'https://web.facebook.com/lauthner.ramanana', i: ic('facebook') },
  { n: 'Email', v: 'mirindraramanana2@gmail.com', href: 'mailto:mirindraramanana2@gmail.com', i: ic('gmail') },
  { n: 'GitHub', v: 'Lazy6969', href: 'https://github.com/Lazy6969', i: ic('github', 'white') },
  { n: 'LinkedIn', v: 'Mirindra Ramanana', href: 'https://www.linkedin.com/in/mirindra-ramanana-7b886531b/', i: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/linkedin/linkedin-original.svg' },
  { n: 'Instagram', v: '@rlazy69', href: 'https://www.instagram.com/rlazy69/', i: '/instagram.svg' },
]

export const slug = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
