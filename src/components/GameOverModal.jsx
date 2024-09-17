
function GameOverModal({ round, onClose, theme }) {
  return (
    <div className={`modal-overlay ${theme}`}>
      <div className={`modal-content ${theme}`}>
        <h2>¡Perdiste!</h2>
        <p>Rondas completadas: {round-1}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default GameOverModal;
