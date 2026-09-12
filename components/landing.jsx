'use client';
import Link from 'next/link';
import {useRef} from 'react';
import {motion,useReducedMotion,useScroll,useTransform} from 'framer-motion';
import ChipFilm from './chip-film';
import ConceptFilm from './concept-film';
import {Tree,Reveal} from './experience';
import original from '../content/index.json';

const projects=[
 {id:'01',label:'RF ENERGY HARVESTING',name:'Adaptive power management',href:'/rf-energy',image:'rectifier-65',alt:'Measured efficiency and sensitivity of the 65-nm rectifier across five dies',copy:'A ULP-assisted rectifier and autonomous matching network that adapt to changing received power.',result:'91.5%',unit:'peak rectifier-core efficiency',condition:'Measured · 433 MHz · 100 kΩ load',tags:['65 nm / 180 nm','CICC 2026']},
 {id:'02',label:'HARDWARE SECURITY',name:'NeuroLock',href:'/neurolock',image:'neurolock-demo',alt:'NeuroLock USB-C true random number generator connected to its desktop application',copy:'An adaptable silicon entropy source, from nanowatt operation to a USB-C security demonstrator.',result:'168 nW',unit:'minimum measured LP power',condition:'44.3 Mb/s maximum HP rate at a different operating point',tags:['180 nm CMOS','IEEE SSCL 2025']},
 {id:'03',label:'IMPLANTABLE ANALOG INTERFACES',name:'Electronic cochlea',href:'/cochlear',image:'filter-silicon',alt:'Fabricated low-power tunable filter for an implantable electronic cochlea',copy:'A measured gm-C filter and a simulated, programmable 12-channel cochlear-implant front-end.',result:'13.2 nW',unit:'measured standalone filter power',condition:'950 Hz · 1 V core supply',tags:['180 nm CMOS','MSc research']}
];
const publications=original.children.find(n=>n?.attrs?.class==='section container'&&JSON.stringify(n).includes('RECENT PUBLICATIONS'));
const papers=publications.children.filter(n=>n?.tag==='article');

export default function Landing(){
 const reduce=useReducedMotion();const hero=useRef(null);
 const {scrollYProgress}=useScroll({target:hero,offset:['start start','end start']});
 const y=useTransform(scrollYProgress,[0,1],[0,55]);
 const fade={hidden:{opacity:0,y:20},show:{opacity:1,y:0,transition:{type:'spring',stiffness:90,damping:24}}};
 return <div className="new-landing">
 <section ref={hero} className="landing-hero container">
  <motion.div className="landing-intro" initial={reduce?false:'hidden'} animate="show" variants={{show:{transition:{staggerChildren:.1}}}}>
   <motion.p variants={fade} className="kicker">BERKAY ÖZBEK, PhD <span>IMPERIAL COLLEGE LONDON</span></motion.p>
   <motion.h1 variants={fade}>Analog IC design<br/>for <span>wireless<br/>neural interfaces.</span></motion.h1>
   <motion.p variants={fade} className="landing-summary">I design low-power chips that bring wireless energy, communication and hardware security to implantable bioelectronics.</motion.p>
   <motion.div variants={fade} className="landing-actions"><Link className="primary-action" href="#research">Explore my research <span aria-hidden="true">↘</span></Link><a className="secondary-action" href="/Berkay_Ozbek_CV.pdf" target="_blank" rel="noopener">Academic CV ↗</a></motion.div>
   <motion.div variants={fade} className="current-role"><span className="role-label">CURRENTLY</span><p>Postdoctoral Research Associate<br/><span>Imperial College London · London, UK</span></p></motion.div>
  </motion.div>
  <motion.div className="landing-chip" style={reduce?{}:{y}} initial={reduce?false:{opacity:0}} animate={{opacity:1}} transition={{duration:1.1}}>
   <div className="chip-caption-top"><span>NEUROSTREAMX</span><span>65 nm CMOS / 433 MHz</span></div>
   <ChipFilm/>
   <div className="chip-caption-bottom"><div><span className="kicker">FEATURED SYSTEM</span><h2>Wireless power.<br/>Credential-gated telemetry.</h2></div><Link className="chip-case-link" href="/neurostreamx" aria-label="Explore the NeuroStreamX system">↗</Link></div>
   <p className="chip-provenance">My GDS layout · Illustrative colours and depth</p>
  </motion.div>
 </section>
 <div className="career-strip container"><span>RESEARCH & EXPERIENCE</span><div><span>Imperial College London</span><span>Qualcomm</span><span>METU</span><span>KTH</span></div></div>
 <section className="system-summary container" aria-label="NeuroStreamX research overview"><div className="system-concept"><ConceptFilm preview/></div><Reveal className="system-description"><p className="kicker">PHD RESEARCH / 2022–2026</p><h2>A single-carrier platform for distributed neural implants.</h2><p>NeuroStreamX combines self-regulating RF energy harvesting, ASK downlink, LSK uplink and hardware credential checks in a measured 65-nm prototype.</p><Link className="secondary-action" href="/neurostreamx">Architecture, measurements & limits ↗</Link></Reveal><div className="system-facts"><Reveal><strong>433 <span>MHz</span></strong><p>Shared power and data carrier</p></Reveal><Reveal delay={.08}><strong>85.12<span>%</span></strong><p>Peak receiver RF–DC chain efficiency</p><small>Matching and regulation enabled; not end-to-end wireless-link efficiency.</small></Reveal><Reveal delay={.16}><strong>100 <span>kb/s</span></strong><p>Manchester-coded link rate</p><small>50 kb/s after Manchester decoding, before packet overhead.</small></Reveal></div></section>
 <section id="research" className="research-gallery"><div className="container"><Reveal className="gallery-heading"><div><p className="kicker">01 / RESEARCH</p><h2>Circuits, characterised<br/>in silicon.</h2></div><p>Explore the circuit architectures, original measurements and integration challenges behind my work.</p></Reveal><div className="research-grid">{projects.map((p,i)=><Reveal key={p.id} delay={i*.07} className="research-item"><Link className={'research-visual visual-'+p.id} href={p.href}><img src={'/assets/'+p.image+'.webp'} alt={p.alt} loading="lazy" width="720" height="520"/><span className="project-index">{p.id}</span><span className="project-open" aria-hidden="true">↗</span></Link><div className="research-item-body"><p className="kicker">{p.label}</p><h3><Link href={p.href}>{p.name}</Link></h3><p className="project-copy">{p.copy}</p><div className="project-result"><strong>{p.result}</strong><span>{p.unit}</span><small>{p.condition}</small></div><div className="project-tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div><Link className="project-detail" href={p.href}>View research <span>↗</span></Link></div></Reveal>)}</div></div></section>
 <section className="landing-publications container"><Reveal className="gallery-heading"><div><p className="kicker">02 / PUBLICATIONS</p><h2>Selected papers.</h2></div><Link className="secondary-action" href="/publications">All publications & theses ↗</Link></Reveal><Tree nodes={papers}/></section>
 <section className="research-outlook container"><Reveal className="outlook-main"><p className="kicker">03 / RESEARCH DIRECTION</p><h2>From wireless access<br/>to adaptive therapy.</h2><p>My research vision connects information-directed sensing, response-verified stimulation, therapy-aware wireless power and secure therapeutic control.</p><p className="outlook-boundary">These are directions for future research, building on my measured circuit and system prototypes.</p><Link className="secondary-action" href="/about#vision">Read my research vision ↗</Link></Reveal><div className="outlook-aside"><Reveal><span className="kicker">DESIGN EXPERIENCE</span><h3>Analog circuits through to silicon bring-up.</h3><p>Full-custom design and verification across 180-nm, 65-nm and 14-nm CMOS projects, including analog/PMU work at Qualcomm.</p><Link href="/about#experience">Research & industry experience ↗</Link></Reveal><Reveal><span className="kicker">TEACHING & SUPERVISION</span><h3>Teaching full-custom IC design.</h3><p>Postgraduate lab leadership at Imperial, course development, and supervision of MSc and undergraduate researchers.</p><Link href="/about#teaching">Teaching & mentoring ↗</Link></Reveal></div></section>
 <section className="landing-contact"><div className="container"><Reveal><p className="kicker">CONTACT</p><h2>Let’s discuss<br/><span>circuits and research.</span></h2><p>For research collaborations, academic opportunities and analog IC design.</p><a className="contact-address" href="mailto:b.ozbek22@imperial.ac.uk">b.ozbek22@imperial.ac.uk <span>↗</span></a></Reveal><div className="contact-profiles"><a href="https://scholar.google.com/citations?user=rCecV7wAAAAJ&hl=en&oi=ao" target="_blank" rel="noopener">Google Scholar ↗</a><a href="https://www.linkedin.com/in/berkayozbek/" target="_blank" rel="noopener">LinkedIn ↗</a></div></div></section>
 </div>
}
