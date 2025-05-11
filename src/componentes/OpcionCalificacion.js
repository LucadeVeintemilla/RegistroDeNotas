import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colores, estilosGlobales } from '../estilos/estilosGlobales';

/**
 * Componente que muestra una opción de calificación (Deficiente, Regular, Bueno, etc.)
 * @param {Object} props Propiedades del componente
 * @param {Object} props.opcion Opción a mostrar (label y value)
 * @param {boolean} props.seleccionada Indica si la opción está seleccionada
 * @param {Function} props.onSeleccionar Función a ejecutar cuando se selecciona la opción
 * @returns {React.Component} Componente de opción de calificación
 */
const OpcionCalificacion = ({ opcion, seleccionada, onSeleccionar }) => {
  const obtenerColorOpcion = (label) => {
    switch (label) {
      case 'Deficiente':
        return colores.deficiente;
      case 'Regular':
        return colores.regular;
      case 'Bueno':
        return colores.bueno;
      case 'Muy Bueno':
        return colores.muyBueno;
      case 'Excelente':
        return colores.excelente;
      default:
        return colores.texto;
    }
  };

  const colorOpcion = obtenerColorOpcion(opcion.label);
  
  return (
    <TouchableOpacity
      onPress={() => onSeleccionar(opcion)}
      style={[
        estilosGlobales.opcionItem,
        seleccionada && {
          ...estilosGlobales.opcionItemSeleccionado,
          borderColor: colorOpcion,
          backgroundColor: `${colorOpcion}20`, 
        },
      ]}
    >
      <Text 
        style={[
          estilosGlobales.opcionTexto,
          seleccionada && { fontWeight: 'bold', color: colorOpcion }
        ]}
      >
        {opcion.label}
      </Text>
      <Text 
        style={[
          estilosGlobales.opcionValor,
          seleccionada && { color: colorOpcion }
        ]}
      >
        {opcion.value}
      </Text>
    </TouchableOpacity>
  );
};

export default OpcionCalificacion;
