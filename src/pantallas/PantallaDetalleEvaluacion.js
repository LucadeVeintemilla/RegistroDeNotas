import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator,
  Alert,
  TouchableOpacity
} from 'react-native';
import { colores, estilosGlobales } from '../estilos/estilosGlobales';
import Cabecera from '../componentes/Cabecera';
import { obtenerDetalleEvaluacion } from '../basedatos/rubricaServicio';

/**
 * Pantalla para mostrar el detalle de una evaluación
 * @param {Object} props Propiedades del componente
 * @param {Object} props.navigation Objeto de navegación
 * @param {Object} props.route Objeto de ruta
 * @returns {React.Component} Componente de pantalla de detalle de evaluación
 */
const PantallaDetalleEvaluacion = ({ navigation, route }) => {
  const { evaluacionId } = route.params;
  const [evaluacion, setEvaluacion] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDetalle = async () => {
      try {
        const detalle = await obtenerDetalleEvaluacion(evaluacionId);
        setEvaluacion(detalle);
        setCargando(false);
      } catch (error) {
        console.error('Error al cargar el detalle de la evaluación:', error);
        Alert.alert('Error', 'No se pudo cargar el detalle de la evaluación. Por favor, intente nuevamente.');
        setCargando(false);
        navigation.goBack();
      }
    };

    cargarDetalle();
  }, [evaluacionId, navigation]);

  const renderValoracion = (valor) => {
    let etiqueta = "";
    let color = "";

    if (valor === 0) {
      etiqueta = "Deficiente";
      color = colores.deficiente;
    } else if (valor <= 0.5) {
      etiqueta = "Regular";
      color = colores.regular;
    } else if (valor <= 1) {
      etiqueta = "Bueno";
      color = colores.bueno;
    } else if (valor <= 3) {
      etiqueta = "Muy Bueno";
      color = colores.muyBueno;
    } else {
      etiqueta = "Excelente";
      color = colores.excelente;
    }

    return (
      <View style={[styles.valoracion, { borderColor: color }]}>
        <Text style={[styles.valoracionEtiqueta, { color }]}>{etiqueta}</Text>
        <Text style={[styles.valoracionValor, { color }]}>{valor.toFixed(2)}</Text>
      </View>
    );
  };

  if (cargando) {
    return (
      <View style={estilosGlobales.contenedorCentrado}>
        <ActivityIndicator size="large" color={colores.primario} />
        <Text style={styles.textoEspera}>Cargando evaluación...</Text>
      </View>
    );
  }

  return (
    <View style={estilosGlobales.contenedor}>
      <Cabecera 
        titulo="Detalle de Evaluación" 
        onAtras={() => navigation.goBack()} 
      />
      <ScrollView contentContainerStyle={styles.contenido}>
        <View style={styles.seccionHeader}>
          <Text style={styles.tituloEvaluacion}>{evaluacion.titulo}</Text>
          <Text style={styles.fechaEvaluacion}>{new Date(evaluacion.fecha).toLocaleDateString()}</Text>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>Datos del Estudiante</Text>
          <View style={styles.datoEstudiante}>
            <Text style={styles.etiquetaDato}>Nombre:</Text>
            <Text style={styles.valorDato}>{evaluacion.estudiante.nombre} {evaluacion.estudiante.apellido}</Text>
          </View>
          <View style={styles.datoEstudiante}>
            <Text style={styles.etiquetaDato}>Código:</Text>
            <Text style={styles.valorDato}>{evaluacion.estudiante.codigo}</Text>
          </View>
          {evaluacion.estudiante.curso && (
            <View style={styles.datoEstudiante}>
              <Text style={styles.etiquetaDato}>Curso/Grupo:</Text>
              <Text style={styles.valorDato}>{evaluacion.estudiante.curso}</Text>
            </View>
          )}
        </View>

        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>Resultados de la Evaluación</Text>
          
          {evaluacion.criterios.map((criterio, indexCriterio) => (
            <View key={indexCriterio} style={styles.criterio}>
              <Text style={estilosGlobales.criterioTitulo}>{criterio.nombre}</Text>
              
              {criterio.indicadores.map((indicador, indexIndicador) => (
                <View key={indexIndicador} style={styles.indicador}>
                  <View style={styles.indicadorHeader}>
                    <Text style={styles.indicadorNombre}>{indicador.nombre}</Text>
                    {renderValoracion(indicador.valor)}
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.seccionPuntaje}>
          <Text style={styles.etiquetaPuntaje}>Puntaje Total:</Text>
          <Text style={styles.valorPuntaje}>{evaluacion.puntajeTotal.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.botonVolver}
          onPress={() => navigation.navigate('Inicio')}
        >
          <Text style={styles.textoBotonVolver}>Volver al Inicio</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contenido: {
    padding: 16,
    paddingBottom: 32,
  },
  seccionHeader: {
    backgroundColor: colores.primario,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  tituloEvaluacion: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colores.textoClaro,
    marginBottom: 4,
  },
  fechaEvaluacion: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  seccion: {
    marginBottom: 24,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tituloSeccion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colores.primario,
    marginBottom: 16,
  },
  datoEstudiante: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  etiquetaDato: {
    fontSize: 16,
    color: '#757575',
    width: 100,
  },
  valorDato: {
    fontSize: 16,
    color: colores.texto,
    flex: 1,
    fontWeight: '500',
  },
  criterio: {
    marginBottom: 16,
  },
  indicador: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
    paddingBottom: 12,
  },
  indicadorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  indicadorNombre: {
    fontSize: 16,
    color: colores.texto,
    flex: 1,
  },
  valoracion: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
    minWidth: 100,
  },
  valoracionEtiqueta: {
    fontSize: 12,
    fontWeight: '500',
  },
  valoracionValor: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  seccionPuntaje: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  etiquetaPuntaje: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colores.texto,
  },
  valorPuntaje: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colores.primario,
  },
  botonVolver: {
    backgroundColor: colores.primario,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  textoBotonVolver: {
    color: colores.textoClaro,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textoEspera: {
    marginTop: 16,
    fontSize: 16,
    color: colores.texto,
  },
});

export default PantallaDetalleEvaluacion;
