import { useState } from 'react';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import Board from './Board';


export default function TicTacToe() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentBoardCells = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(newBoardCells: Array<string | null>) {
    const nextHistory = [...history.slice(0, currentMove + 1), newBoardCells];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const renderedHistoryMoves = renderHistoryMoves(history, jumpTo);

  return (
    <Grid container>
      <Grid>
        <Board xIsNext={xIsNext} boardCells={currentBoardCells} onPlay={handlePlay} />
      </Grid>
      <Grid>
        <Paper>
          History Moves
          {renderedHistoryMoves}
        </Paper>
      </Grid>
    </Grid>
  );
}

function renderHistoryMoves(history: Array<Array<string | null>>, jumpTo: any) {
  const renderedHistoryMoves = history.map((boardCells, move) => {
    let description;

    if (move > 0) {
      description = "Go to move #" + move;
    }
    else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        <Button variant="text" onClick={() => jumpTo(move)}>{description}</Button>
      </li>
    );
  });

  return <ol>{renderedHistoryMoves}</ol>;
}
