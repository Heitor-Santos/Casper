import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button } from "@material-ui/core" 


const ModalDelete = (props)=>{
    return (
        <Dialog open={props.open}>
            <DialogTitle id="alert-dialog-title">Deletar Notícia</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Tem certeza que deseja deletar a notícia com o link  {props.row.name}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={()=>props.setOpen(false)}> Cancelar </Button>
                <Button color="primary" autoFocus onClick={()=>props.handleDelete()}> Deletar </Button>
            </DialogActions>
      </Dialog>
    )
}
export default ModalDelete