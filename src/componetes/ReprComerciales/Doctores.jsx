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
import { getDoctorById, getDoctors } from 'store/slices/doctor';
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

const formSchema = Yup.object().shape({
    nombre: Yup.string().required('Requerido'),
    tipo_documento: Yup.string().required('Requerido'),
    documento: Yup.string().required('Requerido'),
    pagina_web: Yup.string().required('Requerido'),
    whatsapp: Yup.string().required('Requerido'),
    email: Yup.string().email('Invalid email').required('Requerido'),
    telefono: Yup.string().required('Requerido'),
    telefono1: Yup.string().required('Requerido'),
    fax: Yup.number().required('Requerido')
});

function generateId() {
    return Date.now().toString() + Math.random().toString().slice(2);
}

const Doctores = () => {
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
    const { doctor, doctors, error } = useSelector((state) => state.doctor);
    // const { paginas } = useSelector((state) => state.pagina);
    React.useEffect(() => {
        dispatch(getDoctors());
    }, [id, accion, modo]);

    React.useEffect(() => {
        dispatch(getDoctorById(id));
    }, [id, accion, modo]);

    const [alertValue, setAlert] = useState({ type: '', message: '', open: false });
    const [modoAccion, setModoAccion] = useState();
    const [openConfDlg, setOpenConfDlg] = useState(false);

    console.log('doctor', doctor);
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    let formTitulo = '';
    switch (modo) {
        case 'create':
            formTitulo = 'Registro de doctor';
            break;
        case 'edit':
            formTitulo = 'Editar doctor';
            break;

        case 'view':
            formTitulo = 'Visualizar doctor';
            break;
        default:
            formTitulo = 'Registro de doctor';
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
        console.log('handlerAdd');
        navegate(`/doctor/create/0/${generateId()}`);
    };

    const handlerListar = () => {
        console.log('handlerListar');
        navegate(`/doctor/Index/${id}/${generateId()}`);
    };

    const clickEdit = (value) => {
        /* eslint no-underscore-dangle: 0 */
        console.log('value', value);
        navegate(`/doctor/edit/${value}/${generateId()}`);
    };

    const clickView = (value) => {
        /* eslint no-underscore-dangle: 0 */
        console.log('value', value);
        navegate(`/doctor/view/${value}/${generateId()}`);
    };

    console.log('error', error);
    return modo === 'Index' ? (
        <>
            {doctors.length !== 0 ? (
                <MainCard title="Listado de doctors">
                    <QuickFilteringGrid data={doctors} clickAdd={handlerAdd} clickEdit={clickEdit} clickView={clickView} />
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
                        tipo_doctor: doctor.data ? doctor.data.tipo_doctor._id : '',
                        nombre: doctor.data ? doctor.data.nombre : '',
                        /* eslint no-underscore-dangle: 0 */
                        tipo_documento: doctor.data ? doctor.data.tipo_documento._id : '',
                        documento: doctor.data ? doctor.data.documento : '',
                        pagina_web: doctor.data ? doctor.data.pagina_web : '',
                        whatsapp: doctor.data ? doctor.data.whatsapp : '',
                        email: doctor.data ? doctor.data.email : '',
                        telefono: doctor.data ? doctor.data.telefono : '',
                        telefono1: doctor.data ? doctor.data.telefono1 : '',
                        fax: doctor.data ? doctor.data.fax : '',
                        estatus: doctor.data ? doctor.data.estatus : ''
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
                            console.log('modoAccion', modoAccion);

                            if (modo === 'view') {
                                setAlert({ type: 'warning', open: true, message: MensajeVisualizar });
                                setSubmitting(false);
                                return;
                            }

                            try {
                                switch (modoAccion) {
                                    case 'Crear':
                                        console.log('Create', value);
                                        result = await axios.post(`${url}/registro_doctor`, value);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creada el doctor: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Crear nuevo':
                                        result = await axios.post(`${url}/registro_doctor`, value);
                                        resetForm();
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creada el doctor: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Crear editar':
                                        result = await axios.post(`${url}/registro_doctor`, value);
                                        /* eslint no-underscore-dangle: 0 */
                                        navegate(`/doctor/edit/${result.data.data._id}/${generateId()}`);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creada el doctor: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Editar':
                                        result = await axios.put(`${url}/actualizar_doctor/${id}`, value);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Actualizada el doctor: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;

                                    case 'Editar nuevo':
                                        result = await axios.put(`${url}/actualizar_doctor/${id}`, value);
                                        resetForm();
                                        navegate(`/doctor/create/0/${generateId()}`);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Actualizada el doctor: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Copiar':
                                        result = await axios.post(`${url}/registro_doctor`, value);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Copiada el doctor: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'delete':
                                        result = await axios.delete(`${url}/eliminar_doctor/${id}`, value);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'warning',
                                                title: `doctor eliminado: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            } catch (error) {
                                setSubmitting(false);
                                setMessageInfo({ type: 'error', title: `Error creando doctor: ${JSON.stringify(error)}` });
                            }

                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ values, errors, touched, isSubmitting, setFieldValue, handleChange, handleSubmit, handleBlur }) => {
                        values.doctor = userData.doctor;
                        // setFieldValue('descripcion', 'Fleirin');
                        // console.log('isSubmitting', moneda.data);

                        console.log('valuesFor', errors);

                        const handlerDelete = () => {
                            setModoAccion('delete');
                            setOpenConfDlg(true);
                        };
                        console.log('OpenConfdlg', openConfDlg);

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
                                    doctors.rows,
                                    // Objeto monedas
                                    doctor.data,
                                    value
                                );
                                if (idNexBack === 0) setAlert({ type: 'warning', open: true, message: 'Registro no econtrado' });
                                if (idNexBack !== 0) {
                                    navegate(`/doctor/edit/${idNexBack}/${generateId()}`);
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
                                                <Grid item xs={12}>
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
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
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
                                                    <TextField
                                                        value={values.documento}
                                                        id="documento"
                                                        label="RNC/Cedula"
                                                        fullWidth
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={errors.documento && touched.documento}
                                                        helperText={touched.documento && errors.documento}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="pagina_web"
                                                        label="pagina_web"
                                                        onBlur={handleBlur}
                                                        error={errors.pagina_web && touched.pagina_web}
                                                        helperText={touched.pagina_web && errors.pagina_web}
                                                        renderInput={(params) => <TextField {...params} />}
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
                                                        renderInput={(params) => <TextField {...params} />}
                                                        fullWidth
                                                        multiline
                                                        value={values.fax}
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

export default Doctores;
