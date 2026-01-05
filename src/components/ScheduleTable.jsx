import { SCHEDULE_CONFIG } from '../constants/scheduleConstants';
import ScheduleCell from './ScheduleCell';
import SupervisorCountRow from './SupervisorCountRow';

function ScheduleTable({ schedule, validation }) {
    const { SUPERVISORES, HORIZONTE } = SCHEDULE_CONFIG;
    const days = Array.from({ length: HORIZONTE }, (_, i) => i + 1);

    const transitionErrorSet = new Set();
    validation.transitionErrors.forEach(error => {
        transitionErrorSet.add(`${error.supervisor}-${error.day}`);
    });

    return (
        <div className="schedule-table-container">
            <table className="schedule-table">
                <thead>
                    <tr>
                        <th className="supervisor-header">Supervisor</th>
                        {days.map((day) => (
                            <th key={day} className="day-header">
                                Día {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {SUPERVISORES.map((supervisor) => (
                        <tr key={supervisor} className="supervisor-row">
                            <td className="supervisor-label">
                                <strong>{supervisor}</strong>
                                {supervisor === 'S1' && <span className="badge-principal"> (Principal)</span>}
                            </td>
                            {schedule[supervisor]?.map((state, dayIndex) => {
                                const hasError = transitionErrorSet.has(`${supervisor}-${dayIndex + 1}`);
                                return (
                                    <ScheduleCell
                                        key={dayIndex}
                                        state={state}
                                        hasTransitionError={hasError}
                                    />
                                );
                            })}
                        </tr>
                    ))}
                    <SupervisorCountRow
                        perforatingConflicts={validation.perforatingConflicts}
                        horizonte={HORIZONTE}
                    />
                </tbody>
            </table>
        </div>
    );
}

export default ScheduleTable;
