import db, { inicializarBaseDatos } from './conexion';

/**
 * Inicializa la rúbrica en la base de datos
 * @param {Array} rubrica Array con la estructura de la rúbrica
 * @returns {Promise} Promesa que se resuelve cuando la rúbrica está inicializada
 */
export const inicializarRubrica = (rubrica) => {
  return new Promise((resolve, reject) => {
    verificarSiExistenDatos()
      .then(existenDatos => {
        if (existenDatos) {
          console.log('La rúbrica ya está inicializada');
          resolve();
        } else {
          db.transaction(tx => {
            rubrica.forEach(criterioDato => {
              tx.executeSql(
                'INSERT INTO criterios (nombre) VALUES (?)',
                [criterioDato.criterio],
                (_, resultadoCriterio) => {
                  const criterioId = resultadoCriterio.insertId;
                  
                  criterioDato.indicadores.forEach(indicadorDato => {
                    tx.executeSql(
                      'INSERT INTO indicadores (criterio_id, nombre) VALUES (?, ?)',
                      [criterioId, indicadorDato.nombre],
                      () => {
                        console.log('Indicador insertado correctamente');
                      },
                      (_, error) => {
                        console.error('Error al insertar indicador', error);
                        reject(error);
                        return false;
                      }
                    );
                  });
                },
                (_, error) => {
                  console.error('Error al insertar criterio', error);
                  reject(error);
                  return false;
                }
              );
            });
            resolve();
          });
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * Verifica si ya existen datos en la base de datos
 * @returns {Promise<boolean>} Promesa que se resuelve a true si existen datos, false en caso contrario
 */
export const verificarSiExistenDatos = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT COUNT(*) as cuenta FROM criterios',
        [],
        (_, { rows }) => {
          const cuenta = rows._array[0].cuenta;
          resolve(cuenta > 0);
        },
        (_, error) => {
          console.error('Error al verificar si existen datos', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

/**
 * Obtiene todos los criterios con sus indicadores
 * @returns {Promise<Array>} Promesa que se resuelve a un array con todos los criterios e indicadores
 */
export const obtenerRubricaCompleta = () => {
  return new Promise((resolve, reject) => {
    const rubrica = [];
    
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM criterios',
        [],
        (_, { rows }) => {
          const criterios = rows._array;
          
          if (criterios.length === 0) {
            resolve(rubrica);
            return;
          }
          
          let criteriosProcesados = 0;
          
          criterios.forEach(criterio => {
            tx.executeSql(
              'SELECT * FROM indicadores WHERE criterio_id = ?',
              [criterio.id],
              (_, { rows }) => {
                const indicadores = rows._array;
                
                const indicadoresMapeados = indicadores.map(ind => ({
                  id: ind.id,
                  nombre: ind.nombre,
                  opciones: [
                    { label: "Deficiente", value: 0 },
                    { label: "Regular", value: criterio.nombre === "EXPOSICIÓN" && ind.nombre !== "Respeta el tiempo establecido de la exposición" ? 1 : 0.25 },
                    { label: "Bueno", value: criterio.nombre === "EXPOSICIÓN" && ind.nombre !== "Respeta el tiempo establecido de la exposición" ? 2 : ind.nombre === "Coherencia con el trabajo escrito" ? 1 : 0.5 },
                    { label: "Muy Bueno", value: criterio.nombre === "EXPOSICIÓN" && ind.nombre !== "Respeta el tiempo establecido de la exposición" ? 3 : ind.nombre === "Coherencia con el trabajo escrito" ? 1.5 : 0.75 },
                    { label: "Excelente", value: criterio.nombre === "EXPOSICIÓN" && ind.nombre !== "Respeta el tiempo establecido de la exposición" ? 4 : ind.nombre === "Coherencia con el trabajo escrito" ? 2 : 1 },
                  ]
                }));
                
                rubrica.push({
                  id: criterio.id,
                  criterio: criterio.nombre,
                  indicadores: indicadoresMapeados
                });
                
                criteriosProcesados++;
                
                if (criteriosProcesados === criterios.length) {
                  resolve(rubrica);
                }
              },
              (_, error) => {
                console.error('Error al obtener indicadores', error);
                reject(error);
                return false;
              }
            );
          });
        },
        (_, error) => {
          console.error('Error al obtener criterios', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

/**
 * Guarda una evaluación para un estudiante
 * @param {Object} evaluacion Objeto con los datos de la evaluación
 * @returns {Promise<number>} Promesa que se resuelve al ID de la evaluación creada
 */
export const guardarEvaluacion = (evaluacion) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO evaluaciones (titulo, fecha, descripcion) VALUES (?, ?, ?)',
        [evaluacion.titulo, evaluacion.fecha, evaluacion.descripcion || ''],
        (_, resultadoEvaluacion) => {
          const evaluacionId = resultadoEvaluacion.insertId;
          
          tx.executeSql(
            'SELECT * FROM estudiantes WHERE codigo = ?',
            [evaluacion.estudiante.codigo],
            (_, { rows }) => {
              let estudianteId;
              
              if (rows.length === 0) {
                tx.executeSql(
                  'INSERT INTO estudiantes (nombre, apellido, codigo, curso) VALUES (?, ?, ?, ?)',
                  [
                    evaluacion.estudiante.nombre, 
                    evaluacion.estudiante.apellido, 
                    evaluacion.estudiante.codigo, 
                    evaluacion.estudiante.curso || ''
                  ],
                  (_, resultadoEstudiante) => {
                    estudianteId = resultadoEstudiante.insertId;
                    guardarNotas(tx, evaluacion.notas, estudianteId, evaluacionId, resolve, reject);
                  },
                  (_, error) => {
                    console.error('Error al insertar estudiante', error);
                    reject(error);
                    return false;
                  }
                );
              } else {
                estudianteId = rows._array[0].id;
                guardarNotas(tx, evaluacion.notas, estudianteId, evaluacionId, resolve, reject);
              }
            },
            (_, error) => {
              console.error('Error al verificar estudiante', error);
              reject(error);
              return false;
            }
          );
        },
        (_, error) => {
          console.error('Error al insertar evaluación', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

/**
 * Función auxiliar para guardar las notas de una evaluación
 */
const guardarNotas = (tx, notas, estudianteId, evaluacionId, resolve, reject) => {
  const totalNotas = notas.length;
  let notasInsertadas = 0;
  
  if (totalNotas === 0) {
    resolve(evaluacionId);
    return;
  }
  
  notas.forEach(nota => {
    tx.executeSql(
      'INSERT INTO notas (estudiante_id, evaluacion_id, indicador_id, valor) VALUES (?, ?, ?, ?)',
      [estudianteId, evaluacionId, nota.indicadorId, nota.valor],
      () => {
        notasInsertadas++;
        if (notasInsertadas === totalNotas) {
          resolve(evaluacionId);
        }
      },
      (_, error) => {
        console.error('Error al insertar nota', error);
        reject(error);
        return false;
      }
    );
  });
};

/**
 * Obtiene las evaluaciones de un estudiante
 * @param {string} codigoEstudiante Código del estudiante
 * @returns {Promise<Array>} Promesa que se resuelve a un array con las evaluaciones del estudiante
 */
export const obtenerEvaluacionesEstudiante = (codigoEstudiante) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT e.id, e.titulo, e.fecha, e.descripcion
         FROM evaluaciones e
         INNER JOIN notas n ON e.id = n.evaluacion_id
         INNER JOIN estudiantes est ON est.id = n.estudiante_id
         WHERE est.codigo = ?
         GROUP BY e.id
         ORDER BY e.fecha DESC`,
        [codigoEstudiante],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          console.error('Error al obtener evaluaciones del estudiante', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

/**
 * Obtiene el detalle de una evaluación
 * @param {number} evaluacionId ID de la evaluación
 * @returns {Promise<Object>} Promesa que se resuelve a un objeto con el detalle de la evaluación
 */
export const obtenerDetalleEvaluacion = (evaluacionId) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT e.*, est.nombre, est.apellido, est.codigo, est.curso
         FROM evaluaciones e
         INNER JOIN notas n ON e.id = n.evaluacion_id
         INNER JOIN estudiantes est ON est.id = n.estudiante_id
         WHERE e.id = ?
         LIMIT 1`,
        [evaluacionId],
        (_, { rows }) => {
          if (rows.length === 0) {
            reject(new Error('Evaluación no encontrada'));
            return;
          }
          
          const evaluacionData = rows._array[0];
          
          tx.executeSql(
            `SELECT n.valor, n.indicador_id, ind.nombre as indicador_nombre, c.id as criterio_id, c.nombre as criterio_nombre
             FROM notas n
             INNER JOIN indicadores ind ON n.indicador_id = ind.id
             INNER JOIN criterios c ON ind.criterio_id = c.id
             WHERE n.evaluacion_id = ?`,
            [evaluacionId],
            (_, { rows }) => {
              const notasData = rows._array;
              
              const notasPorCriterio = {};
              let puntajeTotal = 0;
              
              notasData.forEach(nota => {
                if (!notasPorCriterio[nota.criterio_id]) {
                  notasPorCriterio[nota.criterio_id] = {
                    id: nota.criterio_id,
                    nombre: nota.criterio_nombre,
                    indicadores: []
                  };
                }
                
                notasPorCriterio[nota.criterio_id].indicadores.push({
                  id: nota.indicador_id,
                  nombre: nota.indicador_nombre,
                  valor: nota.valor
                });
                
                puntajeTotal += nota.valor;
              });
              
              const evaluacion = {
                id: evaluacionData.id,
                titulo: evaluacionData.titulo,
                fecha: evaluacionData.fecha,
                descripcion: evaluacionData.descripcion,
                estudiante: {
                  nombre: evaluacionData.nombre,
                  apellido: evaluacionData.apellido,
                  codigo: evaluacionData.codigo,
                  curso: evaluacionData.curso
                },
                criterios: Object.values(notasPorCriterio),
                puntajeTotal: puntajeTotal
              };
              
              resolve(evaluacion);
            },
            (_, error) => {
              console.error('Error al obtener notas de la evaluación', error);
              reject(error);
              return false;
            }
          );
        },
        (_, error) => {
          console.error('Error al obtener datos de la evaluación', error);
          reject(error);
          return false;
        }
      );
    });
  });
};
