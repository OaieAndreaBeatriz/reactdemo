import React from 'react';
import { Alert, AlertTitle, Snackbar } from '@mui/material';

export default function AlertMessages(props) {
  let { isOpen, onHandleClose, severity, messageTitle, message } = props;

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={() => onHandleClose(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={() => onHandleClose(false)} severity={severity} sx={{ width: '100%' }}>
        <AlertTitle>{messageTitle}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
}
