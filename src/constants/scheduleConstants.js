/**
 * Constantes para el sistema de cronograma de supervisores
 */

// Estados posibles por día
export const STATES = {
    SUBIDA: 'S',
    INDUCCION: 'I',
    PERFORACION: 'P',
    BAJADA: 'B',
    DESCANSO: 'D',
    SIN_ACTIVIDAD: '-'
};

// Colores por estado
export const STATE_COLORS = {
    [STATES.SUBIDA]: '#3498db',      // Azul
    [STATES.INDUCCION]: '#f1c40f',   // Amarillo
    [STATES.PERFORACION]: '#27ae60', // Verde
    [STATES.BAJADA]: '#e74c3c',      // Rojo
    [STATES.DESCANSO]: '#95a5a6',    // Gris
    [STATES.SIN_ACTIVIDAD]: '#ffffff' // Blanco
};

// Nombres descriptivos de estados
export const STATE_NAMES = {
    [STATES.SUBIDA]: 'Subida',
    [STATES.INDUCCION]: 'Inducción',
    [STATES.PERFORACION]: 'Perforación',
    [STATES.BAJADA]: 'Bajada',
    [STATES.DESCANSO]: 'Descanso',
    [STATES.SIN_ACTIVIDAD]: 'Sin actividad'
};

// Configuración del régimen de trabajo
export const SCHEDULE_CONFIG = {
    DIAS_TRABAJO: 14,        // Días de trabajo
    DIAS_DESCANSO: 7,        // Días de descanso
    DIAS_INDUCCION: 2,       // Días de inducción
    HORIZONTE: 21,           // Días de planificación
    SUPERVISORES: ['S1', 'S2', 'S3']
};

// Días de perforación efectiva (14 - 1 subida - 2 inducción - 1 bajada = 10)
export const DIAS_PERFORACION =
    SCHEDULE_CONFIG.DIAS_TRABAJO - 1 - SCHEDULE_CONFIG.DIAS_INDUCCION - 1;
