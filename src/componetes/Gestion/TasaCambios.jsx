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
import DropMonedas from 'controles/DropMonedas';
import DropSimbolo from 'controles/DropSimbolo';
import Formulario from 'controles/Formulario';
import { useRoutes, useNavigate, useParams } from 'react-router-dom';
import QuickFilteringGrid from 'controles/QuickFilteringGrid';
// import { useDispatch, useSelector } from 'store';
import { getTasaCambios, getTasaCambioById } from 'store/slices/tasaCambio';
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
import { dispatch, useDispatch, useSelector } from '../../store/index';

const formSchema = Yup.object().shape({
    compania: Yup.string().required('Requedido'),
    moneda_from: Yup.string().required('Requedido'),
    moneda_to: Yup.string().required('Requedido'),
    value_from: Yup.number().required('Requedido'),
    value_to: Yup.number().required('Requedido'),
    fecha_from: Yup.string().required('Requedido'),
    fecha_to: Yup.string().required('Requedido'),
    estatus: Yup.string().required('Requedido')
});

function generateId() {
    return Date.now().toString() + Math.random().toString().slice(2);
}

const TasaCambios = () => {
    const [value, setValue] = React.useState('2014-08-18T21:11:54');
    const [valueEstatus, setValueEstatus] = React.useState({ label: 'Activo', value: true });
    const [valueMLocal, setValueMLocal] = React.useState({ title: '', value: '' });
    const [valueMExtranjera, setValueMExtranjera] = React.useState({ title: '', value: '' });
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [displayError, setDisplayError] = React.useState('none');
    const [messageInfo, setMessageInfo] = React.useState({ type: '', title: '' });
    const [optiones, setOptions] = React.useState([]);
    const { modo, id, accion } = useParams();
    const navegate = useNavigate();
    const { tasaCambios, tasaCambio, error } = useSelector((state) => state.tasaCambio);
    // const { paginas } = useSelector((state) => state.pagina);
    React.useEffect(() => {
        dispatch(getTasaCambios());
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(getTasaCambioById(id));
    }, [id, accion, modo]);

    const [alertValue, setAlert] = useState({ type: '', message: '', open: false });
    const [modoAccion, setModoAccion] = useState();
    const [openConfDlg, setOpenConfDlg] = useState(false);

    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    let formTitulo = '';
    switch (modo) {
        case 'create':
            formTitulo = 'Registro de tasa de cambio';
            break;
        case 'edit':
            formTitulo = 'Editar de tasa de cambio';
            break;

        case 'view':
            formTitulo = 'Visualizar de tasa de cambio';
            break;
        default:
            formTitulo = 'Registro de de tasa de cambio';
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
        navegate(`/tasaCambio/create/0/${generateId()}`);
    };

    const handlerListar = () => {
        navegate(`/tasaCambio/Index/${id}/${generateId()}`);
    };

    const clickEdit = (value) => {
        /* eslint no-underscore-dangle: 0 */

        navegate(`/tasaCambio/edit/${value}/${generateId()}`);
    };

    const clickView = (value) => {
        /* eslint no-underscore-dangle: 0 */

        navegate(`/tasaCambio/view/${value}/${generateId()}`);
    };

    return modo === 'Index' ? (
        <>
            {console.log('tasaCabio', tasaCambios)}
            {tasaCambios.length !== 0 ? (
                <MainCard title="Listado de moneda">
                    <QuickFilteringGrid data={tasaCambios} clickAdd={handlerAdd} clickEdit={clickEdit} clickView={clickView} />
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
                        moneda_from: tasaCambio.data ? tasaCambio.data.moneda_from : '',
                        moneda_to: tasaCambio.data ? tasaCambio.data.moneda_to : '',
                        value_from: tasaCambio.data ? tasaCambio.data.value_from : '',
                        value_to: tasaCambio.data ? tasaCambio.data.value_to : '',
                        fecha_from: tasaCambio.data ? tasaCambio.data.fecha_from : '',
                        fecha_to: tasaCambio.data ? tasaCambio.data.fecha_to : '',
                        estatus: tasaCambio.data ? tasaCambio.data.estatus : true
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
                                        result = await axios.post(`${url}/registro_tasa_cambio`, value);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creada la tasa de cambio: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Crear nuevo':
                                        result = await axios.post(`${url}/registro_tasa_cambio`, value);
                                        resetForm();

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creada la tasa de cambio: ${result.data.data.descripcion}`
                                            });
                                        }
                                        dispatch(getTasaCambios());
                                        break;
                                    case 'Crear editar':
                                        result = await axios.post(`${url}/registro_tasa_cambio`, value);
                                        /* eslint no-underscore-dangle: 0 */
                                        navegate(`/tasaCambio/edit/${result.data.data._id}/${generateId()}`);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creada la tasa de cambio: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Editar':
                                        result = await axios.put(`${url}/actualizar_tasa_cambio/${id}`, value);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Actualizada la tasa de cambio: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;

                                    case 'Editar nuevo':
                                        result = await axios.put(`${url}/actualizar_tasa_cambio/${id}`, value);
                                        resetForm();
                                        navegate(`/tasaCambio/create/0/${generateId()}`);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Actualizada la tasa de cambio: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Copiar':
                                        result = await axios.post(`${url}/registro_tasa_cambio`, value);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Copiada la tasa de cambio: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'delete':
                                        result = await axios.delete(`${url}/eliminar_tasa_cambio/${id}`, value);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'warning',
                                                title: `la tasa de cambio: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            } catch (error) {
                                setSubmitting(false);
                                setMessageInfo({ type: 'error', title: `Error creando la tasa de cambio: ${JSON.stringify(error)}` });
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
                                    // Arreglo de monedas
                                    tasaCambios.rows,
                                    // Objeto monedas
                                    tasaCambio.data,
                                    value
                                );
                                if (idNexBack === 0) setAlert({ type: 'warning', open: true, message: 'Registro no econtrado' });
                                if (idNexBack !== 0) {
                                    navegate(`/tasaCambio/edit/${idNexBack}/${generateId()}`);
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
                                                    <DropMonedas
                                                        HandleBlur={handleBlur}
                                                        Errors={errors}
                                                        Touched={touched}
                                                        SetValue={setValueMLocal}
                                                        Id="moneda_from"
                                                        Label="Moneda local"
                                                        SetFieldValue={setFieldValue}
                                                        Value={values.moneda_from}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <DropMonedas
                                                        HandleBlur={handleBlur}
                                                        Errors={errors}
                                                        Touched={touched}
                                                        Label="Moneda extranjera"
                                                        SetValue={setValueMExtranjera}
                                                        Id="moneda_to"
                                                        SetFieldValue={setFieldValue}
                                                        Value={values.moneda_to}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        fullWidth
                                                        id="value_from"
                                                        name="value_from"
                                                        label="Unidad"
                                                        type="number"
                                                        value={values.value_from}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={errors.value_from && touched.value_from}
                                                        helperText={touched.value_from && errors.value_from}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        fullWidth
                                                        id="value_to"
                                                        name="value_to"
                                                        label="Tasa"
                                                        type="number"
                                                        value={values.value_to}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={errors.value_to && touched.value_to}
                                                        helperText={touched.value_to && errors.value_to}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            id="fecha_from"
                                                            label="Fecha desde"
                                                            value={values.fecha_from}
                                                            onBlur={handleBlur}
                                                            fullWidth
                                                            error={errors.fecha_from && touched.fecha_from}
                                                            helperText={touched.fecha_from && errors.fecha_from}
                                                            onChange={(value) => {
                                                                setFieldValue('fecha_from', value);
                                                            }}
                                                            renderInput={(params) => <TextField fullWidth {...params} />}
                                                        />
                                                    </LocalizationProvider>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            id="fecha_to"
                                                            label="Fecha hasta"
                                                            value={values.fecha_to}
                                                            onBlur={handleBlur}
                                                            error={errors.fecha_to && touched.fecha_to}
                                                            helperText={touched.fecha_to && errors.fecha_to}
                                                            onChange={(value) => {
                                                                setFieldValue('fecha_to', value);
                                                            }}
                                                            renderInput={(params) => <TextField fullWidth {...params} />}
                                                        />
                                                    </LocalizationProvider>
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

export default TasaCambios;
