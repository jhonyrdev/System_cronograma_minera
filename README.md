# Cronograma Simplificado de Supervisores de Perforación

## Descripción

Este proyecto es una aplicación web desarrollada en React que genera y visualiza un cronograma simplificado de turnos para 3 supervisores de perforación en una empresa minera.

El sistema permite visualizar los estados diarios de cada supervisor y detectar conflictos operativos según reglas simples, tales como:

- Máximo 2 supervisores perforando (`P`) por día  
- Cuando el supervisor S3 está activo, debe haber al menos 2 supervisores perforando  
- El supervisor S1 mantiene su régimen completo sin modificaciones  
- No hay corrección automática, solo detección y visualización de conflictos

---

## Funcionalidades

- Generación dinámica del cronograma de 21 días con el régimen fijo 14x7  
- Visualización clara de estados diarios (`S`, `I`, `P`, `B`, `D`, `-`) con colores diferenciados  
- Conteo diario de supervisores perforando con alerta visual en caso de conflicto  
- Mensajes de alerta para días con cantidad incorrecta de perforadores  
- Interfaz simple y responsiva en React y CSS

---

## Estados de Supervisores

| Estado    | Significado     | Color sugerido |
|-----------|-----------------|----------------|
| S         | Subida          | Azul           |
| I         | Inducción       | Amarillo       |
| P         | Perforación     | Verde          |
| B         | Bajada          | Rojo           |
| D         | Descanso        | Gris           |
| -         | Sin actividad   | Blanco         |

---

## Instalación y ejecución

1. Clonar el repositorio  
   ```bash
   git clone https://github.com/tuusuario/cronograma-supervisores.git
