import { Grid, Typography, Button } from '@mui/material';

export function Square({ value, onSquareClick }) {
  return (
    <Grid item>
      <Button variant="contained" size="large" color="info" onClick={onSquareClick}>
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
        <Typography variant="h5" color="primary">
          History:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          {param1 &&
            [...Array(param1.length)].map((e, i) => (
              <Grid item key={i}>
                <Typography variant="h6" color="error">
                  Pas: {i}
                </Typography>
                <Typography variant="h6" color="error">
                  State: {param1 && param1[i].map((value1, i2) => <span key={i2}>{value1 ? value1 : '🍥'}</span>)}
                </Typography>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default function CurrentMove(props) {
  let { param2 } = props;
  return (
    <Grid container>
      <Grid item>
        <Typography variant="h5" color="primary">
          Current Move: {param2}
        </Typography>
      </Grid>
    </Grid>
  );
}

// Verifica pe care linii trebuie blocat jucatorul sa nu castige
// function checkDangerLines(squares) {
//   let dangerLines = [];
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];

//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (
//       (squares[a] === 'X' && squares[b] === 'X' && squares[c] == null) ||
//       (squares[a] === 'X' && squares[c] === 'X' && squares[b] == null) ||
//       (squares[b] === 'X' && squares[c] === 'X' && squares[a] == null)
//     ) {
//       dangerLines.push([a, b, c].filter((i) => squares[i] === null)[0]);
//     }
//   }

//   if (dangerLines.length === 0) return checkBestLines(squares);

//   return dangerLines;
// }

// function checkBestLines(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];

//   // Verifica daca are de blocat liniile lui (X)
//   const dangerLines = checkDangerLines(squares);
//   if (dangerLines.length > 0) {
//     return [];
//   }

//   // Verifica pe care linie is doua (O)-uri si un patrat liber
//   const bestLines = [];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (
//       (squares[a] === 'O' && squares[b] === 'O' && squares[c] === null) ||
//       (squares[a] === 'O' && squares[c] === 'O' && squares[b] === null) ||
//       (squares[b] === 'O' && squares[c] === 'O' && squares[a] === null)
//     ) {
//       bestLines.push([a, b, c].find((index) => squares[index] === null));
//     }
//   }

//   return bestLines;
// }

// const lines = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ];

// const dangerLines = lines.filter(([a, b, c]) => {
//   return (
//     (squares[a] === 'X' && squares[b] === 'X' && squares[c] === null) ||
//     (squares[a] === 'X' && squares[c] === 'X' && squares[b] === null) ||
//     (squares[b] === 'X' && squares[c] === 'X' && squares[a] === null)
//   );
// });

// if (dangerLines.length === 0) {
//   return checkBestLines(squares);
// }

// return dangerLines.map(([a, b, c]) => [a, b, c].find((i) => squares[i] === null));

// function checkDangerLines(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];

//   const dangerLines = lines.filter(([a, b, c]) => {
//     return (
//       (squares[a] === 'X' && squares[b] === 'X' && squares[c] === null) ||
//       (squares[a] === 'X' && squares[c] === 'X' && squares[b] === null) ||
//       (squares[b] === 'X' && squares[c] === 'X' && squares[a] === null)
//     );
//   });

//   if (dangerLines.length === 0) {
//     return [];
//   }

//   return dangerLines.map(([a, b, c]) => [a, b, c].find((i) => squares[i] === null));
// }

// function checkBestLines(squares) {
//   return;
// }
