import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import GameOverModal from "./GameOverModal";

function GameBoard({ difficulty, mode, theme, handleGameOver }) {
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [round, setRound] = useState(0);
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [playBeepRed] = useSound("/sounds/red.mp3");
  const [playBeepBlue] = useSound("/sounds/blue.mp3");
  const [playBeepGreen] = useSound("/sounds/green.mp3");
  const [playBeepYellow] = useSound("/sounds/yellow.mp3");
  const [playError] = useSound("/sounds/error.mp3");
  const [playSuccess] = useSound("/sounds/success.mp3");

  const buttons = ["red", "blue", "green", "yellow"];

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    const newColor = buttons[Math.floor(Math.random() * buttons.length)];
    setSequence((prevSequence) => [...prevSequence, newColor]);
    setPlayerSequence([]);
    setRound((prevRound) => prevRound + 1);
    setIsPlayerTurn(false);

    if (mode === "cronometro") {
      startTimer();
    }
  };

  useEffect(() => {
    if (!isPlayerTurn) {
      playSequence();
    }
  }, [sequence]);

  const playSequence = () => {
    const sequenceToPlay = mode === "inverso" ? [...sequence].reverse() : sequence;

    sequenceToPlay.forEach((color, index) => {
      setTimeout(() => {
        setActiveButton(color);
        playSound(color);
      }, (index + 1) * getSpeedByDifficulty(difficulty));

      setTimeout(() => {
        setActiveButton(null);
        if (index === sequenceToPlay.length - 1) {
          setIsPlayerTurn(true);
        }
      }, (index + 1) * getSpeedByDifficulty(difficulty) + 500);
    });
  };

  const playSound = (color) => {
    switch (color) {
      case "red":
        playBeepRed();
        break;
      case "blue":
        playBeepBlue();
        break;
      case "green":
        playBeepGreen();
        break;
      case "yellow":
        playBeepYellow();
        break;
      default:
        break;
    }
  };

  function getSpeedByDifficulty(difficulty) {
    switch (difficulty) {
      case "principiante":
        return 1000;
      case "intermedio":
        return 700;
      case "experto":
        return 300;
      default:
        return 1000;
    }
  }

  const handlePlayerInput = (color) => {
    if (!isPlayerTurn) return;

    // Obtener la secuencia esperada
    const expectedSequence = mode === "inverso" ? [...sequence].reverse() : sequence;
    const newPlayerSequence = [...playerSequence, color];
    setPlayerSequence(newPlayerSequence);

    // Reproduce sonido y resalta el botón
    playSound(color);
    setActiveButton(color);
    setTimeout(() => setActiveButton(null), 300); // Duración del resalte

    // Verificar la secuencia del jugador
    const isSequenceCorrect = newPlayerSequence.every((color, index) =>
      color === expectedSequence[index]
    );

    if (!isSequenceCorrect || newPlayerSequence.length > expectedSequence.length) {
      stopTimer();
      playError();
      setShowModal(true); // Muestra el modal
      return;
    }

    // Verificar si el jugador completó la secuencia
    if (newPlayerSequence.length === expectedSequence.length) {
      playSuccess();
      setIsPlayerTurn(false);
      setTimeout(startNewRound, 1000);
    }
  };

  const startTimer = () => {
    setTimeLeft(getTimeLimitByDifficulty());
    const newTimer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(newTimer);
          setShowModal(true); // Muestra el modal cuando el tiempo se acaba
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    setTimer(newTimer);
  };

  const stopTimer = () => {
    clearInterval(timer);
  };

  const getTimeLimitByDifficulty = () => {
    switch (difficulty) {
      case "principiante":
        return 30;
      case "intermedio":
        return 20;
      case "experto":
        return 10;
      default:
        return 30;
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    handleGameOver();
  };

  const themeClass = `theme-${theme}`;

  return (
    <div className={`game-board ${themeClass}`}>
      <h2>Ronda: {round - 1}</h2>
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

      {showModal && (
        <GameOverModal
          round={round - 1}
          onClose={handleCloseModal}
          theme={theme}
        />
      )}
    </div>
  );
}

export default GameBoard;
