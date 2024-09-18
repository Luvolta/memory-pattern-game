# Patrón de Memoria

## Descripción

**Patrón de Memoria** es un juego en React inspirado en el clásico "Simon Says", diseñado para desafiar tu capacidad de memoria y rapidez. En este juego, debes recordar y reproducir secuencias de colores que se muestran en pantalla. A medida que avanzas, las secuencias se vuelven más largas y complicadas, poniendo a prueba tu agilidad mental y concentración.

### Características Principales

- **Niveles de Dificultad**: Tres niveles ajustables (Principiante, Intermedio, Experto) para adaptar el desafío a tu nivel de habilidad.
- **Modos de Juego**:
  - **Clásico**: Sigue la secuencia de colores mostrada.
  - **Cronómetro**: Completa la secuencia en el menor tiempo posible.
  - **Inverso**: Ingresa la secuencia inversa a la mostrada.
- **Temas de Colores**:
  - **Clásico**: Paleta de colores tradicional.
  - **Neón**: Efectos de resplandor y sombras para un estilo vibrante y llamativo.
  - **Blanco y Negro**: Diseño minimalista en blanco y negro.

### Interfaz de Usuario

- **Modal de Inicio**: Al iniciar el juego, un modal te permite seleccionar la dificultad, el modo de juego y el tema de colores.
- **Pantalla de Puntaje**: Al perder, se muestra un modal con el puntaje obtenido. Puedes revisar tu rendimiento y luego volver al menú principal después de una breve pausa de 5 segundos.

## Tecnologías

- **React**: Biblioteca para la construcción de interfaces de usuario interactivas.
- **Vite**: Herramienta de construcción rápida para aplicaciones modernas.
- **CSS**: Utilizado para estilizar la interfaz de usuario y aplicar los diferentes temas de color.
- **JSX**: Sintaxis utilizada para escribir componentes de React de manera más legible.
- **use-sound**: Biblioteca para gestionar efectos de sonido en el juego.


## Estructura del Proyecto

```plaintext
memory-pattern-game/
├── node_modules/
├── public/
│   ├── sounds/
│   │   ├── blue.mp3
│   │   ├── error.mp3
│   │   ├── green.mp3
│   │   ├── red.mp3
│   │   ├── succes.mp3
│   │   ├── yellow.mp3
├── src/
│   ├── assets/
│   │   └── simonsSays.png
│   ├── components/
│   │   ├── GameBoard.jsx
│   │   ├── GameMenu.jsx
│   │   ├── GameOverModal.jsx
│   │   ├── StartModal.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js

