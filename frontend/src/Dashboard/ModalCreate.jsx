import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button } from "@material-ui/core" 

const ModalCreate = (props)=>{
    return (
        <Dialog open={props.open}>
            <DialogTitle id="alert-dialog-title">"Use Google's location service?"</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending anonymous location data to
                    Google, even when no apps are running.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary"> Disagree </Button>
                <Button color="primary" autoFocus> Agree </Button>
            </DialogActions>
      </Dialog>
    )
}