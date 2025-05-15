import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { colores, estilosGlobales } from '../estilos/estilosGlobales';
import Cabecera from '../componentes/Cabecera';
import { inicializarBaseDatos } from '../basedatos/conexion';
import { inicializarRubrica, obtenerRubricaCompleta } from '../basedatos/rubricaServicio';
import { rubrica } from '../datos/rubrica';

/**
 * Pantalla principal de la aplicación
 * @param {Object} props Propiedades del componente
 * @param {Object} props.navigation Objeto de navegación
 * @returns {React.Component} Componente de pantalla de inicio
 */
const PantallaInicio = ({ navigation }) => {
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const inicializar = async () => {
      try {
        await inicializarBaseDatos();
        await inicializarRubrica(rubrica);
        setCargando(false);
      } catch (err) {
        console.error('Error al inicializar la base de datos:', err);
        setError('Ha ocurrido un error al inicializar la aplicación. Por favor, cierre y vuelva a abrirla.');
        setCargando(false);
      }
    };

    inicializar();
  }, []);
  
  const navegarANuevaEvaluacion = () => {
    navigation.navigate('NuevaEvaluacion');
  };

  const navegarABuscarEvaluaciones = () => {
    navigation.navigate('BuscarEvaluaciones');
  };
  if (cargando) {
    return (
      <View style={estilosGlobales.contenedorCentrado}>
        <ActivityIndicator size="large" color={colores.primario} />
        <Text style={styles.textoEspera}>Inicializando base de datos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={estilosGlobales.contenedorCentrado}>
        <Text style={styles.textoError}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={estilosGlobales.contenedor}>
      <Cabecera 
        titulo="Registro de Notas" 
        accionDerecha={
          <TouchableOpacity onPress={() => navigation.navigate('Ayuda')}>
            <Text style={styles.botonAyuda}>?</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView contentContainerStyle={styles.contenido}>
        <View style={styles.bienvenida}>
          <Text style={styles.tituloBienvenida}>Bienvenido al Sistema de Registro de Notas</Text>
          <Text style={styles.subtituloBienvenida}>
            Esta aplicación te permite evaluar presentaciones utilizando una rúbrica predefinida
          </Text>
        </View>

        <View style={styles.opcionesContainer}>
          <TouchableOpacity
            style={[styles.opcion, { backgroundColor: colores.primario }]}
            onPress={navegarANuevaEvaluacion}
          >
            <Text style={styles.opcionTitulo}>Nueva Evaluación</Text>
            <Text style={styles.opcionDescripcion}>Registra una nueva evaluación para un estudiante</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.opcion, { backgroundColor: colores.secundario }]}
            onPress={navegarABuscarEvaluaciones}
          >
            <Text style={styles.opcionTitulo}>Buscar Evaluaciones</Text>
            <Text style={styles.opcionDescripcion}>Consulta evaluaciones realizadas anteriormente</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.opcion, { backgroundColor: colores.info }]}
            onPress={() => navigation.navigate('Estadisticas')}
          >
            <Text style={styles.opcionTitulo}>Estadísticas</Text>
            <Text style={styles.opcionDescripcion}>Ver resumen estadístico de las evaluaciones</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.seccionAyuda}>
          <Text style={styles.tituloAyuda}>Información de la Rúbrica</Text>
          <Text style={styles.textoAyuda}>
            La rúbrica utilizada para las evaluaciones consta de 3 criterios principales:
          </Text>
          <View style={styles.listaCriterios}>
            <Text style={styles.itemCriterio}>• ACTITUD (2 indicadores)</Text>
            <Text style={styles.itemCriterio}>• DEL CONTENIDO DE LA PRESENTACIÓN (4 indicadores)</Text>
            <Text style={styles.itemCriterio}>• EXPOSICIÓN (4 indicadores)</Text>
          </View>
          <Text style={styles.textoAyuda}>
            Cada indicador se evalúa en una escala de Deficiente a Excelente, con valores numéricos específicos.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contenido: {
    padding: 16,
  },
  bienvenida: {
    marginBottom: 24,
  },
  tituloBienvenida: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colores.primario,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtituloBienvenida: {
    fontSize: 16,
    color: colores.texto,
    textAlign: 'center',
  },
  opcionesContainer: {
    flexDirection: 'column',
    marginBottom: 24,
  },
  opcion: {
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  opcionTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colores.textoClaro,
    marginBottom: 8,
  },
  opcionDescripcion: {
    fontSize: 14,
    color: colores.textoClaro,
  },
  seccionAyuda: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tituloAyuda: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colores.texto,
    marginBottom: 12,
  },
  textoAyuda: {
    fontSize: 14,
    color: colores.texto,
    marginBottom: 8,
  },
  listaCriterios: {
    marginVertical: 8,
    marginLeft: 8,
  },
  itemCriterio: {
    fontSize: 14,
    color: colores.texto,
    marginBottom: 4,
  },
  textoEspera: {
    marginTop: 16,
    fontSize: 16,
    color: colores.texto,
  },
  textoError: {
    color: colores.error,
    fontSize: 18,
    textAlign: 'center',
    padding: 20,
  },
  botonAyuda: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colores.textoClaro,
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
    borderWidth: 2,
    borderColor: colores.textoClaro,
    borderRadius: 15,
  },
});

export default PantallaInicio;
