import React from 'react';
import { Formik, Form, Field } from 'formik';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, Grid, Divider, FormControl, InputAdornment, Alert, Button } from '@mui/material';
import * as Yup from 'yup';
import CrudControl from 'controles/CrudControl';
import MainCard from 'ui-component/cards/MainCard';
import { EmailTwoTone, Mode } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import { PatternFormat } from 'react-number-format';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import PhoneIphoneTwoToneIcon from '@mui/icons-material/PhoneIphoneTwoTone';
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import DropEstatus from 'controles/DropEstatus';
import DropMonedas from 'controles/DropMonedas';
import { useParams } from 'react-router-dom';
import TitleForm from 'controles/Formulario';
import { Stack } from '@mui/system';
import MyDocument from 'componetes/Reportes/MyDocument';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';

const formSchema = Yup.object().shape({
    nombre: Yup.string().required('Requerido'),
    rnc: Yup.string().required('Requerido'),
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
    moneda_paralela: Yup.string().required('Requ ')
});

const data = [];
const Layouts = () => {
    const [value, setValue] = React.useState('2014-08-18T21:11:54');
    const [valueEstatus, setValueEstatus] = React.useState({ label: 'Activo', value: 'True' });
    const [valueMLocal, setValueMLocal] = React.useState({ label: 'Activo', value: 'True' });
    const [displayError, setDisplayError] = React.useState('none');
    const [typeMessage, setTypeMessage] = React.useState('error');
    const [titleMessage, setTitleMessage] = React.useState('');
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [optiones, setOptions] = React.useState([]);

    const { modo } = useParams();
    const formTitulo = modo === 'create' ? 'Registro de compañía' : 'Editar compañía';

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

    return (
        <>
            <Formik
                initialValues={{
                    nombre: '',
                    rnc: '',
                    direccion: '',
                    email: '',
                    telefono: '',
                    celular: '',
                    whatsapp: '',
                    mision: '',
                    vision: '',
                    valores: '',
                    estatus: '',
                    fecha_establecida: '',
                    logo: '',
                    sitio_web: '',
                    moneda_curso: '',
                    moneda_paralela: '',
                    createdAt: ''
                }}
                validationSchema={formSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        setDisplayError('block');
                        setTypeMessage('success');
                        setTitleMessage('Creada');
                        alert(JSON.stringify(values, null, 2));

                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ errors, touched, isSubmitting, values, handleSubmit }) => {
                    values.compania = userData.compania;

                    if (modo === 'edit' && data) {
                        values.compania = data.compania;
                        values.simbolo = data.simbolo;
                        values.estatus = data.estatus;
                        values.descripcion = data.descripcion;
                    }

                    const handlerDelete = () => {
                        handleSubmit();
                    };

                    const handlerCreate = (value) => {
                        handleSubmit();
                    };
                    const handlerPrint = () => {
                        // ReactPDF.renderToStream(<MyDocument/>)
                        // handleSubmit();
                    };

                    const Imprimir = () => {
                        ReactPDF.renderToStream(<MyDocument />);
                    };

                    return (
                        <>
                            <Button onClick={Imprimir()}> Imprimir</Button>
                            <Grid container spacing="2">
                                <Grid item xs={12} lg={12}>
                                    <MainCard title={formTitulo}>
                                        <CrudControl
                                            HandlerDelete={handlerDelete}
                                            HandlerCreate={handlerCreate}
                                            HandlerPrint={handlerPrint}
                                            DisplayError={displayError}
                                            TypeMessage={typeMessage}
                                            TitleMessage={titleMessage}
                                            Options={optiones}
                                        />
                                        <Divider />
                                        <Grid container spacing={2} style={{ marginTop: '5px' }}>
                                            <Grid item xs={6}>
                                                <TextField
                                                    name="nombre"
                                                    error={Boolean(errors.nombre && touched.nombre)}
                                                    helperText={errors.nombre}
                                                    fullWidth
                                                    label="Nombre"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    name="rnc"
                                                    label="RNC"
                                                    error={Boolean(errors.rnc && touched.rnc)}
                                                    helperText={errors.rnc}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Divider />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    name="direccion"
                                                    label="Dirección"
                                                    error={Boolean(errors.direccion && touched.direccion)}
                                                    helperText={errors.direccion}
                                                    fullWidth
                                                    multiline
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
                                                    name="email"
                                                    label="Email"
                                                    error={Boolean(errors.email && touched.email)}
                                                    helperText={errors.email}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Divider />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <PatternFormat
                                                    name="telefono"
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
                                                    error={Boolean(errors.telefono && touched.telefono)}
                                                    helperText={errors.telefono}
                                                    fullWidth
                                                />
                                                {/* <TextField
                                    name="telefono"
                                    label="Telefono"
                                    error={Boolean(errors.telefono && touched.telefono)}
                                    helperText={errors.telefono}
                                    fullWidth
                                /> */}
                                            </Grid>
                                            <Grid item xs={6}>
                                                <PatternFormat
                                                    name="celular"
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
                                                    error={Boolean(errors.celular && touched.celular)}
                                                    helperText={errors.celular}
                                                    fullWidth
                                                />
                                                {/* <TextField
                                    name="celular"
                                    label="Celular"
                                    error={Boolean(errors.celular && touched.celular)}
                                    helperText={errors.celular}
                                    fullWidth
                                /> */}
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Divider />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <PatternFormat
                                                    name="whatsapp"
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <ChatTwoToneIcon />
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                    format="+1 (###) ###-####"
                                                    mask="_"
                                                    customInput={TextField}
                                                    label="WhatSap"
                                                    error={Boolean(errors.whatsapp && touched.whatsapp)}
                                                    helperText={errors.whatsapp}
                                                    fullWidth
                                                />
                                                {/* <TextField
                                    name="whatsapp"
                                    label="Whasapp"
                                    error={Boolean(errors.whatsapp && touched.whatsapp)}
                                    helperText={errors.whatsapp}
                                    fullWidth
                                /> */}
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    name="mision"
                                                    label="Misión"
                                                    error={Boolean(errors.mision && touched.mision)}
                                                    helperText={errors.mision}
                                                    fullWidth
                                                    multiline
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Divider />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    name="vision"
                                                    label="Visión"
                                                    error={Boolean(errors.vision && touched.vision)}
                                                    helperText={errors.vision}
                                                    fullWidth
                                                    multiline
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    name="valores"
                                                    label="valores"
                                                    error={Boolean(errors.valores && touched.valores)}
                                                    helperText={errors.valores}
                                                    fullWidth
                                                    multiline
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Divider />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControlLabe
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
                                            <Grid item xs={6}>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DesktopDatePicker
                                                        label="Date desktop"
                                                        inputFormat="MM/DD/YYYY"
                                                        value={value}
                                                        onChange={handleChange}
                                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                                        fullWidth
                                                    />
                                                </LocalizationProvider>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Divider />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    type="file"
                                                    name="logo"
                                                    label="Logo"
                                                    error={Boolean(errors.logo && touched.logo)}
                                                    helperText={errors.logo}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    name="sitio_web"
                                                    label="Sitio web"
                                                    error={Boolean(errors.sitio_web && touched.sitio_web)}
                                                    helperText={errors.sitio_web}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Divider />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <DropMonedas SetValue={setValueMLocal} Id="moneda_curso" Label="Moneda Local" />
                                            </Grid>
                                            <Grid item xs={6}>
                                                {/* <TextField
                                        name="moneda_paralela"
                                        label="Moneda paralela"
                                        error={Boolean(errors.moneda_paralela && touched.moneda_paralela)}
                                        helperText={errors.moneda_paralela}
                                        fullWidth
                                    /> */}
                                                <DropMonedas SetValue={setValueMLocal} Id="moneda_paralela" Label="Moneda Paralela" />
                                            </Grid>
                                        </Grid>
                                        <CrudControl
                                            HandlerDelete={handlerDelete}
                                            HandlerCreate={handlerCreate}
                                            HandlerPrint={handlerPrint}
                                            DisplayError={displayError}
                                            TypeMessage={typeMessage}
                                            TitleMessage={titleMessage}
                                            Options={optiones}
                                        />
                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <button type="submit" disabled={isSubmitting}>
                                                Submit
                                            </button>
                                        </div>
                                    </MainCard>
                                </Grid>
                            </Grid>
                        </>
                    );
                }}
            </Formik>
        </>
    );
};

export default Layouts;
