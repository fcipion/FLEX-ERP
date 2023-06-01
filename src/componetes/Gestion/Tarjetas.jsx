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
import { getTarjetas, getTarjetaById } from 'store/slices/tarjeta';
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
import { transformCreditCardData } from '../../utils/dataTransform';

const formSchema = Yup.object().shape({
    imagen: Yup.string().required('Requerido'),
    sucursal: Yup.string().required('Requerido'),
    compania: Yup.string().required('Requerido'),
    descripcion: Yup.string().required('Requerido')
});

function generateId() {
    return Date.now().toString() + Math.random().toString().slice(2);
}

const Tarjetas = () => {
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
    const { tarjetas, tarjeta, error } = useSelector((state) => state.tarjeta);
    // const { paginas } = useSelector((state) => state.pagina);
    React.useEffect(() => {
        dispatch(getTarjetas());
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(getTarjetaById(id));
    }, [id, accion, modo]);

    const [alertValue, setAlert] = useState({ type: '', message: '', open: false });
    const [modoAccion, setModoAccion] = useState();
    const [openConfDlg, setOpenConfDlg] = useState(false);

    // console.log('rol', rol);

    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    let formTitulo = '';
    switch (modo) {
        case 'create':
            formTitulo = 'Registro de tarjeta';
            break;
        case 'edit':
            formTitulo = 'Editar tarjeta';
            break;

        case 'view':
            formTitulo = 'Visualizar tarjeta';
            break;
        default:
            formTitulo = 'Registro de tarjeta';
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
        navegate(`/tarjeta/create/0/${generateId()}`);
    };

    const handlerListar = () => {
        console.log('handlerListar');
        navegate(`/tarjeta/Index/${id}/${generateId()}`);
    };

    const clickEdit = (value) => {
        /* eslint no-underscore-dangle: 0 */
        console.log('value', value);
        navegate(`/tarjeta/edit/${value}/${generateId()}`);
    };

    const clickView = (value) => {
        /* eslint no-underscore-dangle: 0 */
        console.log('value', value);
        navegate(`/tarjeta/view/${value}/${generateId()}`);
    };

    return modo === 'Index' ? (
        <>
            {console.log('tarjetas', tarjetas)}
            {tarjetas.length !== 0 ? (
                <MainCard title="Listado de tarjeta">
                    <QuickFilteringGrid
                        data={transformCreditCardData(tarjetas)}
                        clickAdd={handlerAdd}
                        clickEdit={clickEdit}
                        clickView={clickView}
                    />
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
                        imagen: tarjeta.imagen ? tarjeta.data.imagen : '',
                        sucursal: tarjeta.data ? tarjeta.data.sucursal : '',
                        descripcion: tarjeta.data ? tarjeta.data.descripcion : '',
                        estatus: tarjeta.data ? tarjeta.data.estatus : true
                    }}
                    validationSchema={formSchema}
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
                                        result = await axios.post(`${url}/registro_tarjetas`, value);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creado la tarjeta: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Crear nuevo':
                                        result = await axios.post(`${url}/registro_tarjetas`, value);
                                        resetForm();
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creado la tarjeta: ${result.data.data.descripcion}`
                                            });
                                        }
                                        dispatch(getTarjetas());
                                        break;
                                    case 'Crear editar':
                                        result = await axios.post(`${url}/registro_tarjetas`, value);
                                        /* eslint no-underscore-dangle: 0 */
                                        navegate(`/tarjeta/edit/${result.data.data._id}/${generateId()}`);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creado la tarjeta: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Editar':
                                        result = await axios.put(`${url}/actualizar_tarjetas/${id}`, value);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Actualizada la tarjeta: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;

                                    case 'Editar nuevo':
                                        result = await axios.put(`${url}/actualizar_tarjetas/${id}`, value);
                                        resetForm();
                                        navegate(`/tarjeta/create/0/${generateId()}`);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Actualizado la tarjeta: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Copiar':
                                        result = await axios.post(`${url}/registro_tarjetas`, value);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Copiado la tarjeta: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'delete':
                                        result = await axios.delete(`${url}/eliminar_tarjetas/${id}`, value);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'warning',
                                                title: `tarjeta eliminada: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            } catch (error) {
                                setSubmitting(false);
                                setMessageInfo({ type: 'error', title: `Error creando el tarjeta: ${JSON.stringify(error)}` });
                            }

                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ values, errors, touched, isSubmitting, setFieldValue, handleChange, handleSubmit, handleBlur }) => {
                        values.compania = userData.compania;
                        // setFieldValue('descripcion', 'Fleirin');
                        console.log('fomrValue', values);

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
                                    // Arreglo de tarjetas
                                    tarjetas.rows,
                                    // Objeto tarjetas
                                    tarjeta.data,
                                    value
                                );
                                if (idNexBack === 0) setAlert({ type: 'warning', open: true, message: 'Registro no econtrado' });
                                if (idNexBack !== 0) {
                                    navegate(`/tarjeta/edit/${idNexBack}/${generateId()}`);
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
                                                    <DropSucursal
                                                        HandleBlur={handleBlur}
                                                        Errors={errors}
                                                        Touched={touched}
                                                        SetValue={setValueSucursal}
                                                        Id="sucursal"
                                                        SetFieldValue={setFieldValue}
                                                        Label="Sucursal"
                                                        Value={values.sucursal}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        id="descripcion"
                                                        name="descripcion"
                                                        label="Descripción"
                                                        value={values.descripcion}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={errors.descripcion && touched.descripcion}
                                                        helperText={touched.descripcion && errors.descripcion}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        type="file"
                                                        id="imagen"
                                                        label="imagen"
                                                        onBlur={handleBlur}
                                                        error={errors.imagen && touched.imagen}
                                                        helperText={touched.imagen && errors.imagen}
                                                        renderInput={(params) => <TextField {...params} />}
                                                        fullWidth
                                                        onChange={handleChange}
                                                        value={values.imagen}
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

export default Tarjetas;
