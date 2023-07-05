import React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Grid, Typography, Container, selectClasses } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import CurrentMove, { Step } from './AllSteps';
import Board from './Board';
import theme from './Themes';
import CoinFlip from './Coin';

function Steps(a) {
  let { param1, param2 } = a;
  return (
    <Grid container>
      <Grid item xs={6}>
        <Step param1={param1} />
      </Grid>
      <Grid item xs={6}>
        <CurrentMove param2={param2} />
      </Grid>
    </Grid>
  );
}

export default function Game(props) {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  // verifica cine urmeaza
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [selectedPlayer, setSelectedPlayer] = useState('');

  function handlePlayerSelect(player) {
    setSelectedPlayer(player);
  }

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
        <Button variant="contained" color="warning" onClick={() => jumpTo(move)}>
          {description}
        </Button>
      </Grid>
    );
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h3" color={xIsNext ? `secondary` : `primary`}>
              TIC TAC TOE
            </Typography>
            <CoinFlip onPlayerSelect={handlePlayerSelect} />
          </Grid>
          <Grid item xs={4}>
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} selectedPlayer={selectedPlayer} />
            <Grid container spacing={1} direction="column">
              {moves}
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Steps param1={history} param2={currentMove} />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
