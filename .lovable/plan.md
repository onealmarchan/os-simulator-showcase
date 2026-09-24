# Actualización de portada y cierre

## Resultado

Actualizar únicamente la diapositiva 1 con los dos grupos y los datos institucionales proporcionados, manteniendo intactos el fondo, el título, el subtítulo, el chip y la navegación. Como única excepción adicional solicitada, retirar los marcadores de nombre y contacto de la diapositiva 17.

## Implementación

1. **Datos editables**
   - Ampliar la definición tipada de la diapositiva 1 con `cover.groups`, integrantes, cédulas, asignatura y universidad.
   - Guardar allí los nombres, números y textos exactamente como fueron proporcionados.

2. **Nueva composición de la portada**
   - Sustituir los cuatro marcadores actuales por dos tarjetas `GroupCard` accesibles, lado a lado y de igual altura.
   - Mostrar cada grupo como lista semántica, con icono `Users`, encabezado monoespaciado, nombres y cédulas alineadas con números tabulares.
   - Añadir debajo una franja `InstitutionalInfo` sin tarjeta para Asignatura y Universidad.
   - Mantener aire suficiente respecto al chip, controles inferiores y marca de esquina; ajustar solo la composición de la portada si fuera necesario.

3. **Estilo y movimiento**
   - Usar los tokens existentes: superficie glass, cian para Módulo 03 y violeta para Módulo 04, sin colores hardcodeados en los componentes.
   - Añadir línea superior animada, brillo por módulo, elevación de 4 px al pasar el cursor y entrada escalonada en el orden solicitado.
   - Escalonar las filas a 0,05 s y conservar una versión simple para movimiento reducido.

4. **Cambio puntual en el cierre**
   - Eliminar únicamente `[Nombre] · [Correo o contacto]` de la diapositiva 17, sin modificar su contenido restante.

5. **Validación**
   - Revisar la portada en escritorio 16:9, pantalla completa y móvil horizontal.
   - Confirmar nombres y cédulas exactos, tarjetas de igual altura, alineación, legibilidad y ausencia de recortes o solapamientos.
   - Verificar orden de animación, movimiento reducido y consola sin errores.
   - Confirmar que las diapositivas 2 a 16 y toda la lógica de navegación permanecen sin cambios.

## Detalles técnicos

Los cambios se limitarán a los datos tipados de las diapositivas, los componentes visuales de la portada y cierre, y los estilos específicos de portada. No se tocarán la navegación, el fondo global ni los diagramas de las demás diapositivas.
