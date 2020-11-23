import './App.css';
import { Button, Paper, TextField, Snackbar } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useState } from 'react'
import { Redirect } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';

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
  function login() {
    const pin = document.getElementById('pin-input').value
    if (pin === process.env.pin) {
      localStorage.setItem("pin", pin)
      setSucc(true)
      setTimeout(()=>setLogged(true), 3000)      
    }
    else setErr(true)
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
            <TextField id="pin-input" value={localStorage.getItem("pin")} type="password" label="PIN" color="secondary" variant="outlined" />
            <br />
            <Button style={{ marginTop: "10px" }} color="secondary" variant="contained"
              onClick={() => login()}>Login</Button>
            <Snackbar open={succ} autoHideDuration={3000} onClose={()=>setSucc(false)}>
              <Alert onClose={()=>setSucc(false)} severity="success">Logado com sucesso </Alert>
            </Snackbar>
            <Snackbar open={err} autoHideDuration={3000} onClose={()=>setErr(false)}>
              <Alert onClose={()=>setErr(false)} severity="error"> PIN incorreto</Alert>
            </Snackbar>
          </Paper>
        </div>
      </MuiThemeProvider>
  );
}

export default App;
