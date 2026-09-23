# Plan: Presentación web — Gestión de CPU e Interrupciones

## Resultado

Construir una presentación web profesional de **17 diapositivas**, en español, optimizada para formato 16:9 y pantalla completa. Será una experiencia expositiva: todos los diagramas y maquetas usarán datos fijos y no incluirán simulación real, formularios funcionales, backend ni persistencia.

## Implementación

### 1. Base visual y estructura
- Sustituir la pantalla inicial por la presentación en `/`, conservando la arquitectura actual de React y TypeScript.
- Incorporar Framer Motion para transiciones y animaciones; usar Lucide para todos los iconos.
- Cargar Space Grotesk, Inter y JetBrains Mono desde el encabezado del documento.
- Definir en el sistema global de estilos la paleta oscura, gradiente de marca, colores fijos de estados, brillos, superficies y tipografías.
- Crear un lienzo interno fijo de **1920×1080**, centrado y escalado proporcionalmente para escritorio, móvil y pantalla completa.

### 2. Sistema reutilizable de diapositivas
- Crear un marco común con títulos, subtítulos, numeración, insignia “Se demuestra en el simulador” y zonas de contenido consistentes.
- Mantener los textos, datos, fórmulas y metadatos de las 17 diapositivas en un único archivo tipado para facilitar su edición.
- Separar la presentación visual de cada diapositiva en componentes enfocados, sin mezclar lógica de navegación con contenido.
- Añadir metadatos propios de la página: título, descripción, Open Graph y Twitter.

### 3. Navegación y presentación
- Navegar con flechas, barra espaciadora, clic en controles flotantes y gesto horizontal táctil.
- Activar pantalla completa con `F` y manejar correctamente su salida.
- Sincronizar la diapositiva actual con `#1` a `#17`, incluyendo carga inicial, compartir enlace y botones atrás/adelante del navegador.
- Mostrar barra superior de progreso, contador `05 / 17` y controles anterior/siguiente con etiquetas accesibles.
- Actualizar el título de la pestaña con el número y nombre de la diapositiva actual.

### 4. Movimiento y ambientación
- Crear el fondo fijo con cuadrícula atenuada, manchas cian/violeta/magenta, nodos y conexiones; el matiz cambiará según la sección.
- Implementar transiciones direccionales de 0,6 s con desvanecido y desenfoque mediante `AnimatePresence`.
- Aplicar entradas escalonadas al título y contenido, y movimiento continuo sutil a diagramas y figuras.
- Añadir elevación y brillo al pasar el cursor por tarjetas.
- Respetar `prefers-reduced-motion` con transiciones simples y sin movimiento continuo.

### 5. Diagramas ilustrativos
- Construir con SVG y CSS los recursos reutilizables: chip de CPU, cola de procesos, estados y transiciones, Gantt, anillo Round Robin, flujo de interrupción y unión de módulos.
- Mantener los colores de Nuevo, Listo, Ejecutando, Bloqueado y Terminado idénticos en toda la presentación.
- Crear las maquetas estáticas de los módulos 3 y 4 con apariencia de interfaz, pero sin campos editables ni acciones ejecutables.

### 6. Contenido de las 17 diapositivas
- Montar exactamente la secuencia indicada: portada, agenda, siete diapositivas del Módulo 3, su maqueta, cinco diapositivas del Módulo 4, conexión entre módulos y cierre.
- Usar las fórmulas, tabla FCFS y valores proporcionados sin alterar los datos.
- Conservar los marcadores visibles `[Nombre del estudiante]`, `[Asignatura]`, `[Universidad]`, `[Fecha]` y `[Correo o contacto]` hasta recibir los datos reales.

### 7. Validación
- Revisar las 17 diapositivas en escritorio 16:9 y móvil, comprobando legibilidad, ausencia de recortes y consistencia visual.
- Probar navegación por teclado, clic, gesto, hash y pantalla completa.
- Verificar transiciones hacia delante y atrás, modo de movimiento reducido y ausencia de errores en consola.
- Confirmar que las maquetas no ejecutan algoritmos ni interrupciones y que no existe lógica de simulación.

## Detalles técnicos

- La aplicación seguirá usando TanStack Start sobre Vite; la presentación vivirá en la ruta principal existente.
- Framer Motion será la única dependencia nueva necesaria para animación.
- Los colores se expondrán como tokens semánticos y los componentes no contendrán colores visuales hardcodeados.
- No se añadirá base de datos, autenticación, API ni almacenamiento local.