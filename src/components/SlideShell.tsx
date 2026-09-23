import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { PropsWithChildren } from "react";
import type { Slide } from "../slides/slides";

const container={hidden:{opacity:0},show:{opacity:1,transition:{staggerChildren:.08}}};
const item={hidden:{opacity:0,y:16},show:{opacity:1,y:0,transition:{duration:.5}}};

export function SlideShell({ slide, children, className="" }: PropsWithChildren<{slide:Slide;className?:string}>) {
  return <motion.article className={`slide-content ${className}`} variants={container} initial="hidden" animate="show" aria-labelledby={`slide-title-${slide.id}`}>
    <header className="slide-header">
      <motion.div variants={item} className="slide-heading"><span className="slide-kicker">{slide.section==="modulo3"?"GESTIÓN DE CPU":slide.section==="modulo4"?"INTERRUPCIONES":slide.id===17?"CIERRE":"SISTEMAS OPERATIVOS"}</span><h1 id={`slide-title-${slide.id}`}>{slide.title}</h1>{slide.subtitle&&<p>{slide.subtitle}</p>}</motion.div>
      {slide.demo&&<motion.div variants={item} className="demo-badge"><Play size={20} fill="currentColor"/>Se demuestra en el simulador</motion.div>}
    </header>
    <motion.div variants={item} className="slide-body">{children}</motion.div>
    <div className="slide-corner">SO · M3/M4</div>
  </motion.article>;
}

export function BulletList({ bullets }: {bullets:string[]}) { return <ul className="bullet-list">{bullets.map((b,i)=><motion.li key={b} initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} transition={{delay:.28+i*.1}}><span>{String(i+1).padStart(2,"0")}</span><p>{b}</p></motion.li>)}</ul> }