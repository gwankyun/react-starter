import React, { FC, useState, useCallback } from 'react';
import './Game.css';

const calculateWinner = (squares: string[]): string | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

interface SquareProps {
  value: string;
  onClick: () => void;
}

const Square: FC<SquareProps> = props => {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
};

interface BoardProps {
  squares: string[];
  onClick: (i: number) => void;
}

const Board: FC<BoardProps> = props => {
  const winner = calculateWinner(props.squares);

  const renderSquare = useCallback((i: number) => {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
  }, [props, winner]);

  return (
    <div>
      {[0, 3, 6]
        .map(v => [v, v + 1, v + 2])
        .map(v => {
          return (
            <div className="board-row">
              {v.map(i => renderSquare(i))}
            </div>
          );
        })}
    </div>
  );
};

interface Point {
  x: number;
  y: number;
}

interface History {
  squares: string[];
  coordinate: Point | null;
}

export const Game: FC = () => {
  const [history, setHistory] = useState<History[]>([{ squares: Array(9).fill(null), coordinate: null }]);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const handleClick = useCallback((i: number): void => {
    const currentHistory = history.slice(0, stepNumber + 1);
    const currentStep = currentHistory[currentHistory.length - 1];
    const squares = currentStep.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";

    let x = i % 3;
    let y = Math.floor(i / 3);
    console.log(`(${x}, ${y})`);

    setHistory(currentHistory.concat([{ squares: squares, coordinate: {x: x, y: y} }]));
    setStepNumber(currentHistory.length);
    setXIsNext(!xIsNext);
  }, [history, stepNumber, xIsNext]);

  const jumpTo = useCallback((step: number): void => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }, []);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move + ` (${step.coordinate?.x}, ${step.coordinate?.y})`:
      'Go to game start'
    return (
      <li key={move}>
        <button className={move === stepNumber ? "selected" : "unselected"} onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status: string;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i: any) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};
