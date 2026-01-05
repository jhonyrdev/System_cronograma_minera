/**
 * App - Componente principal de la aplicación de cronograma de supervisores
 */
import { useState } from 'react';
import { generateSchedule } from './logic/scheduleGenerator';
import { validateSchedule } from './logic/scheduleValidator';
import ScheduleTable from './components/ScheduleTable';
import './App.css';

function App() {
  const [schedule, setSchedule] = useState(null);
  const [validation, setValidation] = useState(null);

  const handleGenerateSchedule = () => {
    const newSchedule = generateSchedule();
    const newValidation = validateSchedule(newSchedule);

    setSchedule(newSchedule);
    setValidation(newValidation);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Cronograma de Supervisores de Perforación</h1>
        <p className="subtitle">Sistema de planificación y validación de turnos</p>
      </header>

      <main className="app-main">
        <section className="controls-section">
          <button
            className="btn-generate"
            onClick={handleGenerateSchedule}
          >
          Generar Cronograma
          </button>
        </section>

        {schedule && validation && (
          <>
            <section className="schedule-section">
              <h2>Cronograma de 21 Días</h2>
              <ScheduleTable schedule={schedule} validation={validation} />
            </section>

            {validation.hasConflicts && (
              <section className="conflicts-section">
                <div className="conflict-alert">
                  <h3>Conflicto de Planificación</h3>
                  <p>
                    Se detectaron <strong>{validation.summary.totalConflictDays}</strong> día(s)
                    con conflictos de cantidad de supervisores perforando.
                  </p>
                  {validation.transitionErrors.length > 0 && (
                    <p>
                      También hay <strong>{validation.summary.totalTransitionErrors}</strong> error(es)
                      de transición inválida.
                    </p>
                  )}
                </div>
              </section>
            )}

            <section className="legend-section">
              <h3>Leyenda de Estados</h3>
              <div className="legend-grid">
                <div className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: '#3498db' }}></span>
                  <span>S - Subida</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: '#f1c40f' }}></span>
                  <span>I - Inducción</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: '#27ae60' }}></span>
                  <span>P - Perforación</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: '#e74c3c' }}></span>
                  <span>B - Bajada</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: '#95a5a6' }}></span>
                  <span>D - Descanso</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: '#fff', border: '1px solid #ddd' }}></span>
                  <span>- - Sin actividad</span>
                </div>
              </div>
            </section>

            <section className="rules-section">
              <h3>Reglas del Sistema</h3>
              <ul>
                <li>Máximo 2 supervisores pueden estar en perforación (P) el mismo día</li>
                <li>S1 mantiene siempre su régimen completo sin ajustes</li>
                <li>S2 y S3 son supervisores secundarios</li>
                <li>Régimen: 14 días trabajo × 7 días descanso</li>
              </ul>
            </section>
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>Sistema de Cronograma de Supervisores - Empresa Minera</p>
      </footer>
    </div>
  );
}

export default App;
