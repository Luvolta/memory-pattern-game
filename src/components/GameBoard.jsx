import React, { useState, useEffect } from "react";
import useSound from "use-sound";

function GameBoard({ difficulty, mode, theme, handleGameOver }) {
  const [sequence, setSequence] = useState([]);               // Secuencia del juego
  const [playerSequence, setPlayerSequence] = useState([]);    // Secuencia del jugador
  const [activeButton, setActiveButton] = useState(null);      // Botón activo en el momento
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);     // Controla si es el turno del jugador
  const [round, setRound] = useState(0);                       // Ronda actual
  const [timer, setTimer] = useState(null);                    // Intervalo del temporizador
  const [timeLeft, setTimeLeft] = useState(0);                 // Tiempo restante en el modo cronómetro

  // Cargar sonidos
  const [playBeep] = useSound("/sounds/beep.mp3");
  const [playError] = useSound("/sounds/error.mp3");
  const [playSuccess] = useSound("/sounds/success.mp3");

  const buttons = ["red", "blue", "green", "yellow"]; // Colores disponibles para los botones

  // Iniciar una nueva ronda al cargar el componente
  useEffect(() => {
    startNewRound();
  }, []);

  // Inicia una nueva ronda, añadiendo un nuevo color a la secuencia
  const startNewRound = () => {
    const newColor = buttons[Math.floor(Math.random() * buttons.length)];
    setSequence((prevSequence) => [...prevSequence, newColor]); // Añadir color a la secuencia
    setPlayerSequence([]);                                      // Limpiar la secuencia del jugador
    setRound((prevRound) => prevRound + 1);                     // Incrementar la ronda
    setIsPlayerTurn(false);                                     // No es el turno del jugador aún

    // Si el modo es cronómetro, comenzar el temporizador
    if (mode === "cronometro") {
      startTimer();
    }
  };

  // Reproduce la secuencia del juego
  useEffect(() => {
    if (!isPlayerTurn) {
      playSequence();
    }
  }, [sequence]);

  // Lógica para reproducir la secuencia del juego
  const playSequence = () => {
    const sequenceToPlay = mode === "inverso" ? [...sequence].reverse() : sequence;

    sequenceToPlay.forEach((color, index) => {
      setTimeout(() => {
        setActiveButton(color); // Muestra el botón como activo
        playBeep();             // Reproduce sonido beep
      }, (index + 1) * getSpeedByDifficulty(difficulty)); // Tiempo según dificultad

      setTimeout(() => {
        setActiveButton(null);  // Desactiva el botón
        if (index === sequenceToPlay.length - 1) {
          setIsPlayerTurn(true); // Habilita el turno del jugador al final de la secuencia
        }
      }, (index + 1) * getSpeedByDifficulty(difficulty) + 500); // Espera antes de desactivar
    });
  };

  // Obtiene la velocidad de la secuencia según la dificultad
  function getSpeedByDifficulty(difficulty) {
    switch (difficulty) {
      case "principiante":
        return 1000;  // 1 segundo entre cada paso de la secuencia
      case "intermedio":
        return 700;   // 0.7 segundos entre cada paso
      case "experto":
        return 300;   // 0.3 segundos entre cada paso
      default:
        return 1000;  // Valor por defecto
    }
  }

  // Maneja la entrada del jugador
  const handlePlayerInput = (color) => {
    if (!isPlayerTurn) return; // Ignorar si no es el turno del jugador

    const expectedSequence = mode === "inverso" ? [...sequence].reverse() : sequence;
    const newPlayerSequence = [...playerSequence, color]; // Actualiza la secuencia del jugador
    setPlayerSequence(newPlayerSequence);

    // Si la entrada del jugador no coincide con la secuencia del juego, se pierde
    if (expectedSequence[newPlayerSequence.length - 1] !== color) {
      stopTimer();  // Detiene el temporizador
      playError();  // Reproduce sonido de error
      handleGameOver();  // Maneja la lógica de fin del juego
      return;
    }

    // Si el jugador completa correctamente la secuencia
    if (newPlayerSequence.length === sequence.length) {
      playSuccess();  // Reproduce sonido de éxito
      setIsPlayerTurn(false);  // Cambia de turno
      setTimeout(startNewRound, 1000); // Inicia la siguiente ronda después de un segundo
    }
  };

  // Inicia el temporizador (modo cronómetro)
  const startTimer = () => {
    setTimeLeft(getTimeLimitByDifficulty()); // Establece el tiempo límite según la dificultad
    const newTimer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(newTimer); // Detiene el temporizador cuando llega a cero
          handleGameOver();        // Termina el juego si el tiempo se acaba
          return 0;
        }
        return prevTime - 1; // Decrementa el tiempo
      });
    }, 1000);
    setTimer(newTimer);
  };

  // Detiene el temporizador
  const stopTimer = () => {
    clearInterval(timer);
  };

  // Obtiene el límite de tiempo según la dificultad
  const getTimeLimitByDifficulty = () => {
    switch (difficulty) {
      case "principiante":
        return 30;  // 30 segundos para principiantes
      case "intermedio":
        return 20;  // 20 segundos para intermedios
      case "experto":
        return 10;  // 10 segundos para expertos
      default:
        return 30;  // Valor por defecto
    }
  };

  // Define el tema actual
  const themeClass = `theme-${theme}`;

  return (
    <div className={`game-board ${themeClass}`}>
      <h2>Ronda: {round-1}</h2>
      {mode === "cronometro" && <h3>Tiempo restante: {timeLeft}s</h3>}

      <div className="buttons">
        {buttons.map((color) => (
          <button
            key={color}
            className={`color-button ${color} ${activeButton === color ? "active" : ""}`}
            onClick={() => handlePlayerInput(color)}
          />
        ))}
      </div>
    </div>
  );
}

export default GameBoard;
