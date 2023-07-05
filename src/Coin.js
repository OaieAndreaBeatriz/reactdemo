import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Button, Grid, Paper } from '@mui/material';

export default function CoinFlip({ onPlayerSelect }) {
  const [randomPlayer, setRandomPlayer] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCoin = () => {
    setIsFlipped((prevState) => !prevState);
    const values = ['X', 'O'];
    const randomIndex = Math.floor(Math.random() * values.length);
    const selectedPlayer = values[randomIndex];
    setRandomPlayer(selectedPlayer);
    onPlayerSelect(selectedPlayer);
  };

  const { transform, opacity } = useSpring({
    from: { transform: 'perspective(600px) rotateY(0deg)' },
    to: { transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)` },
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
      <Grid item>
        <Button variant="outlined" onClick={flipCoin}>
          Get Random Player
        </Button>
      </Grid>
      <Grid item>
        <animated.div
          style={{
            opacity,
            transform,
          }}
        >
          <Paper
            sx={{
              background: 'linear-gradient(45deg, #ffcbcb, #8ed6ff)',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              fontSize: '24px',
            }}
          >
            {randomPlayer}
          </Paper>
        </animated.div>
      </Grid>
    </Grid>
  );
}
