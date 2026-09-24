export type SlideSection = "intro" | "modulo3" | "modulo4" | "cierre";

export type CoverGroup = {
  id: "module03" | "module04";
  label: string;
  accent: "cyan" | "violet";
  members: { name: string; ci: string }[];
};

export type CoverContent = {
  groups: CoverGroup[];
  course: string;
  university: string;
};

export type Slide = {
  id: number;
  section: SlideSection;
  title: string;
  subtitle?: string;
  demo: boolean;
  bullets?: string[];
  cover?: CoverContent;
};

export const slides: Slide[] = [
  {
    id: 1,
    section: "intro",
    title: "Simulador de Sistemas Operativos",
    subtitle: "Módulo 3: Gestión de CPU · Módulo 4: Interrupciones",
    demo: false,
    cover: {
      groups: [
        {
          id: "module03",
          label: "Grupo Módulo 03",
          accent: "cyan",
          members: [
            { name: "Manuel Salazar", ci: "31.278.552" },
            { name: "Guillermo Rojas", ci: "28.752.317" },
            { name: "O'Neal Marchan", ci: "30.143.749" },
          ],
        },
        {
          id: "module04",
          label: "Grupo Módulo 04",
          accent: "violet",
          members: [
            { name: "Saúl Ramos", ci: "31.156.858" },
            { name: "Gabriel Bastardo", ci: "31.257.502" },
          ],
        },
      ],
      course: "Sistemas Operativos",
      university: 'Universidad Politécnica Territorial del Oeste de Sucre "Clodosbaldo Russián"',
    },
  },
  { id: 2, section: "intro", title: "¿Qué veremos?", demo: false },
  { id: 3, section: "modulo3", title: "Módulo 3: Gestión de CPU", subtitle: "Planificación de procesos", demo: true, bullets: ["La CPU ejecuta un proceso a la vez y el planificador decide cuál.", "Objetivo: aprovechar la CPU y reducir los tiempos de espera.", "El simulador compara algoritmos con los mismos procesos."] },
  { id: 4, section: "modulo3", title: "Estados de un proceso", subtitle: "Ciclo de vida dentro del simulador", demo: true },
  { id: 5, section: "modulo3", title: "FCFS", subtitle: "El primero en llegar es el primero en ejecutarse", demo: true, bullets: ["Tipo: no apropiativo.", "Ventaja: simple de implementar.", "Desventaja: efecto convoy, un proceso largo retrasa a los demás."] },
  { id: 6, section: "modulo3", title: "SJF", subtitle: "Se ejecuta el proceso con menor ráfaga", demo: true, bullets: ["No apropiativo: el proceso en ejecución termina antes de cambiar.", "Apropiativo (SRTF): un proceso nuevo con menor tiempo restante desplaza al actual.", "Reduce la espera promedio, pero puede dejar sin CPU a los procesos largos."] },
  { id: 7, section: "modulo3", title: "Round Robin", subtitle: "Turnos de tiempo iguales (quantum)", demo: true, bullets: ["Cada proceso usa la CPU durante un quantum y vuelve al final de la cola.", "Es apropiativo y equitativo.", "Un quantum muy pequeño genera demasiados cambios de contexto."] },
  { id: 8, section: "modulo3", title: "Planificación por prioridad", subtitle: "Se ejecuta primero el proceso más importante", demo: true, bullets: ["Cada proceso tiene un número de prioridad.", "Puede ser apropiativa o no apropiativa.", "Riesgo: inanición de procesos de baja prioridad; se resuelve con envejecimiento."] },
  { id: 9, section: "modulo3", title: "Métricas de rendimiento", subtitle: "¿Cómo comparamos los algoritmos?", demo: true },
  { id: 10, section: "modulo3", title: "Interactividad del Módulo 3", subtitle: "Del formulario al diagrama de Gantt", demo: true, bullets: ["Añadir procesos con llegada, ráfaga y prioridad.", "Elegir el algoritmo y ejecutar.", "Ver la línea de tiempo (Gantt) y las métricas."] },
  { id: 11, section: "modulo4", title: "Módulo 4: Interrupciones", subtitle: "Cuando un evento interrumpe a la CPU", demo: true, bullets: ["Una interrupción detiene temporalmente el proceso en ejecución.", "Permite responder rápido a eventos.", "Ejemplos: E/S completada y temporizador."] },
  { id: 12, section: "modulo4", title: "Flujo de una interrupción", subtitle: "Qué muestra la simulación paso a paso", demo: true },
  { id: 13, section: "modulo4", title: "Tipos de interrupciones", subtitle: "Hardware y software", demo: true },
  { id: 14, section: "modulo4", title: "Eventos que generan interrupciones", subtitle: "Dos casos representados en el simulador", demo: true },
  { id: 15, section: "modulo4", title: "Interactividad del Módulo 4", subtitle: "Genera una interrupción y observa el flujo", demo: true, bullets: ["Botón “Generar interrupción” para activarla en cualquier momento.", "Se muestran el guardado del contexto, la ISR y la restauración.", "Opción de simular interrupciones de temporizador con Round Robin."] },
  { id: 16, section: "intro", title: "Cómo se conectan ambos módulos", subtitle: "El temporizador une la planificación y las interrupciones", demo: true, bullets: ["Round Robin depende de la interrupción del temporizador para cambiar de proceso.", "Cada cambio implica guardar y restaurar contexto.", "El Módulo 3 decide quién usa la CPU; el Módulo 4 muestra cómo se hace el cambio."] },
  { id: 17, section: "cierre", title: "Conclusiones y cierre", demo: false, bullets: ["El simulador permite comparar algoritmos con métricas claras.", "Visualizar los estados y el Gantt facilita la comprensión.", "Simular interrupciones muestra cómo el sistema operativo controla la CPU."] },
];

export const agenda = [
  ["Gestión de CPU", "Planificación de procesos"],
  ["Algoritmos y métricas", "Rendimiento y comparación"],
  ["Interrupciones", "Contexto, ISR, hardware y software"],
  ["Interactividad", "Simulador y conclusiones"],
] as const;

export const processStates = [
  ["Nuevo", "Fue creado", "state-new"],
  ["Listo", "Espera su turno", "state-ready"],
  ["Ejecutando", "Usa la CPU", "state-running"],
  ["Bloqueado", "Espera un evento, como E/S", "state-blocked"],
  ["Terminado", "Finalizó", "state-finished"],
] as const;

export const metricRows = [
  ["P1", "0", "5", "0", "5"],
  ["P2", "1", "3", "4", "7"],
  ["P3", "2", "8", "6", "14"],
  ["Promedio", "", "", "3,33", "8,67"],
] as const;