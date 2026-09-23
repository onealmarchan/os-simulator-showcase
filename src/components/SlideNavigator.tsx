import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatedBackground } from "./AnimatedBackground";
import { slides } from "../slides/slides";

export function SlideNavigator({ renderSlide }: {renderSlide:(index:number)=>ReactNode}) {
  const initial=typeof window!=="undefined"?Math.min(16,Math.max(0,Number(window.location.hash.slice(1)||1)-1)):0;
  const [index,setIndex]=useState(initial); const [direction,setDirection]=useState(1); const [portrait,setPortrait]=useState(true);
  const [scale,setScale]=useState(1); const stageRef=useRef<HTMLDivElement>(null); const touch=useRef<number|null>(null); const reduce=useReducedMotion();
  const go=useCallback((next:number)=>{const bounded=Math.max(0,Math.min(slides.length-1,next));setDirection(bounded>=index?1:-1);setIndex(bounded);window.history.pushState(null,"",`#${bounded+1}`)},[index]);
  useEffect(()=>{const resize=()=>{const el=stageRef.current;if(el)setScale(Math.min(el.clientWidth/1920,el.clientHeight/1080));};resize();window.addEventListener("resize",resize);return()=>window.removeEventListener("resize",resize)},[]);
  useEffect(()=>{const key=(e:KeyboardEvent)=>{if(["ArrowRight"," ","PageDown"].includes(e.key)){e.preventDefault();go(index+1)}if(["ArrowLeft","PageUp"].includes(e.key)){e.preventDefault();go(index-1)}if(e.key.toLowerCase()==="f")document.documentElement.requestFullscreen?.()};const pop=()=>{const n=Number(location.hash.slice(1)||1)-1;if(Number.isFinite(n)){setDirection(n>=index?1:-1);setIndex(Math.max(0,Math.min(16,n)))}};window.addEventListener("keydown",key);window.addEventListener("popstate",pop);return()=>{window.removeEventListener("keydown",key);window.removeEventListener("popstate",pop)}},[go,index]);
  useEffect(()=>{document.title=`${index+1}/17 — ${slides[index]?.title ?? "Presentación"}`},[index]);
  const variants={enter:(d:number)=>({x:reduce?0:d*150,opacity:0,filter:reduce?"none":"blur(8px)"}),center:{x:0,opacity:1,filter:"blur(0px)"},exit:(d:number)=>({x:reduce?0:d*-150,opacity:0,filter:reduce?"none":"blur(8px)"})};
  return <main className="presentation"><AnimatedBackground section={slides[index]?.section ?? "intro"}/><div className="progress-track"><motion.div className="progress-fill" animate={{width:`${((index+1)/17)*100}%`}}/></div><div className="counter">{String(index+1).padStart(2,"0")} <span>/ 17</span></div>
    <div ref={stageRef} className="stage" onTouchStart={e=>{touch.current=e.touches[0]?.clientX??null}} onTouchEnd={e=>{const end=e.changedTouches[0]?.clientX;if(touch.current!==null&&end!==undefined&&Math.abs(end-touch.current)>55)go(index+(end<touch.current?1:-1));touch.current=null}}>
      <div className="slide-wrapper" style={{"--scale":scale} as React.CSSProperties}><AnimatePresence mode="wait" custom={direction}><motion.div key={index} className="slide-motion" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{duration:reduce?.22:.6,ease:[.22,1,.36,1]}}>{renderSlide(index)}</motion.div></AnimatePresence></div>
    </div>
    <nav className="nav-controls" aria-label="Navegación de diapositivas"><button aria-label="Diapositiva anterior" disabled={index===0} onClick={()=>go(index-1)}><ChevronLeft/></button><button aria-label="Pantalla completa" onClick={()=>document.documentElement.requestFullscreen?.()}><Expand/></button><button aria-label="Diapositiva siguiente" disabled={index===16} onClick={()=>go(index+1)}><ChevronRight/></button></nav>
    {portrait&&<div className="portrait-hint"><span>Gira tu dispositivo para ver mejor la presentación</span><button aria-label="Cerrar aviso" onClick={()=>setPortrait(false)}><X/></button></div>}
  </main>
}