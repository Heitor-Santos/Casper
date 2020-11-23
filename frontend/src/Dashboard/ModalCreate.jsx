import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button, TextField, InputLabel, Select, MenuItem} from "@material-ui/core"
import { useState } from "react"

const ModalCreate = (props) => {
    const [selVal, setSelVal] = useState('Esportes')
    return (
        <Dialog open={props.open}>
            <DialogTitle id="alert-dialog-title">Criar Notícia</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Por favor, preencha os campos abaixo
                </DialogContentText>
                <InputLabel id="isso">Tópico</InputLabel>
                <Select value={selVal} id="topico-noticia" labelId="isso" fullWidth onChange={(e)=>setSelVal(e.target.value)}>
                    <MenuItem value="Esportes">Esportes</MenuItem>
                    <MenuItem value="Entretenimento">Entretenimento</MenuItem>
                    <MenuItem value="Política">Política</MenuItem>
                    <MenuItem value="Famosos">Famosos</MenuItem>
                </Select>
                <TextField id="link-noticia" label="Link" fullWidth />
                <TextField id="url-imagem-noticia" label="URL para imagem" fullWidth />
                <TextField id="descricao-noticia" label="Descrição" fullWidth />
                <TextField id="titulo-noticia" label="Título" fullWidth />
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={() => props.setOpen(false)}> Cancelar </Button>
                <Button color="primary" autoFocus onClick={() => props.handleAdd()}> Criar </Button>
            </DialogActions>
        </Dialog>
    )
}
export default ModalCreate