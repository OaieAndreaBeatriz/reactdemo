import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import AlertMessages from './Handles';
import { Square } from './AllSteps';

export default function Board(props) {
  let { xIsNext, squares, onPlay, selectedPlayer } = props;

  const [alert, setAlert] = useState({
    isOpen: false,
    severity: 'info',
    messageTitle: 'empty',
    message: 'empty',
  });

  useEffect(() => {
    if (calculateWinner(squares)) {
      setAlert({
        isOpen: true,
        severity: 'success',
        messageTitle: `Winner: ${calculateWinner(squares)}`,
        message: 'Congrats!',
      });
    }
  }, [squares]);

  useEffect(() => {
    let possibleNextMoves = [];
    let nextMoveIndex = 0;
    const timer = setTimeout(() => {
      if (selectedPlayer === 'O' && !xIsNext) {
        for (let i = 0; i < squares.length; i++) {
          if (squares[i] === null) {
            possibleNextMoves.push(i);
          }
        }
        let dangerLines = checkDangerLines(squares);
        if (dangerLines.length > 0) {
          let randomIndex = Math.floor(Math.random() * dangerLines.length);
          nextMoveIndex = dangerLines[randomIndex];
        } else {
          let randomIndex = Math.floor(Math.random() * possibleNextMoves.length);
          nextMoveIndex = possibleNextMoves[randomIndex];
        }
        handleClick(nextMoveIndex);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [xIsNext, selectedPlayer]);

  function handleClick(i) {
    const nextSquares = squares.slice();

    if (nextSquares[i] === 'X' || nextSquares[i] === 'O') {
      setAlert({
        isOpen: true,
        severity: 'error',
        messageTitle: 'Error',
        message: 'Wrong square!',
      });
      return;
    }

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
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
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (selectedPlayer ? selectedPlayer : '...');
  }

  return (
    <Grid container>
      <AlertMessages
        isOpen={alert.isOpen}
        onHandleClose={() => setAlert({ isOpen: false })}
        severity={alert.severity}
        messageTitle={alert.messageTitle}
        message={alert.message}
      />

      <Grid item xs={12}>
        <Grid container direction="row" alignItems="flex-start" justifyContent="flex-start">
          <Grid item xs={6}>
            <Typography variant="h5" color="primary">
              {status}
            </Typography>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Grid container>
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
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
      return squares[a];
    }
  }
  return null;
}

// verifica pe care linii trebuie blocat jucatorul sa nu castige
function checkDangerLines(squares) {
  let dangerLines = [];
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
    if (
      (squares[a] === 'X' && squares[b] === 'X' && squares[c] == null) ||
      (squares[a] === 'X' && squares[c] === 'X' && squares[b] == null) ||
      (squares[b] === 'X' && squares[c] === 'X' && squares[a] == null)
    ) {
      dangerLines.push([a, b, c].filter((i) => squares[i] === null)[0]);
    }
  }

  if (dangerLines.length === 0) return checkBestLines(squares);

  return dangerLines;
}

function checkBestLines(squares) {
  // return best indices for next move
  return [];
}
