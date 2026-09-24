import { BarChart3, Check, CircleAlert, Code2, Cpu, HardDrive, Keyboard, MousePointerClick, Terminal, Timer, Users, Zap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { agenda, metricRows, slides, type CoverContent, type CoverGroup } from "../slides/slides";
import { BulletList, SlideShell } from "./SlideShell";
import { CpuChip, Gantt, InterruptFlow, InterruptTypes, ModuleVenn, ProcessQueue, ProcessStates, RoundRobinRing } from "./diagrams/Diagrams";

const agendaIcons=[Cpu,BarChart3,Zap,MousePointerClick];
const Card=({children,className=""}:{children:React.ReactNode;className?:string})=><div className={`glass-card ${className}`}>{children}</div>;

function SlideView({index}:{index:number}) { const s=slides[index]; if(!s)return null;
  const body=(()=>{switch(s.id){
    case 1:return s.cover?<CoverLayout cover={s.cover}/>:null;
    case 2:return <div className="agenda-grid">{agenda.map(([title,desc],i)=>{const Icon=agendaIcons[i]??Cpu;return <Card key={title}><span className="agenda-number">0{i+1}</span><Icon/><h3>{title}</h3><p>{desc}</p></Card>})}</div>;
    case 3:return <div className="split"><BulletList bullets={s.bullets??[]}/><ProcessQueue/></div>;
    case 4:return <ProcessStates/>;
    case 5:return <div className="split"><BulletList bullets={s.bullets??[]}/><Card className="diagram-card"><span className="diagram-label">ORDEN DE LLEGADA</span><Gantt/></Card></div>;
    case 6:return <><BulletList bullets={s.bullets??[]}/><div className="double-gantt"><Card><h3>No apropiativo</h3><Gantt mode="sjf"/></Card><Card><h3>Apropiativo (SRTF)</h3><Gantt mode="srtf"/></Card></div></>;
    case 7:return <div className="split"><BulletList bullets={s.bullets??[]}/><RoundRobinRing/></div>;
    case 8:return <div className="split"><BulletList bullets={s.bullets??[]}/><div className="priority-stack">{[["Alta","P2 · prioridad 1"],["Media","P1 · prioridad 2"],["Baja","P3 · prioridad 4"]].map(([a,b],i)=><motion.div key={a} initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:.5+(2-i)*.14}}><b>{a}</b><span>{b}</span>{i===2&&<CircleAlert/>}</motion.div>)}</div></div>;
    case 9:return <div className="metrics"><div className="formula-row"><code>Retorno = Finalización − Llegada</code><code>Espera = Retorno − Ráfaga</code></div><table><thead><tr>{["Proceso","Llegada","Ráfaga","Espera","Retorno"].map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{metricRows.map((r,i)=><motion.tr key={r[0]} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:.35+i*.12}} className={i===3?"average":""}>{r.map((v,j)=><td key={j}>{v}</td>)}</motion.tr>)}</tbody></table><p>El simulador calcula el promedio de ambos.</p></div>;
    case 10:return <div className="split mock-layout"><BulletList bullets={s.bullets??[]}/><Module3Mock/></div>;
    case 11:return <div className="split"><BulletList bullets={s.bullets??[]}/><InterruptPause/></div>;
    case 12:return <InterruptFlow/>;
    case 13:return <><InterruptTypes/><div className="type-cards"><Card><div className="type-title"><Keyboard/><h3>Hardware</h3></div><p>Dispositivo externo: teclado, disco, red o temporizador.</p><p>Asíncronas · línea de petición <code>IRQ</code></p></Card><Card className="software-card"><div className="type-title"><Code2/><h3>Software</h3></div><p>El programa: llamada al sistema o excepción.</p><p>Síncronas · punto exacto de ejecución</p></Card></div></>;
    case 14:return <div className="event-grid"><EventCard icon={<HardDrive/>} title="E/S completada" text="Un dispositivo termina y el proceso bloqueado vuelve a estar listo." from="Bloqueado" to="Listo"/><EventCard icon={<Timer/>} title="Temporizador" text="El reloj marca el fin del quantum y la CPU cambia de proceso." from="Ejecutando" to="Listo"/></div>;
    case 15:return <div className="split mock-layout"><BulletList bullets={s.bullets??[]}/><Module4Mock/></div>;
    case 16:return <div className="split"><BulletList bullets={s.bullets??[]}/><ModuleVenn/></div>;
    case 17:return <div className="closing"><div className="closing-points">{s.bullets?.map((b,i)=><motion.div key={b} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:.35+i*.18}}><span><Check/></span><p>{b}</p></motion.div>)}</div><div className="thanks"><CpuChip compact/><h2>¡Gracias!</h2><p>¿Preguntas?</p></div></div>;
    default:return null;
  }})(); return <SlideShell slide={s} className={s.id===1?"cover-slide":s.id===17?"closing-slide":""}>{body}</SlideShell> }
export function SlideDeck(){return <>{slides.map((_,i)=><div key={i} style={{display:"contents"}}>{false&&<SlideView index={i}/>}</div>)}</>}
export {SlideView};

function CoverLayout({cover}:{cover:CoverContent}){
  const reduceMotion=useReducedMotion();
  return <div className="cover-grid"><div className="cover-copy"><div className="cover-rule"/><p className="cover-label">PRESENTACIÓN ACADÉMICA · 2026</p><div className="cover-groups">{cover.groups.map((group,index)=><GroupCard key={group.id} group={group} index={index} reduceMotion={Boolean(reduceMotion)}/>)}</div><InstitutionalInfo cover={cover} reduceMotion={Boolean(reduceMotion)}/></div><CpuChip/></div>
}

function GroupCard({group,index,reduceMotion}:{group:CoverGroup;index:number;reduceMotion:boolean}){
  const delay=.32+index*.08;
  return <motion.section className={`group-card group-card-${group.accent}`} aria-label={group.label} initial={{opacity:0,y:reduceMotion?0:16}} animate={{opacity:1,y:0}} transition={{duration:reduceMotion?.2:.5,delay}} {...(!reduceMotion&&{whileHover:{y:-4}})}><motion.div className="group-accent-line" initial={{scaleX:reduceMotion?1:0}} animate={{scaleX:1}} transition={{duration:reduceMotion?.2:.55,delay:delay+.1}}/><header><span><Users/></span><h2>{group.label}</h2></header><ul>{group.members.map((member,row)=><motion.li key={member.ci} initial={{opacity:0,y:reduceMotion?0:10}} animate={{opacity:1,y:0}} transition={{duration:reduceMotion?.2:.35,delay:delay+.18+row*.05}}><strong>{member.name}</strong><code>C.I: {member.ci}</code></motion.li>)}</ul></motion.section>
}

function InstitutionalInfo({cover,reduceMotion}:{cover:CoverContent;reduceMotion:boolean}){
  return <motion.div className="institutional-info" initial={{opacity:0,y:reduceMotion?0:16}} animate={{opacity:1,y:0}} transition={{duration:reduceMotion?.2:.5,delay:.48}}><div><span>ASIGNATURA</span><strong>{cover.course}</strong></div><div><span>UNIVERSIDAD</span><strong>{cover.university}</strong></div></motion.div>
}

function InterruptPause(){return <div className="interrupt-pause" role="img" aria-label="Proceso pausado y reanudado por una interrupción"><div className="process-line"><span>P1 · EJECUTANDO</span><motion.div animate={{scaleX:[1,.48,.48,1]}} transition={{duration:4,repeat:Infinity}}/></div><motion.div className="zap-float" animate={{y:[0,18,0],filter:["drop-shadow(0 0 8px var(--amber))","drop-shadow(0 0 25px var(--amber))","drop-shadow(0 0 8px var(--amber))"]}} transition={{duration:2,repeat:Infinity}}><Zap/></motion.div><div className="pause-label">PAUSA <span>→</span> ISR <span>→</span> REANUDA</div></div>}
function EventCard({icon,title,text,from,to}:{icon:React.ReactNode;title:string;text:string;from:string;to:string}){return <Card><div className="event-icon">{icon}<span>HARDWARE</span></div><h3>{title}</h3><p>{text}</p><div className="state-change"><b>{from}</b><motion.span animate={{x:[0,12,0]}} transition={{duration:1.5,repeat:Infinity}}>→</motion.span><b>{to}</b></div></Card>}
function Module3Mock(){return <div className="app-mock" role="img" aria-label="Maqueta estática del simulador de planificación"><div className="mock-top"><i/><i/><i/><span>CPU SCHEDULER</span></div><div className="mock-tabs"><b>FCFS</b><span>SJF</span><span>Round Robin</span></div><div className="mock-main"><div className="mock-form"><small>NUEVO PROCESO</small>{["Proceso P4","Llegada  03","Ráfaga  06","Prioridad  02"].map(t=><div key={t}>{t}</div>)}</div><div className="mock-chart"><small>LÍNEA DE TIEMPO</small><Gantt mode="srtf"/><div className="mock-stats"><b>Espera <span>3,33</span></b><b>Retorno <span>8,67</span></b></div></div></div></div>}
function Module4Mock(){return <div className="app-mock interrupt-mock" role="img" aria-label="Maqueta estática del simulador de interrupciones"><div className="mock-top"><i/><i/><i/><span>INTERRUPT MONITOR</span></div><div className="fake-button"><Zap/>Generar interrupción</div><div className="terminal"><div><Terminal/> REGISTRO DEL SISTEMA</div>{["> Señal IRQ recibida","> Guardando contexto de P2...","> Ejecutando ISR_TIMER","> Contexto restaurado","> P2 continúa en t=06"].map((l,i)=><motion.code key={l} initial={{width:0}} animate={{width:"100%"}} transition={{delay:.6+i*.35,duration:.6}}>{l}</motion.code>)}</div></div>}