# OS Simulator Showcase

1. Objetivo

Crea una presentación web de diapositivas (tipo keynote) con React y TypeScript. Debe verse muy profesional, con vibra tecnológica, colores vivos y animaciones fluidas.

El tema es: "Simulador de Sistemas Operativos: Módulo 3 (Gestión de CPU) y Módulo 4 (Interrupciones)". La presentación explica el contenido teórico que luego se demuestra en un simulador aparte.

2. Alcance

SÍ hacer:

Una presentación de 17 diapositivas, navegable con teclado, clic y gestos táctiles.
Diagramas y figuras animadas que expliquen visualmente cada concepto (estados de proceso, Gantt de ejemplo, flujo de una interrupción).
Animaciones de entrada, transiciones entre diapositivas y formas de fondo con movimiento sutil.

NO hacer:

No implementar ninguna simulación funcional de planificación de CPU ni de interrupciones.
No agregar formularios, inputs de procesos, botones que ejecuten algoritmos ni lógica de cálculo.
No agregar backend, autenticación ni base de datos.

Los diagramas son ilustraciones animadas con datos fijos, no herramientas interactivas. En las diapositivas de interactividad, muestra la interfaz solo como maqueta visual estática.

3. Stack técnico
React + TypeScript (Vite), Tailwind CSS y shadcn/ui solo si hace falta algún componente base.
Framer Motion para transiciones, animaciones de entrada escalonadas y movimiento de figuras.
lucide-react para los iconos (trazo lineal uniforme).
Fuentes con @fontsource o Google Fonts.
Sin librerías pesadas adicionales. Los diagramas y fondos se hacen con SVG y CSS.
4. Sistema de diseño

Paleta (modo oscuro, colores vivos):

Fondo base: 
#070B1A
Superficie de tarjetas: 
#0F1730 con borde rgba(255,255,255,0.08) y efecto glass sutil
Cian eléctrico (primario): 
#22D3EE
Violeta (secundario): 
#8B5CF6
Magenta (acento): 
#F472B6
Texto principal: 
#E2E8F0
Texto secundario: 
#94A3B8
Gradiente de marca: cian → violeta → magenta (para títulos destacados y líneas de acento)

Colores fijos por estado de proceso (usarlos igual en todas las diapositivas):

Nuevo: 
#94A3B8
Listo: 
#3B82F6
Ejecutando: 
#34D399
Bloqueado: 
#FBBF24
Terminado: 
#F43F5E

Tipografía:

Títulos: Space Grotesk (700), con tamaño grande y tracking ajustado.
Cuerpo: Inter (400/500/600).
Fórmulas, tiempos y logs: JetBrains Mono.

Estilo general:

Bordes redondeados (rounded-2xl), sombras con brillo de color (glow cian o violeta).
Mucho espacio en blanco y máximo 3 o 4 ideas por diapositiva.
Insignia flotante "Se demuestra en el simulador" en las diapositivas de los módulos, con icono de play.
5. Fondo animado global (movimiento sutil)

Crea un componente AnimatedBackground fijo detrás de todas las diapositivas:

Cuadrícula tenue con degradado que se desvanece hacia los bordes.
2 o 3 manchas de gradiente (cian, violeta, magenta) muy desenfocadas que derivan lentamente (ciclos de 20 a 30 s).
Pequeños nodos y partículas SVG que flotan y se conectan con líneas muy tenues.
El fondo cambia levemente de tono según la sección: cian en Módulo 3, violeta en Módulo 4.
6. Transiciones y animaciones
Entre diapositivas: AnimatePresence con transición según la dirección. Al avanzar, la diapositiva entra desde la derecha con fade y ligero blur, y la anterior sale hacia la izquierda. Al retroceder, se invierte. Duración de 0.6 s con ease [0.22, 1, 0.36, 1].
Contenido de cada diapositiva: entrada escalonada (staggerChildren de 0.08 s) con fade y desplazamiento vertical de 16 px. El título entra primero.
Figuras con movimiento continuo y sutil: pulso en las pistas del chip, órbita de un punto alrededor del reloj, flujo de partículas sobre las flechas de los diagramas.
Micro-interacciones: las tarjetas suben 4 px y brillan al pasar el cursor.
Respetar prefers-reduced-motion: reducir las animaciones a fades simples.
7. Navegación y accesibilidad
Flechas ← → y barra espaciadora para navegar; tecla F para pantalla completa.
Botones flotantes anterior/siguiente, contador "05 / 17" y barra de progreso con gradiente en la parte superior.
Gestos de deslizamiento en móvil.
Sincronizar la diapositiva actual con el hash de la URL (#5).
Diseño responsive, optimizado para 16:9 en pantalla completa.
Contraste adecuado y etiquetas aria en los botones.
8. Arquitectura sugerida
src/
  components/
    SlideShell.tsx         (marco común: título, subtítulo, insignia)
    AnimatedBackground.tsx
    SlideNavigator.tsx     (teclado, gestos, progreso, hash)
    diagrams/
      CpuChip.tsx
      ProcessStates.tsx
      GanttMini.tsx
      RoundRobinRing.tsx
      InterruptFlow.tsx
      VennModules.tsx
  slides/
    slides.tsx             (array tipado con las 17 diapositivas)
  pages/Index.tsx

Define un tipo Slide con id, section ("intro" | "modulo3" | "modulo4" | "cierre") y component. Los textos deben ser fáciles de editar desde un solo lugar.

9. Contenido de las diapositivas (en español)

1. Portada

Título: Simulador de Sistemas Operativos
Subtítulo: Módulo 3: Gestión de CPU · Módulo 4: Interrupciones
Datos: [Nombre del estudiante] · [Asignatura] · [Universidad] · [Fecha]
Visual: chip de CPU grande en SVG con pistas que pulsan en cian y violeta, a la derecha.

2. Contenido

Título: ¿Qué veremos?
Cuatro tarjetas numeradas: 1) Gestión de CPU: planificación de procesos, 2) Algoritmos y métricas de rendimiento, 3) Interrupciones: contexto, ISR, hardware y software, 4) Interactividad del simulador y conclusiones.
Cada tarjeta lleva su icono (Cpu, BarChart3, Zap, MousePointerClick).

3. Módulo 3: Gestión de CPU

Subtítulo: Planificación de procesos
Puntos: La CPU ejecuta un proceso a la vez y el planificador decide cuál. · Objetivo: aprovechar la CPU y reducir los tiempos de espera. · El simulador compara algoritmos con los mismos procesos.
Visual: cola de bloques P1, P2, P3 que avanzan hacia una CPU, con animación en bucle.

4. Estados de un proceso

Subtítulo: Ciclo de vida dentro del simulador
Cinco estados: Nuevo (fue creado) · Listo (espera su turno) · Ejecutando (usa la CPU) · Bloqueado (espera un evento, como E/S) · Terminado (finalizó).
Visual: diagrama de transiciones con cinco nodos en sus colores de estado. Las flechas se dibujan (pathLength) al entrar y un pequeño punto recorre el ciclo en bucle.

5. FCFS (First Come, First Served)

Subtítulo: El primero en llegar es el primero en ejecutarse
Tipo: no apropiativo. · Ventaja: simple de implementar. · Desventaja: efecto convoy, un proceso largo retrasa a los demás.
Visual: mini Gantt con tres barras que crecen en secuencia (P1 larga, P2 y P3 cortas).

6. SJF (Shortest Job First)

Subtítulo: Se ejecuta el proceso con menor ráfaga
No apropiativo: el proceso en ejecución termina antes de cambiar. · Apropiativo (SRTF): un proceso nuevo con menor tiempo restante desplaza al actual. · Reduce la espera promedio, pero puede dejar sin CPU a los procesos largos.
Visual: dos mini Gantt lado a lado con etiquetas "No apropiativo" y "Apropiativo".

7. Round Robin

Subtítulo: Turnos de tiempo iguales (quantum)
Cada proceso usa la CPU durante un quantum y vuelve al final de la cola. · Es apropiativo y equitativo. · Un quantum muy pequeño genera demasiados cambios de contexto.
Visual: anillo circular con sectores P1 a P4 y un indicador que gira lentamente, resaltando el sector activo.

8. Planificación por prioridad

Subtítulo: Se ejecuta primero el proceso más importante
Cada proceso tiene un número de prioridad. · Puede ser apropiativa o no apropiativa. · Riesgo: inanición de los procesos de baja prioridad, que se resuelve con envejecimiento.
Visual: tres niveles apilados (Alta, Media, Baja) que aparecen de abajo hacia arriba, con icono de advertencia junto a "inanición".

9. Métricas de rendimiento

Subtítulo: ¿Cómo comparamos los algoritmos?
Fórmulas (en JetBrains Mono): Retorno = Finalización − Llegada · Espera = Retorno − Ráfaga. El simulador calcula el promedio de ambos.
Tabla de ejemplo con FCFS:
Proceso	Llegada	Ráfaga	Espera	Retorno
P1	0	5	0	5
P2	1	3	4	7
P3	2	8	6	14
Promedio			3,33	8,67
Visual: las filas entran una a una y la fila de promedios se resalta con un brillo cian.

10. Interactividad del Módulo 3

Subtítulo: Del formulario al diagrama de Gantt
Añadir procesos con llegada, ráfaga y prioridad. · Elegir el algoritmo y ejecutar. · Ver la línea de tiempo (Gantt) y las métricas.
Visual: maqueta estática de una interfaz (formulario a la izquierda, botones de algoritmo arriba, Gantt de colores abajo), con un ligero efecto flotante. No debe funcionar.

11. Módulo 4: Interrupciones

Subtítulo: Cuando un evento interrumpe a la CPU
Una interrupción es una señal que detiene temporalmente el proceso en ejecución. · Permite responder rápido a eventos. · Ejemplos: E/S completada y temporizador.
Visual: icono de rayo sobre una barra de proceso que se pausa y se reanuda, en bucle.

12. Flujo de una interrupción

Subtítulo: Qué muestra la simulación paso a paso
Llega la señal de interrupción · 2) Se guarda el contexto · 3) Se ejecuta la rutina de servicio (ISR) · 4) Se restaura el contexto · 5) El proceso continúa donde se quedó.
Visual: línea de tiempo horizontal con cinco pasos e iconos (Zap, Save, Settings, Undo2, Play). Un pulso de luz recorre los pasos 2 a 4, que aparecen resaltados.

13. Tipos de interrupciones

Subtítulo: Hardware y software
Por hardware: las genera un dispositivo externo (teclado, disco, red, temporizador), llegan en cualquier momento (asíncronas) y se anuncian mediante una línea de petición (IRQ).
Por software: las genera el propio programa, por ejemplo con una llamada al sistema o una excepción como la división entre cero, y ocurren en un punto exacto de la ejecución (síncronas).
Visual: dos tarjetas enfrentadas. Hardware (icono Cpu/Keyboard, color cian) y Software (icono Code2/Terminal, color violeta), con una línea de flujo animada desde cada origen hacia la CPU.

14. Eventos que generan interrupciones

Subtítulo: Dos casos representados en el simulador
E/S completada (hardware): un dispositivo termina y el proceso bloqueado pasa a listo. · Temporizador (hardware): el reloj marca el fin del quantum y la CPU cambia de proceso.
Visual: dos tarjetas con iconos (HardDrive y Timer), cada una con una flecha corta animada entre estados (Bloqueado → Listo / Ejecutando → Listo).

15. Interactividad del Módulo 4

Subtítulo: Genera una interrupción y observa el flujo
Botón "Generar interrupción" para activarla en cualquier momento. · Se muestran el guardado del contexto, la ISR y la restauración. · Opción de simular interrupciones de temporizador con Round Robin.
Visual: maqueta estática con un botón grande ámbar "Generar interrupción" y un panel de registro en JetBrains Mono con líneas de ejemplo que aparecen con efecto de escritura. No debe ejecutar nada.

16. Cómo se conectan ambos módulos

Subtítulo: El temporizador une la planificación y las interrupciones
Round Robin depende de la interrupción del temporizador para cambiar de proceso. · Cada cambio implica guardar y restaurar contexto. · El Módulo 3 decide quién usa la CPU; el Módulo 4 muestra cómo se hace el cambio.
Visual: dos círculos que se solapan (cian y violeta) con un reloj en la intersección que pulsa suavemente.

17. Conclusiones y cierre

Puntos: El simulador permite comparar algoritmos con métricas claras. · Visualizar los estados y el Gantt facilita la comprensión. · Simular interrupciones muestra cómo el sistema operativo controla la CPU.
Cierre: ¡Gracias! ¿Preguntas? · [Nombre] · [Correo o contacto]
Visual: fondo igual al de la portada con el chip de CPU en tamaño reducido; los tres puntos aparecen con un check animado.
10. Plan de implementación (por fases)
Base: configurar fuentes, tokens de color en Tailwind, AnimatedBackground y SlideShell.
Navegación: SlideNavigator con teclado, gestos, progreso, contador y hash de URL, más las transiciones con AnimatePresence.
Diagramas SVG: CpuChip, ProcessStates, GanttMini, RoundRobinRing, InterruptFlow, VennModules.
Diapositivas: cargar el contenido de las 17 en slides.tsx, con animaciones escalonadas.
Pulido: insignia "Se demuestra en el simulador", pantalla completa, prefers-reduced-motion y revisión responsive.
11. Criterios de aceptación
Las 17 diapositivas se ven consistentes y legibles a pantalla completa.
Las transiciones son fluidas, sin saltos ni parpadeos.
Los colores de estado son idénticos en todas las diapositivas.
No existe ninguna lógica de simulación real.
Los textos se pueden editar desde un solo archivo.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/805fad68-133f-41ab-a19e-a1a645c1f1ae).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
