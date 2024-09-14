import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import beep from "../sounds/beep.mp3";
import errorSound from "../sounds/error.mp3";
import successSound from "../sounds/success.mp3";

function GameBoard({ difficulty, mode, theme, handleGameOver }) {
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const [playBeep] = useSound(beep, { volume: 1 });
  const [playError] = useSound(errorSound, { volume: 1 });
  const [playSuccess] = useSound(successSound, { volume: 1 });

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
    setScore((prevScore) => prevScore + 1);

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
    sequence.forEach((color, index) => {
      setTimeout(() => {
        setActiveButton(color);
        playBeep();  // Reproduce sonido al mostrar el botón
      }, (index + 1) * getSpeedByDifficulty());

      setTimeout(() => {
        setActiveButton(null);
        if (index === sequence.length - 1) {
          setIsPlayerTurn(true);
        }
      }, (index + 1) * getSpeedByDifficulty() + 500);
    });
  };

  const handlePlayerInput = (color) => {
    if (!isPlayerTurn) return;

    const newPlayerSequence = [...playerSequence, color];
    setPlayerSequence(newPlayerSequence);

    if (sequence[newPlayerSequence.length - 1] !== color) {
      stopTimer();
      playError();  // Reproduce sonido de error
      handleGameOver();
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      playSuccess();  // Reproduce sonido de éxito
      setIsPlayerTurn(false);
      setTimeout(startNewRound, 1000);
    }
  };

  const startTimer = () => {
    setTimeLeft(getTimeLimitByDifficulty());
    setTimer(setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          handleGameOver();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000));
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

  const getButtonColor = (color) => {
    if (mode === "confuso") {
      switch (color) {
        case "red":
          return "blue";
        case "blue":
          return "green";
        case "green":
          return "yellow";
        case "yellow":
          return "red";
        default:
          return color;
      }
    }
    return color;
  };

  // Define el tema actual
  const themeClass = `theme-${theme}`;

  return (
    <div className={`game-board ${themeClass}`}>
      <h2>Ronda: {round}</h2>
      <h2>Puntaje: {score}</h2>
      {mode === "cronometro" && <h3>Tiempo restante: {timeLeft}s</h3>}

      <div className="buttons">
        {buttons.map((color) => (
          <button
            key={color}
            className={`color-button ${getButtonColor(color)} ${activeButton === color ? "active" : ""}`}
            onClick={() => handlePlayerInput(color)}
          />
        ))}
      </div>
    </div>
  );
}

export default GameBoard;
