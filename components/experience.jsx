'use client';
import {useState, useRef, createElement} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {motion, MotionConfig, useReducedMotion} from 'framer-motion';

export function Reveal({children,className='',delay=0}) {
 const reduce=useReducedMotion();
 return <motion.div className={className} initial={false} whileInView={reduce?{}:{opacity:[0.4,1],y:[22,0]}} viewport={{once:true,amount:.08}} transition={{type:'spring',stiffness:90,damping:22,delay}}>{children}</motion.div>
}
export function Shell({children}) {
 const [open,setOpen]=useState(false);const path=usePathname();
 return <MotionConfig reducedMotion="user"><div className="light-field" aria-hidden="true"><div className="light-beam"/><div className="light-haze"/></div><a className="skip" href="#main">Skip to content</a><header className="site-header"><Link className="brand-lockup" href="/" onClick={()=>setOpen(false)}><span className="brand-monogram" aria-hidden="true">BÖ</span><span className="brand-name">Berkay Özbek<span className="brand-role">Analog IC design & bioelectronics</span></span></Link><button className="menu-toggle" aria-expanded={open} aria-controls="main-nav" onClick={()=>setOpen(!open)}>{open?'Close':'Menu'}</button><nav id="main-nav" className={open?'is-open':''} aria-label="Main navigation">{[['/#research','Research'],['/publications','Publications'],['/about','About']].map(([href,label])=><Link key={href} href={href} aria-current={path===href?'page':undefined} onClick={()=>setOpen(false)}>{label}</Link>)}<a className="nav-cv" href="/Berkay_Ozbek_CV.pdf" target="_blank" rel="noopener">Download CV ↗</a></nav></header><main id="main">{children}</main><footer className="site-footer"><div><Link className="footer-name" href="/">Berkay Özbek</Link><p>Integrated circuits for connected bioelectronics.</p></div><div><span className="eyebrow">LONDON, UK</span><p>Imperial College London</p></div><div className="footer-social"><a href="https://www.linkedin.com/in/berkayozbek/" target="_blank" rel="noopener">LinkedIn ↗</a><a href="https://scholar.google.com/citations?user=rCecV7wAAAAJ&hl=en&oi=ao" target="_blank" rel="noopener">Google Scholar ↗</a><a href="mailto:b.ozbek22@imperial.ac.uk">Email ↗</a></div><small>© 2026 Berkay Özbek · Original research figures from the author’s theses.</small></footer></MotionConfig>
}
export function Figure({node}) {
 const dialog=useRef(null);const anchor=node.children.find(c=>c.tag==='a');const img=anchor?.children.find(c=>c.tag==='img');const caption=node.children.find(c=>c.tag==='figcaption');
 if(!img)return <Tree nodes={node.children}/>;
 return <figure className={node.attrs.class}><button className="figure-open" onClick={()=>dialog.current.showModal()} aria-label={'Enlarge: '+img.attrs.alt}><img {...img.attrs}/><span className="enlarge">Inspect figure ↗</span></button><figcaption><Tree nodes={caption.children}/></figcaption><dialog ref={dialog} className="figure-dialog" onClick={e=>{if(e.target===dialog.current)dialog.current.close()}}><div className="dialog-bar"><p>{img.attrs.alt}</p><button onClick={()=>dialog.current.close()} autoFocus>Close ×</button></div><div className="dialog-image"><img src={img.attrs.src} alt={img.attrs.alt}/></div></dialog></figure>
}
export function Tree({nodes}) {return nodes.map((n,i)=>{
 if(typeof n==='string')return n;
 if(n.tag==='figure' && n.attrs.class?.includes('research-figure'))return <Figure key={i} node={n}/>;
 const attrs={...n.attrs,key:i};if(attrs.class){attrs.className=attrs.class;delete attrs.class}if(attrs.tabindex){attrs.tabIndex=attrs.tabindex;delete attrs.tabindex}if(attrs.style)delete attrs.style;
 const children=n.children.length?<Tree nodes={n.children}/>:undefined;
 if(n.tag==='section')return <Reveal key={i}><section {...attrs}>{children}</section></Reveal>;
 return createElement(n.tag,attrs,children);
})}
