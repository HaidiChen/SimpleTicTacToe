import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import BoardCell from './BoardCell';


interface BoardProperties {
  xIsNext: boolean,
  boardCells: Array<string | null>,
  onPlay: any,
}

export default function Board(props: BoardProperties) {
  const gameStatus = getGameStatus(props);
  const renderedBoardCells = renderBoardCells(props);

  return (
    <>
      <Container>
        <Paper sx={{ marginBottom: 2 }}>{gameStatus}</Paper>

        {renderedBoardCells}
      </Container>
    </>
  );
}

function getGameStatus(props: BoardProperties) {
  const winner = calculateWinner(props.boardCells);
  const nextPlayer = props.xIsNext ? "X" : "O";

  return winner ? "Winner: " + winner : "Next Player: " + nextPlayer;
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
      <Grid container spacing={1}>
        {boardCellById.slice(end - 3, end)}
      </Grid>
    );
  });

  return renderedGrid;
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
