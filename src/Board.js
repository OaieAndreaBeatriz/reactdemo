import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import AlertMessages from './AlertMessages';
import { Square } from './AllSteps';
import Animation from './Animations';

export default function Board(props) {
  let { xIsNext, squares, onPlay, isFlipped } = props;
  const [isComputerTurn, setIsComputerTurn] = useState(false);

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
    if (!xIsNext) {
      setIsComputerTurn(true);
      const timer = setTimeout(() => {
        for (let i = 0; i < squares.length; i++) {
          if (squares[i] === null) {
            possibleNextMoves.push(i);
          }
        }
        let blockingLines = checkLines(squares, 'X');
        if (blockingLines.length > 0) {
          let randomIndex = Math.floor(Math.random() * blockingLines.length);
          nextMoveIndex = blockingLines[randomIndex];
        } else {
          let winningLines = checkLines(squares, 'O');
          if (winningLines.length > 0) {
            let randomIndex = Math.floor(Math.random() * winningLines.length);
            nextMoveIndex = winningLines[randomIndex];
          } else {
            let randomIndex = Math.floor(Math.random() * possibleNextMoves.length);
            nextMoveIndex = possibleNextMoves[randomIndex];
          }
        }
        handleClick(nextMoveIndex);
        setIsComputerTurn(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [xIsNext]);

  function handleClick(i) {
    if (isComputerTurn && !xIsNext) {
      setAlert({
        isOpen: true,
        severity: 'error',
        messageTitle: 'Error',
        message: 'Wait for your turn!',
      });
      return;
    }

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
    status = 'Next player: ' + (isFlipped ? (xIsNext ? 'X' : 'O') : ' ');
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
          <Animation animationType="fade">
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
          </Animation>
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

function checkLines(squares, player) {
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
  const blockingLines = lines.filter(([a, b, c]) => {
    const isBlockingLine =
      (squares[a] === player && squares[b] === player && squares[c] === null) ||
      (squares[a] === player && squares[c] === player && squares[b] === null) ||
      (squares[b] === player && squares[c] === player && squares[a] === null);

    return isBlockingLine;
  });
  if (blockingLines.length > 0) {
    const positions = blockingLines.map(([a, b, c]) => {
      if (squares[a] === player && squares[b] === player && squares[c] === null) {
        return c;
      } else if (squares[a] === player && squares[c] === player && squares[b] === null) {
        return b;
      } else {
        return a;
      }
    });

    return positions;
  }

  const winningLines = lines.filter(([a, b, c]) => {
    const isWinningLine =
      (squares[a] === player && squares[b] === player && squares[c] === null) ||
      (squares[a] === player && squares[c] === player && squares[b] === null) ||
      (squares[b] === player && squares[c] === player && squares[a] === null);

    return isWinningLine;
  });

  if (winningLines.length === 0) {
    return [];
  }

  const positions = winningLines.map(([a, b, c]) => {
    if (squares[a] === player && squares[b] === player && squares[c] === null) {
      return c;
    } else if (squares[a] === player && squares[c] === player && squares[b] === null) {
      return b;
    } else {
      return a;
    }
  });

  return positions;
}
