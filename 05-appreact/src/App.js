import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../src/App.css'

// funcion Square, posee un value y un evento onSquare, representa cada celda del tablero
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
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
    status = 'Ganador: ' + winner;
    let ganador = winner.winner;
    let lineaGanadora = winner.winningLine;
    console.log(lineaGanadora);
    lineaGanadora.forEach((element) => {
      squares[element] = 'G';
    });
  } else {
    status = 'Siguiente jugador: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
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
    let fil = 100;
    let col = 100;

    // Invierte el historial si el orden es inverso
    if (ordenInverso) {
      historyCopy.reverse();
    }

    // Mapea el historial invertido o no, según la condición
    const moves = historyCopy.map((squares, move) => {
      let descriptionMove;
      if (move > 0) {
        const prevSquares = historyCopy[move - 1];
        const diffIndex = findDifferentIndex(prevSquares, squares);

        switch (diffIndex) {
          case 0:
          case 3:
          case 6:
            col = 1;
            break;
          case 1:
          case 4:
          case 7:
            col = 2;
            break;
          case 2:
          case 5:
          case 8:
            col = 3;
            break;
          default:
            break;
        }

        switch (diffIndex) {
          case 0:
          case 1:
          case 2:
            fil = 1;
            break;
          case 3:
          case 4:
          case 5:
            fil = 2;
            break;
          case 6:
          case 7:
          case 8:
            fil = 3;
            break;
          default:
            break;
        }
        if (move === currentMove) {
          descriptionMove = 'Estás en el movimiento ' + currentMove;

        }
        else {
          if (xIsNext) { descriptionMove = ('O', fil, col) }
          else { descriptionMove = 'X '/* , fil , col */ }
        }
      } else {
        descriptionMove = 'Go to the start!';
      }

      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{descriptionMove}</button>
        </li>
      );
    });

    return moves;
  }


  return (
    <div className='Main'>
      <div className="container">
        <div className='game'>
          <div className='game-board'>
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
          </div>
          <div className='game-info'>
            <ol>{orden()}</ol>
            <button className="btn btn-primary" type="button" onClick={handlerReiniciar}>REINICIAR!</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function findDifferentIndex(prevSquares, currentSquares) {
  for (let i = 0; i < prevSquares.length; i++) {
    if (prevSquares[i] !== currentSquares[i]) {
      return i;
    }
  }
  return -1;
}