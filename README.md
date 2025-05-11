# Aplicación de Registro de Notas

Aplicación móvil desarrollada con React Native y Expo para el registro y evaluación de presentaciones académicas utilizando una rúbrica predefinida. La aplicación utiliza SQLite como base de datos local para almacenar los datos.

## Características

- Registro de evaluaciones para estudiantes según una rúbrica predefinida
- Visualización de criterios e indicadores organizados jerárquicamente
- Calificación mediante escala cualitativa y cuantitativa (Deficiente, Regular, Bueno, Muy Bueno, Excelente)
- Cálculo automático del puntaje total
- Almacenamiento local con SQLite
- Búsqueda de evaluaciones por código de estudiante
- Visualización detallada de evaluaciones realizadas

## Estructura de la Rúbrica

La rúbrica de evaluación consta de 3 criterios principales:

1. **ACTITUD** (2 indicadores)
   - Presentación y postura
   - Tono de voz y lenguaje acorde al tema

2. **DEL CONTENIDO DE LA PRESENTACIÓN** (4 indicadores)
   - Orden y secuencia de la presentación
   - Es llamativo, prioriza gráficos antes que texto
   - Presenta los objetivos y resultados con claridad
   - Coherencia con el trabajo escrito

3. **EXPOSICIÓN** (4 indicadores)
   - Demuestra dominio del tema durante la defensa
   - Presenta con precisión los resultados de la investigación
   - Responde correctamente y con seguridad las preguntas del tribunal
   - Respeta el tiempo establecido de la exposición

## Instalación

1. Asegúrate de tener Node.js y npm instalados
2. Instala Expo CLI: `npm install -g expo-cli`
3. Clona este repositorio
4. Instala las dependencias: `npm install`
5. Inicia la aplicación: `npm start` o `expo start`

## Estructura del Proyecto

```
RegistroDeNotas/
├── App.js                      # Punto de entrada de la aplicación
├── app.json                    # Configuración de Expo
├── package.json                # Dependencias y scripts
├── babel.config.js             # Configuración de Babel
├── src/
│   ├── assets/                 # Recursos estáticos (imágenes, etc.)
│   ├── basedatos/              # Código para la gestión de la base de datos SQLite
│   │   ├── conexion.js         # Conexión a la base de datos
│   │   └── rubricaServicio.js  # Servicios para la gestión de la rúbrica
│   ├── componentes/            # Componentes reutilizables
│   │   ├── Cabecera.js         # Componente de cabecera
│   │   ├── CriterioEvaluacion.js # Componente para mostrar un criterio
│   │   ├── IndicadorEvaluacion.js # Componente para mostrar un indicador
│   │   └── OpcionCalificacion.js # Componente para mostrar una opción de calificación
│   ├── datos/                  # Datos de la aplicación
│   │   └── rubrica.js          # Estructura de la rúbrica
│   ├── estilos/                # Estilos globales
│   │   └── estilosGlobales.js  # Estilos compartidos en toda la aplicación
│   ├── navegacion/             # Configuración de navegación
│   │   └── Navegacion.js       # Navegación entre pantallas
│   ├── pantallas/              # Pantallas de la aplicación
│   │   ├── PantallaInicio.js   # Pantalla principal
│   │   ├── PantallaNuevaEvaluacion.js # Pantalla para crear evaluación
│   │   ├── PantallaBuscarEvaluaciones.js # Pantalla para buscar evaluaciones
│   │   └── PantallaDetalleEvaluacion.js # Pantalla para ver detalle
│   └── utilidades/             # Funciones de utilidad
└── README.md                   # Documentación
```

## Tecnologías Utilizadas

- React Native
- Expo
- SQLite
- React Navigation

## Licencia

Este proyecto está bajo la Licencia MIT.
