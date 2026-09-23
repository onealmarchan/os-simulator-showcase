import { motion, useReducedMotion } from "framer-motion";
import { Clock3, Cpu, HardDrive, Keyboard, Play, Save, Settings, Timer, Undo2, Zap } from "lucide-react";
import { processStates } from "../../slides/slides";

export function CpuChip({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className={`cpu-chip ${compact ? "cpu-chip--compact" : ""}`} aria-label="Chip de CPU con pistas luminosas" role="img">
      <svg viewBox="0 0 640 520" aria-hidden="true">
        <defs><linearGradient id="chipGradient"><stop stopColor="var(--cyan)"/><stop offset=".52" stopColor="var(--violet)"/><stop offset="1" stopColor="var(--magenta)"/></linearGradient></defs>
        {[80,160,240,320,400,480].map((y,i)=><motion.path key={`h${y}`} d={`M20 ${y} H190 M450 ${y} H620`} className="trace" initial={{pathLength:0}} animate={{pathLength:1,opacity:reduce?0.7:[.25,.9,.25]}} transition={{duration:1.3,delay:i*.09,opacity:{duration:3,repeat:Infinity}}}/>) }
        {[110,220,330,440,550].map((x,i)=><motion.path key={`v${x}`} d={`M${x} 20 V150 M${x} 370 V500`} className="trace" initial={{pathLength:0}} animate={{pathLength:1,opacity:reduce?0.7:[.2,.8,.2]}} transition={{duration:1.2,delay:i*.1,opacity:{duration:2.6,repeat:Infinity}}}/>) }
        <motion.rect x="188" y="148" width="264" height="224" rx="30" className="chip-body" animate={reduce?{}:{filter:["drop-shadow(0 0 12px var(--cyan-soft))","drop-shadow(0 0 32px var(--violet-soft))","drop-shadow(0 0 12px var(--cyan-soft))"]}} transition={{duration:4,repeat:Infinity}}/>
        <rect x="218" y="178" width="204" height="164" rx="20" className="chip-core"/>
        <text x="320" y="246" textAnchor="middle" className="chip-label">CPU</text><text x="320" y="286" textAnchor="middle" className="chip-sub">CORE 01</text>
      </svg>
    </div>
  );
}

export function ProcessQueue() {
  const reduce=useReducedMotion();
  return <div className="queue-visual" role="img" aria-label="Procesos P1, P2 y P3 avanzando hacia la CPU"><div className="queue-track">{["P3","P2","P1"].map((p,i)=><motion.div className="process-block" key={p} animate={reduce?{}:{x:[0,54,0]}} transition={{duration:3,delay:i*.35,repeat:Infinity}}>{p}</motion.div>)}<div className="queue-arrow">→</div><div className="queue-cpu"><Cpu size={70}/><span>CPU</span></div></div></div>;
}

export function ProcessStates() {
  const reduce=useReducedMotion();
  return <div className="states-diagram" role="img" aria-label="Diagrama de cinco estados de un proceso">{processStates.map(([name,desc,color],i)=><motion.div key={name} className={`state-node ${color}`} initial={{opacity:0,scale:.85}} animate={{opacity:1,scale:1}} transition={{delay:.2+i*.11}}><strong>{name}</strong><span>{desc}</span>{i<4&&<div className="state-arrow"><motion.span animate={reduce?{}:{x:[0,18,0]}} transition={{repeat:Infinity,duration:1.8}}>→</motion.span></div>}</motion.div>)}</div>;
}

export function Gantt({ mode="fcfs" }: { mode?: "fcfs"|"sjf"|"srtf" }) {
  const sets={fcfs:[["P1",46],["P2",23],["P3",31]],sjf:[["P2",20],["P1",34],["P3",46]],srtf:[["P1",14],["P2",26],["P1",20],["P3",40]]} as const;
  return <div className="gantt" role="img" aria-label={`Diagrama de Gantt ${mode.toUpperCase()}`}><div className="gantt-bars">{sets[mode].map(([p,w],i)=><motion.div key={`${p}${i}`} className={`gantt-bar gantt-${p.toLowerCase()}`} style={{width:`${w}%`}} initial={{scaleX:0}} animate={{scaleX:1}} transition={{delay:.3+i*.35,duration:.7}}><span>{p}</span></motion.div>)}</div><div className="gantt-axis"><span>0</span><span>tiempo</span><span>16</span></div></div>;
}

export function RoundRobinRing() {
  const reduce=useReducedMotion();
  return <div className="rr-wrap" role="img" aria-label="Anillo Round Robin con cuatro procesos"><div className="rr-ring">{["P1","P2","P3","P4"].map((p,i)=><div key={p} className={`rr-sector rr-${i}`}>{p}</div>)}<div className="rr-core"><Clock3/><span>q = 2</span></div><motion.div className="rr-pointer" animate={reduce?{}:{rotate:360}} transition={{duration:8,repeat:Infinity,ease:"linear"}}><span/></motion.div></div></div>;
}

const flowIcons=[Zap,Save,Settings,Undo2,Play] as const;
export function InterruptFlow(){return <div className="interrupt-flow" role="img" aria-label="Cinco pasos del flujo de una interrupción">{["Señal","Guardar contexto","Ejecutar ISR","Restaurar contexto","Continuar"].map((label,i)=>{const Icon=flowIcons[i];return <div className={`flow-step ${i>0&&i<4?"flow-active":""}`} key={label}><motion.div animate={i>0&&i<4?{boxShadow:["0 0 0 var(--cyan-soft)","0 0 30px var(--cyan-soft)","0 0 0 var(--cyan-soft)"]}:{}} transition={{duration:2,repeat:Infinity,delay:i*.3}}><Icon/></motion.div><b>0{i+1}</b><span>{label}</span>{i<4&&<i>→</i>}</div>})}</div>}

export function ModuleVenn(){const reduce=useReducedMotion();return <div className="venn" role="img" aria-label="Gestión de CPU e interrupciones conectadas por el temporizador"><div className="venn-circle venn-cpu"><Cpu/><strong>Gestión<br/>de CPU</strong></div><div className="venn-circle venn-int"><Zap/><strong>Interrupciones</strong></div><motion.div className="venn-center" animate={reduce?{}:{scale:[1,1.12,1]}} transition={{duration:2,repeat:Infinity}}><Timer/><span>Temporizador</span></motion.div></div>}

export function InterruptTypes(){return <div className="type-visual" role="img" aria-label="Interrupciones de hardware y software fluyendo hacia la CPU"><div className="type-origin"><HardDrive/><Keyboard/><span>Hardware</span></div><motion.div className="type-line" animate={{opacity:[.3,1,.3]}} transition={{duration:2,repeat:Infinity}}>→</motion.div><div className="type-cpu"><Cpu/><span>CPU</span></div><motion.div className="type-line" animate={{opacity:[.3,1,.3]}} transition={{duration:2,repeat:Infinity,delay:.5}}>←</motion.div><div className="type-origin type-software"><Settings/><span>Software</span></div></div>}