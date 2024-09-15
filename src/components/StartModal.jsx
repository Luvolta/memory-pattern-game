import React, { useState } from "react";

function StartModal({ onStartGame, onShowRank }) {
  const [difficulty, setDifficulty] = useState("principiante");
  const [mode, setMode] = useState("clasico");
  const [theme, setTheme] = useState("celeste");

  return (
    <div className="start-modal">
      <h1>Selecciona tu configuración</h1>
      <label>
        Dificultad:
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="principiante">Principiante</option>
          <option value="intermedio">Intermedio</option>
          <option value="experto">Experto</option>
        </select>
      </label>
      <label>
        Modo:
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="clasico">Clásico</option>
          <option value="cronometro">Cronómetro</option>
          <option value="confuso">Confuso</option>
        </select>
      </label>
      <label>
        Tema:
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="clasico">Celeste</option>
          <option value="neon">Rojo</option>
          <option value="blackAndWhite">Azul</option>
        </select>
      </label>
      <button onClick={() => onStartGame(difficulty, mode, theme)}>Iniciar Juego</button>
      <button onClick={onShowRank}>Ver Ranking</button>
    </div>
  );
}

export default StartModal;
