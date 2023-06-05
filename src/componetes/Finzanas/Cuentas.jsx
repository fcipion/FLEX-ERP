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
import { getCuentaById, getCuentas } from 'store/slices/cuenta';
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
import DropSucursal from 'controles/DropSucursal';

const formSchema = Yup.object().shape({
    sucursal: Yup.string().required('Requerido'),
    cuenta: Yup.string().required('Requerido'),
    descripcion: Yup.string().required('Requerido')
    // cuenta_padre: Yup.string().required('Requerido')

    // "sucursal": "63eda7148be8934d80788654",
    // "cuenta": "12221345",
    // "descripcion": "Cuenta contable prueba",
    // "cuenta_padre": null,
    // "estatus": true
});

function generateId() {
    return Date.now().toString() + Math.random().toString().slice(2);
}

const Cuentas = () => {
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
    const { cuenta, cuentas, error } = useSelector((state) => state.cuenta);
    // const { paginas } = useSelector((state) => state.pagina);
    React.useEffect(() => {
        dispatch(getCuentas());
    }, [id, accion, modo]);

    React.useEffect(() => {
        dispatch(getCuentaById(id));
    }, [id, accion, modo]);

    const [alertValue, setAlert] = useState({ type: '', message: '', open: false });
    const [modoAccion, setModoAccion] = useState();
    const [openConfDlg, setOpenConfDlg] = useState(false);

    console.log('cuenta', cuenta);
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    let formTitulo = '';
    switch (modo) {
        case 'create':
            formTitulo = 'Registro de cuenta';
            break;
        case 'edit':
            formTitulo = 'Editar cuenta';
            break;

        case 'view':
            formTitulo = 'Visualizar cuenta';
            break;
        default:
            formTitulo = 'Registro de cuenta';
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
        navegate(`/cuenta/create/0/${generateId()}`);
    };

    const handlerListar = () => {
        console.log('handlerListar');
        navegate(`/cuenta/Index/${id}/${generateId()}`);
    };

    const clickEdit = (value) => {
        /* eslint no-underscore-dangle: 0 */
        console.log('value', value);
        navegate(`/cuenta/edit/${value}/${generateId()}`);
    };

    const clickView = (value) => {
        /* eslint no-underscore-dangle: 0 */
        console.log('value', value);
        navegate(`/cuenta/view/${value}/${generateId()}`);
    };

    console.log('error', error);
    return modo === 'Index' ? (
        <>
            {cuentas.length !== 0 ? (
                <MainCard title="Listado de cuentas">
                    <QuickFilteringGrid data={cuentas} clickAdd={handlerAdd} clickEdit={clickEdit} clickView={clickView} />
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
                        sucursal: cuenta.data ? cuenta.data.sucursal._id : '',
                        cuenta: cuenta.data ? cuenta.data.cuenta : '',
                        cuenta_padre: cuenta.data ? cuenta.data.cuenta_padre : null,
                        estatus: cuenta.data ? cuenta.data.estatus : false
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
                                        result = await axios.post(`${url}/registro_cuenta_contable`, value);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creada el cuenta: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Crear nuevo':
                                        result = await axios.post(`${url}/registro_cuenta_contable`, value);
                                        resetForm();
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creada el cuenta: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Crear editar':
                                        result = await axios.post(`${url}/registro_cuenta_contable`, value);
                                        /* eslint no-underscore-dangle: 0 */
                                        navegate(`/cuenta/edit/${result.data.data._id}/${generateId()}`);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creada el cuenta: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Editar':
                                        result = await axios.put(`${url}/actualizar_cuenta_contable/${id}`, value);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Actualizada el cuenta: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;

                                    case 'Editar nuevo':
                                        result = await axios.put(`${url}/actualizar_cuenta_contable/${id}`, value);
                                        resetForm();
                                        navegate(`/cuenta/create/0/${generateId()}`);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Actualizada el cuenta: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Copiar':
                                        result = await axios.post(`${url}/registro_cuenta_contable`, value);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Copiada el cuenta: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'delete':
                                        result = await axios.delete(`${url}/eliminar_cuenta_contable/${id}`, value);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'warning',
                                                title: `cuenta eliminado: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            } catch (error) {
                                setSubmitting(false);
                                setMessageInfo({ type: 'error', title: `Error creando cuenta: ${JSON.stringify(error)}` });
                            }

                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ values, errors, touched, isSubmitting, setFieldValue, handleChange, handleSubmit, handleBlur }) => {
                        //  values.cuenta = userData.cuenta;
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
                                    cuentas.rows,
                                    // Objeto monedas
                                    cuenta.data,
                                    value
                                );
                                if (idNexBack === 0) setAlert({ type: 'warning', open: true, message: 'Registro no econtrado' });
                                if (idNexBack !== 0) {
                                    navegate(`/cuenta/edit/${idNexBack}/${generateId()}`);
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
                                                        Id="sucursal"
                                                        SetFieldValue={setFieldValue}
                                                        Label="Sucursal"
                                                        Value={values.sucursal}
                                                        Onchange={(value) => {
                                                            setFieldValue('sucursal', value);
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        value={values.cuenta}
                                                        id="cuenta"
                                                        label="Cuenta"
                                                        fullWidth
                                                        size="small"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={errors.cuenta && touched.cuenta}
                                                        helperText={touched.cuenta && errors.cuenta}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="descripcion"
                                                        label="Descripción"
                                                        onBlur={handleBlur}
                                                        size="small"
                                                        error={errors.descripcion && touched.descripcion}
                                                        helperText={touched.descripcion && errors.descripcion}
                                                        renderInput={(params) => <TextField {...params} />}
                                                        fullWidth
                                                        multiline
                                                        value={values.descripcion}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="cuenta_padre"
                                                        label="Cuenta padre"
                                                        size="small"
                                                        onBlur={handleBlur}
                                                        error={errors.cuenta_padre && touched.cuenta_padre}
                                                        helperText={touched.cuenta_padre && errors.cuenta_padre}
                                                        renderInput={(params) => <TextField {...params} />}
                                                        fullWidth
                                                        multiline
                                                        value={values.cuenta_padre}
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

export default Cuentas;
