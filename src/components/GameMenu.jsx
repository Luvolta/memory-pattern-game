import React, { useState } from "react";

function GameMenu({ setDifficulty, setMode, setTheme, handleStartGame }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState("principiante");
  const [selectedMode, setSelectedMode] = useState("clasico");
  const [selectedTheme, setSelectedTheme] = useState("tema1");

  const handleStart = () => {
    setDifficulty(selectedDifficulty);
    setMode(selectedMode);
    setTheme(selectedTheme);
    handleStartGame();
  };

  return (
    <div className="game-menu">
      <h1>Patrón de Memoria</h1>
      
      <div className="menu-option">
        <label htmlFor="difficulty">Dificultad:</label>
        <select id="difficulty" value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)}>
          <option value="principiante">Principiante</option>
          <option value="intermedio">Intermedio</option>
          <option value="experto">Experto</option>
        </select>
      </div>

      <div className="menu-option">
        <label htmlFor="mode">Modo:</label>
        <select id="mode" value={selectedMode} onChange={(e) => setSelectedMode(e.target.value)}>
          <option value="clasico">Clásico</option>
          <option value="cronometro">Cronómetro</option>
          <option value="confuso">Confuso</option>
        </select>
      </div>

      <div className="menu-option">
        <label htmlFor="theme">Tema:</label>
        <select id="theme" value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)}>
          <option value="tema1">Tema 1</option>
          <option value="tema2">Tema 2</option>
          <option value="tema3">Tema 3</option>
        </select>
      </div>

      <button onClick={handleStart}>Comenzar Juego</button>
    </div>
  );
}

export default GameMenu;
