import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Button, Grid, Paper } from '@mui/material';

import Animation from './Animations';

export default function CoinFlip(props) {
  let { setFirstPlayer, xIsNext, setIsComponentVisible } = props;
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCoin = () => {
    const values = [0, 1];
    const randomIndex = Math.floor(Math.random() * values.length);

    if (!isFlipped) setIsFlipped((prevState) => !prevState);
    setFirstPlayer(randomIndex);
  };

  useEffect(() => {
    if (isFlipped) {
      const timer1 = setTimeout(() => {
        setIsComponentVisible(true);
      }, 1000);
      return () => clearTimeout(timer1);
    }
  }, [isFlipped]);

  const { transform, opacity } = useSpring({
    from: { transform: 'perspective(600px) rotateY(0deg)' },
    to: { transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)` },
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
      <Grid item>
        <Animation animationType="slide" direction={isFlipped ? 'right' : 'left'}>
          <Button variant="outlined" onClick={flipCoin}>
            Get Random Player
          </Button>
        </Animation>
      </Grid>
      <Grid item>
        <animated.div
          style={{
            opacity,
            transform,
          }}
        >
          <Animation animationType="slide" direction={isFlipped ? 'right' : 'left'}>
            <Paper
              sx={{
                background: 'linear-gradient(45deg, #7f7fd5, #8ed6ff)',
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
          </Animation>
        </animated.div>
      </Grid>
    </Grid>
  );
}
