import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PantallaInicio from '../pantallas/PantallaInicio';
import PantallaNuevaEvaluacion from '../pantallas/PantallaNuevaEvaluacion';
import PantallaBuscarEvaluaciones from '../pantallas/PantallaBuscarEvaluaciones';
import PantallaDetalleEvaluacion from '../pantallas/PantallaDetalleEvaluacion';
import PantallaEstadisticas from '../pantallas/PantallaEstadisticas';
import PantallaAyuda from '../pantallas/PantallaAyuda';

const Stack = createNativeStackNavigator();

/**
 * Componente principal de navegación
 * @returns {React.Component} Componente de navegación
 */
const Navegacion = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#f5f5f5' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Inicio" component={PantallaInicio} />
        <Stack.Screen name="NuevaEvaluacion" component={PantallaNuevaEvaluacion} />
        <Stack.Screen name="BuscarEvaluaciones" component={PantallaBuscarEvaluaciones} />
        <Stack.Screen name="DetalleEvaluacion" component={PantallaDetalleEvaluacion} />
        <Stack.Screen name="Estadisticas" component={PantallaEstadisticas} />
        <Stack.Screen name="Ayuda" component={PantallaAyuda} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navegacion;
