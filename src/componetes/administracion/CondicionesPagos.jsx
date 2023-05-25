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
import { getCondicionesPagos, getCondicionesPagoById } from 'store/slices/condicionesPago';
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

const formSchema = Yup.object().shape({
    compania: Yup.string().required('Requerido'),
    descripcion: Yup.string().required('Requerido')
});

function generateId() {
    return Date.now().toString() + Math.random().toString().slice(2);
}

const CondicionesPagos = () => {
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
    const { condicionesPagos, condicionesPago, error } = useSelector((state) => state.condicionesPago);
    // const { paginas } = useSelector((state) => state.pagina);
    console.log('condicionesPago', condicionesPago);
    React.useEffect(() => {
        dispatch(getCondicionesPagos());
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(getCondicionesPagoById(id));
    }, [id, accion, modo]);

    const [alertValue, setAlert] = useState({ type: '', message: '', open: false });
    const [modoAccion, setModoAccion] = useState();
    const [openConfDlg, setOpenConfDlg] = useState(false);

    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    let formTitulo = '';
    switch (modo) {
        case 'create':
            formTitulo = 'Registro de condiciones de pago';
            break;
        case 'edit':
            formTitulo = 'Editar condiciones de pago';
            break;

        case 'view':
            formTitulo = 'Visualizar condiciones de pago';
            break;
        default:
            formTitulo = 'Registro de condiciones de pago';
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
        navegate(`/condicionesPago/create/0/${generateId()}`);
    };

    const handlerListar = () => {
        console.log('handlerListar');
        navegate(`/condicionesPago/Index/${id}/${generateId()}`);
    };

    const clickEdit = (value) => {
        /* eslint no-underscore-dangle: 0 */
        console.log('value', value);
        navegate(`/condicionesPago/edit/${value}/${generateId()}`);
    };

    const clickView = (value) => {
        /* eslint no-underscore-dangle: 0 */
        console.log('value', value);
        navegate(`/condicionesPago/view/${value}/${generateId()}`);
    };

    return modo === 'Index' ? (
        <>
            {console.log('rols', condicionesPagos)}
            {condicionesPagos.length !== 0 ? (
                <MainCard title="Listado de condiciones de pago">
                    <QuickFilteringGrid data={condicionesPagos} clickAdd={handlerAdd} clickEdit={clickEdit} clickView={clickView} />
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
                        descripcion: condicionesPago.data ? condicionesPago.data.descripcion : '',
                        estatus: condicionesPago.data ? condicionesPago.data.estatus : true
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
                                        result = await axios.post(`${url}/registro_condiciones_pago`, value);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creado el condición de pago: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Crear nuevo':
                                        result = await axios.post(`${url}/registro_condiciones_pago`, value);
                                        resetForm();
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creado el condición de pago: ${result.data.data.descripcion}`
                                            });
                                        }
                                        dispatch(getCondicionesPagos());
                                        break;
                                    case 'Crear editar':
                                        result = await axios.post(`${url}/registro_condiciones_pago`, value);
                                        /* eslint no-underscore-dangle: 0 */
                                        navegate(`/condicionesPago/edit/${result.data.data._id}/${generateId()}`);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creado el condición de pago: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Editar':
                                        result = await axios.put(`${url}/actualizar_condiciones_pago/${id}`, value);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Actualizado el condición de pago: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;

                                    case 'Editar nuevo':
                                        result = await axios.put(`${url}/actualizar_condiciones_pago/${id}`, value);
                                        resetForm();
                                        navegate(`/condicionesPago/create/0/${generateId()}`);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Actualizado el condición de pago: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Copiar':
                                        result = await axios.post(`${url}/registro_condiciones_pago`, value);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Copiado el condición de pago: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'delete':
                                        result = await axios.delete(`${url}/eliminar_condiciones_pago/${id}`, value);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'warning',
                                                title: `tipo de condición  pago eliminada: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            } catch (error) {
                                setSubmitting(false);
                                setMessageInfo({ type: 'error', title: `Error creando condición de pago: ${JSON.stringify(error)}` });
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
                                    // Arreglo de rols
                                    condicionesPagos.rows,
                                    // Objeto rols
                                    condicionesPago.data,
                                    value
                                );
                                if (idNexBack === 0) setAlert({ type: 'warning', open: true, message: 'Registro no econtrado' });
                                if (idNexBack !== 0) {
                                    navegate(`/condicionesPago/edit/${idNexBack}/${generateId()}`);
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

export default CondicionesPagos;
