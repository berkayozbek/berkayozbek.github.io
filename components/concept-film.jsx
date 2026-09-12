'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';

export default function ConceptFilm({preview=false}){
 const videoRef=useRef(null);const intent=useRef(true);
 const [phase,setPhase]=useState(0);
 const [playing,setPlaying]=useState(false);const [ready,setReady]=useState(false);
 useEffect(()=>{
  const v=videoRef.current;const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');let visible=false;
  const sync=()=>{
   if(visible&&!document.hidden&&intent.current&&!reduced.matches&&!navigator.connection?.saveData){
    if(!v.getAttribute('src')){v.src=window.matchMedia('(max-width:640px)').matches?'/assets/neurostreamx-concept-mobile.mp4':'/assets/neurostreamx-concept.mp4';v.load()}
    v.play().catch(()=>setPlaying(false));
   }else v.pause();
  };
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()},{threshold:.12});observer.observe(v);reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
  return ()=>{observer.disconnect();reduced.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync);v.pause()};
 },[]);
 const toggle=()=>{const v=videoRef.current;if(v.paused){intent.current=true;if(!v.getAttribute('src')){v.src=window.matchMedia('(max-width:640px)').matches?'/assets/neurostreamx-concept-mobile.mp4':'/assets/neurostreamx-concept.mp4';v.load()}v.play().catch(()=>setPlaying(false))}else{intent.current=false;v.pause()}};
 return <figure className={'concept-preview'+(preview?' on-home':'')}><div className="concept-media"><img src="/assets/neurostreamx-concept-poster.webp" alt="Conceptual cranial cutaway showing an external transceiver and three distributed cortical implants" width="1920" height="1080" loading="lazy"/><video ref={videoRef} width="1920" height="1080" className={ready?'ready':''} muted loop playsInline preload="none" onTimeUpdate={e=>setPhase(Math.min(2,Math.floor(e.currentTarget.currentTime/6)))} onPlaying={()=>{setReady(true);setPlaying(true)}} onPause={()=>setPlaying(false)} onError={()=>{setReady(false);setPlaying(false)}} aria-label="NeuroStreamX concept: adaptive RF power, credential-checked commands and scheduled return telemetry"/><div className="concept-live-brand"><strong>NeuroStreamX</strong><span>433 MHz</span></div><div className="concept-live-title"><h3>{['Power every node.','Verify. Then exchange.','One carrier. Many implants.'][phase]}</h3><p>{['Adaptive wireless power','ID + password checks · XOR-protected data','ID-addressed uplink + downlink'][phase]}</p></div></div><figcaption><div><p className="concept-label">NEUROSTREAMX / APPLICATION CONCEPT</p><p>Adaptive power. Addressed commands. Scheduled telemetry.</p></div><div className="concept-actions"><button onClick={toggle} aria-label={playing?'Pause NeuroStreamX concept animation':'Play NeuroStreamX concept animation'}>{playing?'Pause animation Ⅱ':'Play animation ▷'}</button>{preview&&<Link href="/neurostreamx">Explore the research ↗</Link>}</div></figcaption><p className="concept-note">Application concept. Anatomy and packaging are illustrative; wave envelopes show shared power coverage, not simulated fields or RF propagation speed. ID/password checks and XOR payload protection reflect the prototype. Electrical efficiency was measured on the bench; neural integration remains future work.</p></figure>
}
