import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, Grid, Divider, FormControl, InputAdornment, Card, Alert, FormControlLabel, Avatar } from '@mui/material';
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
import { getClienteById, getClientes } from 'store/slices/clientes';
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
import DropTipoDocumentos from 'controles/DropTipoDocumentos';
import DropTerminoPago from 'controles/DropTerminoPago';
import DropVendedor from 'controles/DropVendedor';
import DropTipoClientes from 'controles/DropTipoClientes';
import { useFetchPersonData } from '../../hooks/useFetchPerson';

const formSchema = Yup.object().shape({
    tipo_cliente: Yup.string().required('Requerido'),
    vendedor: Yup.string().required('Requerido'),
    tipo_documento: Yup.string().required('Requerido'),
    documento: Yup.string()
        .matches(/^\d{3}-\d{7}-\d{1}$/, 'Cédula incorrecta. Asegúrate de introducir todos los dígitos.')
        .required('Requerido'),
    pagina_web: Yup.string().required('Requerido'),
    whatsapp: Yup.string().required('Requerido'),
    email: Yup.string().email('Invalid email').required('Requerido'),
    telefono: Yup.string().required('Requerido'),
    telefono1: Yup.string().required('Requerido'),
    fax: Yup.number().required('Requerido'),
    moneda_curso: Yup.string().required('Requerido'),
    termino_pago: Yup.string().required('Requerido'),
    limite_credito: Yup.string().required('Requerido'),
    estatus: Yup.string().required('Requerido')
});

function generateId() {
    return Date.now().toString() + Math.random().toString().slice(2);
}

const Clientes = () => {
    const [value, setValue] = React.useState('2014-08-18T21:11:54');
    const [valueEstatus, setValueEstatus] = React.useState({ label: 'Activo', value: true });
    const [valueMLocal, setValueMLocal] = React.useState({ label: 'Activo', value: 'True' });
    const [valueSimbolo, setValueSimbolo] = React.useState({ title: '', value: '' });
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [displayError, setDisplayError] = React.useState('none');
    const [messageInfo, setMessageInfo] = React.useState({ type: '', title: '' });
    const [optiones, setOptions] = React.useState([]);
    const { modo, id, accion } = useParams();
    const navegate = useNavigate();
    const { cliente, clientes, error } = useSelector((state) => state.cliente);
    // const { paginas } = useSelector((state) => state.pagina);
    React.useEffect(() => {
        dispatch(getClientes());
    }, [id, accion, modo]);

    React.useEffect(() => {
        dispatch(getClienteById(id));
    }, [id, accion, modo]);

    const [alertValue, setAlert] = useState({ type: '', message: '', open: false });
    const [modoAccion, setModoAccion] = useState();
    const [openConfDlg, setOpenConfDlg] = useState(false);

    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    let formTitulo = '';
    switch (modo) {
        case 'create':
            formTitulo = 'Registro de cliente';
            break;
        case 'edit':
            formTitulo = 'Editar cliente';
            break;

        case 'view':
            formTitulo = 'Visualizar cliente';
            break;
        default:
            formTitulo = 'Registro de cliente';
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
        navegate(`/cliente/create/0/${generateId()}`);
    };

    const handlerListar = () => {
        navegate(`/cliente/Index/${id}/${generateId()}`);
    };

    const clickEdit = (value) => {
        /* eslint no-underscore-dangle: 0 */

        navegate(`/cliente/edit/${value}/${generateId()}`);
    };

    const clickView = (value) => {
        /* eslint no-underscore-dangle: 0 */

        navegate(`/cliente/view/${value}/${generateId()}`);
    };

    return modo === 'Index' ? (
        <>
            {clientes.length !== 0 ? (
                <MainCard title="Listado de clientes">
                    <QuickFilteringGrid data={clientes} clickAdd={handlerAdd} clickEdit={clickEdit} clickView={clickView} />
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
                        /* eslint no-underscore-dangle: 0 */
                        tipo_cliente: cliente.data ? cliente.data.tipo_cliente._id : '',
                        nombre: cliente.data ? cliente.data.nombre : '',
                        /* eslint no-underscore-dangle: 0 */
                        vendedor: cliente.data ? cliente.data.vendedor._id : '',
                        /* eslint no-underscore-dangle: 0 */
                        tipo_documento: cliente.data ? cliente.data.tipo_documento._id : '',
                        documento: cliente.data ? cliente.data.documento : '',
                        pagina_web: cliente.data ? cliente.data.pagina_web : '',
                        whatsapp: cliente.data ? cliente.data.whatsapp : '',
                        email: cliente.data ? cliente.data.email : '',
                        telefono: cliente.data ? cliente.data.telefono : '',
                        telefono1: cliente.data ? cliente.data.telefono1 : '',
                        fax: cliente.data ? cliente.data.fax : '',
                        /* eslint no-underscore-dangle: 0 */
                        moneda_curso: cliente.data ? cliente.data.moneda_curso._id : '',
                        /* eslint no-underscore-dangle: 0 */
                        termino_pago: cliente.data ? cliente.data.termino_pago._id : '',
                        limite_credito: cliente.data ? cliente.data.limite_credito : '',
                        estatus: cliente.data ? cliente.data.estatus : ''
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
                                        result = await axios.post(`${url}/registro_cliente`, value);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creada el cliente: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Crear nuevo':
                                        result = await axios.post(`${url}/registro_cliente`, value);
                                        resetForm();

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creada el cliente: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Crear editar':
                                        result = await axios.post(`${url}/registro_cliente`, value);
                                        /* eslint no-underscore-dangle: 0 */
                                        navegate(`/cliente/edit/${result.data.data._id}/${generateId()}`);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creada el cliente: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Editar':
                                        result = await axios.put(`${url}/actualizar_cliente/${id}`, value);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Actualizada el cliente: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;

                                    case 'Editar nuevo':
                                        result = await axios.put(`${url}/actualizar_cliente/${id}`, value);
                                        resetForm();
                                        navegate(`/cliente/create/0/${generateId()}`);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Actualizada el cliente: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Copiar':
                                        result = await axios.post(`${url}/registro_cliente`, value);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Copiada el cliente: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'delete':
                                        result = await axios.delete(`${url}/eliminar_cliente/${id}`, value);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'warning',
                                                title: `cliente eliminado: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            } catch (error) {
                                setSubmitting(false);
                                setMessageInfo({ type: 'error', title: `Error creando cliente: ${JSON.stringify(error)}` });
                            }

                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ values, errors, touched, isSubmitting, setFieldValue, handleChange, handleSubmit, handleBlur }) => {
                        values.cliente = userData.cliente;
                        // setFieldValue('descripcion', 'Fleirin');

                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const { isLoading, personData, getPerson } = useFetchPersonData();
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        useEffect(() => {
                            if (values.documento) {
                                getPerson(values.documento.replace(/-/g, ''));
                            }
                        }, [values.documento]);
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        useEffect(() => {
                            if (personData) {
                                setFieldValue('nombre', personData.nombre);
                                setFieldValue('fecha_nacimiento', personData.fecha_nacimiento);
                                setFieldValue('lugar_nacimiento', personData.lugar_nacimiento);
                                setFieldValue('genero', personData.genero);
                                setFieldValue('estado_civil', personData.estado_civil);
                                setFieldValue('foto', personData.foto);
                            }
                        }, [personData]);

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
                                    clientes.rows,
                                    // Objeto monedas
                                    cliente.data,
                                    value
                                );
                                if (idNexBack === 0) setAlert({ type: 'warning', open: true, message: 'Registro no econtrado' });
                                if (idNexBack !== 0) {
                                    navegate(`/cliente/edit/${idNexBack}/${generateId()}`);
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
                                                    <DropTipoDocumentos
                                                        Id="tipo_documento"
                                                        SetFieldValue={setFieldValue}
                                                        Value={values.tipo_documento}
                                                        Label="Tipo documento"
                                                        Errors={errors}
                                                        Touched={touched}
                                                        OnBlur={handleBlur}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <PatternFormat
                                                        value={values.documento}
                                                        id="documento"
                                                        label="RNC/Cedula"
                                                        fullWidth
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={errors.documento && touched.documento}
                                                        helperText={
                                                            (touched.documento && errors.documento) ||
                                                            'Selecciona un tipo de documento primero'
                                                        }
                                                        renderInput={(params) => <TextField {...params} />}
                                                        format="###-#######-#"
                                                        mask="_"
                                                        customInput={TextField}
                                                        disabled={!values.tipo_documento}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider>
                                                        Estos campos serán llenados automaticamente al introducir la cédula del cliente
                                                    </Divider>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        value={values.nombre}
                                                        id="nombre"
                                                        name="nombre"
                                                        fullWidth
                                                        label={values.nombre ? '' : 'Nombre'}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={errors.nombre && touched.nombre}
                                                        helperText={touched.nombre && errors.nombre}
                                                        disabled
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        value={values.fecha_nacimiento}
                                                        id="fecha_nacimiento"
                                                        name="fecha_nacimiento"
                                                        fullWidth
                                                        label={values.fecha_nacimiento ? '' : 'Fecha de nacimiento'}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        value={values.lugar_nacimiento}
                                                        id="lugar_nacimiento"
                                                        name="lugar_nacimiento"
                                                        fullWidth
                                                        label={values.lugar_nacimiento ? '' : 'Lugar de nacimiento'}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        value={values.genero}
                                                        id="genero"
                                                        name="genero"
                                                        fullWidth
                                                        label={values.genero ? '' : 'Genero'}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        value={values.estado_civil}
                                                        id="estado_civil"
                                                        name="estado_civil"
                                                        fullWidth
                                                        label={values.genero ? '' : 'Estado civil'}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled
                                                    />
                                                </Grid>
                                                <Grid item xs={6} justifyContent="center">
                                                    {values.foto && <img src={values.foto} alt={values.nombre || 'Foto de persona'} />}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider>Otros datos</Divider>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="pagina_web"
                                                        label="pagina_web"
                                                        onBlur={handleBlur}
                                                        error={errors.pagina_web && touched.pagina_web}
                                                        helperText={touched.pagina_web && errors.pagina_web}
                                                        fullWidth
                                                        multiline
                                                        value={values.pagina_web}
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
                                                        id="telefono1"
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
                                                        error={errors.telefono1 && touched.telefono1}
                                                        helperText={touched.telefono1 && errors.telefono1}
                                                        renderInput={(params) => <TextField {...params} />}
                                                        fullWidth
                                                        value={values.telefono1}
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
                                                        id="fax"
                                                        label="Fax"
                                                        onBlur={handleBlur}
                                                        error={errors.fax && touched.fax}
                                                        helperText={touched.fax && errors.fax}
                                                        fullWidth
                                                        multiline
                                                        value={values.fax}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <DropMonedas
                                                        Id="moneda_curso"
                                                        SetFieldValue={setFieldValue}
                                                        Value={values.moneda_curso}
                                                        Label="Moneda"
                                                        Errors={errors}
                                                        Touched={touched}
                                                        OnBlur={handleBlur}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <DropTerminoPago
                                                        Id="termino_pago"
                                                        SetFieldValue={setFieldValue}
                                                        Value={values.termino_pago}
                                                        Label="Terminos de pago"
                                                        Errors={errors}
                                                        Touched={touched}
                                                        OnBlur={handleBlur}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <DropVendedor
                                                        Id="vendedor"
                                                        SetFieldValue={setFieldValue}
                                                        Value={values.vendedor}
                                                        Label="Vendedor"
                                                        Errors={errors}
                                                        Touched={touched}
                                                        OnBlur={handleBlur}
                                                    />
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <DropTipoClientes
                                                        Id="tipo_cliente"
                                                        SetFieldValue={setFieldValue}
                                                        Value={values.tipo_cliente}
                                                        Label="Tipo cliente"
                                                        Errors={errors}
                                                        Touched={touched}
                                                        OnBlur={handleBlur}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="limite_credito"
                                                        label="Limite de credito"
                                                        type="number"
                                                        onBlur={handleBlur}
                                                        error={errors.limite_credito && touched.limite_credito}
                                                        helperText={touched.limite_credito && errors.limite_credito}
                                                        fullWidth
                                                        value={values.limite_credito}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                name="estatus"
                                                                checked={!!values.estatus}
                                                                onChange={(data) => {
                                                                    setFieldValue('estatus', data.target.checked);
                                                                }}
                                                            />
                                                        }
                                                        label="Inactivo?"
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

export default Clientes;
