import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Navegacion from './src/navegacion/Navegacion';
import { colores } from './src/estilos/estilosGlobales';

export default function App() {
  const [fuentesCargadas, setFuentesCargadas] = useState(false);

  useEffect(() => {
    const cargarFuentes = async () => {
      try {
        await Font.loadAsync({
        });
        setFuentesCargadas(true);
      } catch (error) {
        console.error('Error al cargar fuentes:', error);
        setFuentesCargadas(true);
      }
    };

    cargarFuentes();
  }, []);

  if (!fuentesCargadas) {
    return (
      <View style={styles.contenedorCarga}>
        <ActivityIndicator size="large" color={colores.primario} />
        <Text style={styles.textoCarga}>Iniciando aplicación...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Navegacion />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  contenedorCarga: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  textoCarga: {
    marginTop: 16,
    fontSize: 16,
    color: colores.texto,
  },
});
