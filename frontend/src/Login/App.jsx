//import logo from './logo.svg';
import './App.css';
import { Button, Paper, TextField } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#85dcba'
    }
  }
});
function App() {
  const [logged, setLogged] = useState(false);
  return (
    logged ? <Redirect to="/dashboard" /> :
      <MuiThemeProvider theme={theme}>
        <header id="topo">
          <p id="titulo">casper</p>
          <p id="subtitulo">Gerencie as notícias do chatbot Casper</p>
        </header>
        <div id="geral">
          <Paper id="pin-paper">
            <p>Digite abaixo o PIN e gerencie as notícias</p>
            <TextField id="outlined-basic" type="password" label="PIN" color="secondary" variant="outlined" />
            <br />
            <Button style={{ marginTop: "10px" }} color="secondary" variant="contained"
              onClick={() => setLogged(true)}>Login</Button>
          </Paper>
        </div>
      </MuiThemeProvider>
  );
}

export default App;
