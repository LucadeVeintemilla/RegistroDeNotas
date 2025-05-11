/**
 * Utilidades para el formateo de datos en la aplicación
 */

/**
 * Formatea un puntaje numérico a una etiqueta cualitativa
 * @param {number} puntaje Puntaje a formatear
 * @param {string} tipo Tipo de indicador (normal o exposicion)
 * @returns {string} Etiqueta cualitativa
 */
export const formatearCalificacion = (puntaje, tipo = 'normal') => {
  if (tipo === 'exposicion') {
    if (puntaje === 0) return 'Deficiente';
    if (puntaje === 1) return 'Regular';
    if (puntaje === 2) return 'Bueno';
    if (puntaje === 3) return 'Muy Bueno';
    if (puntaje === 4) return 'Excelente';
  }
  
  if (tipo === 'coherencia') {
    if (puntaje === 0) return 'Deficiente';
    if (puntaje === 0.5) return 'Regular';
    if (puntaje === 1) return 'Bueno';
    if (puntaje === 1.5) return 'Muy Bueno';
    if (puntaje === 2) return 'Excelente';
  }
  
  if (puntaje === 0) return 'Deficiente';
  if (puntaje === 0.25) return 'Regular';
  if (puntaje === 0.5) return 'Bueno';
  if (puntaje === 0.75) return 'Muy Bueno';
  if (puntaje === 1) return 'Excelente';
  
  return 'No determinado';
};

/**
 * Calcula la nota equivalente sobre una escala de 10
 * @param {number} puntaje Puntaje actual
 * @param {number} puntajeMaximo Puntaje máximo posible
 * @returns {number} Nota sobre 10
 */
export const calcularNotaSobre10 = (puntaje, puntajeMaximo) => {
  if (puntajeMaximo === 0) return 0;
  return (puntaje * 10) / puntajeMaximo;
};

/**
 * Formatea una fecha para mostrarla
 * @param {string} fecha Fecha en formato ISO o de base de datos
 * @returns {string} Fecha formateada en formato local
 */
export const formatearFecha = (fecha) => {
  if (!fecha) return '';
  
  try {
    const date = new Date(fecha);
    return date.toLocaleDateString();
  } catch (error) {
    console.error('Error al formatear fecha:', error);
    return fecha;
  }
};

/**
 * Obtiene un color según la calificación
 * @param {string} calificacion Calificación (Deficiente, Regular, etc.)
 * @returns {string} Código de color hexadecimal
 */
export const obtenerColorCalificacion = (calificacion) => {
  switch (calificacion) {
    case 'Deficiente':
      return '#f44336'; // Rojo
    case 'Regular':
      return '#ff9800'; // Naranja
    case 'Bueno':
      return '#cddc39'; // Lima
    case 'Muy Bueno':
      return '#4caf50'; // Verde
    case 'Excelente':
      return '#2196f3'; // Azul
    default:
      return '#757575'; // Gris
  }
};
