import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button, TextField } from "@material-ui/core"


const ModalEdit = (props) => {
    return (
        <Dialog open={props.open}>
            <DialogTitle id="alert-dialog-title">Editar Notícia</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Tem certeza que deseja editar a notícia com o link  {props.row.name}?
                </DialogContentText>
                <TextField id="novo-link" label="Novo link" />
                <TextField id="novo-url-imagem" label="Nova URL para imagem" />
                <TextField id="novo-topico" label="Novo tópico" />
                <TextField id="novo-descricao" label="Nova descrição" />
                <TextField id="novo-titulo" label="Novo título" />
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={() => props.setOpen(false)}> Cancelar </Button>
                <Button color="primary" autoFocus onClick={() => props.handleEdit()}> Editar </Button>
            </DialogActions>
        </Dialog>
    )
}
export default ModalEdit