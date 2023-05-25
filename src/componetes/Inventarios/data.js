import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, Grid, Divider, FormControl, InputAdornment, Card, Alert, FormControlLabel, Button, IconButton } from '@mui/material';
import * as Yup from 'yup';
import CrudControl from 'controles/CrudControlDocumentos';
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
import { getClienteById } from 'store/slices/clientes';
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
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dropcliente from 'controles/DropCliente';
import DropProductos from 'controles/DropProductos';
import DropUnidadMedida from 'controles/DropUnidadMedida';
import DropListaPrecios from 'controles/DropListaPrecios';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import DropTipoComprobantes from 'controles/DropTipoComprobantes';
import DropDoctores from 'controles/DropDoctores';
import FormattedInputs from 'controles/FormattedInputs';

const formSchema = Yup.object().shape({
    sucursal: Yup.string().required('Requerido'),
    compania: Yup.string().required('Requerido'),
    descripcion: Yup.string().required('Requerido'),
    almacen: Yup.string().required('Requerido'),
    tipo_producto: Yup.string().required('Requerido'),
    clase_producto: Yup.string().required('Requerido'),
    cantidad_stock: Yup.number().required('Requerido'),
    cantidad_comprometida: Yup.number().required('Requerido'),
    cantidad_disponible: Yup.number().required('Requerido')
});

function generateId() {
    return Date.now().toString() + Math.random().toString().slice(2);
}

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3)
    // createData('Eclair', 262, 16.0, 24, 6.0),
    // createData('Cupcake', 305, 3.7, 67, 4.3),
    // createData('Gingerbread', 356, 16.0, 49, 3.9)
];

const FacturasVentas = () => {
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
    const { cliente } = useSelector((state) => state.cliente);
    const [subTotal, setSubTotal] = React.useState(0);
    const [descuentos, setDescuntos] = React.useState(0);
    const [itbis, setItbis] = React.useState(0);
    const [total, setTotal] = React.useState(0);

    const [valueTab, setValueTab] = React.useState('1');
    const [dataRows, setDataRows] = React.useState([
        {
            line_id: 0,
            producto: { title: '', value: '' },
            unidadMedida: { title: '', value: '' },
            cantidad: 0,
            almacen: { title: '', value: '' },
            lista_precio: { title: '', value: '' },
            precios: 0,
            totalAntesDescuentos: 0,
            descuentos: 0,
            totalTrasDescuentos: 0,
            itbis: { title: '', value: '' },
            total_itbis: 0,
            totalSinItbis: 0,
            totalConItbis: 0,
            total_line: 0
        }
    ]);

    const handleChangeTab = (event, newValue) => {
        setValueTab(newValue);
    };
    // const { paginas } = useSelector((state) => state.pagina);
    React.useEffect(() => {
        dispatch(getProductos());
    }, [dispatch]);

    const handleChangeValue = (value, row, SetFieldValue, id) => {
        const indexRow = dataRows.findIndex((dataRow) => dataRow.line_id === row.line_id);
        console.log('indexRow', indexRow);

        setDataRows((previewRows) => {
            previewRows[indexRow][id] = value;
            previewRows[indexRow].totalAntesDescuentos = previewRows[indexRow].cantidad * previewRows[indexRow].precios;
            previewRows[indexRow].totalTrasDescuentos =
                previewRows[indexRow].cantidad * previewRows[indexRow].precios - previewRows[indexRow].descuentos;
            previewRows[indexRow].totalSinItbis =
                previewRows[indexRow].cantidad * previewRows[indexRow].precios - previewRows[indexRow].descuentos;
            previewRows[indexRow].totalConItbis = 0; // previewRows[indexRow].cantidad * previewRows[indexRow].precios - previewRows[indexRow].descuentos;
            previewRows[indexRow].total_line =
                previewRows[indexRow].cantidad * previewRows[indexRow].precios - previewRows[indexRow].descuentos;

            // subTotal
            let subTotal = 0;
            let descuentos = 0;
            let itbis = 0;
            let total = 0;
            previewRows.forEach((dataRow) => {
                subTotal += dataRow.totalAntesDescuentos;
                descuentos += dataRow.descuentos;
                itbis += dataRow.total_itbis;
                total += dataRow.total_line;
            });

            setSubTotal(subTotal);
            setDescuntos(descuentos);
            setItbis(itbis);
            setTotal(total);

            return [...previewRows];
        });

        SetFieldValue('subTotal', subTotal);
        SetFieldValue('descuentos', descuentos);
        SetFieldValue('itbis', itbis);
        SetFieldValue('total', total);
        SetFieldValue('detalle', dataRows);
    };

    const addValues = () => {
        setDataRows((previewRows) => {
            const data = {
                line_id: previewRows.length,
                producto: '',
                cantidad: 0,
                almacen: '',
                lista_precio: '',
                precios: 0,
                totalAntesDescuentos: 0,
                descuentos: 0,
                totalTrasDescuentos: 0,
                itbis: '',
                total_itbis: 0,
                totalSinItbis: 0,
                totalConItbis: 0,
                total_line: 0
            };
            return [...previewRows, data];
        });
    };

    const deleteValues = (row, setFieldValue) => {
        setDataRows((previewRows) => [...previewRows.filter((Row) => Row.line_id !== row.line_id)]);
        setFieldValue('detalle', dataRows);
    };
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
            formTitulo = 'Registro de Factura de clientes';
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
                        cliente: producto.data ? producto.data.cliente._id : ''
                        /* eslint no-underscore-dangle: 0 */
                        // sucursal: producto.data ? producto.data.sucursal._id : '',
                        // descripcion: producto.data ? producto.data.descripcion : '',
                        // estatus: producto.data ? producto.data.estatus : false,
                        // /* eslint no-underscore-dangle: 0 */
                        // almacen: producto.data ? producto.data.almacen._id : '',
                        // /* eslint no-underscore-dangle: 0 */
                        // tipo_producto: producto.data ? producto.data.tipo_producto._id : '',
                        // /* eslint no-underscore-dangle: 0 */
                        // clase_producto: producto.data ? producto.data.clase_producto._id : '',
                        // cantidad_stock: producto.data ? producto.data.cantidad_stock : '',
                        // cantidad_comprometida: producto.data ? producto.data.cantidad_comprometida : '',
                        // cantidad_disponible: producto.data ? producto.data.cantidad_disponible : '',
                        // inventariable: producto.data ? producto.data.inventariable : true
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
                                            <div>
                                                {' '}
                                                <strong>Estatus: Activa</strong>
                                            </div>
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

                                            <Table style={{ width: '100%', marginTop: '1%' }}>
                                                <tr>
                                                    <td style={{ width: '25%' }}>
                                                        <Dropcliente
                                                            HandleBlur={handleBlur}
                                                            Errors={errors}
                                                            Touched={touched}
                                                            Id="cliente"
                                                            SetFieldValue={setFieldValue}
                                                            Label="Cliente"
                                                            Value={values.cliente}
                                                            // Onchange = {(id) => {
                                                            //     dispatch(getClienteById(id));
                                                            // }}
                                                        />
                                                    </td>
                                                    <td style={{ width: '25%' }}>
                                                        <DropSucursal
                                                            HandleBlur={handleBlur}
                                                            Errors={errors}
                                                            Touched={touched}
                                                            Id="sucursal"
                                                            SetFieldValue={setFieldValue}
                                                            Label="Sucursal"
                                                            Value={values.sucursal}
                                                        />
                                                    </td>
                                                    <td style={{ width: '15%' }} rowSpan={3}>
                                                        <div
                                                            style={{
                                                                backgroundColor: '#e3f2fd',
                                                                height: '150px',
                                                                borderRadius: 10,
                                                                marginLeft: '5%'
                                                            }}
                                                        >
                                                            <table style={{ marginLeft: '5%' }}>
                                                                <tr>
                                                                    <td>
                                                                        <strong>Sub Total:</strong>
                                                                    </td>
                                                                    <td>
                                                                        <TextField
                                                                            disabled
                                                                            id="subTotal"
                                                                            style={{ textAlign: 'left' }}
                                                                            size="small"
                                                                            variant="standard"
                                                                            value={subTotal}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <Grid item sx={12}>
                                                                    <Divider
                                                                        style={{
                                                                            backgroundColor: '#e3f2fd',
                                                                            borderRadius: '5px',
                                                                            border: '1px solid blue'
                                                                        }}
                                                                    />
                                                                </Grid>
                                                                <tr>
                                                                    <td>
                                                                        <strong>Descuentos: </strong>
                                                                    </td>
                                                                    <td>
                                                                        <TextField
                                                                            disabled
                                                                            id="descuentos"
                                                                            type="number"
                                                                            style={{ textAlign: 'left' }}
                                                                            size="small"
                                                                            variant="standard"
                                                                            value={descuentos}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <Grid item sx={12}>
                                                                    <Divider
                                                                        style={{
                                                                            backgroundColor: '#e3f2fd',
                                                                            borderRadius: '5px',
                                                                            border: '1px solid blue'
                                                                        }}
                                                                    />
                                                                </Grid>
                                                                <tr>
                                                                    <td>
                                                                        <strong>ITBIS:</strong>
                                                                    </td>
                                                                    <td>
                                                                        <TextField
                                                                            disabled
                                                                            id="itbis"
                                                                            style={{ textAlign: 'left' }}
                                                                            size="small"
                                                                            variant="standard"
                                                                            value={itbis}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <Grid item sx={12}>
                                                                    <Divider
                                                                        style={{
                                                                            backgroundColor: '#e3f2fd',
                                                                            borderRadius: '5px',
                                                                            border: '1px solid blue'
                                                                        }}
                                                                    />
                                                                </Grid>
                                                                <tr>
                                                                    <td>
                                                                        <strong>Total: </strong>
                                                                    </td>
                                                                    <td>
                                                                        <TextField
                                                                            disabled
                                                                            id="total"
                                                                            style={{ textAlign: 'left' }}
                                                                            size="small"
                                                                            variant="standard"
                                                                            value={total}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <div style={{ height: '10px', width: '100%' }} />
                                                <tr>
                                                    <td>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DatePicker
                                                                id="fecha_contabilizacion"
                                                                label="Fecha de contabilización"
                                                                value={values.fecha_contabilizacion}
                                                                onBlur={handleBlur}
                                                                fullWidth
                                                                error={errors.fecha_contabilizacion && touched.fecha_contabilizacion}
                                                                helperText={touched.fecha_contabilizacion && errors.fecha_contabilizacion}
                                                                onChange={(value) => {
                                                                    setFieldValue('fecha_contabilizacion', value);
                                                                }}
                                                                renderInput={(params) => <TextField size="small" fullWidth {...params} />}
                                                            />
                                                        </LocalizationProvider>
                                                    </td>

                                                    <td style={{ width: '25%' }}>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DatePicker
                                                                id="fecha_vencimiento"
                                                                label="Fecha de vencimientos"
                                                                value={values.fecha_vencimiento}
                                                                fullWidth
                                                                onBlur={handleBlur}
                                                                error={errors.fecha_vencimiento && touched.fecha_vencimiento}
                                                                helperText={touched.fecha_vencimiento && errors.fecha_vencimiento}
                                                                onChange={(value) => {
                                                                    // console.log('event', value);
                                                                    // console.log('value', value);

                                                                    // setValue(value);
                                                                    setFieldValue('fecha_vencimiento', value);
                                                                }}
                                                                renderInput={(params) => <TextField size="small" fullWidth {...params} />}
                                                            />
                                                        </LocalizationProvider>
                                                    </td>
                                                </tr>
                                                {/* <div style={{ height: '10px', width: '100%' }} /> */}
                                                <tr>
                                                    <td>
                                                        <DropTipoComprobantes
                                                            HandleBlur={handleBlur}
                                                            Errors={errors}
                                                            Touched={touched}
                                                            Id="tipo_comprobante"
                                                            SetFieldValue={setFieldValue}
                                                            Label="Tipo de comprobantes"
                                                            Value={values.tipo_comprobante}
                                                        />
                                                    </td>

                                                    <td style={{ width: '25%' }}>
                                                        <Grid item xs={12}>
                                                            <TextField
                                                                value={values.ncf}
                                                                id="ncf"
                                                                name="ncf"
                                                                fullWidth
                                                                label="NCF"
                                                                size="small"
                                                                disabled
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                error={errors.ncf && touched.ncf}
                                                                helperText={touched.ncf && errors.ncf}
                                                                renderInput={(params) => <TextField {...params} />}
                                                            />
                                                        </Grid>
                                                    </td>

                                                    <td>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DatePicker
                                                                id="fecha_vencimiento_ncf"
                                                                label="Fecha de vencimientos NCF"
                                                                value={values.fecha_vencimiento_ncf}
                                                                onBlur={handleBlur}
                                                                fullWidth
                                                                error={errors.fecha_vencimiento_ncf && touched.fecha_vencimiento_ncf}
                                                                helperText={touched.fecha_vencimiento_ncf && errors.fecha_vencimiento_ncf}
                                                                onChange={(value) => {
                                                                    // console.log('event', value);
                                                                    // console.log('value', value);

                                                                    // setValue(value);
                                                                    setFieldValue('fecha_vencimiento_ncf', value);
                                                                }}
                                                                renderInput={(params) => <TextField size="small" fullWidth {...params} />}
                                                            />
                                                        </LocalizationProvider>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '25%' }}>
                                                        <DropSucursal
                                                            HandleBlur={handleBlur}
                                                            Errors={errors}
                                                            Touched={touched}
                                                            Id="vendedor"
                                                            SetFieldValue={setFieldValue}
                                                            Label="Vendedor"
                                                            Value={values.vendedor}
                                                        />
                                                    </td>
                                                    <td style={{ width: '25%' }}>
                                                        <DropDoctores
                                                            HandleBlur={handleBlur}
                                                            Errors={errors}
                                                            Touched={touched}
                                                            Id="doctor"
                                                            SetFieldValue={setFieldValue}
                                                            Label="Doctor"
                                                            Value={values.doctor}
                                                        />
                                                    </td>

                                                    <td style={{ width: '25%' }}>
                                                        <TextField
                                                            value={values.nombre}
                                                            id="nombre"
                                                            name="nombre"
                                                            fullWidth
                                                            size="small"
                                                            label="Comentarios"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            error={errors.nombre && touched.nombre}
                                                            helperText={touched.nombre && errors.nombre}
                                                            renderInput={(params) => <TextField {...params} />}
                                                        />
                                                    </td>
                                                </tr>
                                            </Table>
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
                                                    <Divider />
                                                </Grid>

                                                <Box sx={{ width: '100%', typography: 'body1' }}>
                                                    <TabContext value={valueTab}>
                                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                            <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                                                                <Tab label="Articulos" value="1" />
                                                                <Tab label="Datos Repr. comercial" value="2" />
                                                                {/* <Tab label="Finanzas" value="3" /> */}
                                                            </TabList>
                                                        </Box>
                                                        <TabPanel
                                                            style={{ backgroundColor: '#e3f2fd', borderRadius: 5, height: '400px' }}
                                                            value="1"
                                                        >
                                                            <Grid item xs={12}>
                                                                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                                                    <TableContainer component={Paper} sx={{ maxHeight: 390 }}>
                                                                        <Table
                                                                            sx={{ minWidth: 650 }}
                                                                            size="small"
                                                                            aria-label="a dense table"
                                                                        >
                                                                            <TableHead>
                                                                                <TableRow style={{ backgroundColor: 'ButtonFace' }}>
                                                                                    <TableCell style={{ minWidth: 100, maxWidth: 100 }}>
                                                                                        Articulo
                                                                                    </TableCell>
                                                                                    <TableCell style={{ minWidth: 200 }} align="right">
                                                                                        Unidad medida
                                                                                    </TableCell>
                                                                                    <TableCell align="right">Cantidad</TableCell>
                                                                                    <TableCell style={{ minWidth: 200 }} align="right">
                                                                                        Almacen
                                                                                    </TableCell>
                                                                                    <TableCell style={{ minWidth: 200 }} align="right">
                                                                                        Lista precios
                                                                                    </TableCell>
                                                                                    <TableCell style={{ minWidth: 100 }} align="right">
                                                                                        Precios
                                                                                    </TableCell>
                                                                                    <TableCell style={{ minWidth: 200 }} align="right">
                                                                                        Itbis
                                                                                    </TableCell>
                                                                                    <TableCell style={{ minWidth: 150 }} align="right">
                                                                                        Descuentos
                                                                                    </TableCell>
                                                                                    <TableCell style={{ minWidth: 150 }} align="right">
                                                                                        Total
                                                                                    </TableCell>
                                                                                    <TableCell
                                                                                        align="center"
                                                                                        style={{ minWidth: 100, maxWidth: 100 }}
                                                                                    >
                                                                                        Acción
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            </TableHead>
                                                                            <TableBody>
                                                                                {dataRows.map((row) => (
                                                                                    <TableRow
                                                                                        key={row.line_id}
                                                                                        sx={{
                                                                                            '&:last-child td, &:last-child th': {
                                                                                                border: 0
                                                                                            }
                                                                                        }}
                                                                                    >
                                                                                        <TableCell
                                                                                            style={{ minWidth: 200 }}
                                                                                            component="th"
                                                                                            scope="row"
                                                                                        >
                                                                                            <DropProductos
                                                                                                HandleBlur={handleBlur}
                                                                                                variant="standard"
                                                                                                Errors={errors}
                                                                                                Touched={touched}
                                                                                                Id="producto"
                                                                                                SetFieldValue={setFieldValue}
                                                                                                Label=""
                                                                                                Value={row.producto}
                                                                                                Row={row}
                                                                                                Onchange={handleChangeValue}
                                                                                            />
                                                                                        </TableCell>

                                                                                        <TableCell align="right">
                                                                                            <DropUnidadMedida
                                                                                                HandleBlur={handleBlur}
                                                                                                Errors={errors}
                                                                                                variant="standard"
                                                                                                Touched={touched}
                                                                                                Id="unidadMedida"
                                                                                                SetFieldValue={setFieldValue}
                                                                                                Value={row.unidadMedida}
                                                                                                Onchange={handleChangeValue}
                                                                                                Row={row}
                                                                                            />
                                                                                        </TableCell>
                                                                                        <TableCell align="right">
                                                                                            <Grid item xs={12}>
                                                                                                <TextField
                                                                                                    fullWidth
                                                                                                    variant="standard"
                                                                                                    id="cantidad"
                                                                                                    name="cantidad"
                                                                                                    label=""
                                                                                                    type="number"
                                                                                                    defaultValue={row.cantidad}
                                                                                                    onBlur={(value) => {
                                                                                                        handleChangeValue(
                                                                                                            value.target.value,
                                                                                                            row,
                                                                                                            setFieldValue,
                                                                                                            'cantidad'
                                                                                                        );
                                                                                                    }}
                                                                                                    size="small"
                                                                                                />
                                                                                            </Grid>
                                                                                        </TableCell>

                                                                                        <TableCell align="right">
                                                                                            <DropAlmacen
                                                                                                HandleBlur={handleBlur}
                                                                                                Errors={errors}
                                                                                                variant="standard"
                                                                                                Touched={touched}
                                                                                                Id="almacen"
                                                                                                SetFieldValue={setFieldValue}
                                                                                                Label=""
                                                                                                Value={row.almacen}
                                                                                                Onchange={handleChangeValue}
                                                                                                Row={row}
                                                                                            />
                                                                                        </TableCell>

                                                                                        <TableCell align="right">
                                                                                            <DropListaPrecios
                                                                                                HandleBlur={handleBlur}
                                                                                                Errors={errors}
                                                                                                variant="standard"
                                                                                                Touched={touched}
                                                                                                Id="lista_precio"
                                                                                                SetFieldValue={setFieldValue}
                                                                                                Label=""
                                                                                                Value={row.lista_precio}
                                                                                                Onchange={handleChangeValue}
                                                                                                Row={row}
                                                                                            />
                                                                                        </TableCell>

                                                                                        <TableCell align="right">
                                                                                            <Grid item xs={12}>
                                                                                                <TextField
                                                                                                    fullWidth
                                                                                                    variant="standard"
                                                                                                    id="precios"
                                                                                                    name="precios"
                                                                                                    label=""
                                                                                                    type="number"
                                                                                                    defaultValue={row.precios}
                                                                                                    size="small"
                                                                                                    onBlur={(value) => {
                                                                                                        handleChangeValue(
                                                                                                            value.target.value,
                                                                                                            row,
                                                                                                            setFieldValue,
                                                                                                            'precios'
                                                                                                        );
                                                                                                    }}
                                                                                                />
                                                                                            </Grid>
                                                                                        </TableCell>

                                                                                        <TableCell align="right">
                                                                                            <DropListaPrecios
                                                                                                HandleBlur={handleBlur}
                                                                                                Errors={errors}
                                                                                                Touched={touched}
                                                                                                variant="standard"
                                                                                                SetValue={setValueSucursal}
                                                                                                Id="itbis"
                                                                                                SetFieldValue={setFieldValue}
                                                                                                Label=""
                                                                                                Value={values.sucursal}
                                                                                                Onchange={handleChangeValue}
                                                                                                Row={row}
                                                                                            />
                                                                                        </TableCell>
                                                                                        <TableCell align="right">
                                                                                            <Grid item xs={12}>
                                                                                                <TextField
                                                                                                    fullWidth
                                                                                                    variant="standard"
                                                                                                    id="descuentos"
                                                                                                    name="descuentos"
                                                                                                    label=""
                                                                                                    type="number"
                                                                                                    defaultValue={row.descuentos}
                                                                                                    size="small"
                                                                                                    onBlur={(value) => {
                                                                                                        handleChangeValue(
                                                                                                            value.target.value,
                                                                                                            row,
                                                                                                            setFieldValue,
                                                                                                            'descuentos'
                                                                                                        );
                                                                                                    }}
                                                                                                />
                                                                                            </Grid>
                                                                                        </TableCell>
                                                                                        <TableCell align="right">
                                                                                            <Grid item xs={12}>
                                                                                                <TextField
                                                                                                    fullWidth
                                                                                                    variant="standard"
                                                                                                    id="total_line"
                                                                                                    name="total_line"
                                                                                                    label=""
                                                                                                    type="number"
                                                                                                    value={row.total_line}
                                                                                                    size="small"
                                                                                                />
                                                                                            </Grid>
                                                                                        </TableCell>
                                                                                        <TableCell align="right">
                                                                                            <Grid item xs={12}>
                                                                                                <IconButton
                                                                                                    aria-label="Agregar"
                                                                                                    style={{ width: '30px' }}
                                                                                                    onClick={addValues}
                                                                                                >
                                                                                                    <AddCircleTwoToneIcon
                                                                                                        titleAccess="Agregar"
                                                                                                        fontSize="medium"
                                                                                                        color="primary"
                                                                                                    />
                                                                                                </IconButton>

                                                                                                <IconButton
                                                                                                    aria-label="Agregar"
                                                                                                    style={{ width: '30px' }}
                                                                                                >
                                                                                                    <DeleteTwoToneIcon
                                                                                                        onClick={() => {
                                                                                                            deleteValues(
                                                                                                                row,
                                                                                                                setFieldValue
                                                                                                            );
                                                                                                        }}
                                                                                                        titleAccess="Eliminar"
                                                                                                        fontSize="medium"
                                                                                                        color="warning"
                                                                                                    />
                                                                                                </IconButton>
                                                                                            </Grid>
                                                                                        </TableCell>
                                                                                    </TableRow>
                                                                                ))}
                                                                            </TableBody>
                                                                        </Table>
                                                                    </TableContainer>
                                                                </Paper>
                                                            </Grid>

                                                            <Button
                                                                onClick={() => {
                                                                    addValues();
                                                                }}
                                                                size="small"
                                                                variant="outlined"
                                                                endIcon={<AddCircleTwoToneIcon />}
                                                            >
                                                                Agregar
                                                            </Button>
                                                        </TabPanel>
                                                        <TabPanel
                                                            style={{ backgroundColor: '#e3f2fd', borderRadius: 5, height: '400px' }}
                                                            value="2"
                                                        >
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
                                                                        id="rnc"
                                                                        label="RNC"
                                                                        onBlur={handleBlur}
                                                                        error={errors.valores && touched.valores}
                                                                        helperText={touched.valores && errors.valores}
                                                                        renderInput={(params) => <TextField {...params} />}
                                                                        fullWidth
                                                                        multiline
                                                                        defaultValue={cliente.data ? cliente.data.documento : ''}
                                                                        value={values.valores}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <TextField
                                                                        id="termino_pago"
                                                                        label="Terminos pago"
                                                                        onBlur={handleBlur}
                                                                        error={errors.termino_pago && touched.termino_pago}
                                                                        helperText={touched.termino_pago && errors.termino_pago}
                                                                        renderInput={(params) => <TextField {...params} />}
                                                                        fullWidth
                                                                        multiline
                                                                        defaultValue={
                                                                            cliente.data ? cliente.data.termino_pago.descripcion : ''
                                                                        }
                                                                        value={values.termino_pago}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </TabPanel>
                                                        <TabPanel
                                                            style={{ backgroundColor: '#e3f2fd', borderRadius: 5, height: '400px' }}
                                                            value="3"
                                                        >
                                                            <Grid item xs={12}>
                                                                <Divider />
                                                            </Grid>
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
                                                                        SetValue={setValueSucursal}
                                                                        Id="sucursal"
                                                                        SetFieldValue={setFieldValue}
                                                                        Label="Moneda"
                                                                        Value={values.sucursal}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <DropSucursal
                                                                        HandleBlur={handleBlur}
                                                                        Errors={errors}
                                                                        Touched={touched}
                                                                        SetValue={setValueSucursal}
                                                                        Id="sucursal"
                                                                        SetFieldValue={setFieldValue}
                                                                        Label="Tipo de cambio"
                                                                        Value={values.sucursal}
                                                                    />
                                                                </Grid>

                                                                <Grid item xs={6}>
                                                                    <DropSucursal
                                                                        HandleBlur={handleBlur}
                                                                        Errors={errors}
                                                                        Touched={touched}
                                                                        SetValue={setValueSucursal}
                                                                        Id="sucursal"
                                                                        SetFieldValue={setFieldValue}
                                                                        Label="Tipo de ingreso"
                                                                        Value={values.sucursal}
                                                                    />
                                                                </Grid>

                                                                <Grid item xs={6}>
                                                                    <DropSucursal
                                                                        HandleBlur={handleBlur}
                                                                        Errors={errors}
                                                                        Touched={touched}
                                                                        SetValue={setValueSucursal}
                                                                        Id="sucursal"
                                                                        SetFieldValue={setFieldValue}
                                                                        Label="Medio de pago"
                                                                        Value={values.sucursal}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <DropSucursal
                                                                        HandleBlur={handleBlur}
                                                                        Errors={errors}
                                                                        Touched={touched}
                                                                        SetValue={setValueSucursal}
                                                                        Id="sucursal"
                                                                        SetFieldValue={setFieldValue}
                                                                        Label="Caja"
                                                                        Value={values.sucursal}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </TabPanel>
                                                    </TabContext>
                                                </Box>

                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Divider />
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

export default FacturasVentas;
