import './Dashboard.css';
import { Fab, Paper, IconButton, TablePagination, TableContainer,
     TableCell, TableRow, Table, TableHead, TableBody, Backdrop, CircularProgress } from '@material-ui/core'
import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add';
import { useState, useEffect } from 'react'
import ModalDelete from './ModalDelete'
import ModalEdit from './ModalEdit'
import ModalCreate from './ModalCreate'
import { getNoticias, criarNoticia, editNoticia, deleteNoticia } from '../requests'
import { theme } from '../Login/App'
import { Redirect } from 'react-router-dom';

const styles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing.unit,
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));
function createData(titulo, descricao, link, imageURL, tema) {
    return { titulo, descricao, link, imageURL, tema };
}

const Dashboard = () => {
    const classes = styles()
    const [rows, setRows] = useState([])
    const [currPage, setCurrPage] = useState(0)
    const [rowToAlter, setRowToAlter] = useState(0)
    const [showDelete, setShowDelete] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showAdd, setShowAdd] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        async function loadNoticias() {
            const newRows = await getNoticias()
            setRows(newRows)
        }
        loadNoticias()
    }, [])
    async function handleDelete() {
        setShowDelete(false);
        setLoading(true)
        const alter = await deleteNoticia(rows[rowToAlter].link)
        setLoading(false)
        if (alter["success"]) {
            rows.splice(rowToAlter, 1);
        }
        else alert("Erro: " + alter["error"])
    }
    async function handleEdit() {
        const novoLink = document.getElementById('novo-link').value;
        const novoURL = document.getElementById('novo-url-imagem').value;
        const novoTopico = document.getElementById('novo-topico').innerText;
        const novoDesc = document.getElementById('novo-descricao').value;
        const novoTitulo = document.getElementById('novo-titulo').value;
        setShowEdit(false);
        setLoading(true)
        const alter = await editNoticia(novoURL, novoDesc, novoTopico, rows[rowToAlter].link,
            novoLink, novoTitulo)
        setLoading(false)
        if (alter["success"]) {
            rows[rowToAlter] = createData(novoTitulo, novoDesc, novoLink, novoURL, novoTopico)
        }
        else alert("Erro: " + alter["error"])
    }
    async function handleAdd() {
        const link = document.getElementById('link-noticia').value;
        const URL = document.getElementById('url-imagem-noticia').value;
        const topico = document.getElementById('topico-noticia').innerText;
        const desc = document.getElementById('descricao-noticia').value;
        const titulo = document.getElementById('titulo-noticia').value;
        setShowAdd(false);
        setLoading(true)
        const alter = await criarNoticia(URL, desc, topico, link, titulo)
        setLoading(false)
        if (alter["success"]) {
            rows.unshift(createData(titulo, desc, link, URL, topico))
        }
        else alert("Erro :" + alter["error"])
    }
    return (
        localStorage.getItem("pin")!=process.env.pin ? <Redirect to="/" /> :
        <MuiThemeProvider theme={theme}>
            <header id="topo2">
                <p id="titulo2">casper</p>
                <p id="subtitulo2">Gerencie as notícias do chatbot Casper</p>
            </header>
            <div id="geral2">
                <ModalDelete open={showDelete} setOpen={setShowDelete} handleDelete={handleDelete} row={rows[rowToAlter]} />
                <ModalEdit open={showEdit} setOpen={setShowEdit} handleEdit={handleEdit} row={rows[rowToAlter]} />
                <ModalCreate open={showAdd} setOpen={setShowAdd} handleAdd={handleAdd} />
                <Backdrop open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <TableContainer component={Paper} style={{ width: "80vw" }}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Título</TableCell>
                                <TableCell align="right">Descrição</TableCell>
                                <TableCell align="right">Link</TableCell>
                                <TableCell align="right">URL para imagem</TableCell>
                                <TableCell align="right">Tema</TableCell>
                                <TableCell align="right">Editar</TableCell>
                                <TableCell align="right">Excluir</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(currPage * 5, currPage * 5 + 5).map((row, index) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">{row.titulo}</TableCell>
                                    <TableCell align="right">{row.descricao}</TableCell>
                                    <TableCell align="right">{row.link}</TableCell>
                                    <TableCell align="right">{row.imageURL}</TableCell>
                                    <TableCell align="right">{row.tema}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => { setShowEdit(true); setRowToAlter(index) }}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => { setShowDelete(true); setRowToAlter(index) }}>
                                            <DeleteIcon />
                                        </IconButton></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={5}
                        page={currPage}
                        onChangePage={(e, p) => setCurrPage(p)}
                    />
                </TableContainer>
            </div>
            <Fab className={classes.fab} onClick={() => { setShowAdd(true) }}><AddIcon></AddIcon></Fab>
        </MuiThemeProvider>
    )
}
export default Dashboard