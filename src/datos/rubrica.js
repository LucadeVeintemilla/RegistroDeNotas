/**
 * Estructura de la rúbrica para evaluar presentaciones
 */
export const rubrica = [
  {
    criterio: "ACTITUD",
    indicadores: [
      {
        nombre: "Presentación y postura",
        opciones: [
          { label: "Deficiente", value: 0 },
          { label: "Regular", value: 0.25 },
          { label: "Bueno", value: 0.5 },
          { label: "Muy Bueno", value: 0.75 },
          { label: "Excelente", value: 1 },
        ],
      },
      {
        nombre: "Tono de voz y lenguaje acorde al tema",
        opciones: [
          { label: "Deficiente", value: 0 },
          { label: "Regular", value: 0.25 },
          { label: "Bueno", value: 0.5 },
          { label: "Muy Bueno", value: 0.75 },
          { label: "Excelente", value: 1 },
        ],
      },
    ],
  },
  {
    criterio: "DEL CONTENIDO DE LA PRESENTACIÓN",
    indicadores: [
      {
        nombre: "Orden y secuencia de la presentación",
        opciones: [
          { label: "Deficiente", value: 0 },
          { label: "Regular", value: 0.25 },
          { label: "Bueno", value: 0.5 },
          { label: "Muy Bueno", value: 0.75 },
          { label: "Excelente", value: 1 },
        ],
      },
      {
        nombre: "Es llamativo, prioriza gráficos antes que texto",
        opciones: [
          { label: "Deficiente", value: 0 },
          { label: "Regular", value: 0.25 },
          { label: "Bueno", value: 0.5 },
          { label: "Muy Bueno", value: 0.75 },
          { label: "Excelente", value: 1 },
        ],
      },
      {
        nombre: "Presenta los objetivos y resultados con claridad",
        opciones: [
          { label: "Deficiente", value: 0 },
          { label: "Regular", value: 0.25 },
          { label: "Bueno", value: 0.5 },
          { label: "Muy Bueno", value: 0.75 },
          { label: "Excelente", value: 1 },
        ],
      },
      {
        nombre: "Coherencia con el trabajo escrito",
        opciones: [
          { label: "Deficiente", value: 0 },
          { label: "Regular", value: 0.5 },
          { label: "Bueno", value: 1 },
          { label: "Muy Bueno", value: 1.5 },
          { label: "Excelente", value: 2 },
        ],
      },
    ],
  },
  {
    criterio: "EXPOSICIÓN",
    indicadores: [
      {
        nombre: "Demuestra dominio del tema durante la defensa",
        opciones: [
          { label: "Deficiente", value: 0 },
          { label: "Regular", value: 1 },
          { label: "Bueno", value: 2 },
          { label: "Muy Bueno", value: 3 },
          { label: "Excelente", value: 4 },
        ],
      },
      {
        nombre: "Presenta con precisión los resultados de la investigación",
        opciones: [
          { label: "Deficiente", value: 0 },
          { label: "Regular", value: 1 },
          { label: "Bueno", value: 2 },
          { label: "Muy Bueno", value: 3 },
          { label: "Excelente", value: 4 },
        ],
      },
      {
        nombre: "Responde correctamente y con seguridad las preguntas del tribunal",
        opciones: [
          { label: "Deficiente", value: 0 },
          { label: "Regular", value: 1 },
          { label: "Bueno", value: 2 },
          { label: "Muy Bueno", value: 3 },
          { label: "Excelente", value: 4 },
        ],
      },
      {
        nombre: "Respeta el tiempo establecido de la exposición",
        opciones: [
          { label: "Deficiente", value: 0 },
          { label: "Regular", value: 0.25 },
          { label: "Bueno", value: 0.5 },
          { label: "Muy Bueno", value: 0.75 },
          { label: "Excelente", value: 1 },
        ],
      },
    ],
  },
];

/**
 * Calcula el puntaje máximo posible según la rúbrica
 * @returns {number} Puntaje máximo posible
 */
export const calcularPuntajeMaximo = () => {
  let puntajeMaximo = 0;
  
  rubrica.forEach(criterio => {
    criterio.indicadores.forEach(indicador => {
      const valorMaximo = Math.max(...indicador.opciones.map(opcion => opcion.value));
      puntajeMaximo += valorMaximo;
    });
  });
  
  return puntajeMaximo;
};

export default rubrica;
