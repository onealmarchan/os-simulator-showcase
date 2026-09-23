import { motion, useReducedMotion } from "framer-motion";
import type { SlideSection } from "../slides/slides";

export function AnimatedBackground({ section }: { section: SlideSection }) {
  const reduce = useReducedMotion();
  return <div className={`animated-bg bg-${section}`} aria-hidden="true">
    <div className="grid-fade" />
    {["cyan","violet","magenta"].map((color,i)=><motion.div key={color} className={`aurora aurora-${color}`} animate={reduce?{}:{x:[0,70-i*18,-24,0],y:[0,-45+i*22,32,0],scale:[1,1.12,.94,1]}} transition={{duration:22+i*4,repeat:Infinity,ease:"easeInOut"}} />)}
    <svg className="particle-field" viewBox="0 0 1920 1080" preserveAspectRatio="none">{[[220,180,620,310],[620,310,980,180],[980,180,1420,360],[1420,360,1700,190],[320,790,760,680],[760,680,1180,820],[1180,820,1620,710]].map((p,i)=><g key={i}><line x1={p[0]} y1={p[1]} x2={p[2]} y2={p[3]}/><motion.circle cx={p[0]} cy={p[1]} r="5" animate={reduce?{}:{opacity:[.25,.9,.25],r:[4,7,4]}} transition={{duration:3+i*.35,repeat:Infinity}}/></g>)}</svg>
  </div>;
}