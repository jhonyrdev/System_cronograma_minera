/**
 * Componente ScheduleCell
 * Representa una celda individual del cronograma con color y tooltip
 */
import { STATE_COLORS, STATE_NAMES } from '../constants/scheduleConstants';

function ScheduleCell({ state, hasTransitionError }) {
    const backgroundColor = STATE_COLORS[state] || '#ffffff';
    const textColor = state === 'I' || state === '-' ? '#333' : '#fff';

    const cellStyle = {
        backgroundColor,
        color: textColor,
        padding: '8px 12px',
        textAlign: 'center',
        fontWeight: 'bold',
        border: hasTransitionError ? '3px solid #e74c3c' : '1px solid #ddd',
        minWidth: '35px',
        cursor: 'default'
    };

    return (
        <td
            style={cellStyle}
            title={STATE_NAMES[state] || 'Desconocido'}
            className="schedule-cell"
        >
            {state}
        </td>
    );
}

export default ScheduleCell;
