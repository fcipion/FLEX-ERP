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
import DropAlmacen from 'controles/DropAlmacen';
import DropTipoProducto from 'controles/DropTipoProducto';
import ClaseProductos from 'componetes/Gestion/ClaseProductos';
import DropClaseProducto from 'controles/DropClaseProducto';
import DropITBIS from 'controles/DropITBIS';
import DropUnidadMedida from 'controles/DropUnidadMedida';
import DropListaPrecios from 'controles/DropListaPrecios';

const formSchema = Yup.object().shape({
    sucursal: Yup.string().required('Requerido'),
    compania: Yup.string().required('Requerido'),
    descripcion: Yup.string().required('Requerido'),
    almacen: Yup.string().required('Requerido'),
    tipo_producto: Yup.string().required('Requerido'),
    clase_producto: Yup.string().required('Requerido'),
    cantidad_stock: Yup.number().required('Requerido'),
    cantidad_comprometida: Yup.number().required('Requerido'),
    cantidad_disponible: Yup.number().required('Requerido'),
    unidad_medida_compra: Yup.string().required('Requerido'),

    unidad_medida_venta: Yup.string().required('Requerido'),
    unidad_medida_inventario: Yup.string().required('Requerido'),
    lista_precio_venta: Yup.string().required('Requerido'),
    lista_precio_compra: Yup.string().required('Requerido'),
    itbis: Yup.string().required('Requerido')
});

function generateId() {
    return Date.now().toString() + Math.random().toString().slice(2);
}

const Producto = () => {
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
    const { productos, producto, error } = useSelector((state) => state.producto);
    // const { paginas } = useSelector((state) => state.pagina);
    React.useEffect(() => {
        dispatch(getProductos());
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(getProductoById(id));
    }, [id, accion, modo]);

    const [alertValue, setAlert] = useState({ type: '', message: '', open: false });
    const [modoAccion, setModoAccion] = useState();
    const [openConfDlg, setOpenConfDlg] = useState(false);

    console.log('producto', productos);

    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    let formTitulo = '';
    switch (modo) {
        case 'create':
            formTitulo = 'Registro de producto';
            break;
        case 'edit':
            formTitulo = 'Editar producto';
            break;

        case 'view':
            formTitulo = 'Visualizar producto';
            break;
        default:
            formTitulo = 'Registro de producto';
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
        navegate(`/producto/create/0/${generateId()}`);
    };

    const handlerListar = () => {
        console.log('handlerListar');
        navegate(`/producto/Index/${id}/${generateId()}`);
    };

    const clickEdit = (value) => {
        /* eslint no-underscore-dangle: 0 */
        console.log('value', value);
        navegate(`/producto/edit/${value}/${generateId()}`);
    };

    const clickView = (value) => {
        /* eslint no-underscore-dangle: 0 */
        console.log('value', value);
        navegate(`/producto/view/${value}/${generateId()}`);
    };

    return modo === 'Index' ? (
        <>
            {console.log('productos', productos)}
            {productos.length !== 0 ? (
                <MainCard title="Listado de productos">
                    <QuickFilteringGrid data={productos} clickAdd={handlerAdd} clickEdit={clickEdit} clickView={clickView} />
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
                        sucursal: producto.data ? producto.data.sucursal._id : '',
                        descripcion: producto.data ? producto.data.descripcion : '',
                        estatus: producto.data ? producto.data.estatus : true,
                        /* eslint no-underscore-dangle: 0 */
                        almacen: producto.data ? producto.data.almacen._id : '',
                        /* eslint no-underscore-dangle: 0 */
                        tipo_producto: producto.data ? producto.data.tipo_producto._id : '',
                        /* eslint no-underscore-dangle: 0 */
                        clase_producto: producto.data ? producto.data.clase_producto._id : '',
                        cantidad_stock: producto.data ? producto.data.cantidad_stock : '',
                        cantidad_comprometida: producto.data ? producto.data.cantidad_comprometida : '',
                        cantidad_disponible: producto.data ? producto.data.cantidad_disponible : '',
                        inventariable: producto.data ? producto.data.inventariable : true,
                        /* eslint no-underscore-dangle: 0 */
                        unidad_medida_venta: producto.data ? producto.data.unidad_medida_venta._id : '',
                        /* eslint no-underscore-dangle: 0 */
                        unidad_medida_inventario: producto.data ? producto.data.unidad_medida_inventario._id : '',
                        unidad_medida_compra: producto.data ? producto.data.unidad_medida_compra._id : '',
                        /* eslint no-underscore-dangle: 0 */
                        lista_precio_venta: producto.data ? producto.data.lista_precio_venta._id : '',
                        /* eslint no-underscore-dangle: 0 */
                        lista_precio_compra: producto.data ? producto.data.lista_precio_compra._id : '',
                        /* eslint no-underscore-dangle: 0 */
                        itbis: producto.data ? producto.data.itbis._id : ''
                    }}
                    validationSchema={formSchema}
                    onSubmit={(value, { setSubmitting, resetForm }) => {
                        setTimeout(async () => {
                            // const modoAccion = modo;
                            let result = '';
                            console.log('modoAccion', value);

                            if (modo === 'view') {
                                setAlert({ type: 'warning', open: true, message: MensajeVisualizar });
                                setSubmitting(false);
                                return;
                            }

                            try {
                                switch (modoAccion) {
                                    case 'Crear':
                                        result = await axios.post(`${url}/registro_producto`, value);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creada la producto: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Crear nuevo':
                                        result = await axios.post(`${url}/registro_producto`, value);
                                        resetForm();
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creada la producto: ${result.data.data.descripcion}`
                                            });
                                        }
                                        dispatch(getProductos());
                                        break;
                                    case 'Crear editar':
                                        result = await axios.post(`${url}/registro_producto`, value);
                                        /* eslint no-underscore-dangle: 0 */
                                        navegate(`/producto/edit/${result.data.data._id}/${generateId()}`);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Creada la producto: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Editar':
                                        result = await axios.put(`${url}/actualizar_producto/${id}`, value);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Actualizada la producto: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;

                                    case 'Editar nuevo':
                                        result = await axios.put(`${url}/actualizar_producto/${id}`, value);
                                        resetForm();
                                        navegate(`/producto/create/0/${generateId()}`);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Actualizada la producto: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Copiar':
                                        result = await axios.post(`${url}/registro_producto`, value);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Copiada la producto: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'delete':
                                        result = await axios.delete(`${url}/eliminar_producto/${id}`, value);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'warning',
                                                title: `producto eliminada: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            } catch (error) {
                                setSubmitting(false);
                                setMessageInfo({ type: 'error', title: `Error creando producto: ${JSON.stringify(error)}` });
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
                                    // Arreglo de productos
                                    productos.rows,
                                    // Objeto productos
                                    producto.data,
                                    value
                                );
                                if (idNexBack === 0) setAlert({ type: 'warning', open: true, message: 'Registro no econtrado' });
                                if (idNexBack !== 0) {
                                    navegate(`/producto/edit/${idNexBack}/${generateId()}`);
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
                                                <Grid item xs={6}>
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
                                                <Grid item xs={6}>
                                                    <DropAlmacen
                                                        HandleBlur={handleBlur}
                                                        Errors={errors}
                                                        Touched={touched}
                                                        SetValue={setValueSucursal}
                                                        Id="almacen"
                                                        SetFieldValue={setFieldValue}
                                                        Label="almacen"
                                                        Value={values.almacen}
                                                        Onchange={() => {}}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <DropTipoProducto
                                                        HandleBlur={handleBlur}
                                                        Errors={errors}
                                                        Touched={touched}
                                                        SetValue={setValueSucursal}
                                                        Id="tipo_producto"
                                                        SetFieldValue={setFieldValue}
                                                        Label="Tipo de producto"
                                                        Value={values.tipo_producto}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <DropClaseProducto
                                                        HandleBlur={handleBlur}
                                                        Errors={errors}
                                                        Touched={touched}
                                                        SetValue={setValueSucursal}
                                                        Id="clase_producto"
                                                        SetFieldValue={setFieldValue}
                                                        Label="Clase de producto"
                                                        Value={values.clase_producto}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>

                                                <Grid item xs={4}>
                                                    <TextField
                                                        fullWidth
                                                        id="cantidad_stock"
                                                        name="cantidad_stock"
                                                        label="Cantidad en sctock"
                                                        type="number"
                                                        value={values.cantidad_stock}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={errors.cantidad_stock && touched.cantidad_stock}
                                                        helperText={touched.cantidad_stock && errors.cantidad_stock}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </Grid>

                                                <Grid item xs={4}>
                                                    <TextField
                                                        fullWidth
                                                        id="cantidad_comprometida"
                                                        name="cantidad_comprometida"
                                                        label="Cantidad comprometida"
                                                        value={values.cantidad_comprometida}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={errors.cantidad_comprometida && touched.cantidad_comprometida}
                                                        helperText={touched.cantidad_comprometida && errors.cantidad_comprometida}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </Grid>

                                                <Grid item xs={4}>
                                                    <TextField
                                                        fullWidth
                                                        id="cantidad_disponible"
                                                        name="cantidad_disponible"
                                                        label="Cantidad disponible"
                                                        value={values.cantidad_disponible}
                                                        type="number"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={errors.cantidad_disponible && touched.cantidad_disponible}
                                                        helperText={touched.cantidad_disponible && errors.cantidad_disponible}
                                                        renderInput={(params) => <TextField {...params} />}
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
                                                <Grid item xs={6}>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                name="inventariable"
                                                                checked={values.inventariable}
                                                                onChange={(data) => {
                                                                    setFieldValue('inventariable', data.target.checked);
                                                                }}
                                                            />
                                                        }
                                                        label="Inventariable?"
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <DropListaPrecios
                                                        HandleBlur={handleBlur}
                                                        Errors={errors}
                                                        Touched={touched}
                                                        variant="outlined"
                                                        Id="lista_precio_venta"
                                                        SetFieldValue={setFieldValue}
                                                        Label="Lista de precios ventas"
                                                        Value={values.lista_precio_venta}
                                                        Onchange={(value) => {
                                                            setFieldValue('lista_precio_venta', value);
                                                        }}
                                                    />
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <DropListaPrecios
                                                        HandleBlur={handleBlur}
                                                        Errors={errors}
                                                        Touched={touched}
                                                        variant="outlined"
                                                        Id="lista_precio_compra"
                                                        SetFieldValue={setFieldValue}
                                                        Label="Lista de precios compras"
                                                        Value={values.lista_precio_compra}
                                                        Onchange={(value) => {
                                                            setFieldValue('lista_precio_compra', value);
                                                        }}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>

                                                <Grid item xs={4}>
                                                    <DropUnidadMedida
                                                        HandleBlur={handleBlur}
                                                        variant="outlined"
                                                        Errors={errors}
                                                        Touched={touched}
                                                        Id="unidad_medida_venta"
                                                        SetFieldValue={setFieldValue}
                                                        Label="Unidad de medida de venta"
                                                        Value={values.unidad_medida_venta}
                                                        Onchange={(value) => {
                                                            setFieldValue('unidad_medida_venta', value);
                                                        }}
                                                    />
                                                </Grid>

                                                <Grid item xs={4}>
                                                    <DropUnidadMedida
                                                        HandleBlur={handleBlur}
                                                        variant="outlined"
                                                        Errors={errors}
                                                        Touched={touched}
                                                        Id="unidad_medida_inventario"
                                                        SetFieldValue={setFieldValue}
                                                        Label="Unidad de medida de inventario"
                                                        Value={values.unidad_medida_inventario}
                                                        Onchange={(value) => {
                                                            setFieldValue('unidad_medida_inventario', value);
                                                        }}
                                                    />
                                                </Grid>

                                                <Grid item xs={4}>
                                                    <DropUnidadMedida
                                                        HandleBlur={handleBlur}
                                                        variant="outlined"
                                                        Errors={errors}
                                                        Touched={touched}
                                                        Id="unidad_medida_compra"
                                                        SetFieldValue={setFieldValue}
                                                        Label="Unidad de medida de compras"
                                                        Value={values.unidad_medida_compra}
                                                        Onchange={(value) => {
                                                            setFieldValue('unidad_medida_compra', value);
                                                        }}
                                                        // Row={row}
                                                        // Onchange={handlerChange}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <DropITBIS
                                                        HandleBlur={handleBlur}
                                                        Errors={errors}
                                                        Touched={touched}
                                                        Id="itbis"
                                                        SetFieldValue={setFieldValue}
                                                        Label="ITBIS"
                                                        Value={values.itbis}
                                                        // Row={row}
                                                        Onchange={(value, Row, SetFieldValue, Id) => {
                                                            setFieldValue('itbis', value);
                                                        }}
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

export default Producto;
