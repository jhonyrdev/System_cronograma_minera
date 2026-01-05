function SupervisorCountRow({ perforatingConflicts, horizonte }) {
    const days = Array.from({ length: horizonte }, (_, i) => i);

    return (
        <tr className="count-row">
            <td className="supervisor-label">
                <strong>Perforando</strong>
            </td>
            {days.map((day) => {
                const dayData = perforatingConflicts[day];
                const hasConflict = dayData?.hasConflict;

                const cellStyle = {
                    backgroundColor: hasConflict ? '#fee' : '#f8f9fa',
                    color: hasConflict ? '#e74c3c' : '#333',
                    fontWeight: hasConflict ? 'bold' : 'normal',
                    padding: '8px 12px',
                    textAlign: 'center',
                    border: hasConflict ? '2px solid #e74c3c' : '1px solid #ddd'
                };

                return (
                    <td
                        key={day}
                        style={cellStyle}
                        title={dayData?.reason || `${dayData?.count} supervisor(es) perforando`}
                    >
                        {dayData?.count ?? 0}
                    </td>
                );
            })}
        </tr>
    );
}

export default SupervisorCountRow;
