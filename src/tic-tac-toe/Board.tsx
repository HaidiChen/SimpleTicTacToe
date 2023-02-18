import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import BoardCell from './BoardCell';


interface BoardProperties {
  xIsNext: boolean,
  boardCells: Array<string | null>,
  onPlay: any,
}

export default function Board(props: BoardProperties) {
  const renderedgameStatus = renderGameStatus(props);
  const renderedBoardCells = renderBoardCells(props);

  return (
    <>
      <Container>
        <Paper sx={{ background: "#282c34", color: "#61dafb"}}>
          {renderedgameStatus}
          {renderedBoardCells}
        </Paper>
      </Container>
    </>
  );
}

function renderGameStatus(props: BoardProperties) {
  const winner = calculateWinner(props.boardCells);
  const nextPlayer = props.xIsNext ? "X" : "O";
  const tied = props.boardCells.filter((boardCellValue) => {
    return boardCellValue === "X" || boardCellValue === "O";
  }).length === 9;

  let description;
  if (winner) {
    description = "Winner: " + winner;
  }
  else if (tied) {
    description = "Tied. Please restart the game.";
  }
  else {
    description = "Next Player: " + nextPlayer;
  }

  return <Paper sx={{ marginBottom: 2 }}>{description}</Paper>;
}

function calculateWinner(boardCells: Array<string | null>) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (boardCells[a] && boardCells[a] === boardCells[b] && boardCells[a] === boardCells[c]) {
      return boardCells[a];
    }
  }

  return null;
}

function renderBoardCells(props: BoardProperties) {
  const boardCellById = props.boardCells.map((value, index) => {
    return (
      <Grid>
        <BoardCell value={value} onSquareClick={() => handleClick(index, props)} />
      </Grid>
    );
  });

  const renderedGrid = Array(3).fill(null).map((nonsense, index) => {
    const end = (index + 1) * 3;

    return (
      <Grid container rowSpacing={1} columnSpacing={0.5}>
        {boardCellById.slice(end - 3, end)}
      </Grid>
    );
  });

  return <Container>{renderedGrid}</Container>;
}

function handleClick(i: number, props: BoardProperties) {
  const boardCells = props.boardCells;

  if (boardCells[i] || calculateWinner(boardCells)) {
    return;
  }

  const newBoardCells = boardCells.slice();
  if (props.xIsNext) {
    newBoardCells[i] = "X";
  }
  else {
    newBoardCells[i] = "O";
  }
  props.onPlay(newBoardCells);
}
