import React, {useEffect, useState} from "react";
import {Grid ,Typography} from '@mui/material'
import AlertMessages from './Handles'

import {Square} from './AllSteps';


export default function Board(props) {
    let { xIsNext, squares, onPlay, calculateWinner } = props;
  
    const [alert, setAlert] = useState({
      isOpen:false, 
      severity: 'info', 
      messageTitle: 'empty', 
      message: 'empty'
    })
  
    useEffect(() => {
      // verificam daca exista castigator
      if (calculateWinner(squares)) {
      //  daca da, afisam mesajul alertWinner
        setAlert({
          isOpen:true, 
          severity: 'success', 
          messageTitle: `Winner ${winner}`, 
          message: 'Congrats!'
        })
      }
    }, [squares])
  
    function handleClick(i) {
      const nextSquares = squares.slice(); 
  
      // daca se da click pe un square ocupat, apare eroarea
      if (nextSquares[i] === 'X' || nextSquares[i] === 'O') {
        setAlert({
          isOpen:true, 
          severity: 'error', 
          messageTitle: 'Error', 
          message: 'Wrong square!'
        })
        return;
      }
  
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      if (xIsNext) {
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }
      onPlay(nextSquares);
    };
    
  
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
  
    return (
      <Grid container >
        <AlertMessages 
          isOpen={alert.isOpen} 
          onHandleClose={() => setAlert({isOpen:false})}
          severity={alert.severity} 
          messageTitle={alert.messageTitle} 
          message={alert.message}/>
  
        <Grid item xs={12}>
          <Grid container direction="row"
                alignItems="flex-start"
                justifyContent="flex-start">
            <Grid item xs={6}>
              <Typography variant='h5' color='primary'>{status}</Typography>
            </Grid>
            <Grid container >
              <Grid item xs={12}>
                <Grid container>
                  <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                  <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                  <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                  <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                  <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                  <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                  <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }