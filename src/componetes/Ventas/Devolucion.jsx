import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, Grid, Divider, FormControl, InputAdornment, Card, Alert, FormControlLabel, Button, IconButton } from '@mui/material';
import * as Yup from 'yup';
import CrudControl from 'controles/CrudControlDocumentos';
import MainCard from 'ui-component/cards/MainCard';
import { Block, EmailTwoTone, Mode, ModeFanOff, Preview, Storm } from '@mui/icons-material';
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
import { getVentaById, getVentas } from 'store/slices/venta';
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
import CrudControlTool from 'controles/CrudControlTool';
import { Stack } from '@mui/system';
import { styled, useTheme } from '@mui/material/styles';
import Almacen from 'store/slices/almacen';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import ControlDetalleDocumento from 'controles/ControlDetalleDocumento';
import CrudControlPagos from 'controles/CrudControlPagos';
import PagosRecibidos from './PagosRecibidos';
import { getDeterminacionPrecioById, getDeterminacionPrecios } from 'store/slices/determinacionPrecio';
import { getItbiss, getItbisById } from 'store/slices/itbis';

import Factura from './Factura.json';
import DropCajas from 'controles/DropCajas';
import DropCodicionPago from 'controles/DropCodicionPago';

// console.log('Facturas', Factura);
const formSchema = Yup.object().shape({
    // compania: Yup.string().required('Requerido'),
    // cliente: Yup.string().required('Requerido'),
    // sucursal: Yup.string().required('Requerido'),
    // tipo_comprobante: Yup.string().required('Requerido'),
    // vendedor: Yup.string().required('Requerido'),
    // fecha_contabilizacion: Yup.date().required('Requerido'),
    // fecha_vencimiento: Yup.date().required('Requerido'),
    // doctor: Yup.number().required('Requerido'),
    // comentarios: Yup.string().required('Requerido'),
    // rnc: Yup.string().required('Requerido'),
    // subTotal: Yup.string().required('Requerido'),
    // total: Yup.string().required('Requerido')
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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

const HandleValueChange = (event, valueField) => {
    const { id } = event.target;

    console.log('id', event);
    document.getElementById([id]).value = formatter.format(valueField[id]);
};

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
    const { venta, ventas, error } = useSelector((state) => state.venta);
    const { determinacionPrecios, determinacionPrecio } = useSelector((state) => state.determinacionPrecio);
    const { itbis, itbiss } = useSelector((state) => state.itbis);

    const { cliente } = useSelector((state) => state.cliente);
    const [subTotal, setSubTotal] = React.useState(0);
    const [totalDescuentos, setTotalDesc] = React.useState(0);
    const [valueItbis, setValueItbis] = React.useState(0);
    const [total, setTotal] = React.useState(0);
    const [valueDescuentoCB, setValueDescuentoCB] = React.useState(0);
    const [valueTab, setValueTab] = React.useState('1');
    const [valuePago, setValuePago] = React.useState(false);
    const [datosClientes, SetDatosCliente] = React.useState({});
    // Datos detalle de la factura;
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
            total_line: 0,
            porcentajeITBIS: 0
        }
    ]);
    // Datos cabecera de la facturas;
    const [dataCB, setDataCB] = React.useState({
        compania: userData.compania,
        cliente: '',
        sucursal: '',
        tipo_comprobante: '',
        vendedor: '',
        fecha_contabilizacion: Date.now(),
        fecha_vencimiento: Date.now(),
        doctor: '',
        comentarios: '',
        rnc: '',
        subTotal: 0,
        totalDescuentos: 0,
        itbis: 0,
        total: 0,
        fecha_vencimiento_ncf: '',
        descuentosCB: 0,
        detalle: [],
        pago: {}
    });
    // Use state para capturar la data de la factura (Cabecera y pago recibido);
    const inicialState = {
        compania: null,
        sucursal: null,
        cliente: null,
        vendedor: null,
        caja: null,
        doctor: null,
        totalDescuentos: 0,
        montoAplicado: 0,
        totalPendiente: 0,
        subTotal: 0,
        itbis: 0,
        total: 0,
        descuentosCB: 0,
        fecha_vencimiento: '',
        fecha_contabilizacion: '',
        comentarios: '',
        moneda: null,
        tipo_cambio: null,
        condicion_pago: null,
        tipo_comprobante: null,
        ncf: ' ',
        fecha_vencimiento_ncf: '',
        rnc: '',
        tipo_ingreso: null,
        medio_pago: null,
        detalles: [],
        proceso_medio_pago: [
            {
                medio_pago: null,
                cuenta: '',
                monto: 0
            },
            {
                medio_pago: null,
                cuenta: null,
                monto: 0,
                datos_tarjeta: [
                    {
                        tarjeta: null,
                        numero: '',
                        propietario: ''
                    }
                ]
            },
            {
                medio_pago: null,
                cuenta: null,
                monto: 0,
                datos_cheque: [
                    {
                        banco: null,
                        numero: ''
                    }
                ]
            }
        ],
        reporte: false,
        estatus: true,
        cancelada: false
    };
    const [facturas, setFacturas] = React.useState(inicialState);

    // Actualizar useState de facturas;
    const HandlerChangeValues = (field, value, proceso, row, SetFieldValue, DatosProducto, id) => {
        console.log('proceso', proceso);
        console.log('value', value);

        setFacturas((previewValues) => {
            // Retornar valores de la cabecera de la facturas
            // Agregar datos de la cabecera de la factura;
            // const montoAplicado = parseFloat(previewValues.montoAplicado);
            // const totalPendiente = parseFloat(previewValues.totalPendiente);

            if (proceso === 'FACTURA_CABECERA') {
                previewValues[field] = value;
            }

            if (proceso === 'FACTURA_DETALLE') {
                // Extrar el index de la linea de la factura;
                const indexRow = facturas.detalles.findIndex((dataRow) => dataRow.line_id === row.line_id);

                // Determinación de precios; Se recorre el arreglo de determinacion de precios, para idicar el precio del ariticulo;
                const datosDeterminacionPrecios = determinacionPrecios.rows
                    .find((result) => result.lista_precio === '63edb3f91c0168b436a1ef60')
                    .detalles.find((dResulto) => {
                        console.log('Resuldato', dResulto);
                        return (
                            /* eslint no-underscore-dangle: 0 */
                            dResulto.producto._id ===
                                /* eslint no-underscore-dangle: 0 */
                                DatosProducto._id && dResulto.unidad_medida._id === DatosProducto.unidad_medida_venta._id
                        );
                    }); // DatosProducto.lista_precio_venta)

                // Determinación de ITBIS; determinar el ITBIS que tiene asignado el articulo.
                let porcentajeITBIS = 0;
                const datosDeterminacionItbis = itbiss.rows.find((result) => result._id === value);
                if (datosDeterminacionItbis) {
                    datosDeterminacionItbis.detalles.forEach((data) => {
                        porcentajeITBIS += parseFloat(data.tipo_itbis.porcentaje);
                    });
                }
                console.log('valueItbis', porcentajeITBIS);

                // DatosProducto.lista_precio_venta)
                setFacturas((previewRows) => {
                    previewRows.detalles[indexRow].porcentajeITBIS =
                        id === 'itbis' ? porcentajeITBIS : previewRows.detalles[indexRow].porcentajeITBIS;
                    previewRows.detalles[indexRow][id] = value;
                    /* eslint no-underscore-dangle: 0 */
                    previewRows.detalles[indexRow].unidadMedida = DatosProducto.unidad_medida_venta
                        ? DatosProducto.unidad_medida_venta._id
                        : previewRows.detalles[indexRow].unidadMedida;
                    /* eslint no-underscore-dangle: 0 */
                    previewRows.detalles[indexRow].almacen = DatosProducto.almacen
                        ? DatosProducto.almacen._id
                        : previewRows.detalles[indexRow].almacen;
                    /* eslint no-underscore-dangle: 0 */
                    previewRows.detalles[indexRow].lista_precio = DatosProducto.lista_precio_venta
                        ? DatosProducto.lista_precio_venta._id
                        : '63edb3f91c0168b436a1ef60';
                    /* eslint no-underscore-dangle: 0 */
                    previewRows.detalles[indexRow].precio = datosDeterminacionPrecios
                        ? datosDeterminacionPrecios.precio
                        : previewRows.detalles[indexRow].precio;
                    previewRows.detalles[indexRow].itbis = DatosProducto.itbis
                        ? DatosProducto.itbis._id
                        : previewRows.detalles[indexRow].itbis;
                    previewRows.detalles[indexRow].total_itbis =
                        ((parseFloat(previewRows.detalles[indexRow].cantidad) * parseFloat(previewRows.detalles[indexRow].precio)) / 100) *
                        previewRows.detalles[indexRow].porcentajeITBIS;
                    // console.log(
                    //     'ITBIS',
                    //     ((parseFloat(previewRows[indexRow].cantidad) * parseFloat(previewRows[indexRow].precios)) / 100) * porcentajeITBIS
                    // );
                    previewRows.detalles[indexRow].totalAntesDescuentos =
                        previewRows.detalles[indexRow].cantidad * previewRows.detalles[indexRow].precio;
                    previewRows.detalles[indexRow].totalTrasDescuentos =
                        previewRows.detalles[indexRow].cantidad * previewRows.detalles[indexRow].precio -
                        previewRows.detalles[indexRow].descuentos;
                    previewRows.detalles[indexRow].totalSinItbis =
                        previewRows.detalles[indexRow].cantidad * previewRows.detalles[indexRow].precio -
                        previewRows.detalles[indexRow].descuentos;
                    previewRows.detalles[indexRow].totalConItbis = 0; // previewRows[indexRow].cantidad * previewRows[indexRow].precios - previewRows[indexRow].descuentos;
                    previewRows.detalles[indexRow].total_line =
                        previewRows.detalles[indexRow].cantidad * previewRows.detalles[indexRow].precio -
                        previewRows.detalles[indexRow].descuentos;

                    // subTotal
                    let subTotal = 0;
                    let totalDescuentos = 0;
                    let itbis = 0;
                    let total = 0;
                    previewRows.detalles.forEach((dataRow) => {
                        subTotal += parseFloat(dataRow.totalAntesDescuentos);
                        totalDescuentos += parseFloat(dataRow.descuentos);
                        itbis += parseFloat(dataRow.total_itbis);
                        total += parseFloat(dataRow.total_line);
                    });

                    previewRows.subTotal = subTotal;
                    previewRows.totalDescuentos = totalDescuentos;
                    previewRows.itbis = itbis;
                    previewRows.total = total + itbis;
                    // setSubTotal(subTotal);
                    // setTotalDesc(totalDescuentos);
                    // setValueItbis(itbis);
                    // setTotal(total);

                    SetFieldValue('subTotal', subTotal);
                    SetFieldValue('totalDescuentos', totalDescuentos);
                    SetFieldValue('itbis', itbis);
                    SetFieldValue('total', total);
                    return previewRows;
                });

                // setDataCB((previewCB) => {
                //     previewCB.subTotal = subTotal;
                //     previewCB.totalDescuentos = parseFloat(totalDescuentos) + parseFloat(previewCB.descuentosCB);
                //     previewCB.itbis = valueItbis;
                //     previewCB.total = total;
                //     previewCB.detalle = dataRows;
                //     return previewCB;
                // });

                // SetFieldValue('subTotal', subTotal);
                // SetFieldValue('totalDescuentos', totalDescuentos);
                // SetFieldValue('itbis', itbis);
                // SetFieldValue('total', total);
                // console.log('dataRows', dataRows);
                // SetFieldValue('detalle', dataRows);
            }

            if (proceso === 'PAGO_RECIBIDO_EFECTIVO') {
                previewValues.proceso_medio_pago[0][field] = value;
                // previewValues.montoAplicado = montoAplicado + parseFloat(value);
                // previewValues.totalPendiente = totalPendiente - parseFloat(value);
            }

            if (proceso === 'PAGO_RECIBIDO_TARJETA') {
                if (field === 'tarjeta' || field === 'numero' || field === 'propietario') {
                    previewValues.proceso_medio_pago[1].datos_tarjeta[0][field] = value;
                    // previewValues.montoAplicado = montoAplicado + parseFloat(value);
                    // previewValues.totalPendiente = totalPendiente - parseFloat(value);
                } else {
                    previewValues.proceso_medio_pago[1][field] = value;
                    // previewValues.montoAplicado = montoAplicado + parseFloat(value);
                    // previewValues.totalPendiente = totalPendiente - parseFloat(value);
                }
            }

            if (proceso === 'PAGO_RECIBIDO_CHEQUE') {
                if (field === 'banco' || field === 'numero') {
                    previewValues.proceso_medio_pago[2].datos_cheque[0][field] = value;
                    // previewValues.montoAplicado = montoAplicado + parseFloat(value);
                    // previewValues.totalPendiente = totalPendiente - parseFloat(value);
                } else {
                    previewValues.proceso_medio_pago[2][field] = value;
                    // previewValues.montoAplicado = montoAplicado + parseFloat(value);
                    // previewValues.totalPendiente = totalPendiente - parseFloat(value);
                }
            }

            // Sumar total aplicado cobros;
            const valorInicial = 0;
            const totalAplicado = previewValues.proceso_medio_pago.reduce(
                (accumulator, currentValue) => accumulator + parseFloat(currentValue.monto),
                valorInicial
            );

            // Sumar total de descuentos a nivel de linea;
            const totalDescuentos = previewValues.detalles.reduce(
                (accumulator, currentValue) => accumulator + parseFloat(currentValue.descuentos),
                valorInicial
            );
            // console.log('totalAplicado', totalAplicado);
            // Monto Aplicado
            previewValues.montoAplicado = totalAplicado;
            previewValues.totalDescuentos = totalDescuentos + previewValues.descuentosCB;
            // Monto Pendiente;
            const totalPendiente = previewValues.subTotal - totalAplicado;
            console.log('totalPendiente', totalPendiente);
            previewValues.totalPendiente = totalPendiente;
            SetFieldValue('montoAplicado', totalAplicado);
            SetFieldValue('totalPendiente', totalPendiente);
            // Sumar total pendiente cobros

            return previewValues; // .proceso_medio_pago.filter((resultData) => resultData.monto !== 0);
        });
    };

    //
    // // Datos detalle del pago
    // const [dataPagos, setDataPagos] = React.useState({
    //     compania: userData.compania,
    //     cliente: '',
    //     sucursal: '',
    //     tipo_comprobante: '',
    //     vendedor: '',
    //     caja: '',
    //     fecha_contabilizacion: Date.now(),
    //     fecha_vencimiento: Date.now(),
    //     comentarios: '',
    //     proceso_medio_pago: [
    //         {
    //             medio_pago: '',
    //             cuenta: '',
    //             monto: 0
    //         },
    //         {
    //             medio_pago: '',
    //             cuenta: '',
    //             monto: 0,
    //             datos_tarjeta: [
    //                 {
    //                     tarjeta: '',
    //                     numero: '',
    //                     propietario: ''
    //                 }
    //             ]
    //         },
    //         {
    //             medio_pago: '',
    //             cuenta: '',
    //             monto: 100,
    //             datos_cheque: [
    //                 {
    //                     banco: '',
    //                     numero: ''
    //                 }
    //             ]
    //         }
    //     ]
    // });

    console.log('DatosFacturas', facturas);

    const handleChangeTab = (event, newValue) => {
        event.defaultPrevented = true;
        console.log('newValue', newValue);
        setValueTab(newValue);
    };
    // const { paginas } = useSelector((state) => state.pagina);
    React.useEffect(() => {
        dispatch(getVentas());
    }, [dispatch]);

    // const { paginas } = useSelector((state) => state.pagina);
    React.useEffect(() => {
        dispatch(getDeterminacionPrecios());
    }, [dispatch]);

    // const { paginas } = useSelector((state) => state.pagina);
    React.useEffect(() => {
        dispatch(getItbiss());
    }, [dispatch]);

    const handleChangeValue = (value, row, SetFieldValue, id, type, DatosProducto) => {
        if (type === 'c') {
            console.log('handleChangeValue', value);
            setDataCB((previewCB) => {
                previewCB[id] = value;
                return previewCB;
            });
        }

        if (type === 'd') {
            const indexRow = dataRows.findIndex((dataRow) => dataRow.line_id === row.line_id);

            // alert(value);
            // Determinación de precios;
            const datosDeterminacionPrecios = determinacionPrecios.rows
                .find((result) => result.lista_precio === '63edb3f91c0168b436a1ef60')
                .detalles.find((dResulto) => {
                    console.log('Resuldato', dResulto);
                    return (
                        /* eslint no-underscore-dangle: 0 */
                        dResulto.producto._id ===
                            /* eslint no-underscore-dangle: 0 */
                            DatosProducto._id && dResulto.unidad_medida._id === DatosProducto.unidad_medida_venta._id
                    );
                }); // DatosProducto.lista_precio_venta)

            // Determinación de ITBIS;
            let porcentajeITBIS = 0;
            const datosDeterminacionItbis = itbiss.rows.find((result) => result._id === value);
            if (datosDeterminacionItbis) {
                datosDeterminacionItbis.detalles.forEach((data) => {
                    porcentajeITBIS += parseFloat(data.tipo_itbis.porcentaje);
                });
            }
            console.log('valueItbis', porcentajeITBIS);

            // DatosProducto.lista_precio_venta)
            setDataRows((previewRows) => {
                previewRows[indexRow].porcentajeITBIS = id === 'itbis' ? porcentajeITBIS : previewRows[indexRow].porcentajeITBIS;
                previewRows[indexRow][id] = value;
                /* eslint no-underscore-dangle: 0 */
                previewRows[indexRow].unidadMedida = DatosProducto.unidad_medida_venta
                    ? DatosProducto.unidad_medida_venta._id
                    : previewRows[indexRow].unidadMedida;
                /* eslint no-underscore-dangle: 0 */
                previewRows[indexRow].almacen = DatosProducto.almacen ? DatosProducto.almacen._id : previewRows[indexRow].almacen;
                /* eslint no-underscore-dangle: 0 */
                previewRows[indexRow].lista_precio = DatosProducto.lista_precio_venta
                    ? DatosProducto.lista_precio_venta._id
                    : '63edb3f91c0168b436a1ef60';
                /* eslint no-underscore-dangle: 0 */
                previewRows[indexRow].precios = datosDeterminacionPrecios
                    ? datosDeterminacionPrecios.precio
                    : previewRows[indexRow].precios;
                previewRows[indexRow].itbis = DatosProducto.itbis ? DatosProducto.itbis._id : previewRows[indexRow].itbis;
                previewRows[indexRow].total_itbis =
                    ((parseFloat(previewRows[indexRow].cantidad) * parseFloat(previewRows[indexRow].precios)) / 100) *
                    previewRows[indexRow].porcentajeITBIS;
                // console.log(
                //     'ITBIS',
                //     ((parseFloat(previewRows[indexRow].cantidad) * parseFloat(previewRows[indexRow].precios)) / 100) * porcentajeITBIS
                // );
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
                let totalDescuentos = 0;
                let itbis = 0;
                let total = 0;
                previewRows.forEach((dataRow) => {
                    subTotal += parseFloat(dataRow.totalAntesDescuentos);
                    totalDescuentos += parseFloat(dataRow.descuentos);
                    itbis += parseFloat(dataRow.total_itbis);
                    total += parseFloat(dataRow.total_line);
                });

                setSubTotal(subTotal);
                setTotalDesc(totalDescuentos);
                setValueItbis(itbis);
                setTotal(total);

                return [...previewRows];
            });

            setDataCB((previewCB) => {
                previewCB.subTotal = subTotal;
                previewCB.totalDescuentos = parseFloat(totalDescuentos) + parseFloat(previewCB.descuentosCB);
                previewCB.itbis = valueItbis;
                previewCB.total = total;
                previewCB.detalle = dataRows;
                return previewCB;
            });

            SetFieldValue('subTotal', subTotal);
            SetFieldValue('totalDescuentos', totalDescuentos);
            SetFieldValue('itbis', itbis);
            SetFieldValue('total', total);
            console.log('dataRows', dataRows);
            SetFieldValue('detalle', dataRows);
        }
    };
    // console.log('dataCB', dataCB);

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
                total_line: 0,
                porcentajeITBIS: 0
            };
            return [...previewRows, data];
        });
    };

    const deleteValues = (row, setFieldValue) => {
        setDataRows((previewRows) => [...previewRows.filter((Row) => Row.line_id !== row.line_id)]);
        setFieldValue('detalle', dataRows);
    };
    React.useEffect(() => {
        dispatch(getVentaById(id));
    }, [id, accion, modo]);

    const [alertValue, setAlert] = useState({ type: '', message: '', open: false });
    const [modoAccion, setModoAccion] = useState();
    const [openConfDlg, setOpenConfDlg] = useState(false);

    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    let formTitulo = '';
    switch (modo) {
        case 'create':
            formTitulo = 'Registro de devolución en venta';
            break;
        case 'edit':
            formTitulo = 'Editar de devolución en venta';
            break;

        case 'view':
            formTitulo = 'Visualizar de devolución en venta';
            break;
        default:
            formTitulo = 'Registro de devolución en venta';
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
        navegate(`/facturaVenta/create/0/${generateId()}`);
    };

    const handlerListar = () => {
        console.log('handlerListar');
        navegate(`/facturaVenta/Index/${id}/${generateId()}`);
    };

    const clickEdit = (value) => {
        /* eslint no-underscore-dangle: 0 */
        console.log('value', value);
        navegate(`/facturaVenta/edit/${value}/${generateId()}`);
    };

    const clickView = (value) => {
        /* eslint no-underscore-dangle: 0 */
        console.log('value', value);
        navegate(`/facturaVenta/view/${value}/${generateId()}`);
    };

    const Aplicarpago = () => {
        alert('AplicarPago');
    };

    const aplicarPagos = () => {
        navegate(`/pagosRecibido/create/0/${generateId()}`);
    };

    return modo === 'Index' ? (
        <>
            {console.log('facturaVenta', ventas)}
            {ventas.length !== 0 ? (
                <MainCard title="Listado de factura">
                    <QuickFilteringGrid data={ventas} clickAdd={handlerAdd} clickEdit={clickEdit} clickView={clickView} />
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
                        compania: facturas.compania,
                        sucursal: facturas.sucursal,
                        cliente: facturas.cliente,
                        vendedor: JSON.parse(localStorage.getItem('userData')).sub,
                        caja: facturas.caja,
                        doctor: facturas.doctor,
                        totalDescuentos: facturas.totalDescuentos,
                        montoAplicado: facturas.montoAplicado,
                        subTotal: facturas.subTotal,
                        itbis: facturas.itbis,
                        total: facturas.total,
                        descuentosCB: facturas.descuentosCB,
                        fecha_vencimiento: facturas.fecha_vencimiento,
                        fecha_contabilizacion: facturas.fecha_contabilizacion,
                        comentarios: facturas.comentarios,
                        moneda: facturas.moneda,
                        tipo_cambio: facturas.tipo_cambio,
                        condicion_pago: facturas.condicion_pago,
                        tipo_comprobante: facturas.tipo_comprobante,
                        ncf: facturas.ncf,
                        fecha_vencimiento_ncf: facturas.fecha_vencimiento,
                        rnc: facturas.rnc,
                        tipo_ingreso: facturas.tipo_ingreso,
                        medio_pago: facturas.medio_pago,
                        detalles: facturas.detalles,
                        proceso_medio_pago: facturas.proceso_medio_pago,
                        reporte: false,
                        estatus: true,
                        cancelada: false
                    }}
                    // initialValues={{
                    //     compania: userData.compania,
                    //     /* eslint no-underscore-dangle: 0 */
                    //     cliente: venta.data ? venta.data.cliente._id : '',
                    //     /* eslint no-underscore-dangle: 0 */
                    //     sucursal: venta.data ? venta.data.sucursal._id : '',
                    //     /* eslint no-underscore-dangle: 0 */
                    //     tipo_comprobante: venta.data ? venta.data.tipo_comprobante._id : '',
                    //     /* eslint no-underscore-dangle: 0 */
                    //     vendedor: venta.data ? venta.data.vendedor._id : '',
                    //     fecha_contabilizacion: venta.data ? venta.data.fecha_contabilizacion : Date.now(),
                    //     fecha_vencimiento: venta.data ? venta.data.fecha_vencimiento : Date.now(),
                    //     /* eslint no-underscore-dangle: 0 */
                    //     doctor: venta.data ? venta.data.doctor._id : '',
                    //     comentarios: venta.data ? venta.data.comentarios : '',
                    //     rnc: venta.data ? venta.data.rnc : '',
                    //     subTotal: venta.data ? venta.data.subTotal : 0,
                    //     totalDescuentos: venta.data ? venta.data.totalDescuentos : 0,
                    //     itbis: venta.data ? venta.data.itbis : 0,
                    //     total: venta.data ? venta.data.total : 0,
                    //     fecha_vencimiento_ncf: venta.data ? venta.data.fecha_vencimiento_ncf : Date.now(),
                    //     descuentosCB: venta.data ? venta.data.descuentosCB : 0,
                    //     detalle: venta.data ? venta.data.detalle : []
                    // }}
                    validationSchema={formSchema}
                    onSubmit={(value, { setSubmitting, resetForm }) => {
                        setTimeout(async () => {
                            // const modoAccion = modo;
                            let result = '';

                            // validar campos requeridos;
                            // Validar campos requerdio

                            // setFacturas((previewRows) => {
                            //     if (previewRows.cliente === '') {
                            //         alert('Campo cliente requerido');
                            //         setSubmitting(false);
                            //     }

                            //     return previewRows;
                            // });

                            if (modo === 'view') {
                                setAlert({ type: 'warning', open: true, message: MensajeVisualizar });
                                setSubmitting(false);
                                return;
                            }

                            try {
                                switch (modoAccion) {
                                    case 'Crear':
                                        alert(JSON.stringify(value));
                                        result = await axios.post(`${url}/registro_venta`, value);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Factura creada: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Crear nuevo':
                                        result = await axios.post(`${url}/registro_venta`, value);
                                        resetForm();
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Factura creada codigo: ${result.data.data.id}`
                                            });

                                            setFacturas((previewValue) => {
                                                previewValue = inicialState;
                                                return previewValue;
                                            });
                                        }
                                        dispatch(getVentas());
                                        break;
                                    case 'Crear editar':
                                        result = await axios.post(`${url}/registro_venta`, value);
                                        /* eslint no-underscore-dangle: 0 */
                                        navegate(`/facturaVenta/edit/${result.data.data._id}/${generateId()}`);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `Factura creada: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Editar':
                                        result = await axios.put(`${url}/actualizar_venta/${id}`, value);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `factura actualizada: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;

                                    case 'Editar nuevo':
                                        result = await axios.put(`${url}/actualizar_venta/${id}`, value);
                                        resetForm();
                                        navegate(`/facturaVenta/create/0/${generateId()}`);
                                        console.log('result', result);
                                        if (!result.error) {
                                            setMessageInfo({
                                                type: 'success',
                                                title: `factura actualizada: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    case 'Copiar':
                                        result = await axios.post(`${url}/registro_venta`, value);
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
                                                title: `factura cancelada: ${result.data.data.descripcion}`
                                            });
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            } catch (error) {
                                setSubmitting(false);
                                setMessageInfo({ type: 'error', title: `Error creando factura: ${JSON.stringify(error)}` });
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
                                    ventas.rows,
                                    // Objeto productos
                                    venta.data,
                                    value
                                );
                                if (idNexBack === 0) setAlert({ type: 'warning', open: true, message: 'Registro no econtrado' });
                                if (idNexBack !== 0) {
                                    navegate(`/facturaVenta/edit/${idNexBack}/${generateId()}`);
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
                                <Grid container spacing="2" style={{ display: valuePago ? 'none' : 'block' }}>
                                    <AlertPOP prop={alertValue} />
                                    <Grid item xs={12} lg={12}>
                                        <MainCard title={formTitulo}>
                                            <div>
                                                {' '}
                                                <strong>Estatus: Activa</strong>
                                            </div>
                                            <CrudControlTool
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
                                                AplicarPago={() => {
                                                    if (facturas.subTotal === 0) {
                                                        alert('Acción no valida para este formulario');
                                                    }
                                                    // else {
                                                    //     setValuePago(true);
                                                    // }
                                                }}
                                            />

                                            <div
                                                style={{
                                                    height: '300px',
                                                    width: '70%',
                                                    marginRight: '2%',
                                                    marginTop: '2%',
                                                    display: 'inline-block'
                                                }}
                                            >
                                                <Grid container spacing="2">
                                                    <Grid item xs={6}>
                                                        <Item>
                                                            <Dropcliente
                                                                HandleBlur={handleBlur}
                                                                Errors={errors}
                                                                Touched={touched}
                                                                Id="cliente"
                                                                SetFieldValue={setFieldValue}
                                                                Label="Cliente"
                                                                Value={facturas.cliente}
                                                                Onchange={(value) => {
                                                                    HandlerChangeValues(
                                                                        'cliente',
                                                                        value,
                                                                        'FACTURA_CABECERA',
                                                                        '',
                                                                        setFieldValue
                                                                    );
                                                                }}
                                                                SetDatosCliente={SetDatosCliente}
                                                            />
                                                        </Item>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Item>
                                                            <DropSucursal
                                                                HandleBlur={handleBlur}
                                                                Errors={errors}
                                                                Touched={touched}
                                                                Id="sucursal"
                                                                SetFieldValue={setFieldValue}
                                                                Label="Sucursal"
                                                                Value={facturas.sucursal}
                                                                Onchange={(value) => {
                                                                    HandlerChangeValues(
                                                                        'sucursal',
                                                                        value,
                                                                        'FACTURA_CABECERA',
                                                                        '',
                                                                        setFieldValue
                                                                    );
                                                                }}
                                                            />
                                                        </Item>
                                                    </Grid>

                                                    <Grid item xs={6}>
                                                        <Item>
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <DatePicker
                                                                    id="fecha_contabilizacion"
                                                                    label="Fecha de contabilización"
                                                                    value={facturas.fecha_contabilizacion}
                                                                    onBlur={handleBlur}
                                                                    fullWidth
                                                                    error={errors.fecha_contabilizacion && touched.fecha_contabilizacion}
                                                                    helperText={
                                                                        touched.fecha_contabilizacion && errors.fecha_contabilizacion
                                                                    }
                                                                    onChange={(value) => {
                                                                        setFieldValue('fecha_contabilizacion', value);
                                                                        HandlerChangeValues(
                                                                            'fecha_contabilizacion',
                                                                            value,
                                                                            'FACTURA_CABECERA',
                                                                            '',
                                                                            setFieldValue
                                                                        );
                                                                    }}
                                                                    renderInput={(params) => (
                                                                        <TextField size="small" fullWidth {...params} />
                                                                    )}
                                                                />
                                                            </LocalizationProvider>
                                                        </Item>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Item>
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <DatePicker
                                                                    id="fecha_vencimiento"
                                                                    label="Fecha de vencimientos"
                                                                    value={facturas.fecha_vencimiento}
                                                                    fullWidth
                                                                    onBlur={handleBlur}
                                                                    error={errors.fecha_vencimiento && touched.fecha_vencimiento}
                                                                    helperText={touched.fecha_vencimiento && errors.fecha_vencimiento}
                                                                    onChange={(value) => {
                                                                        setFieldValue('fecha_vencimiento', value);
                                                                        HandlerChangeValues(
                                                                            'fecha_vencimiento',
                                                                            value,
                                                                            'FACTURA_CABECERA',
                                                                            '',
                                                                            setFieldValue
                                                                        );
                                                                    }}
                                                                    renderInput={(params) => (
                                                                        <TextField size="small" fullWidth {...params} />
                                                                    )}
                                                                />
                                                            </LocalizationProvider>
                                                        </Item>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Item>
                                                            <DropTipoComprobantes
                                                                HandleBlur={handleBlur}
                                                                Errors={errors}
                                                                Touched={touched}
                                                                Id="tipo_comprobante"
                                                                SetFieldValue={setFieldValue}
                                                                Label="Tipo de comprobantes"
                                                                Value={facturas.tipo_comprobante}
                                                                Onchange={(value) => {
                                                                    // handleChangeValue(value, '', '', 'tipo_comprobante', 'c');
                                                                    HandlerChangeValues(
                                                                        'tipo_comprobante',
                                                                        value,
                                                                        'FACTURA_CABECERA',
                                                                        '',
                                                                        setFieldValue
                                                                    );
                                                                }}
                                                            />
                                                        </Item>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Item>
                                                            <TextField
                                                                value={facturas.ncf}
                                                                id="ncf"
                                                                name="ncf"
                                                                fullWidth
                                                                label="NCF"
                                                                size="small"
                                                                disabled
                                                                onChange={(value) => {
                                                                    setFieldValue('ncf', value);
                                                                    HandlerChangeValues(
                                                                        'ncf',
                                                                        value,
                                                                        'FACTURA_CABECERA',
                                                                        '',
                                                                        setFieldValue
                                                                    );
                                                                }}
                                                                onBlur={handleBlur}
                                                                error={errors.ncf && touched.ncf}
                                                                helperText={touched.ncf && errors.ncf}
                                                                renderInput={(params) => <TextField {...params} />}
                                                            />
                                                        </Item>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Item>
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <DatePicker
                                                                    id="fecha_vencimiento_ncf"
                                                                    label="Fecha de vencimientos NCF"
                                                                    value={facturas.fecha_vencimiento_ncf}
                                                                    onBlur={handleBlur}
                                                                    fullWidth
                                                                    error={errors.fecha_vencimiento_ncf && touched.fecha_vencimiento_ncf}
                                                                    helperText={
                                                                        touched.fecha_vencimiento_ncf && errors.fecha_vencimiento_ncf
                                                                    }
                                                                    onChange={(value) => {
                                                                        // setValue(value);
                                                                        setFieldValue('fecha_vencimiento_ncf', value);
                                                                        HandlerChangeValues(
                                                                            'fecha_vencimiento_ncf',
                                                                            value,
                                                                            'FACTURA_CABECERA',
                                                                            '',
                                                                            setFieldValue
                                                                        );
                                                                    }}
                                                                    renderInput={(params) => (
                                                                        <TextField size="small" fullWidth {...params} />
                                                                    )}
                                                                />
                                                            </LocalizationProvider>
                                                        </Item>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Item>
                                                            <DropDoctores
                                                                HandleBlur={handleBlur}
                                                                Errors={errors}
                                                                Touched={touched}
                                                                Id="doctor"
                                                                SetFieldValue={setFieldValue}
                                                                Label="Doctor"
                                                                Value={facturas.doctor}
                                                                Onchange={(value) => {
                                                                    // handleChangeValue(value, '', '', 'doctor', 'c');
                                                                    HandlerChangeValues(
                                                                        'doctor',
                                                                        value,
                                                                        'FACTURA_CABECERA',
                                                                        '',
                                                                        setFieldValue
                                                                    );
                                                                }}
                                                            />
                                                        </Item>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Item>
                                                            <TextField
                                                                defaultValue={dataCB.comentarios}
                                                                id="comentarios"
                                                                name="comentarios"
                                                                fullWidth
                                                                multiline
                                                                size="small"
                                                                label="Comentarios"
                                                                onChange={(value) => {
                                                                    setFieldValue('comentarios', value.target.value);
                                                                    HandlerChangeValues(
                                                                        'comentarios',
                                                                        value.target.value,
                                                                        'FACTURA_CABECERA',
                                                                        '',
                                                                        setFieldValue
                                                                    );
                                                                }}
                                                                onBlur={(value) => {
                                                                    // handleChangeValue(value.target.value, '', '', 'Comentarios', 'c');
                                                                    setFieldValue('comentarios', value);
                                                                    HandlerChangeValues(
                                                                        'comentarios',
                                                                        value.target.value,
                                                                        'FACTURA_CABECERA',
                                                                        '',
                                                                        setFieldValue
                                                                    );
                                                                }}
                                                                error={errors.comentarios && touched.comentarios}
                                                                helperText={touched.comentarios && errors.comentarios}
                                                                renderInput={(params) => <TextField {...params} />}
                                                            />
                                                        </Item>
                                                    </Grid>

                                                    <Grid item xs={6}>
                                                        <Item>
                                                            <TextField
                                                                defaultValue={formatter.format(facturas.descuentosCB)}
                                                                // value={formatter.format(valueDescuentoCB)}
                                                                id="descuentosCB"
                                                                name="descuentosCB"
                                                                fullWidth
                                                                multiline
                                                                size="small"
                                                                type="number"
                                                                label="Descuentos"
                                                                onChange={(value) => {
                                                                    // handleChangeValue(value.target.value, '', '', 'descuentosCB', 'c');
                                                                    setFieldValue('descuentosCB', value.target.value);
                                                                    HandlerChangeValues(
                                                                        'descuentosCB',
                                                                        parseFloat(value.target.value),
                                                                        'FACTURA_CABECERA',
                                                                        '',
                                                                        setFieldValue
                                                                    );
                                                                }}
                                                                onBlur={(event) => {
                                                                    setFieldValue('descuentosCB', event.target.value);
                                                                    HandlerChangeValues(
                                                                        'descuentosCB',
                                                                        parseFloat(event.target.value),
                                                                        'FACTURA_CABECERA',
                                                                        '',
                                                                        setFieldValue
                                                                    );
                                                                }}
                                                                // onBlur={handleBlur}
                                                                error={errors.descuentosCB && touched.descuentosCB}
                                                                helperText={touched.descuentosCB && errors.descuentosCB}
                                                                renderInput={(params) => <TextField {...params} />}
                                                            />
                                                        </Item>
                                                    </Grid>
                                                    {/* <Grid item xs={6}></Grid>
                                                        <Grid item xs={6}></Grid>
                                                        <Divider />
                                                        <Grid item xs={6}></Grid>
                                                        <Grid item xs={6}></Grid>
                                                        <Divider />
                                                        <Grid item xs={6}></Grid>
                                                        <Grid item xs={6}></Grid>
                                                        <Divider />
                                                        <Grid item xs={6}></Grid>
                                                        <Grid item xs={6}></Grid>
                                                        <Divider /> */}
                                                </Grid>
                                            </div>

                                            <div
                                                style={{
                                                    height: '250px',
                                                    marginTop: '2%',
                                                    width: '25%',
                                                    display: 'inline-block'
                                                }}
                                            >
                                                <Grid container spacing="2">
                                                    <Grid item xs={6}>
                                                        <Item>
                                                            <TextField
                                                                disabled
                                                                style={{
                                                                    textAlign: 'left'
                                                                }}
                                                                size="small"
                                                                variant="standard"
                                                                value="Sub Total:"
                                                            />
                                                        </Item>
                                                    </Grid>

                                                    <Grid item xs={6}>
                                                        <Item>
                                                            <TextField
                                                                disabled
                                                                id="subTotal"
                                                                style={{ textAlign: 'right' }}
                                                                size="small"
                                                                variant="standard"
                                                                value={formatter.format(facturas.subTotal)}
                                                            />
                                                        </Item>
                                                    </Grid>

                                                    <Divider />
                                                    <Grid item xs={6}>
                                                        <Item>
                                                            <TextField
                                                                disabled
                                                                style={{ textAlign: 'left' }}
                                                                size="small"
                                                                variant="standard"
                                                                value="Total desc.:"
                                                            />
                                                        </Item>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Item>
                                                            <TextField
                                                                disabled
                                                                id="subTotal"
                                                                style={{ textAlign: 'right' }}
                                                                size="small"
                                                                variant="standard"
                                                                value={formatter.format(facturas.totalDescuentos)}
                                                            />
                                                        </Item>
                                                    </Grid>
                                                    <Divider />
                                                    <Grid item xs={6}>
                                                        <Item>
                                                            <TextField
                                                                disabled
                                                                style={{ textAlign: 'left' }}
                                                                size="small"
                                                                variant="standard"
                                                                value="ITBIS:"
                                                            />
                                                        </Item>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Item>
                                                            <TextField
                                                                disabled
                                                                id="itbis"
                                                                style={{ textAlign: 'left' }}
                                                                size="small"
                                                                variant="standard"
                                                                value={formatter.format(facturas.itbis)}
                                                            />
                                                        </Item>
                                                    </Grid>
                                                    <Divider />
                                                    <Grid item xs={6}>
                                                        <Item>
                                                            <TextField
                                                                disabled
                                                                style={{ textAlign: 'left' }}
                                                                size="small"
                                                                variant="standard"
                                                                value="Total:"
                                                            />
                                                        </Item>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Item>
                                                            <TextField
                                                                disabled
                                                                id="total"
                                                                style={{ textAlign: 'left' }}
                                                                size="small"
                                                                variant="standard"
                                                                value={formatter.format(facturas.total)}
                                                            />
                                                        </Item>
                                                    </Grid>
                                                    <Divider />

                                                    <Divider />
                                                    <Grid item xs={6}>
                                                        <Item>
                                                            <TextField
                                                                disabled
                                                                style={{ textAlign: 'left' }}
                                                                size="small"
                                                                variant="standard"
                                                                value="Aplicado:"
                                                            />
                                                        </Item>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Item>
                                                            <TextField
                                                                disabled
                                                                id="aplicado"
                                                                style={{ textAlign: 'left' }}
                                                                size="small"
                                                                variant="standard"
                                                                value={formatter.format(facturas.montoAplicado)}
                                                            />
                                                        </Item>
                                                    </Grid>
                                                    <Divider />

                                                    <Divider />
                                                    <Grid item xs={6}>
                                                        <Item>
                                                            <TextField
                                                                disabled
                                                                style={{ textAlign: 'left' }}
                                                                size="small"
                                                                variant="standard"
                                                                value="Adeudado:"
                                                            />
                                                        </Item>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Item>
                                                            <TextField
                                                                disabled
                                                                id="total"
                                                                style={{ textAlign: 'left' }}
                                                                size="small"
                                                                variant="standard"
                                                                value={formatter.format(facturas.totalPendiente)}
                                                            />
                                                        </Item>
                                                    </Grid>
                                                    <Divider />
                                                </Grid>
                                            </div>

                                            <div
                                                style={{
                                                    height: '500px',
                                                    width: ' 100%',
                                                    backgroundColor: '#e3f2fd',
                                                    display: 'inline-block',
                                                    marginTop: '2%',
                                                    borderRadius: '5px'
                                                }}
                                            >
                                                {console.log('datos')}
                                                <ControlDetalleDocumento
                                                    dataRows={dataRows}
                                                    values={values}
                                                    errors={errors}
                                                    touched={touched}
                                                    isSubmitting={isSubmitting}
                                                    setFieldValue={setFieldValue}
                                                    handleChange={handleChange}
                                                    handleSubmit={handleSubmit}
                                                    handleBlur={handleSubmit}
                                                    handlerChange={handleChangeValue}
                                                    HandleValueChange={HandleValueChange}
                                                    addValues={addValues}
                                                    deleteValues={deleteValues}
                                                    setSubTotal={setSubTotal}
                                                    setDataRows={setDataRows}
                                                    DatosCliente={datosClientes}
                                                    Facturas={facturas}
                                                    SetFacturas={setFacturas}
                                                    HandlerChangeValues={HandlerChangeValues}
                                                />
                                            </div>
                                        </MainCard>
                                    </Grid>
                                </Grid>

                                <Grid container spacing="2" style={{ display: valuePago ? 'block' : 'none' }}>
                                    <Grid item xs={12}>
                                        <PagosRecibidos
                                            dataRows={dataRows}
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            isSubmitting={isSubmitting}
                                            setFieldValue={setFieldValue}
                                            handleChange={handleChange}
                                            handleSubmit={handleSubmit}
                                            handleBlur={handleSubmit}
                                            handleChangeValue={handleChangeValue}
                                            HandleValueChange={HandleValueChange}
                                            addValues={addValues}
                                            deleteValues={deleteValues}
                                            setSubTotal={setSubTotal}
                                            cancelar={() => {
                                                setValuePago(false);
                                            }}
                                            aplicarPago={Aplicarpago}
                                            facturas={facturas}
                                            setFacturas={setFacturas}
                                            HandlerChangeValues={HandlerChangeValues}
                                        />
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
