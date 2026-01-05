import { STATES, SCHEDULE_CONFIG } from '../constants/scheduleConstants';

export function countPerforating(schedule, dayIndex) {
    let count = 0;

    for (const supervisor of SCHEDULE_CONFIG.SUPERVISORES) {
        if (schedule[supervisor] && schedule[supervisor][dayIndex] === STATES.PERFORACION) {
            count++;
        }
    }

    return count;
}

function isS3Active(schedule, dayIndex) {
    const s3State = schedule.S3?.[dayIndex];
    return s3State &&
        s3State !== STATES.DESCANSO &&
        s3State !== STATES.SIN_ACTIVIDAD;
}

export function validatePerforatingConflicts(schedule) {
    const conflicts = {};

    for (let day = 0; day < SCHEDULE_CONFIG.HORIZONTE; day++) {
        const perforatingCount = countPerforating(schedule, day);
        const s3Active = isS3Active(schedule, day);

        const hasConflict =
            perforatingCount > 2 ||
            (s3Active && perforatingCount < 2) ||
            perforatingCount !== 2; 

        conflicts[day] = {
            count: perforatingCount,
            s3Active,
            hasConflict,
            reason: getConflictReason(perforatingCount, s3Active)
        };
    }

    return conflicts;
}

function getConflictReason(count, s3Active) {
    if (count > 2) {
        return '3 supervisores perforando';
    }
    if (count < 2 && s3Active) {
        return 'Solo 1 supervisor perforando con S3 activo';
    }
    if (count !== 2) {
        return `${count} supervisor(es) perforando (se requieren 2)`;
    }
    return null;
}

export function validateTransitions(supervisorSchedule, supervisorName) {
    const invalidTransitions = [];

    for (let i = 0; i < supervisorSchedule.length - 1; i++) {
        const current = supervisorSchedule[i];
        const next = supervisorSchedule[i + 1];

        if (current === STATES.SUBIDA && next === STATES.SUBIDA) {
            invalidTransitions.push({
                supervisor: supervisorName,
                day: i + 1,
                type: 'S-S',
                description: 'Dos subidas consecutivas'
            });
        }

        // S-B: Subida seguida de bajada
        if (current === STATES.SUBIDA && next === STATES.BAJADA) {
            invalidTransitions.push({
                supervisor: supervisorName,
                day: i + 1,
                type: 'S-B',
                description: 'Subida seguida inmediatamente de bajada'
            });
        }
    }

    return invalidTransitions;
}

export function validateAllTransitions(schedule) {
    const allInvalidTransitions = [];

    for (const supervisor of SCHEDULE_CONFIG.SUPERVISORES) {
        if (schedule[supervisor]) {
            const transitions = validateTransitions(schedule[supervisor], supervisor);
            allInvalidTransitions.push(...transitions);
        }
    }

    return allInvalidTransitions;
}

export function validateSchedule(schedule) {
    const perforatingConflicts = validatePerforatingConflicts(schedule);
    const transitionErrors = validateAllTransitions(schedule);

    const conflictDays = Object.entries(perforatingConflicts)
        .filter(([_, data]) => data.hasConflict)
        .map(([day, data]) => ({ day: parseInt(day), ...data }));

    return {
        perforatingConflicts,
        transitionErrors,
        hasConflicts: conflictDays.length > 0 || transitionErrors.length > 0,
        summary: {
            totalConflictDays: conflictDays.length,
            totalTransitionErrors: transitionErrors.length
        }
    };
}
