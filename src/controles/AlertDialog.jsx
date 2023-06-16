import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';

export default function AlertDialog({ Open, titulo, setValue, SetOpenConfDlg }) {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
        SetOpenConfDlg(false);
    };

    const handleAcept = () => {
        SetOpenConfDlg(false);
        setValue();
    };

    React.useEffect(() => {
        setOpen(true);
    });

    return (
        <>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open alert dialog
            </Button> */}

            <Dialog
                // style={{
                //     backgroundColor: 'transparent',
                //     borderRadius: '5px',
                //     padding: '10px',
                //     border: '1px solid blue',
                //     marginBottom: '10px'
                // }}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"> {titulo} </DialogTitle>

                <DialogActions>
                    <Button size="large" color="error" style={{ margin: '5px' }} variant="outlined" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleAcept} size="large" color="primary" style={{ margin: '5px' }} variant="outlined" autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
