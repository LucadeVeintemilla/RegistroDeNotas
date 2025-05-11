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
import ResumenCalificacion from '../componentes/ResumenCalificacion';
import { calcularPuntajeMaximo } from '../datos/rubrica';
import { obtenerRubricaCompleta } from '../basedatos/rubricaServicio';

/**
 * Pantalla para mostrar estadísticas de evaluaciones
 * @param {Object} props Propiedades del componente
 * @param {Object} props.navigation Objeto de navegación
 * @returns {React.Component} Componente de pantalla de estadísticas
 */
const PantallaEstadisticas = ({ navigation }) => {
  const [cargando, setCargando] = useState(true);
  const [rubrica, setRubrica] = useState([]);
  const [estadisticas, setEstadisticas] = useState({
    totalEvaluaciones: 0,
    promedioGeneral: 0,
    mejorPuntaje: 0,
    peorPuntaje: 0,
    distribucionCalificaciones: {
      deficiente: 0,
      regular: 0,
      bueno: 0,
      muyBueno: 0,
      excelente: 0,
    },
    distribucionPorCriterio: []
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const datosRubrica = await obtenerRubricaCompleta();
        setRubrica(datosRubrica);
        
        generarEstadisticasFicticias(datosRubrica);
        
        setCargando(false);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        Alert.alert('Error', 'No se pudieron cargar las estadísticas. Por favor, intente nuevamente.');
        setCargando(false);
        navigation.goBack();
      }
    };
    
    cargarDatos();
  }, [navigation]);
  
  const generarEstadisticasFicticias = (datosRubrica) => {
    const puntajeMaximo = calcularPuntajeMaximo();
    
    const estadisticasFicticias = {
      totalEvaluaciones: 25,
      promedioGeneral: puntajeMaximo * 0.78, 
      mejorPuntaje: puntajeMaximo * 0.95,
      peorPuntaje: puntajeMaximo * 0.45,
      distribucionCalificaciones: {
        deficiente: 2,
        regular: 5,
        bueno: 8,
        muyBueno: 7,
        excelente: 3,
      },
      distribucionPorCriterio: datosRubrica.map(criterio => ({
        id: criterio.id,
        nombre: criterio.criterio,
        promedio: Math.random() * 0.5 + 0.6,
        mejorPuntaje: Math.random() * 0.2 + 0.8, 
        peorPuntaje: Math.random() * 0.4 + 0.3, 
      })),
    };
    
    setEstadisticas(estadisticasFicticias);
  };
  
  const renderizarDistribucionCalificaciones = () => {
    const { distribucionCalificaciones, totalEvaluaciones } = estadisticas;
    const categorias = [
      { etiqueta: 'Deficiente', valor: distribucionCalificaciones.deficiente, color: colores.deficiente },
      { etiqueta: 'Regular', valor: distribucionCalificaciones.regular, color: colores.regular },
      { etiqueta: 'Bueno', valor: distribucionCalificaciones.bueno, color: colores.bueno },
      { etiqueta: 'Muy Bueno', valor: distribucionCalificaciones.muyBueno, color: colores.muyBueno },
      { etiqueta: 'Excelente', valor: distribucionCalificaciones.excelente, color: colores.excelente },
    ];
    
    return categorias.map((categoria, index) => {
      const porcentaje = totalEvaluaciones > 0 
        ? (categoria.valor / totalEvaluaciones) * 100 
        : 0;
      
      return (
        <View key={index} style={styles.distribucionItem}>
          <View style={styles.distribucionEtiquetaContainer}>
            <View style={[styles.distribucionColor, { backgroundColor: categoria.color }]} />
            <Text style={styles.distribucionEtiqueta}>{categoria.etiqueta}</Text>
          </View>
          <Text style={styles.distribucionValor}>{categoria.valor} ({porcentaje.toFixed(1)}%)</Text>
          <View style={styles.distribucionBarraContainer}>
            <View 
              style={[
                styles.distribucionBarra, 
                { width: `${porcentaje}%`, backgroundColor: categoria.color }
              ]} 
            />
          </View>
        </View>
      );
    });
  };
  
  if (cargando) {
    return (
      <View style={estilosGlobales.contenedorCentrado}>
        <ActivityIndicator size="large" color={colores.primario} />
        <Text style={styles.textoEspera}>Cargando estadísticas...</Text>
      </View>
    );
  }

  return (
    <View style={estilosGlobales.contenedor}>
      <Cabecera 
        titulo="Estadísticas" 
        onAtras={() => navigation.goBack()} 
      />
      <ScrollView contentContainerStyle={styles.contenido}>
        <View style={styles.seccionHeader}>
          <Text style={styles.tituloSeccion}>Resumen General</Text>
          <Text style={styles.subtituloSeccion}>Basado en {estadisticas.totalEvaluaciones} evaluaciones</Text>
        </View>
        
        <View style={styles.tarjetasContainer}>
          <View style={styles.tarjeta}>
            <Text style={styles.tarjetaTitulo}>Promedio General</Text>
            <Text style={styles.tarjetaValor}>{estadisticas.promedioGeneral.toFixed(2)}</Text>
          </View>
          
          <View style={styles.tarjeta}>
            <Text style={styles.tarjetaTitulo}>Mejor Puntaje</Text>
            <Text style={styles.tarjetaValor}>{estadisticas.mejorPuntaje.toFixed(2)}</Text>
          </View>
          
          <View style={styles.tarjeta}>
            <Text style={styles.tarjetaTitulo}>Peor Puntaje</Text>
            <Text style={styles.tarjetaValor}>{estadisticas.peorPuntaje.toFixed(2)}</Text>
          </View>
        </View>
        
        <ResumenCalificacion 
          puntaje={estadisticas.promedioGeneral} 
          puntajeMaximo={calcularPuntajeMaximo()}
        />
        
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>Distribución de Calificaciones</Text>
          {renderizarDistribucionCalificaciones()}
        </View>
        
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>Rendimiento por Criterio</Text>
          
          {estadisticas.distribucionPorCriterio.map((criterio, index) => {
            const criterioData = rubrica.find(c => c.id === criterio.id);
            const maximoPosible = criterioData ? criterioData.indicadores.reduce((total, ind) => {
              const maxOpcion = Math.max(...ind.opciones.map(op => op.value));
              return total + maxOpcion;
            }, 0) : 0;
            
            const promedioPuntaje = maximoPosible * criterio.promedio;
            
            return (
              <View key={index} style={styles.criterioPerfil}>
                <Text style={styles.criterioNombre}>{criterio.nombre}</Text>
                <View style={styles.criterioBarraContainer}>
                  <View 
                    style={[
                      styles.criterioBarra, 
                      { width: `${criterio.promedio * 100}%`, backgroundColor: colores.primario }
                    ]} 
                  />
                </View>
                <Text style={styles.criterioValor}>
                  {promedioPuntaje.toFixed(2)} de {maximoPosible.toFixed(2)} ({(criterio.promedio * 100).toFixed(1)}%)
                </Text>
              </View>
            );
          })}
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
    marginBottom: 16,
  },
  tituloSeccion: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colores.primario,
    marginBottom: 8,
  },
  subtituloSeccion: {
    fontSize: 14,
    color: '#757575',
  },
  tarjetasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tarjeta: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    alignItems: 'center',
  },
  tarjetaTitulo: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 8,
    textAlign: 'center',
  },
  tarjetaValor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colores.primario,
    textAlign: 'center',
  },
  seccion: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  distribucionItem: {
    marginBottom: 12,
  },
  distribucionEtiquetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distribucionColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  distribucionEtiqueta: {
    fontSize: 14,
    color: colores.texto,
  },
  distribucionValor: {
    fontSize: 12,
    color: '#757575',
    marginVertical: 4,
  },
  distribucionBarraContainer: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginTop: 4,
    overflow: 'hidden',
  },
  distribucionBarra: {
    height: '100%',
    borderRadius: 4,
  },
  criterioPerfil: {
    marginBottom: 16,
  },
  criterioNombre: {
    fontSize: 16,
    fontWeight: '500',
    color: colores.texto,
    marginBottom: 8,
  },
  criterioBarraContainer: {
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    marginBottom: 4,
    overflow: 'hidden',
  },
  criterioBarra: {
    height: '100%',
    borderRadius: 6,
  },
  criterioValor: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'right',
  },
  botonVolver: {
    backgroundColor: colores.primario,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
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

export default PantallaEstadisticas;
