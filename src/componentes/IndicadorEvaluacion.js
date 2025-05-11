import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OpcionCalificacion from './OpcionCalificacion';
import { estilosGlobales } from '../estilos/estilosGlobales';

/**
 * Componente que muestra un indicador con sus opciones de calificación
 * @param {Object} props Propiedades del componente
 * @param {Object} props.indicador Objeto con los datos del indicador
 * @param {number} props.valorSeleccionado Valor seleccionado actualmente
 * @param {Function} props.onSeleccionarValor Función a ejecutar cuando se selecciona un valor
 * @returns {React.Component} Componente de indicador de evaluación
 */
const IndicadorEvaluacion = ({ indicador, valorSeleccionado, onSeleccionarValor }) => {
  return (
    <View style={estilosGlobales.indicadorItem}>
      <Text style={estilosGlobales.subtitulo}>{indicador.nombre}</Text>
      <View style={estilosGlobales.opcionesContainer}>
        {indicador.opciones.map((opcion, index) => (
          <OpcionCalificacion
            key={index}
            opcion={opcion}
            seleccionada={valorSeleccionado === opcion.value}
            onSeleccionar={(opcionSeleccionada) => onSeleccionarValor(indicador.id, opcionSeleccionada.value)}
          />
        ))}
      </View>
    </View>
  );
};

export default IndicadorEvaluacion;
