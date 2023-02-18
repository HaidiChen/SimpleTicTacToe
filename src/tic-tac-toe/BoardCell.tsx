import Button from '@mui/material/Button';


interface BoardCellProperties {
  value: string | null,
  onSquareClick: any,
}

export default function BoardCell(props: BoardCellProperties) {
  return (
    <Button sx={{ width: 50, height: 50 }}
            size="large"
            variant="outlined"
            onClick={props.onSquareClick}
    >
      {props.value}
    </Button>
  );
}
