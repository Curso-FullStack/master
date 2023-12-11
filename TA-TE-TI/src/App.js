import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../src/App.css'


// funcion Square, posee un value y un evento onSquare, representa cada celda del tablero
function Square({ value, onSquareClick }) {
  return (
    <button
    className={`square ${value ? 'selected' : ''}`}
    onClick={onSquareClick}
  >
    {value}
  </button>
  );
}


//funcion Board, el tablero en si, brinda gestion de quien es el proximo jugador si es que lo hay.

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Ganador: ' + winner.winner;

  } else {
    status = 'Siguiente jugador: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className='BoardPrincipal'>
        <div className="board-row">
          {[0, 1, 2].map((col) => (
            <Square
              key={col}
              value={squares[col]}
              onSquareClick={() => handleClick(col)}
            />
          ))}
        </div>
        <div className="board-row">
          {[3, 4, 5].map((col) => (
            <Square
              key={col}
              value={squares[col]}
              onSquareClick={() => handleClick(col)}
            />
          ))}
        </div>
        <div className="board-row">
          {[6, 7, 8].map((col) => (
            <Square
              key={col}
              value={squares[col]}
              onSquareClick={() => handleClick(col)}
            />
          ))}
        </div>
      </div>
      <div className="status">{status}</div>

    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

      return {
        winner: squares[a],
        winningLine: lines[i],
      };
    }
  }
  return null;
}
/* 
funcion defecto del juego, contiene del proximo simbolo, del historial de movidas (vector de vectores)
del numero de movimiento en el que estamos */

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const [ordenInverso, setOrdenInverso] = useState(false);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function handlerReiniciar() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setXIsNext(true);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  function orden() {
    // Realiza una copia del historial para no modificar el estado directamente
    const historyCopy = [...history];

    // Invierte el historial si el orden es inverso
    if (ordenInverso) {
      historyCopy.reverse();
    }

    // Mapea el historial invertido o no, según la condición
    const moves = historyCopy.map((squares, move) => {
      let descriptionMove;
      if (move > 0) {
        if (move === currentMove) {
          descriptionMove = 'Estás en el movimiento ' + currentMove;

        } else {
          descriptionMove = 'Ir al movimiento #' + move;
        }
      }
      else {
        descriptionMove = 'Ir al inicio del juego';
      }

      return (
        <li className='list-group-item' key={move} onClick={() => jumpTo(move)}>
          <a class="list-group-item list-group-item-action">{descriptionMove}</a>
        </li>

      );
    });

    return moves;
  }


  return (
    <div className='Main'>
      <div className="container w-75">
        <div className='game'>
          <div className='game-board'>
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />

          </div>
          <div className='game-info d-grid gap-2'>
            <ul className='list-group'>{orden()}</ul>
            <button className="btn btn-primary" type="button" onClick={handlerReiniciar}>REINICIAR!</button>
          </div>
        </div>
      </div>
    </div>
  );
}
