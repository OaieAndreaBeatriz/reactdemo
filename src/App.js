import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { Grid, Typography, Container, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import CurrentMove, { Step } from './AllSteps';
import Board from './Board';
import theme from './Themes';
import CoinFlip from './Coin';
import Animation from './Animations';
import { AnimatedContainer } from './Themes';
import { Fullscreen } from '@mui/icons-material';

function Steps(props) {
  let { param1, param2 } = props;
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

export default function Game(isFlipped) {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  // verifica cine urmeaza
  const [firstPlayer, setFirstPlayer] = useState(0);
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const xIsNext = currentMove % 2 === firstPlayer;
  const currentSquares = history[currentMove];

  // function handlePlayerSelect(player) {
  //   setSelectedPlayer(player);
  // }

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
    <Container maxWidth="xl">
      <ThemeProvider theme={theme}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h3" color={xIsNext ? `secondary` : `primary`}>
              TIC TAC TOE
            </Typography>
            {!isComponentVisible && (
              <CoinFlip
                setFirstPlayer={setFirstPlayer}
                xIsNext={xIsNext}
                setIsComponentVisible={setIsComponentVisible}
              />
            )}
          </Grid>
          {isComponentVisible && (
            <Animation animationType="grow">
              <Grid container>
                <Grid item xs={4}>
                  <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} isFlipped={isFlipped} />
                  <Grid container spacing={1} direction="column">
                    {moves}
                  </Grid>
                </Grid>
                <Grid item xs={8}>
                  <Steps param1={history} param2={currentMove} />
                </Grid>
              </Grid>
            </Animation>
          )}
        </Grid>
      </ThemeProvider>
    </Container>
  );
}

{
  /* <div class="abs" style={{ position: 'absolute', width: '100vw', height: '100vh', background: '#acac' }}>
          <AnimatedContainer></AnimatedContainer>
        </div> */
}
