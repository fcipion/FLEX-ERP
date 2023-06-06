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
// import { useDispatch, useSelector, dispatch } from 'store';
import { dispatch, useDispatch, useSelector } from '../../store/index';
import { getMoneda, getMonedaById } from 'store/slices/moneda';
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
    compania: Yup.string().required('Compania is required'),
    simbolo: Yup.string().required('Simbolo is required'),
    descripcion: Yup.string().required('Descripcion is required')
});

function generateId() {
    return Date.now().toString() + Math.random().toString().slice(2);
}

// const datos = [
//     {
//         id: '63e10c1213e077ea89878cae',
//         compania: '6350d461c9b459ca1d63c243',
//         simbolo: 'DO',
//         descripcion: 'Peso Dominicano',
//         estatus: true
//     },
//     {
//         id: '2',
//         compania: '6350d461c9b459ca1d63c243',
//         simbolo: 'USD',
//         descripcion: 'Dolar',
//         estatus: true
//     },
//     {
//         id: '3',
//         compania: '6350d461c9b459ca1d63c243',
//         simbolo: 'EUR',
//         descripcion: 'Euro',
//         estatus: true
//     }
// ];

const Monedas = () => {
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
    const { monedas, moneda, error } = useSelector((state) => state.moneda);
    // const { paginas } = useSelector((state) => state.pagina);
    React.useEffect(() => {
        dispatch(getMoneda());
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(getMonedaById(id));
    }, [id, accion, modo]);

    const [alertValue, setAlert] = useState({ type: '', message: '', open: false });
    const [modoAccion, setModoAccion] = useState();
    const [openConfDlg, setOpenConfDlg] = useState(false);

    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    let formTitulo = '';
    switch (modo) {
        case 'create':
            formTitulo = 'Registro de moneda';
            break;
        case 'edit':
            formTitulo = 'Editar moneda';
            break;

        case 'view':
            formTitulo = 'Visualizar moneda';
            break;
        default:
            formTitulo = 'Registro de moneda';
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
        navegate(`/moneda/create/0/${generateId()}`);
    };

    const handlerListar = () => {
        navegate(`/moneda/Index/${id}/${generateId()}`);
    };

    const clickEdit = (value) => {
        /* eslint no-underscore-dangle: 0 */

        navegate(`/moneda/edit/${value}/${generateId()}`);
    };

    const clickView = (value) => {
        /* eslint no-underscore-dangle: 0 */

        navegate(`/moneda/view/${value}/${generateId()}`);
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

    return modo === 'Index' ? (
        <>
            {console.log('monedas', monedas)}
            {monedas.length !== 0 ? (
                <MainCard title="Listado de moneda">
                    <QuickFilteringGrid data={monedas} clickAdd={handlerAdd} clickEdit={clickEdit} clickView={clickView} />
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
                        simbolo: moneda.data ? moneda.data.simbolo : '',
                        descripcion: moneda.data ? moneda.data.descripcion : '',
                        estatus: moneda.data ? moneda.data.estatus : true
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
                                        result = await axios.post(`${url}/registro_moneda`, value);

                                        if (!result.error) {
                                            setMessageInfo({ type: 'success', title: `Creada la moneda: ${result.data.data.descripcion}` });
                                        }
                                        break;
                                    case 'Crear nuevo':
                                        result = await axios.post(`${url}/registro_moneda`, value);
                                        resetForm();

                                        if (!result.error) {
                                            setMessageInfo({ type: 'success', title: `Creada la moneda: ${result.data.data.descripcion}` });
                                        }
                                        break;
                                    case 'Crear editar':
                                        result = await axios.post(`${url}/registro_moneda`, value);
                                        /* eslint no-underscore-dangle: 0 */
                                        navegate(`/moneda/edit/${result.data.data._id}/${generateId()}`);

                                        if (!result.error) {
                                            setMessageInfo({ type: 'success', title: `Creada la moneda: ${result.data.data.descripcion}` });
                                        }
                                        break;
                                    case 'Editar':
                                        result = await axios.put(`${url}/actualizar_moneda/${id}`, value);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Actualizada la moneda: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;

                                    case 'Editar nuevo':
                                        result = await axios.put(`${url}/actualizar_moneda/${id}`, value);
                                        resetForm();
                                        navegate(`/moneda/create/0/${generateId()}`);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Actualizada la moneda: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Copiar':
                                        result = await axios.post(`${url}/registro_moneda`, value);

                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Copiada la moneda: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'delete':
                                        result = await axios.delete(`${url}/eliminar_moneda/${id}`, value);

                                        if (!result.error) {
                                            setMessageInfo({ type: 'warning', title: `Moneda eliminada: ${result.data.data.descripcion}` });
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            } catch (error) {
                                setSubmitting(false);
                                setMessageInfo({ type: 'error', title: `Error creando moneda: ${JSON.stringify(error)}` });
                            }
                            dispatch(getMoneda());
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
                                    monedas.rows,
                                    // Objeto monedas
                                    moneda.data,
                                    value
                                );
                                if (idNexBack === 0) setAlert({ type: 'warning', open: true, message: 'Registro no econtrado' });
                                if (idNexBack !== 0) {
                                    navegate(`/moneda/edit/${idNexBack}/${generateId()}`);
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
                                                    <DropSimbolo
                                                        HandleBlur={handleBlur}
                                                        Errors={errors}
                                                        Touched={touched}
                                                        SetValue={setValueSimbolo}
                                                        Id="simbolo"
                                                        SetFieldValue={setFieldValue}
                                                        Value={values.simbolo}
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

export default Monedas;
