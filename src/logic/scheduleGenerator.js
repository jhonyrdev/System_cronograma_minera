import { STATES, SCHEDULE_CONFIG, DIAS_PERFORACION } from '../constants/scheduleConstants';

function generateFullCycle() {
    const cycle = [];

    cycle.push(STATES.SUBIDA);

    for (let i = 0; i < SCHEDULE_CONFIG.DIAS_INDUCCION; i++) {
        cycle.push(STATES.INDUCCION);
    }

    for (let i = 0; i < DIAS_PERFORACION; i++) {
        cycle.push(STATES.PERFORACION);
    }

    cycle.push(STATES.BAJADA);

    for (let i = 0; i < SCHEDULE_CONFIG.DIAS_DESCANSO; i++) {
        cycle.push(STATES.DESCANSO);
    }

    return cycle;
}


function generateSupervisorSchedule(offset) {
    const fullCycle = generateFullCycle();
    const cycleLength = fullCycle.length;
    const schedule = [];

    for (let day = 0; day < SCHEDULE_CONFIG.HORIZONTE; day++) {
        const cyclePosition = (day + offset) % cycleLength;
        schedule.push(fullCycle[cyclePosition]);
    }

    return schedule;
}


export function generateSchedule() {
    const offsets = {
        S1: 0,   
        S2: 7,   
        S3: 14   
    };

    return {
        S1: generateSupervisorSchedule(offsets.S1),
        S2: generateSupervisorSchedule(offsets.S2),
        S3: generateSupervisorSchedule(offsets.S3)
    };
}

export function generateScheduleWithOffsets(customOffsets) {
    return {
        S1: generateSupervisorSchedule(customOffsets.S1 || 0),
        S2: generateSupervisorSchedule(customOffsets.S2 || 0),
        S3: generateSupervisorSchedule(customOffsets.S3 || 0)
    };
}
