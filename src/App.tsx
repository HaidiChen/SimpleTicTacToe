import Grid from '@mui/material/Unstable_Grid2';

import './App.css';
import logo from './logo.svg';
import TicTacToe from './tic-tac-toe/TicTacToe';


export default function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Grid container>
        <Grid>
          <img src={logo} className="App-logo" alt="logo" />
        </Grid>

        <Grid container>
          <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
            <a className="App-link"
               href="https://beta.reactjs.org/learn/tutorial-tic-tac-toe"
               target="_blank"
               rel="noopener noreferrer"
            >
              Learn React : Tic-Tac-Toe Tutorial
            </a>
          </Grid>

          <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
            <a className="App-link"
               href="https://mui.com/material-ui/getting-started/overview/"
               target="_blank"
               rel="noopener noreferrer"
            >
              UI Style: Material UI
            </a>
          </Grid>
        </Grid>
      </Grid>
      </header>

      <header className="game">
        <p><TicTacToe /></p>
      </header>
    </div>
  );
}
