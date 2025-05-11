import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator,
  Alert
} from 'react-native';
import { colores, estilosGlobales } from '../estilos/estilosGlobales';
import Cabecera from '../componentes/Cabecera';
import { obtenerEvaluacionesEstudiante } from '../basedatos/rubricaServicio';

/**
 * Pantalla para buscar evaluaciones
 * @param {Object} props Propiedades del componente
 * @param {Object} props.navigation Objeto de navegación
 * @returns {React.Component} Componente de pantalla de búsqueda de evaluaciones
 */
const PantallaBuscarEvaluaciones = ({ navigation }) => {
  const [codigo, setCodigo] = useState('');
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  const buscarEvaluaciones = async () => {
    if (!codigo.trim()) {
      Alert.alert('Error', 'Ingrese el código del estudiante');
      return;
    }

    setCargando(true);
    setBusquedaRealizada(true);

    try {
      const resultados = await obtenerEvaluacionesEstudiante(codigo.trim());
      setEvaluaciones(resultados);
      setCargando(false);
    } catch (error) {
      console.error('Error al buscar evaluaciones:', error);
      Alert.alert('Error', 'No se pudieron obtener las evaluaciones. Por favor, intente nuevamente.');
      setCargando(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('DetalleEvaluacion', { evaluacionId: item.id })}
    >
      <Text style={styles.itemTitulo}>{item.titulo}</Text>
      <Text style={styles.itemFecha}>{new Date(item.fecha).toLocaleDateString()}</Text>
      <Text style={styles.itemDescripcion} numberOfLines={2}>
        {item.descripcion || 'Sin descripción'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={estilosGlobales.contenedor}>
      <Cabecera 
        titulo="Buscar Evaluaciones" 
        onAtras={() => navigation.goBack()} 
      />

      <View style={styles.busqueda}>
        <Text style={styles.etiqueta}>Código del Estudiante:</Text>
        <TextInput
          style={estilosGlobales.input}
          value={codigo}
          onChangeText={setCodigo}
          placeholder="Ingrese el código del estudiante"
        />
        <TouchableOpacity
          style={[styles.botonBuscar, cargando && styles.botonDeshabilitado]}
          onPress={buscarEvaluaciones}
          disabled={cargando}
        >
          {cargando ? (
            <ActivityIndicator size="small" color={colores.textoClaro} />
          ) : (
            <Text style={styles.textoBotonBuscar}>Buscar</Text>
          )}
        </TouchableOpacity>
      </View>

      {busquedaRealizada && !cargando && (
        <View style={styles.resultados}>
          {evaluaciones.length > 0 ? (
            <FlatList
              data={evaluaciones}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.lista}
            />
          ) : (
            <View style={styles.mensajeContainer}>
              <Text style={styles.mensajeNoResultados}>
                No se encontraron evaluaciones para el estudiante con código "{codigo}".
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  busqueda: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
  },
  etiqueta: {
    fontSize: 16,
    color: colores.texto,
    marginBottom: 4,
  },
  botonBuscar: {
    backgroundColor: colores.primario,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  botonDeshabilitado: {
    backgroundColor: '#b0bec5',
  },
  textoBotonBuscar: {
    color: colores.textoClaro,
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultados: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  lista: {
    padding: 16,
  },
  item: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colores.primario,
    marginBottom: 4,
  },
  itemFecha: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  itemDescripcion: {
    fontSize: 16,
    color: colores.texto,
  },
  mensajeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  mensajeNoResultados: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
  },
});

export default PantallaBuscarEvaluaciones;
