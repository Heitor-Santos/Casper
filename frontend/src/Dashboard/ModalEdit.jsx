import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button, TextField, InputLabel, Select, MenuItem } from "@material-ui/core"
import { useState } from "react"


const ModalEdit = (props) => {
    const [selVal, setSelVal] = useState('')
    return (
        <Dialog open={props.open}>
            <DialogTitle id="alert-dialog-title">Editar Notícia</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Tem certeza que deseja editar essa notícia?
                </DialogContentText>
                <InputLabel>Novo tópico</InputLabel>
                <Select id="novo-topico" fullWidth value={selVal} onChange={(e)=>setSelVal(e.target.value)}>
                    <MenuItem value={"Esportes"}>Esportes</MenuItem>
                    <MenuItem value={"Entretenimento"}>Entretenimento</MenuItem>
                    <MenuItem value={"Política"}>Política</MenuItem>
                    <MenuItem value={"Famosos"}>Famosos</MenuItem>
                </Select>
                <TextField id="novo-link" label="Novo link" fullWidth/>
                <TextField id="novo-url-imagem" label="Nova URL para imagem" fullWidth/>
                <TextField id="novo-descricao" label="Nova descrição" fullWidth/>
                <TextField id="novo-titulo" label="Novo título" fullWidth/>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={() => props.setOpen(false)}> Cancelar </Button>
                <Button color="primary" autoFocus onClick={() => props.handleEdit()}> Editar </Button>
            </DialogActions>
        </Dialog>
    )
}
export default ModalEdit