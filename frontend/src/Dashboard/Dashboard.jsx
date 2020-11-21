import './Dashboard.css';
import { Button, Fab, Paper, IconButton, TextField, TablePagination, TableContainer, TableCell, TableRow, Table, TableHead, TableBody } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme, makeStyles} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add';
import { useState, useEffect } from 'react'
import ModalDelete from './ModalDelete'
import ModalEdit from './ModalEdit'

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#85dcba'
        }
    }
});
const styles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing.unit, 
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingesdjbvrbread', 356, 16.0, 49, 3.9),
    createData('Gingedsgdsrbread', 356, 16.0, 49, 3.9),
    createData('Gingdsgsderbread', 356, 16.0, 49, 3.9),
    createData('Gingesdgrbread', 356, 16.0, 49, 3.9),
    createData('Gingersdfgbread', 356, 16.0, 49, 3.9),
    createData('Gingersdgdsbread', 356, 16.0, 49, 3.9),
    createData('Gingerbsdgsdgdsfread', 356, 16.0, 49, 3.9),
];
const Dashboard = () => {
    const classes = styles()
    const [currPage, setCurrPage] = useState(0)
    const [rowToAlter, setRowToAlter] = useState(0)
    const [showDelete, setShowDelete] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showAdd, setShowAdd] = useState(false)
    function handleDelete(){
        rows.splice(rowToAlter,1);
        setShowDelete(false);
    }
    function handleEdit(){
        //[name, calories, fat, carbs, protein];
        const novoLink = document.getElementById('novo-link').value;
        const novoURL =  document.getElementById('novo-url-imagem').value;
        const novoTopico =  document.getElementById('novo-topico').value;
        const novoDesc =  document.getElementById('novo-descricao').value;
        const novoTitulo =  document.getElementById('novo-titulo').value;
        rows[rowToAlter] = createData(novoLink, novoURL, novoTopico, novoDesc, novoTitulo)
        setShowEdit(false);
    }
    return (
        <MuiThemeProvider theme={theme}>
            <header id="topo2">
                <p id="titulo2">casper</p>
                <p id="subtitulo2">Gerencie as notícias do chatbot Casper</p>
            </header>
            <div id="geral2">
                <ModalDelete open={showDelete} setOpen={setShowDelete} handleDelete={handleDelete} row={rows[rowToAlter]}/>
                <ModalEdit open={showEdit} setOpen={setShowEdit} handleEdit={handleEdit} row={rows[rowToAlter]}/>
                <TableContainer component={Paper} style={{ width: "80vw" }}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Título</TableCell>
                                <TableCell align="right">Descrição</TableCell>
                                <TableCell align="right">Link</TableCell>
                                <TableCell align="right">Link para imagem</TableCell>
                                <TableCell align="right">Tema</TableCell>
                                <TableCell align="right">Editar</TableCell>
                                <TableCell align="right">Excluir</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(currPage * 5, currPage * 5 + 5).map((row, index) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={()=>{setShowEdit(true);setRowToAlter(index)}}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={()=> {setShowDelete(true);setRowToAlter(index)}}>
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
            <Fab className={classes.fab}><AddIcon></AddIcon></Fab>
        </MuiThemeProvider>
    )
}
export default Dashboard