import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useEffect } from 'react';

// const Alert = React.forwardRef(function Alert(props, ref) {
//     return <> <MuiAlert elevation={6} ref={ref} variant="filled" {...props} /></>;
// });

export default function AlertPOP({ prop }) {
    const [open, setOpen] = React.useState(true);

    useEffect(() => {
        setOpen(prop.open);
    }, [prop]);
    console.log('prop', prop);
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            {/* <Button variant="outlined" onClick={handleClick}>
                Open success snackbar
            </Button> */}
            <Snackbar
                anchorOrigin={{
                    vertical: 'button',
                    horizontal: 'right'
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} variant="filled" severity={prop.type} sx={{ width: '100%' }}>
                    {prop.message}!
                </Alert>
            </Snackbar>
            {/* <Alert severity="error">This is an error message!</Alert>
            <Alert severity="warning">This is a warning message!</Alert>
            <Alert severity="info">This is an information message!</Alert>
            <Alert severity="success">This is a success message!</Alert> */}
        </Stack>
    );
}
