import React, { useState } from "react";
import GameMenu from "./components/GameMenu";
import GameBoard from "./components/GameBoard";
import './App.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState("principiante");
  const [mode, setMode] = useState("clasico");
  const [theme, setTheme] = useState("tema1");
  const [isDarkMode, setIsDarkMode] = useState(true); // Nuevo estado para modo oscuro

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleGameOver = () => {
    setGameStarted(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode); // Alternar entre claro y oscuro
  };

  return (
    <div className={`App ${theme} ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
      </button>
      {!gameStarted ? (
        <GameMenu 
          setDifficulty={setDifficulty} 
          setMode={setMode} 
          setTheme={setTheme} 
          handleStartGame={handleStartGame} 
        />
      ) : (
        <GameBoard 
          difficulty={difficulty} 
          mode={mode} 
          theme={theme} 
          handleGameOver={handleGameOver} 
        />
      )}
    </div>
  );
}

export default App;
