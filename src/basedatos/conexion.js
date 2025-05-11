import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

/**
 * Función para abrir la conexión a la base de datos
 * @returns {SQLite.WebSQLDatabase} Objeto de base de datos
 */
export const abrirConexion = () => {
  if (Platform.OS === 'web') {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase('registronotas.db');
  return db;
};

/**
 * Base de datos
 */
const db = abrirConexion();

/**
 * Inicializa las tablas de la base de datos
 * @returns {Promise} Promesa que se resuelve cuando las tablas están creadas
 */
export const inicializarBaseDatos = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS estudiantes (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, apellido TEXT NOT NULL, codigo TEXT, curso TEXT)',
        [],
        () => {
          console.log('Tabla estudiantes creada con éxito');
        },
        (_, error) => {
          console.error('Error al crear tabla estudiantes', error);
          reject(error);
          return false;
        }
      );

      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS evaluaciones (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT NOT NULL, fecha TEXT NOT NULL, descripcion TEXT)',
        [],
        () => {
          console.log('Tabla evaluaciones creada con éxito');
        },
        (_, error) => {
          console.error('Error al crear tabla evaluaciones', error);
          reject(error);
          return false;
        }
      );

      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS criterios (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL)',
        [],
        () => {
          console.log('Tabla criterios creada con éxito');
        },
        (_, error) => {
          console.error('Error al crear tabla criterios', error);
          reject(error);
          return false;
        }
      );

      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS indicadores (id INTEGER PRIMARY KEY AUTOINCREMENT, criterio_id INTEGER, nombre TEXT NOT NULL, FOREIGN KEY (criterio_id) REFERENCES criterios (id))',
        [],
        () => {
          console.log('Tabla indicadores creada con éxito');
        },
        (_, error) => {
          console.error('Error al crear tabla indicadores', error);
          reject(error);
          return false;
        }
      );

      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS notas (id INTEGER PRIMARY KEY AUTOINCREMENT, estudiante_id INTEGER, evaluacion_id INTEGER, indicador_id INTEGER, valor REAL, FOREIGN KEY (estudiante_id) REFERENCES estudiantes (id), FOREIGN KEY (evaluacion_id) REFERENCES evaluaciones (id), FOREIGN KEY (indicador_id) REFERENCES indicadores (id))',
        [],
        () => {
          console.log('Tabla notas creada con éxito');
          resolve();
        },
        (_, error) => {
          console.error('Error al crear tabla notas', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

export default db;
