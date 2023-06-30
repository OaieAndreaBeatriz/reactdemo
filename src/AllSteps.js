import { Grid ,Typography, Button } from '@mui/material'

export function Square({ value, onSquareClick }) {
  return (
    <Grid item>
      <Button variant="contained" size="large" color='info' onClick={onSquareClick}>
        <span>{value ? value : `_`}</span>
      </Button>
    </Grid>
  );
}


export function Step(props) {
  let { param1 } = props;
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5" color='primary'>History:</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          { param1 && [...Array(param1.length)].map((e, i) => (
            <Grid item key={i}>
              <Typography variant="h6" color='error'>Pas: {i}</Typography>
              <Typography variant="h6">
                State: { param1 && param1[i].map((value1, i2) => (
                  <span key={i2}>
                    {value1 ? value1 : '🍥'}
                  </span>
                ))}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default function CurrentMove(props){
  let { param2 } = props
  return (
    <Grid container>
      <Grid item>
        <Typography variant="h5" color='primary'>
          Current Move: { param2 }
        </Typography>
      </Grid>
    </Grid>
  )
}