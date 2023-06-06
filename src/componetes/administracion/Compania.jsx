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
import { useDispatch, useSelector, dispatch } from 'store';
import { getCompaniaById, getCompanias } from 'store/slices/compania';
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
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MyDocument from 'componetes/Reportes/MyDocument';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';

const formSchema = Yup.object().shape({
    nombre: Yup.string().required('Requerido'),
    rnc: Yup.string()
        .matches(/^\d{9}$/, 'El RNC debe tener exactamente 9 dígitos')
        .required('Requerido'),
    direccion: Yup.string().required('Requerido'),
    email: Yup.string().email('Invalid email').required('Requerido'),
    telefono: Yup.string().required('Requerido'),
    celular: Yup.string().required('Requerido'),
    whatsapp: Yup.string().required('Requerido'),
    mision: Yup.string().required('Requerido'),
    vision: Yup.string().required('Requerido'),
    valores: Yup.string().required('Requerido'),
    estatus: Yup.boolean().required('Requerido'),
    fecha_establecida: Yup.date().required('Requerido'),
    logo: Yup.string().required('Requerido'),
    sitio_web: Yup.string().required('Requerido'),
    moneda_curso: Yup.string().required('Requerido'),
    moneda_paralela: Yup.string().required('Requerido')

    // createdAt: Yup.date().required('Requerido')
});

function generateId() {
    return Date.now().toString() + Math.random().toString().slice(2);
}

const Compania = () => {
    const [value, setValue] = React.useState('2014-08-18T21:11:54');
    const [valueEstatus, setValueEstatus] = React.useState({ label: 'Activo', value: true });
    const [valueMLocal, setValueMLocal] = React.useState({ label: 'Activo', value: 'True' });
    const [valueSimbolo, setValueSimbolo] = React.useState({ title: '', value: '' });
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [displayError, setDisplayError] = React.useState('none');
    const [messageInfo, setMessageInfo] = React.useState({ type: '', title: '' });
    const [optiones, setOptions] = React.useState([]);
    const [file, setFile] = React.useState();
    const { modo, id, accion } = useParams();
    const navegate = useNavigate();
    const { compania, companias, error } = useSelector((state) => state.compania);
    // const { paginas } = useSelector((state) => state.pagina);
    React.useEffect(() => {
        dispatch(getCompanias());
    }, [id, accion, modo]);

    React.useEffect(() => {
        dispatch(getCompaniaById(id));
    }, [id, accion, modo]);

    const [alertValue, setAlert] = useState({ type: '', message: '', open: false });
    const [modoAccion, setModoAccion] = useState();
    const [openConfDlg, setOpenConfDlg] = useState(false);

    const formData = new FormData();

    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    let formTitulo = '';
    switch (modo) {
        case 'create':
            formTitulo = 'Registro de compañía';
            break;
        case 'edit':
            formTitulo = 'Editar compañía';
            break;

        case 'view':
            formTitulo = 'Visualizar compañía';
            break;
        default:
            formTitulo = 'Registro de compañía';
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
        navegate(`/compania/create/0/${generateId()}`);
    };

    const handlerListar = () => {
        navegate(`/compania/Index/${id}/${generateId()}`);
    };

    const clickEdit = (value) => {
        /* eslint no-underscore-dangle: 0 */

        navegate(`/compania/edit/${value}/${generateId()}`);
    };

    const clickView = (value) => {
        /* eslint no-underscore-dangle: 0 */

        navegate(`/compania/view/${value}/${generateId()}`);
    };

    // if (modo === 'edit' && moneda.length !== 0) {

    //     values.compania = moneda.data.compania;
    //     values.simbolo = moneda.data.simbolo;
    //     values.estatus = moneda.data.estatus;
    //     values.descripcion = moneda.data.descripcion;
    //     // set simbolo.
    //     const simbolo = JSON.stringify(DataSimbolo.find((data) => data.value === moneda.data.simbolo));
    //     setValueSimbolo(JSON.parse(simbolo));

    // }

    // if (error !== null) {
    //     return alert(JSON.stringify(error));
    // }

    // const handleFileInputChange => ()(event) {

    //     const file = event.target.files[0];
    //     setFile(file);
    // }
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
    };

    return modo === 'Index' ? (
        <>
            {companias.length !== 0 ? (
                <MainCard title="Listado de compañía">
                    <QuickFilteringGrid data={companias} clickAdd={handlerAdd} clickEdit={clickEdit} clickView={clickView} />
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
                        nombre: compania.data ? compania.data.nombre : '',
                        rnc: compania.data ? compania.data.rnc : '',
                        direccion: compania.data ? compania.data.direccion : '',
                        email: compania.data ? compania.data.email : '',
                        telefono: compania.data ? compania.data.telefono : '',
                        celular: compania.data ? compania.data.celular : '',
                        whatsapp: compania.data ? compania.data.whatsapp : '',
                        mision: compania.data ? compania.data.mision : '',
                        vision: compania.data ? compania.data.vision : '',
                        valores: compania.data ? compania.data.valores : '',
                        estatus: compania.data ? compania.data.estatus : true,
                        fecha_establecida: compania.data ? compania.data.fecha_establecida : '',
                        logo: compania.data ? compania.data.logo : '',
                        sitio_web: compania.data ? compania.data.sitio_web : '',
                        moneda_curso: compania.data ? compania.data.moneda_curso : '',
                        moneda_paralela: compania.data ? compania.data.moneda_paralela : ''
                    }}
                    validationSchema={formSchema}
                    //                 <Alert severity="error">This is an error alert — check it out!</Alert>
                    // <Alert severity="warning">This is a warning alert — check it out!</Alert>
                    // <Alert severity="info">This is an info alert — check it out!</Alert>
                    // <Alert severity="success">This is a success alert — check it out!</Alert>
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
                                        formData.append('nombre', value.nombre);
                                        formData.append('rnc', value.rnc);
                                        formData.append('direccion', value.direccion);
                                        formData.append('email', value.email);
                                        formData.append('telefono', value.telefono);
                                        formData.append('celular', value.celular);
                                        formData.append('whatsapp', value.whatsapp);
                                        formData.append('mision', value.mision);
                                        formData.append('vision', value.vision);
                                        formData.append('valores', value.valores);
                                        formData.append('estatus', value.estatus);
                                        formData.append('fecha_establecida', value.fecha_establecida);
                                        formData.append('sitio_web', value.sitio_web);
                                        formData.append('moneda_curso', value.fecha_establecida);
                                        formData.append('moneda_paralela', value.sitio_web);
                                        if (file) {
                                            formData.append('logo', file);
                                        }

                                        result = await axios.post(`${url}/registro_compania`, formData);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creada la compañía: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Crear nuevo':
                                        result = await axios.post(`${url}/registro_compania`, value);
                                        resetForm();

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creada la compañía: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Crear editar':
                                        result = await axios.post(`${url}/registro_compania`, value);
                                        /* eslint no-underscore-dangle: 0 */
                                        navegate(`/compania/edit/${result.data.data._id}/${generateId()}`);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creada la compañía: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Editar':
                                        result = await axios.put(`${url}/actualizar_compania/${id}`, value);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Actualizada la compañía: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;

                                    case 'Editar nuevo':
                                        result = await axios.put(`${url}/actualizar_compania/${id}`, value);
                                        resetForm();
                                        navegate(`/compania/create/0/${generateId()}`);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Actualizada la compañía: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Copiar':
                                        formData.append('nombre', value.nombre);
                                        formData.append('descripcion', value.nombre);
                                        formData.append('rnc', value.rnc);
                                        formData.append('direccion', value.direccion);
                                        formData.append('email', value.email);
                                        formData.append('telefono', value.telefono);
                                        formData.append('celular', value.celular);
                                        formData.append('whatsapp', value.whatsapp);
                                        formData.append('mision', value.mision);
                                        formData.append('vision', value.vision);
                                        formData.append('valores', value.valores);
                                        formData.append('estatus', value.estatus);
                                        formData.append('fecha_establecida', value.fecha_establecida);
                                        formData.append('sitio_web', value.sitio_web);
                                        formData.append('moneda_curso', value.moneda_curso);
                                        formData.append('moneda_paralela', value.moneda_paralela);
                                        if (file) {
                                            formData.append('logo', file);
                                        }

                                        result = await axios.post(`${url}/registro_compania`, formData);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creada la compañía: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'delete':
                                        result = await axios.delete(`${url}/eliminar_moneda/${id}`, value);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'warning',
                                                title: `Compañía eliminada: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            } catch (error) {
                                setSubmitting(false);
                                setMessageInfo({ type: 'error', title: `Error creando compañía: ${JSON.stringify(error)}` });
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

                        const App = () => {
                            <PDFViewer>
                                <MyDocument />
                            </PDFViewer>;
                        };
                        const handlerPrint = () => {
                            ReactDOM.conta(<App />);
                        };

                        const handlerNavegateData = (value) => {
                            if (modo === 'edit' || modo === 'view') {
                                const idNexBack = getNextValue(
                                    // Arreglo de monedas
                                    companias.rows,
                                    // Objeto monedas
                                    compania.data,
                                    value
                                );
                                if (idNexBack === 0) setAlert({ type: 'warning', open: true, message: 'Registro no econtrado' });
                                if (idNexBack !== 0) {
                                    navegate(`/compania/edit/${idNexBack}/${generateId()}`);
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
                                                    <TextField
                                                        value={values.nombre}
                                                        id="nombre"
                                                        name="nombre"
                                                        fullWidth
                                                        label="Nombre"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={errors.nombre && touched.nombre}
                                                        helperText={touched.nombre && errors.nombre}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        value={values.rnc}
                                                        id="rnc"
                                                        label="RNC"
                                                        fullWidth
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={errors.rnc && touched.rnc}
                                                        helperText={touched.rnc && errors.rnc}
                                                        inputProps={{
                                                            maxLength: 9,
                                                            inputMode: 'numeric',
                                                            pattern: '[0-9]*'
                                                        }}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="direccion"
                                                        label="Dirección"
                                                        onBlur={handleBlur}
                                                        error={errors.direccion && touched.direccion}
                                                        helperText={touched.direccion && errors.direccion}
                                                        renderInput={(params) => <TextField {...params} />}
                                                        fullWidth
                                                        multiline
                                                        value={values.direccion}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <EmailTwoToneIcon />
                                                                </InputAdornment>
                                                            )
                                                        }}
                                                        id="email"
                                                        label="Email"
                                                        onBlur={handleBlur}
                                                        error={errors.email && touched.email}
                                                        helperText={touched.email && errors.email}
                                                        renderInput={(params) => <TextField {...params} />}
                                                        fullWidth
                                                        value={values.email}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <PatternFormat
                                                        id="telefono"
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <LocalPhoneTwoToneIcon />
                                                                </InputAdornment>
                                                            )
                                                        }}
                                                        format="+1 (###) ###-####"
                                                        mask="_"
                                                        customInput={TextField}
                                                        label="Telefono"
                                                        onBlur={handleBlur}
                                                        error={errors.telefono && touched.telefono}
                                                        helperText={touched.telefono && errors.telefono}
                                                        renderInput={(params) => <TextField {...params} />}
                                                        fullWidth
                                                        value={values.telefono}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <PatternFormat
                                                        id="celular"
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <PhoneIphoneTwoToneIcon />
                                                                </InputAdornment>
                                                            )
                                                        }}
                                                        format="+1 (###) ###-####"
                                                        mask="_"
                                                        customInput={TextField}
                                                        label="Celular"
                                                        onBlur={handleBlur}
                                                        error={errors.celular && touched.celular}
                                                        helperText={touched.celular && errors.celular}
                                                        renderInput={(params) => <TextField {...params} />}
                                                        fullWidth
                                                        value={values.celular}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <PatternFormat
                                                        id="whatsapp"
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <WhatsAppIcon />
                                                                </InputAdornment>
                                                            )
                                                        }}
                                                        format="+1 (###) ###-####"
                                                        mask="_"
                                                        customInput={TextField}
                                                        label="WhatSap"
                                                        onBlur={handleBlur}
                                                        error={errors.whatsapp && touched.whatsapp}
                                                        helperText={touched.whatsapp && errors.whatsapp}
                                                        renderInput={(params) => <TextField {...params} />}
                                                        fullWidth
                                                        value={values.whatsapp}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="mision"
                                                        label="Misión"
                                                        onBlur={handleBlur}
                                                        error={errors.mision && touched.mision}
                                                        helperText={touched.mision && errors.mision}
                                                        renderInput={(params) => <TextField {...params} />}
                                                        fullWidth
                                                        multiline
                                                        value={values.mision}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="vision"
                                                        label="Visión"
                                                        onBlur={handleBlur}
                                                        error={errors.vision && touched.vision}
                                                        helperText={touched.vision && errors.vision}
                                                        renderInput={(params) => <TextField {...params} />}
                                                        fullWidth
                                                        multiline
                                                        value={values.vision}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="valores"
                                                        label="Valores"
                                                        onBlur={handleBlur}
                                                        error={errors.valores && touched.valores}
                                                        helperText={touched.valores && errors.valores}
                                                        renderInput={(params) => <TextField {...params} />}
                                                        fullWidth
                                                        multiline
                                                        value={values.valores}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={6}>
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
                                                        label="Activo"
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            id="fecha_establecida"
                                                            label="Fecha establecida"
                                                            value={values.fecha_establecida}
                                                            onBlur={handleBlur}
                                                            error={errors.fecha_establecida && touched.fecha_establecida}
                                                            helperText={touched.fecha_establecida && errors.fecha_establecida}
                                                            onChange={(value) => {
                                                                // setValue(value);
                                                                setFieldValue('fecha_establecida', value);
                                                            }}
                                                            renderInput={(params) => <TextField {...params} />}
                                                        />
                                                    </LocalizationProvider>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <input type="file" onChange={handleFileInputChange} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="sitio_web"
                                                        label="Sitio web"
                                                        onBlur={handleBlur}
                                                        error={errors.sitio_web && touched.sitio_web}
                                                        helperText={touched.sitio_web && errors.sitio_web}
                                                        renderInput={(params) => <TextField {...params} />}
                                                        fullWidth
                                                        value={values.sitio_web}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <DropMonedas
                                                        Id="moneda_curso"
                                                        SetFieldValue={setFieldValue}
                                                        Value={values.moneda_curso}
                                                        Label="Moneda local"
                                                        Errors={errors}
                                                        Touched={touched}
                                                        OnBlur={handleBlur}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <DropMonedas
                                                        Id="moneda_paralela"
                                                        SetFieldValue={setFieldValue}
                                                        Value={values.moneda_paralela}
                                                        Label="Moneda Extranjera"
                                                        Errors={errors}
                                                        Touched={touched}
                                                        OnBlur={handleBlur}
                                                    />
                                                </Grid>

                                                <Divider />

                                                <Grid item xs={12} style={{ marginTop: '5px' }}>
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
                                                </Grid>
                                            </Grid>
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

export default Compania;
