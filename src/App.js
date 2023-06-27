import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import {Grid ,Typography} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';

import CurrentMove, {Step, Square} from './AllSteps';
import theme from './Themes';


function Board(props) {
  let { xIsNext, squares, onPlay } = props;
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
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <Grid container spacing={3}>
      {/* <Grid item xs={12}>
        <Typography theme={theme} variant="h2" style={{ color: '#ff6f3c' }}>TIC TAC TOE</Typography>
      </Grid> */}
      <Grid item xs={12}>
        <Grid container direction="row"
              alignItems="flex-start"
              justifyContent="flex-start">
          <Grid item xs={12}>
            <Typography variant="h2" style={{ color: '#ff9a3c' }}>{status}</Typography>
          </Grid>
          <Grid container >
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

function Steps(a) {
  let { param1, param2 } = a;
  return (
    <Grid container direction="row">
      <Grid item xs={6}>
        <Step param1 = { param1 }/> 
      </Grid>
      <Grid item xs={6}>
        <CurrentMove param2 = { param2 } /> 
      </Grid>
    </Grid>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove]; 
  

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    console.log("H" + history)
    console.log("C" + currentMove)
    console.log("N" + nextSquares)
    setHistory(nextHistory);
    console.log(nextHistory)
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    // console.log(squares, move)
    let description;
    if (move > 0) {
      description = 'Go to move: ' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <Grid container>
        <li key={move} style={{ color: '#ff9a3c', fontSize: '20px'}}>
          <Button variant="contained" style={{backgroundColor:"#ffcab0", }} onClick={() => jumpTo(move)}>{description}</Button>
        </li>
      </Grid>
        
    );
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container direction="row">
        <Grid item xs={12}>
          <Typography variant="h2" style={{ color: '#ff6f3c' }}>TIC TAC TOE</Typography>
        </Grid>
        <Grid item xs={4}>
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
          <ol>{moves}</ol>
        </Grid>
        <Grid item xs={8}>
          <Steps param1={history} param2={currentMove}  />
        </Grid>
      </Grid>
    </ThemeProvider>
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
