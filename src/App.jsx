import React, { useState } from "react";
import GameMenu from "./components/GameMenu";
import GameBoard from "./components/GameBoard";
import './App.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState("principiante");
  const [mode, setMode] = useState("clasico");
  const [theme, setTheme] = useState("tema1");
  

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleGameOver = () => {
    setGameStarted(false);
  };

  return (
    <div className={`App ${theme}`}>
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
