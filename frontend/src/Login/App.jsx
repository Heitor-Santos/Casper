import './App.css';
import { Button, Paper, TextField, Snackbar } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useState } from 'react'
import { Redirect } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import {isValid} from "../requests"

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#85dcba'
    }
  }
});
function App() {
  const [logged, setLogged] = useState(false);
  const [err, setErr] = useState(false);
  const [succ, setSucc] = useState(false);
  async function login() {
    console.log("estamos aqui")
    const pin = document.getElementById('pin-input').value
    console.log(pin)
    if (await isValid(pin)) {
      console.log("oi")
      localStorage.setItem("pin", pin)
      setSucc(true)
      setTimeout(() => setLogged(true), 3000)
    }
    else {
      console.log("ei")
      setErr(true)
      console.log(err)
    }
  }
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
            <TextField id="pin-input" type="password" label="PIN" color="secondary" variant="outlined" />
            <br />
            <Button style={{ marginTop: "10px" }} color="secondary" variant="contained"
              onClick={() => login()}>Login</Button>
            <Snackbar open={succ} autoHideDuration={3000} >
              <Alert onClose={() => setSucc(false)} severity="success">Logado com sucesso </Alert>
            </Snackbar>
            <Snackbar open={err} autoHideDuration={6000} >
              <Alert onClose={() => setErr(false)} severity="error"> PIN incorreto</Alert>
            </Snackbar>
          </Paper>
        </div>
      </MuiThemeProvider>
  );
}

export default App;
