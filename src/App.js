import React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import {Grid ,Typography, Container} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles';

import CurrentMove, {Step} from './AllSteps';
import Board from './Board'
import theme from './Themes';


function Steps(a) {
  let { param1, param2 } = a;
  return (
    <Grid container>
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
  // verifica cine urmeaza 
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  useEffect(() => {
    let possibleNextMoves = []

    if(xIsNext === false) {
      for(let i=0; i < currentSquares.length; i++){
        if(currentSquares[i] === null){
          possibleNextMoves.push(i)
        }
      }
      const randomMove = Math.floor(Math.random(possibleNextMoves) )
      currentSquares[randomMove] = 'O'
      console.log(currentSquares, '1')
    }
  },[xIsNext])

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move: ' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <Grid item key={move}>
        <Button variant="contained" color='warning' onClick={() => jumpTo(move)}>{description}</Button>
      </Grid>
    );
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h3" color={xIsNext ? `secondary` : `primary`} >TIC TAC TOE</Typography>
          </Grid>
          <Grid item xs={4}>
            <Board xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            calculateWinner={calculateWinner}/>
            <Grid container spacing={1} direction='column'>
              {moves}
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Steps param1={history} param2={currentMove}  />
          </Grid>
        </Grid>
      </Container>
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
