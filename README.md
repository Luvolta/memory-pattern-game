# Patrón de Memoria

## Descripción

**Patrón de Memoria** es un juego en React inspirado en el clásico juego "Simon Says". El objetivo es recordar y reproducir secuencias de colores. El juego incluye tres niveles de dificultad (principiante, intermedio, experto), tres modos de juego (clásico, cronómetro, confuso), y tres temas de colores (celeste para el texto, rojo, azul, verde y amarillo para los botones).

El juego cuenta con un modal de inicio para seleccionar dificultad, modo y tema, y muestra el puntaje al perder. Después de una pérdida, el menú se reactivará tras 5 segundos.

## Tecnologías

- **React** - Biblioteca para la construcción de interfaces de usuario.
- **Vite** - Herramienta de construcción para aplicaciones modernas.
- **CSS** - Estilos para la interfaz de usuario.
- **JSX** - Sintaxis de extensión para JavaScript utilizada en React.

## Estructura del Proyecto

```plaintext
memory-pattern-game/
├── node_modules/
├── public/
│   └── sounds/
│       ├── beep.mp3
│       ├── error.mp3
│       ├── success.mp3
│       └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── GameBoard.jsx
│   │   ├── GameMenu.jsx
│   │   ├── Score.jsx
│   │   ├── StartModal.jsx
│   │   └── Timer.jsx
│   ├── App.css
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
