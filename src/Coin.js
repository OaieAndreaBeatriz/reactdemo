import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Button, Grid, Paper } from '@mui/material';

export default function CoinFlip(props) {
  let { setFirstPlayer, xIsNext } = props;
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCoin = () => {
    const values = [0, 1];
    const randomIndex = Math.floor(Math.random() * values.length);

    if (!isFlipped) setIsFlipped((prevState) => !prevState);
    setFirstPlayer(randomIndex);
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
            {isFlipped ? (xIsNext ? 'X' : 'O') : ' '}
          </Paper>
        </animated.div>
      </Grid>
    </Grid>
  );
}
