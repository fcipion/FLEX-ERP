import * as React from 'react';
// import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, Grid, Divider, FormControl, InputAdornment, Button, IconButton } from '@mui/material';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
import { height } from '@mui/system';
import Roles from 'componetes/administracion/Roles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Alert } from '@mui/lab';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector, dispatch } from 'store';
import { getClientes, getClienteById } from 'store/slices/clientes';
import Clientes from 'componetes/ReprComerciales/Clientes';

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const data = [];

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function Dropcliente({
    Id,
    SetFieldValue,
    Value,
    SetValue,
    Label,
    Errors,
    Touched,
    OnBlur,
    Onchange,
    SetDatosCliente,
    required
}) {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const { clientes, cliente, error } = useSelector((state) => state.cliente);
    // const { paginas } = useSelector((state) => state.pagina);
    React.useEffect(() => {
        dispatch(getClientes());
    }, [dispatch]);

    if (clientes.rows) {
        clientes.rows.forEach((result, index) => {
            /* eslint no-underscore-dangle: 0 */
            data[index] = { title: result.descripcion, value: result._id };
        });
    }

    const Values = data.find((data) => data.value === Value);

    /* eslint no-underscore-dangle: 0 */

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                setOptions([...data]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (openDialog) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openDialog]);

    if (openDialog) {
        return (
            <div>
                {/* <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
                <Button onClick={handleClickOpen('body')}>scroll=body</Button> */}
                <Dialog
                    open={openDialog}
                    onClose={handleClose}
                    fullScreen
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <Alert style={{ textAlign: 'center' }} severity="info">
                        Este es un formulario tipo modal, una vez finalices el proceso debes cerrarlo, si sale del formulario perdera los
                        cambios que tienes en el formulario padre.
                    </Alert>
                    <DialogContent dividers={scroll === 'paper'}>
                        <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
                            <Clientes />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cerrar</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Autocomplete
                    id={Id}
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    isOptionEqualToValue={(option, value) => option.title === value.title}
                    value={Values ? { title: Values.title, value: Values.value } : { title: '', value: '' }}
                    getOptionLabel={(option) => option.title}
                    options={options}
                    loading={loading}
                    fullWidth
                    size="small"
                    onChange={(event, value) => {
                        if (value.value) {
                            Onchange(value.value);
                            SetFieldValue(Id, value.value);
                            let datosCliente;
                            if (clientes.rows) {
                                datosCliente = clientes.rows.find((result) => result._id === Values.value);
                            }
                            // alert(JSON.stringify(datosCliente));
                            SetDatosCliente(datosCliente);
                        } else {
                            SetFieldValue(Id, '');
                        }
                        // dispatch(getClienteById(value.value));
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            onBlur={OnBlur}
                            label={Label}
                            variant="outlined"
                            error={Errors[Id] && Touched[[Id]]}
                            helperText={Touched[Id] && Errors[Id]}
                            fullWidth
                            size="small"
                            required={required}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                        <IconButton size="small" onClick={handleClickOpen} aria-label="Agregar">
                                            <AddCircleTwoToneIcon size="small" titleAccess="Agregar" fontSize="small" />
                                        </IconButton>
                                    </>
                                )
                            }}
                        />
                    )}
                />
            </Grid>
            {/* <Grid item xs={3}>
                <IconButton onClick={handleClickOpen} aria-label="Agregar" color="primary" style={{ width: '30px' }}>
                    <AddCircleTwoToneIcon titleAccess="Agregar" style={{ width: '30px' }} />
                </IconButton>
                <IconButton aria-label="Ir" style={{ width: '30px' }}>
                    <ArrowCircleRightTwoToneIcon titleAccess="Ir" style={{ width: '30px' }} />
                </IconButton>
            </Grid> */}
        </Grid>
    );
}
