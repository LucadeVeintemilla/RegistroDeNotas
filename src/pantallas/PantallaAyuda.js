import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { colores, estilosGlobales } from '../estilos/estilosGlobales';
import Cabecera from '../componentes/Cabecera';

/**
 * Pantalla de ayuda con instrucciones de uso de la aplicación
 * @param {Object} props Propiedades del componente
 * @param {Object} props.navigation Objeto de navegación
 * @returns {React.Component} Componente de pantalla de ayuda
 */
const PantallaAyuda = ({ navigation }) => {
  return (
    <View style={estilosGlobales.contenedor}>
      <Cabecera 
        titulo="Ayuda" 
        onAtras={() => navigation.goBack()} 
      />
      <ScrollView contentContainerStyle={styles.contenido}>
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>¿Cómo usar esta aplicación?</Text>
          <Text style={styles.parrafo}>
            Esta aplicación te permite registrar evaluaciones de presentaciones académicas utilizando
            una rúbrica predefinida. A continuación encontrarás instrucciones sobre cómo utilizar
            cada una de las funciones principales.
          </Text>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>Nueva Evaluación</Text>
          <Text style={styles.parrafo}>
            Para crear una nueva evaluación, sigue estos pasos:
          </Text>
          <View style={styles.pasos}>
            <View style={styles.paso}>
              <View style={styles.numeroPaso}>
                <Text style={styles.textoNumeroPaso}>1</Text>
              </View>
              <Text style={styles.textoPaso}>
                Ingresa los datos del estudiante (nombre, apellido, código y curso)
              </Text>
            </View>
            <View style={styles.paso}>
              <View style={styles.numeroPaso}>
                <Text style={styles.textoNumeroPaso}>2</Text>
              </View>
              <Text style={styles.textoPaso}>
                Ingresa un título para la evaluación (por ejemplo, "Defensa de Tesis")
              </Text>
            </View>
            <View style={styles.paso}>
              <View style={styles.numeroPaso}>
                <Text style={styles.textoNumeroPaso}>3</Text>
              </View>
              <Text style={styles.textoPaso}>
                Para cada indicador, selecciona una calificación (Deficiente, Regular, Bueno, Muy Bueno o Excelente)
              </Text>
            </View>
            <View style={styles.paso}>
              <View style={styles.numeroPaso}>
                <Text style={styles.textoNumeroPaso}>4</Text>
              </View>
              <Text style={styles.textoPaso}>
                El puntaje total se calculará automáticamente
              </Text>
            </View>
            <View style={styles.paso}>
              <View style={styles.numeroPaso}>
                <Text style={styles.textoNumeroPaso}>5</Text>
              </View>
              <Text style={styles.textoPaso}>
                Haz clic en "Guardar Evaluación" para registrarla
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>Buscar Evaluaciones</Text>
          <Text style={styles.parrafo}>
            Para buscar evaluaciones previas:
          </Text>
          <View style={styles.pasos}>
            <View style={styles.paso}>
              <View style={styles.numeroPaso}>
                <Text style={styles.textoNumeroPaso}>1</Text>
              </View>
              <Text style={styles.textoPaso}>
                Ingresa el código del estudiante
              </Text>
            </View>
            <View style={styles.paso}>
              <View style={styles.numeroPaso}>
                <Text style={styles.textoNumeroPaso}>2</Text>
              </View>
              <Text style={styles.textoPaso}>
                Haz clic en "Buscar"
              </Text>
            </View>
            <View style={styles.paso}>
              <View style={styles.numeroPaso}>
                <Text style={styles.textoNumeroPaso}>3</Text>
              </View>
              <Text style={styles.textoPaso}>
                Se mostrarán todas las evaluaciones disponibles para ese estudiante
              </Text>
            </View>
            <View style={styles.paso}>
              <View style={styles.numeroPaso}>
                <Text style={styles.textoNumeroPaso}>4</Text>
              </View>
              <Text style={styles.textoPaso}>
                Haz clic en una evaluación para ver su detalle completo
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>Estructura de la Rúbrica</Text>
          <Text style={styles.parrafo}>
            La rúbrica utilizada para las evaluaciones consta de 3 criterios principales:
          </Text>
          
          <View style={styles.criterio}>
            <Text style={styles.tituloCriterio}>1. ACTITUD (2 indicadores)</Text>
            <View style={styles.indicadores}>
              <Text style={styles.indicador}>• Presentación y postura</Text>
              <Text style={styles.indicador}>• Tono de voz y lenguaje acorde al tema</Text>
            </View>
          </View>
          
          <View style={styles.criterio}>
            <Text style={styles.tituloCriterio}>2. DEL CONTENIDO DE LA PRESENTACIÓN (4 indicadores)</Text>
            <View style={styles.indicadores}>
              <Text style={styles.indicador}>• Orden y secuencia de la presentación</Text>
              <Text style={styles.indicador}>• Es llamativo, prioriza gráficos antes que texto</Text>
              <Text style={styles.indicador}>• Presenta los objetivos y resultados con claridad</Text>
              <Text style={styles.indicador}>• Coherencia con el trabajo escrito</Text>
            </View>
          </View>
          
          <View style={styles.criterio}>
            <Text style={styles.tituloCriterio}>3. EXPOSICIÓN (4 indicadores)</Text>
            <View style={styles.indicadores}>
              <Text style={styles.indicador}>• Demuestra dominio del tema durante la defensa</Text>
              <Text style={styles.indicador}>• Presenta con precisión los resultados de la investigación</Text>
              <Text style={styles.indicador}>• Responde correctamente y con seguridad las preguntas del tribunal</Text>
              <Text style={styles.indicador}>• Respeta el tiempo establecido de la exposición</Text>
            </View>
          </View>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>Valores de la Escala</Text>
          <Text style={styles.parrafo}>
            Cada indicador se evalúa en una escala de cinco niveles, con los siguientes valores:
          </Text>
          
          <View style={styles.tabla}>
            <View style={[styles.filaTabla, styles.encabezadoTabla]}>
              <Text style={[styles.celdaTabla, styles.celdaEncabezado]}>Nivel</Text>
              <Text style={[styles.celdaTabla, styles.celdaEncabezado]}>Valor Normal</Text>
              <Text style={[styles.celdaTabla, styles.celdaEncabezado]}>Valor Especial</Text>
            </View>
            <View style={styles.filaTabla}>
              <Text style={styles.celdaTabla}>Deficiente</Text>
              <Text style={styles.celdaTabla}>0</Text>
              <Text style={styles.celdaTabla}>0</Text>
            </View>
            <View style={styles.filaTabla}>
              <Text style={styles.celdaTabla}>Regular</Text>
              <Text style={styles.celdaTabla}>0.25</Text>
              <Text style={styles.celdaTabla}>0.5 - 1</Text>
            </View>
            <View style={styles.filaTabla}>
              <Text style={styles.celdaTabla}>Bueno</Text>
              <Text style={styles.celdaTabla}>0.5</Text>
              <Text style={styles.celdaTabla}>1 - 2</Text>
            </View>
            <View style={styles.filaTabla}>
              <Text style={styles.celdaTabla}>Muy Bueno</Text>
              <Text style={styles.celdaTabla}>0.75</Text>
              <Text style={styles.celdaTabla}>1.5 - 3</Text>
            </View>
            <View style={styles.filaTabla}>
              <Text style={styles.celdaTabla}>Excelente</Text>
              <Text style={styles.celdaTabla}>1</Text>
              <Text style={styles.celdaTabla}>2 - 4</Text>
            </View>
          </View>
          
          <Text style={styles.nota}>
            Nota: Los valores especiales se aplican a ciertos indicadores como 
            "Coherencia con el trabajo escrito" y los indicadores del criterio "EXPOSICIÓN".
          </Text>
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
  seccion: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tituloSeccion: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colores.primario,
    marginBottom: 12,
  },
  parrafo: {
    fontSize: 16,
    color: colores.texto,
    marginBottom: 16,
    lineHeight: 24,
  },
  pasos: {
    marginLeft: 8,
  },
  paso: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  numeroPaso: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colores.primario,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  textoNumeroPaso: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  textoPaso: {
    flex: 1,
    fontSize: 16,
    color: colores.texto,
    lineHeight: 24,
  },
  criterio: {
    marginBottom: 16,
  },
  tituloCriterio: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colores.texto,
    marginBottom: 8,
  },
  indicadores: {
    marginLeft: 16,
  },
  indicador: {
    fontSize: 15,
    color: colores.texto,
    marginBottom: 4,
    lineHeight: 22,
  },
  tabla: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    marginVertical: 12,
    overflow: 'hidden',
  },
  filaTabla: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  encabezadoTabla: {
    backgroundColor: '#f5f5f5',
  },
  celdaTabla: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    fontSize: 14,
    color: colores.texto,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  celdaEncabezado: {
    fontWeight: 'bold',
    color: colores.primario,
  },
  nota: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#757575',
    marginTop: 8,
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
});

export default PantallaAyuda;
