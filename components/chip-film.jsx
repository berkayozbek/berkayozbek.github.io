'use client';
import {useEffect,useRef,useState} from 'react';

export default function ChipFilm(){
 const ref=useRef(null);
 const [playing,setPlaying]=useState(false);
 const [ready,setReady]=useState(false);
 const intent=useRef(true);
 useEffect(()=>{
  const video=ref.current;
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible=true;
  const source=()=>{
   if(!video.getAttribute('src')){
    video.src=window.matchMedia('(max-width: 640px)').matches?'/assets/neurostreamx-gds-mobile.mp4':'/assets/neurostreamx-gds.mp4';
    video.load();
   }
  };
  const sync=()=>{
   if(visible&&!document.hidden&&intent.current&&!media.matches&&!navigator.connection?.saveData){source();video.play().catch(()=>setPlaying(false));}
   else video.pause();
  };
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()},{threshold:.05});
  observer.observe(video);media.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);sync();
  return ()=>{observer.disconnect();media.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync);video.pause()};
 },[]);
 const toggle=()=>{
  const video=ref.current;
  if(!video.paused){intent.current=false;video.pause()}
  else {intent.current=true;if(!video.getAttribute('src')){video.src=window.matchMedia('(max-width:640px)').matches?'/assets/neurostreamx-gds-mobile.mp4':'/assets/neurostreamx-gds.mp4';video.load()}video.play().catch(()=>setPlaying(false));}
 };
 return <div className="chip-film"><img className="chip-film-poster" src="/assets/neurostreamx-gds-poster.webp" width="1600" height="1200" alt="NeuroStreamX chip layout rendered from the supplied GDS geometry, with illustrative colours and depth" fetchPriority="high"/><video ref={ref} className={ready?'chip-film-video is-ready':'chip-film-video'} width="1600" height="1200" muted loop playsInline preload="none" aria-label="Animated view of NeuroStreamX GDS layout" onPlaying={()=>{setPlaying(true);setReady(true)}} onPause={()=>setPlaying(false)} onError={()=>{setPlaying(false);setReady(false)}}/><button className="chip-film-control" onClick={toggle} aria-label={playing?'Pause chip animation':'Play chip animation'}>{playing?'Pause animation Ⅱ':'Play animation ▷'}</button></div>
}
