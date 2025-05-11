import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { colores } from '../estilos/estilosGlobales';

/**
 * Componente para mostrar notificaciones o mensajes de alerta
 * @param {Object} props Propiedades del componente
 * @param {string} props.tipo Tipo de notificación (exito, error, advertencia, info)
 * @param {string} props.mensaje Mensaje a mostrar
 * @param {number} props.duracion Duración en milisegundos (0 para no desaparecer automáticamente)
 * @param {Function} props.onClose Función a ejecutar al cerrar la notificación
 * @returns {React.Component} Componente de notificación
 */
const Notificacion = ({ tipo = 'info', mensaje, duracion = 3000, onClose }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [visible, setVisible] = useState(true);

  const obtenerColor = () => {
    switch (tipo) {
      case 'exito':
        return colores.exito;
      case 'error':
        return colores.error;
      case 'advertencia':
        return colores.advertencia;
      default:
        return colores.info;
    }
  };

  const obtenerIcono = () => {
    switch (tipo) {
      case 'exito':
        return '✓';
      case 'error':
        return '✗';
      case 'advertencia':
        return '!';
      default:
        return 'i';
    }
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    if (duracion > 0) {
      const timer = setTimeout(() => {
        cerrarNotificacion();
      }, duracion);

      return () => clearTimeout(timer);
    }
  }, []);

  const cerrarNotificacion = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      if (onClose) {
        onClose();
      }
    });
  };

  if (!visible) {
    return null;
  }

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          backgroundColor: obtenerColor(),
          opacity: fadeAnim,
          transform: [{
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          }],
        }
      ]}
    >
      <View style={styles.iconoContainer}>
        <Text style={styles.icono}>{obtenerIcono()}</Text>
      </View>
      <Text style={styles.mensaje}>{mensaje}</Text>
      <TouchableOpacity onPress={cerrarNotificacion} style={styles.botonCerrar}>
        <Text style={styles.textoBotonCerrar}>×</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  iconoContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icono: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  mensaje: {
    flex: 1,
    color: '#ffffff',
    fontSize: 14,
  },
  botonCerrar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  textoBotonCerrar: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Notificacion;
