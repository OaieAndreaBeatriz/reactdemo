import React, { useEffect, useState } from 'react';
import { Box, Slide, Grow, Fade } from '@mui/material';

export default function Animation({ children, animationType }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const getAnimationComponent = () => {
    switch (animationType) {
      case 'slide':
        return (
          <Slide direction="right" in={visible} mountOnEnter unmountOnExit timeout={1000}>
            <Box>{children}</Box>
          </Slide>
        );
      case 'grow':
        return (
          <Grow in={visible} mountOnEnter unmountOnExit timeout={1000}>
            <Box>{children}</Box>
          </Grow>
        );
      case 'fade':
        return (
          <Fade in={visible} mountOnEnter unmountOnExit timeout={1000}>
            <Box>{children}</Box>
          </Fade>
        );
      default:
        return null;
    }
  };

  return getAnimationComponent();
}
