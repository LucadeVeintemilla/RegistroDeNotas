import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colores, estilosGlobales } from '../estilos/estilosGlobales';

/**
 * Componente de cabecera para las pantallas
 * @param {Object} props Propiedades del componente
 * @param {string} props.titulo Título a mostrar en la cabecera
 * @param {Function} props.onAtras Función a ejecutar cuando se presiona el botón de atrás
 * @param {React.ReactNode} props.accionDerecha Componente a mostrar a la derecha de la cabecera
 * @returns {React.Component} Componente de cabecera
 */
const Cabecera = ({ titulo, onAtras, accionDerecha }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        backgroundColor={colores.primario} 
        barStyle="light-content" 
      />
      <View style={styles.container}>
        <View style={styles.contenido}>
          {onAtras && (
            <TouchableOpacity 
              style={styles.botonAtras} 
              onPress={onAtras}
              hitSlop={{ top: 5, bottom: 15, left: 15, right: 15 }}
            >
              <Text style={styles.textoAtras}>←</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.titulo} numberOfLines={1}>
            {titulo}
          </Text>
          {accionDerecha && (
            <View style={styles.accionDerecha}>
              {accionDerecha}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colores.primario,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    backgroundColor: colores.primario,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  contenido: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titulo: {
    color: colores.textoClaro,
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  botonAtras: {
    marginRight: 16,
  },
  textoAtras: {
    color: colores.textoClaro,
    fontSize: 24,
    fontWeight: 'bold',
  },
  accionDerecha: {
    marginLeft: 16,
  },
});

export default Cabecera;
