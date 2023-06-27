import { Grid ,Typography, Button} from '@mui/material'

export function Square({ value, onSquareClick }) {
  return (
    <Grid item>
      <Button variant="outlined" size="large" style={{backgroundColor:'#afc5ff', color: 'white', borderColor:"#8aacff"}} onClick={onSquareClick}>
        {value}
      </Button>
    </Grid>
  );
}


export function Step(props) {
  let { param1 } = props;
  return (
    <Grid container  
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start">
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4" style={{ color: '#ff9a3c' }}>History:</Typography>
          </Grid>
          <Grid item>
            <Grid container 
                  direction="column"
                  alignItems="flex-start"
                  justifyContent="flex-start">
              { param1 && [...Array(param1.length)].map((e, i) => (
                <Grid item xs={12}>
                  <Typography variant="h5" style={{ color: '#ffc93c' }}>Pas: {i}</Typography>
                  <Typography variant="body1">
                    State: { param1 && param1[i].map((value1) => (
                      <span key={value1} style={{ marginRight: '10px' }}>
                        {value1 ? value1 : '🍥'}
                      </span>
                    ))}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}




export default function CurrentMove(props){
  let { param2 } = props;
  console.log(param2)
  return (
    <Grid container>
      <Grid item xs={12}>
          <Typography variant="h5" style={{ color: '#ff9a3c' }}>
            <h2>Current Move: { param2 }</h2>
          </Typography>
      </Grid>
    </Grid>
  )
}