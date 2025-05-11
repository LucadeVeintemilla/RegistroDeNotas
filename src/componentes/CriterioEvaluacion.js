import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IndicadorEvaluacion from './IndicadorEvaluacion';
import { estilosGlobales } from '../estilos/estilosGlobales';

/**
 * Componente que muestra un criterio con todos sus indicadores
 * @param {Object} props Propiedades del componente
 * @param {Object} props.criterio Objeto con los datos del criterio
 * @param {Object} props.valoresSeleccionados Objeto con los valores seleccionados para cada indicador
 * @param {Function} props.onSeleccionarValor Función a ejecutar cuando se selecciona un valor
 * @returns {React.Component} Componente de criterio de evaluación
 */
const CriterioEvaluacion = ({ criterio, valoresSeleccionados, onSeleccionarValor }) => {
  return (
    <View style={styles.container}>
      <Text style={estilosGlobales.criterioTitulo}>{criterio.criterio}</Text>
      {criterio.indicadores.map((indicador) => (
        <IndicadorEvaluacion
          key={indicador.id}
          indicador={indicador}
          valorSeleccionado={valoresSeleccionados[indicador.id] || null}
          onSeleccionarValor={onSeleccionarValor}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});

export default CriterioEvaluacion;
