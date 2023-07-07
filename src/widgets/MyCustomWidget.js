import React, { useState } from "react";

const Square = ({ onClick, value }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Board = ({ squares, onClick }) => {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  return (
    <div className="board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Leaderboard = ({ player1, player2, wins1, wins2 }) => {
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <div className="players">
        <div className="player">
          <span className="player-name">{player1}</span>
          <span className="player-wins">Wins: {wins1}</span>
        </div>
        <div className="player">
          <span className="player-name">{player2}</span>
          <span className="player-wins">Wins: {wins2}</span>
        </div>
      </div>
    </div>
  );
};

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [player1, setPlayer1] = useState("Player 1");
  const [player2, setPlayer2] = useState("Player 2");
  const [wins1, setWins1] = useState(0);
  const [wins2, setWins2] = useState(0);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const newSquares = [...squares];
    newSquares[i] = isX ? "X" : "O";
    setSquares(newSquares);
    setIsX(!isX);

    if (calculateWinner(newSquares)) {
      if (isX) {
        setWins1(wins1 + 1);
      } else {
        setWins2(wins2 + 1);
      }
    }
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setIsX(true);
  };

  const renderBoard = () => {
    return (
      <div>
        <Board squares={squares} onClick={handleClick} />
        <div className="status">
          {calculateWinner(squares)
            ? `Winner: ${calculateWinner(squares)}`
            : `Next player: ${isX ? "X" : "O"}`}
        </div>
        <button className="restart" onClick={handleRestart}>
          Restart Game
        </button>
      </div>
    );
  };

  return (
    <div>
      <h1 style={{ fontWeight: 'bold' }}>Tic Tac Toe</h1>
      <Leaderboard
        player1={player1}
        player2={player2}
        wins1={wins1}
        wins2={wins2}
      />
      {renderBoard()}
    </div>
  );
};

export default TicTacToe;

function calculateWinner(squares) {
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningPatterns.length; i++) {
    const [a, b, c] = winningPatterns[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
