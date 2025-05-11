import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colores, estilosGlobales } from '../estilos/estilosGlobales';
import { calcularNotaSobre10 } from '../utilidades/formatoUtilidades';

/**
 * Componente que muestra un resumen de calificación
 * @param {Object} props Propiedades del componente
 * @param {number} props.puntaje Puntaje obtenido
 * @param {number} props.puntajeMaximo Puntaje máximo posible
 * @returns {React.Component} Componente de resumen de calificación
 */
const ResumenCalificacion = ({ puntaje, puntajeMaximo }) => {
  const notaSobre10 = calcularNotaSobre10(puntaje, puntajeMaximo);
  const porcentaje = puntajeMaximo > 0 ? (puntaje / puntajeMaximo) * 100 : 0;
    const obtenerColorPorcentaje = (porcentaje) => {
    if (porcentaje < 60) return colores.deficiente;
    if (porcentaje < 70) return colores.regular;
    if (porcentaje < 80) return colores.bueno;
    if (porcentaje < 90) return colores.muyBueno;
    return colores.excelente;
  };
  
  const colorPorcentaje = obtenerColorPorcentaje(porcentaje);
  
  return (
    <View style={styles.container}>
      <View style={styles.seccion}>
        <Text style={styles.etiqueta}>Puntaje:</Text>
        <Text style={styles.valor}>{puntaje.toFixed(2)} / {puntajeMaximo.toFixed(2)}</Text>
      </View>
      
      <View style={styles.seccion}>
        <Text style={styles.etiqueta}>Nota sobre 10:</Text>
        <Text style={[styles.valor, { color: colorPorcentaje }]}>{notaSobre10.toFixed(2)}</Text>
      </View>
      
      <View style={styles.seccion}>
        <Text style={styles.etiqueta}>Porcentaje:</Text>
        <Text style={[styles.valor, { color: colorPorcentaje }]}>{porcentaje.toFixed(0)}%</Text>
      </View>
      
      <View style={styles.barraProgresoContainer}>
        <View 
          style={[
            styles.barraProgreso, 
            { width: `${porcentaje}%`, backgroundColor: colorPorcentaje }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  seccion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  etiqueta: {
    fontSize: 16,
    color: colores.texto,
  },
  valor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colores.primario,
  },
  barraProgresoContainer: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginTop: 8,
    overflow: 'hidden',
  },
  barraProgreso: {
    height: '100%',
    borderRadius: 4,
  },
});

export default ResumenCalificacion;
