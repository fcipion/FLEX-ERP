import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, Grid, Divider, FormControl, InputAdornment, Card, Alert, FormControlLabel } from '@mui/material';
import * as Yup from 'yup';
import CrudControl from 'controles/CrudControl';
import MainCard from 'ui-component/cards/MainCard';
import { EmailTwoTone, Mode, ModeFanOff } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import { PatternFormat } from 'react-number-format';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import PhoneIphoneTwoToneIcon from '@mui/icons-material/PhoneIphoneTwoTone';
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Switch from '@mui/material/Switch';
import dayjs from 'dayjs';
import DropEstatus from 'controles/DropEstatus';
import DropSimbolo from 'controles/DropSimbolo';
import Formulario from 'controles/Formulario';
import { useRoutes, useNavigate, useParams } from 'react-router-dom';
import QuickFilteringGrid from 'controles/QuickFilteringGrid';
import { useDispatch, useSelector, dispatch } from 'store';
import { getDeterminacionPrecioById, getDeterminacionPrecios } from 'store/slices/determinacionPrecio';
import { getProductos, getProductoById } from 'store/slices/producto';
import dataGrid from 'data/dataGrid';
import AlertPOP from 'controles/AlertPOP';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';
import axios from 'utils/axios';
import AlertDialog from 'controles/AlertDialog';
import { idID } from '@mui/material/locale';
import DataSimbolo from 'data/DataSimbolo';
import { MensajeVisualizar } from 'data/InfoData';
import { getNextValue } from 'fun/helper';
import LineProgress from 'controles/LineProgress';
import DropMonedas from 'controles/DropMonedas';
import DropRols from 'controles/DropRols';
import DropSucursal from 'controles/DropSucursal';
import DropListaPrecios from 'controles/DropListaPrecios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import GridDetalleDtPrecios from 'controles/GridDetalleDtPrecios';

const formSchema = Yup.object().shape({
    sucursal: Yup.string().required('Requerido'),
    compania: Yup.string().required('Requerido'),
    descripcion: Yup.string().required('Requerido'),
    lista_precio: Yup.string().required('Requerido')
});

function generateId() {
    return Date.now().toString() + Math.random().toString().slice(2);
}

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9)
];

const DeterminacionPrecio = () => {
    const [value, setValue] = React.useState('2014-08-18T21:11:54');
    const [valueEstatus, setValueEstatus] = React.useState({ label: 'Activo', value: true });
    const [valueSucursal, setValueSucursal] = React.useState({});
    const [valueSimbolo, setValueSimbolo] = React.useState({ title: '', value: '' });
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [displayError, setDisplayError] = React.useState('none');
    const [messageInfo, setMessageInfo] = React.useState({ type: '', title: '' });
    const [optiones, setOptions] = React.useState([]);
    const { modo, id, accion } = useParams();
    const navegate = useNavigate();
    const { determinacionPrecios, determinacionPrecio, error } = useSelector((state) => state.determinacionPrecio);
    const { productos, producto, error: errorProducots } = useSelector((state) => state.producto);
    const valorInicial = {
        compania: userData.compania,
        /* eslint no-underscore-dangle: 0 */
        sucursal: null,
        lista_precio: null,
        descripcion: '',
        producto: null,
        estatus: true,
        detalles: []
    };
    const [determinacionValue, setDeterminacion] = useState(valorInicial);
    // const { paginas } = useSelector((state) => state.pagina);
    React.useEffect(() => {
        dispatch(getDeterminacionPrecios());
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(getDeterminacionPrecioById(id));
    }, [id, accion, modo]);

    React.useEffect(() => {
        dispatch(getProductoById(id));
    }, [dispatch]);

    React.useEffect(() => {
        setDeterminacion((previewValue) => {
            previewValue = valorInicial;
            return previewValue;
        });
        if (modo === 'edit') {
            if (determinacionPrecio.data) {
                setDeterminacion((previeValue) => {
                    previeValue.compania = determinacionPrecio.data ? determinacionPrecio.data.compania : null;
                    /* eslint no-underscore-dangle: 0 */
                    previeValue.sucursal = determinacionPrecio.data ? determinacionPrecio.data.sucursal._id : null;
                    previeValue.lista_precio = determinacionPrecio.data ? determinacionPrecio.data.lista_precio._id : null;
                    previeValue.descripcion = determinacionPrecio.data ? determinacionPrecio.data.descripcion : null;
                    previeValue.estatus = determinacionPrecio.data ? determinacionPrecio.data.estatus : null;

                    determinacionPrecio.data.detalles.forEach((data, index, array) => {
                        // /* eslint no-underscore-dangle: 0 */
                        // previeValue.detalles[index].producto = data.producto._id;
                        // /* eslint no-underscore-dangle: 0 */
                        // previeValue.detalles[index].moneda = data.moneda._id;
                        // /* eslint no-underscore-dangle: 0 */
                        // previeValue.detalles[index].unidad_medida = data.unidad_medida._id;
                        // /* eslint no-underscore-dangle: 0 */
                        // previeValue.detalles[index].precio = data.precio._id;

                        const datos = {
                            line_id: index,
                            producto: data.producto._id,
                            moneda: data.moneda ? data.moneda._id : null,
                            unidad_medida: data.unidad_medida._id,
                            precio: data.precio
                        };

                        previeValue.detalles.push(datos);
                        // setFieldValue('detalles', previeValue);
                    });

                    return previeValue;
                });
            }
        }
    }, [determinacionPrecio, modo]);

    React.useEffect(() => {
        dispatch(getProductos());
    }, [id, accion, modo]);

    const [alertValue, setAlert] = useState({ type: '', message: '', open: false });
    const [modoAccion, setModoAccion] = useState();
    const [openConfDlg, setOpenConfDlg] = useState(false);

    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    let formTitulo = '';
    switch (modo) {
        case 'create':
            formTitulo = 'Registro de determinación de precios';
            break;
        case 'edit':
            formTitulo = 'Editar determinación de precios';
            break;

        case 'view':
            formTitulo = 'Visualizar determinación de precios';
            break;
        default:
            formTitulo = 'Registro de determinación de precios';
            break;
    }

    useEffect(() => {
        if (modo === 'Index') {
            setAlert({ type: '', message: '', open: false });
            setMessageInfo({ type: '', title: '' });
        }
    }, [accion]);
    React.useEffect(() => {
        if (modo === 'create') {
            setOptions(['Crear', 'Crear nuevo', 'Crear editar']);
        } else {
            setOptions(['Editar', 'Editar nuevo', 'Copiar']);
        }
    }, [modo]);
    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handlerAdd = () => {
        navegate(`/determinacionPrecio/create/0/${generateId()}`);
    };

    const handlerListar = () => {
        navegate(`/determinacionPrecio/Index/${id}/${generateId()}`);
    };

    const clickEdit = (value) => {
        /* eslint no-underscore-dangle: 0 */

        navegate(`/determinacionPrecio/edit/${value}/${generateId()}`);
    };

    const clickView = (value) => {
        /* eslint no-underscore-dangle: 0 */

        navegate(`/determinacionPrecio/view/${value}/${generateId()}`);
    };

    const handlerValueDeterminacion = (value, id, metodo, setFieldValue, row) => {
        // alert('values', value);
        if (metodo === 'CABECERA') {
            // alert(value);

            setDeterminacion((previewValue) => {
                previewValue[id] = value;

                return previewValue;
            });

            setFieldValue([id], value);
        }

        if (metodo === 'DETALLE') {
            // getIndex

            // const indexRow = determinacionValue.detalles.findIndex((dataRow) => dataRow.line_id === row.line_id);

            setDeterminacion((previewValue) => {
                const indexRow = determinacionValue.detalles.findIndex((dataRow) => dataRow.line_id === row.line_id);
                previewValue.detalles[indexRow][id] = value;

                // alert(JSON.stringify(previewValue));
                return previewValue;
            });
            setFieldValue('detalles', determinacionValue.detalles);
        }
    };

    return modo === 'Index' ? (
        <>
            {console.log('determinacionPrecios', determinacionPrecios)}
            {determinacionPrecios.length !== 0 ? (
                <MainCard title="Listado de determinación de precios">
                    <QuickFilteringGrid data={determinacionPrecios} clickAdd={handlerAdd} clickEdit={clickEdit} clickView={clickView} />
                </MainCard>
            ) : (
                <LineProgress />
            )}
        </>
    ) : (
        <>
            <Grid
                container
                spacing="2"
                style={{
                    opacity: '100',
                    borderRadius: '5px',
                    padding: '2px',
                    backgroundColor: '#AED6F1'
                }}
            >
                <Formik
                    enableReinitialize
                    initialValues={{
                        compania: userData.compania,
                        /* eslint no-underscore-dangle: 0 */
                        sucursal: determinacionPrecio.data ? determinacionPrecio.data.sucursal._id : '',
                        lista_precio: determinacionPrecio.data ? determinacionPrecio.data.lista_precio._id : '',
                        descripcion: determinacionPrecio.data ? determinacionPrecio.data.descripcion : '',
                        estatus: determinacionPrecio.data ? determinacionPrecio.data.estatus : true,
                        detalles: determinacionPrecio.data ? determinacionPrecio.data.detalles : []
                    }}
                    validationSchema={formSchema}
                    onSubmit={(value, { setSubmitting, resetForm }) => {
                        setTimeout(async () => {
                            // const modoAccion = modo;
                            let result = '';

                            if (modo === 'view') {
                                setAlert({ type: 'warning', open: true, message: MensajeVisualizar });
                                setSubmitting(false);
                                return;
                            }

                            try {
                                switch (modoAccion) {
                                    case 'Crear':
                                        result = await axios.post(`${url}/registro_determinacion_precio`, value);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creada la determinación de precios: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Crear nuevo':
                                        result = await axios.post(`${url}/registro_determinacion_precio`, value);
                                        resetForm();

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creada la determinación de precios: ${result.data.data.descripcion}`
                                            });
                                        }
                                        dispatch(getDeterminacionPrecios());
                                        break;
                                    case 'Crear editar':
                                        result = await axios.post(`${url}/registro_determinacion_precio`, value);
                                        /* eslint no-underscore-dangle: 0 */
                                        navegate(`/determinacionPrecio/edit/${result.data.data._id}/${generateId()}`);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creada la determinación de precios: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Editar':
                                        result = await axios.put(`${url}/actualizar_determinacionPrecio/${id}`, value);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Actualizada la determinación de precios: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;

                                    case 'Editar nuevo':
                                        result = await axios.put(`${url}/actualizar_determinacion_precio/${id}`, value);
                                        resetForm();
                                        navegate(`/determinacionPrecio/create/0/${generateId()}`);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Actualizada la determinación de precios: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Copiar':
                                        result = await axios.post(`${url}/actualizar_determinacion_precio`, value);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Copiada la determinación de precios: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'delete':
                                        result = await axios.delete(`${url}/eliminar_determinacion_precio/${id}`, value);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'warning',
                                                title: `determinación de precios eliminada: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            } catch (error) {
                                setSubmitting(false);
                                setMessageInfo({ type: 'error', title: `Error creando determinacionPrecio: ${JSON.stringify(error)}` });
                            }

                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ values, errors, touched, isSubmitting, setFieldValue, handleChange, handleSubmit, handleBlur }) => {
                        values.compania = userData.compania;
                        // setFieldValue('descripcion', 'Fleirin');

                        const handlerDelete = () => {
                            setModoAccion('delete');
                            setOpenConfDlg(true);
                        };

                        const handlerCreate = (value) => {
                            setModoAccion(value);
                            handleSubmit();
                        };
                        const handlerPrint = () => {
                            handleSubmit();
                        };

                        const handlerNavegateData = (value) => {
                            if (modo === 'edit' || modo === 'view') {
                                const idNexBack = getNextValue(
                                    // Arreglo de determinacionPrecios
                                    determinacionPrecios.rows,
                                    // Objeto determinacionPrecios
                                    determinacionPrecio.data,
                                    value
                                );
                                if (idNexBack === 0) setAlert({ type: 'warning', open: true, message: 'Registro no econtrado' });
                                if (idNexBack !== 0) {
                                    navegate(`/determinacionPrecio/edit/${idNexBack}/${generateId()}`);
                                }
                            }
                            //  else {
                            //     setDisplayError('block');
                            //     setTypeMessage('success');
                            //     setTitleMessage('Creada');
                            // }
                        };

                        return (
                            <>
                                {openConfDlg ? (
                                    <AlertDialog
                                        SetOpenConfDlg={setOpenConfDlg}
                                        Open={openConfDlg}
                                        setValue={() => {
                                            handleSubmit();
                                        }}
                                        titulo="¿Esta usted seguro que desea eliminar este registro?"
                                    />
                                ) : (
                                    ''
                                )}
                                <Grid container spacing="2">
                                    <AlertPOP prop={alertValue} />
                                    <Grid item xs={12} lg={12}>
                                        <MainCard title={formTitulo}>
                                            <Divider />
                                            <CrudControl
                                                HandlerDelete={handlerDelete}
                                                HandlerCreate={handlerCreate}
                                                HandlerPrint={handlerPrint}
                                                MessageInfo={messageInfo}
                                                HandlerListar={handlerListar}
                                                Options={optiones}
                                                HandlerNavegate={(value) => {
                                                    handlerNavegateData(value);
                                                }}
                                                IsSubmitting={isSubmitting}
                                                Modo={modo}
                                            />
                                            <Divider />
                                            <Grid
                                                container
                                                spacing={2}
                                                style={{
                                                    marginTop: '5px',
                                                    pointerEvents: modo === 'view' ? 'none' : 'fill',
                                                    opacity: modo === 'view' ? '0.60' : '100'
                                                }}
                                            >
                                                <Grid item xs={6}>
                                                    <DropSucursal
                                                        HandleBlur={handleBlur}
                                                        Errors={errors}
                                                        Touched={touched}
                                                        required
                                                        Id="sucursal"
                                                        SetFieldValue={setFieldValue}
                                                        Label="Sucursal"
                                                        Value={determinacionValue.sucursal}
                                                        Onchange={(value) => {
                                                            handlerValueDeterminacion(value, 'sucursal', 'CABECERA', setFieldValue);
                                                        }}
                                                    />
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <DropListaPrecios
                                                        HandleBlur={handleBlur}
                                                        Errors={errors}
                                                        Touched={touched}
                                                        variant="outlined"
                                                        Id="lista_precio"
                                                        SetFieldValue={setFieldValue}
                                                        Label="Lista de precio"
                                                        Value={determinacionValue.lista_precio}
                                                        Onchange={(value) => {
                                                            handlerValueDeterminacion(value, 'lista_precio', 'CABECERA', setFieldValue);
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        id="descripcion"
                                                        label="Descripción"
                                                        size="small"
                                                        error={errors.descripcion && touched.descripcion}
                                                        helperText={touched.descripcion && errors.descripcion}
                                                        renderInput={(params) => <TextField {...params} />}
                                                        fullWidth
                                                        value={determinacionValue.descripcion}
                                                        onChange={(value) => {
                                                            handlerValueDeterminacion(
                                                                value.target.value,
                                                                'descripcion',
                                                                'CABECERA',
                                                                setFieldValue
                                                            );
                                                        }}
                                                    />

                                                    <Grid item xs={12}>
                                                        <Divider />
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <GridDetalleDtPrecios
                                                        handleBlur={handleBlur}
                                                        errors={errors}
                                                        touched={touched}
                                                        setFieldValue={setFieldValue}
                                                        handleChangeValue={setFieldValue}
                                                        determinacionValue={determinacionValue}
                                                        setDeterminacion={setDeterminacion}
                                                        handlerValueDeterminacion={handlerValueDeterminacion}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                name="estatus"
                                                                checked={values.estatus}
                                                                onChange={(data) => {
                                                                    setFieldValue('estatus', data.target.checked);
                                                                }}
                                                            />
                                                        }
                                                        label="Inactivo?"
                                                    />
                                                </Grid>
                                            </Grid>
                                            {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <button type="submit" disabled={isSubmitting}>
                                            Submit
                                        </button>
                                    </div> */}
                                        </MainCard>
                                    </Grid>
                                </Grid>
                            </>
                        );
                    }}
                </Formik>
            </Grid>
        </>
    );
};

export default DeterminacionPrecio;
