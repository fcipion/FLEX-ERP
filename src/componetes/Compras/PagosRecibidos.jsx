import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, Grid, Divider, FormControl, InputAdornment, Card, Alert, FormControlLabel, Button, IconButton } from '@mui/material';
import * as Yup from 'yup';
import CrudControl from 'controles/CrudControlDocumentos';
import MainCard from 'ui-component/cards/MainCard';
import { Block, EmailTwoTone, Mode, ModeFanOff, Storm } from '@mui/icons-material';
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
import GridPagosRecibidos from 'controles/GridPagosRecibidos';
import FacturasVentas from './FacturasCompras';
import DropCajas from 'controles/DropCajas';

const formSchema = Yup.object().shape({
    compania: Yup.string().required('Requerido'),
    cliente: Yup.string().required('Requerido'),
    sucursal: Yup.string().required('Requerido'),
    tipo_comprobante: Yup.string().required('Requerido'),
    vendedor: Yup.string().required('Requerido'),
    fecha_contabilizacion: Yup.date().required('Requerido'),
    fecha_vencimiento: Yup.date().required('Requerido'),
    doctor: Yup.number().required('Requerido'),
    comentarios: Yup.string().required('Requerido'),
    rnc: Yup.string().required('Requerido'),
    subTotal: Yup.string().required('Requerido'),
    total: Yup.string().required('Requerido')
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

    document.getElementById([id]).value = formatter.format(valueField[id]);
};

const PagosRecibidos = ({
    values,
    setFieldValue,
    cancelar,
    errors,
    touched,
    handleBlur,
    DataCB,
    datosPagos,
    SetDataCB,
    Aplicarpago,
    facturas,
    setFacturas,
    HandlerChangeValues
}) => {
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
    const { cliente } = useSelector((state) => state.cliente);
    const [subTotal, setSubTotal] = React.useState(0);
    const [totalDescuentos, setTotalDesc] = React.useState(0);
    const [itbis, setItbis] = React.useState(0);
    const [total, setTotal] = React.useState(0);
    const [valueDescuentoCB, setValueDescuentoCB] = React.useState(0);
    const [valueTab, setValueTab] = React.useState('1');
    const [datosCliente, SetDatosCliente] = React.useState({});
    // Datos detalle del pago
    const [dataPagos, setDataPagos] = React.useState({
        compania: userData.compania,
        cliente: '',
        sucursal: '',
        tipo_comprobante: '',
        vendedor: '',
        caja: '',
        fecha_contabilizacion: Date.now(),
        fecha_vencimiento: Date.now(),
        comentarios: '',
        descuentos: '',
        totalAplicado: 0,
        totalPendiente: 0,
        proceso_medio_pago: [
            {
                medio_pago_efectivo: '',
                cuenta_efectivo: '',
                monto_efectivo: 0
            },
            {
                medio_pago_tarjeta: '',
                cuenta_tarjeta: '',
                monto_tarjeta: 0,
                datos_tarjeta: [
                    {
                        tarjeta: '',
                        numero: '',
                        propietario: ''
                    }
                ]
            },
            {
                medio_pago_cheque: '',
                cuenta_cheque: '',
                monto_cheque: 100,
                datos_cheque: [
                    {
                        banco: '',
                        numero: ''
                    }
                ]
            }
        ]
    });

    const handleChangeValue = (value, row, SetFieldValue, id, type, DatosProducto) => {
        setDataPagos((previewData) => {
            switch (type) {
                case 'p':
                    previewData[id] = value;
                    break;

                case 'efectivo':
                    previewData.proceso_medio_pago[0][id] = value;
                    if (id === 'monto_efectivo') {
                        previewData.totalAplicado = value;
                        previewData.totalPendiente = DataCB.subTotal - value;
                    }
                    break;

                case 'tarjeta':
                    previewData.proceso_medio_pago[1][id] = value;

                    if (id === 'monto_tarjeta') {
                        previewData.totalAplicado = value;
                        previewData.totalPendiente = DataCB.subTotal - value;
                    }

                    break;
                case 'datosTarjeta':
                    previewData.proceso_medio_pago[1].datos_tarjeta[0][id] = value;

                    break;
                case 'cheque':
                    previewData.proceso_medio_pago[2][id] = value;
                    if (id === 'monto_tarjeta') {
                        previewData.totalAplicado = value;
                        previewData.totalPendiente = DataCB.subTotal - value;
                    }

                    break;

                case 'datosCheque':
                    previewData.proceso_medio_pago[2].datos_cheque[0][id] = value;

                    break;
                default:
                    previewData[id] = value;
                    break;
            }

            return previewData;
        });
    };

    const handleChangeTab = (event, newValue) => {
        event.defaultPrevented = true;

        setValueTab(newValue);
    };
    // const { paginas } = useSelector((state) => state.pagina);
    React.useEffect(() => {
        dispatch(getVentas());
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(getVentaById(id));
    }, [id, accion, modo]);

    const [alertValue, setAlert] = useState({ type: '', message: '', open: false });
    const [modoAccion, setModoAccion] = useState();
    const [openConfDlg, setOpenConfDlg] = useState(false);

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
        navegate(`/facturaVenta/create/0/${generateId()}`);
    };

    const handlerListar = () => {
        navegate(`/facturaVenta/Index/${id}/${generateId()}`);
    };

    const clickEdit = (value) => {
        /* eslint no-underscore-dangle: 0 */

        navegate(`/facturaVenta/edit/${value}/${generateId()}`);
    };

    const clickView = (value) => {
        /* eslint no-underscore-dangle: 0 */

        navegate(`/facturaVenta/view/${value}/${generateId()}`);
    };

    // const aplicarPagos = () => {
    //     navegate(`/pagosRecibido/create/0/${generateId()}`);
    // };

    return (
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
                <Grid container spacing="2" style={{ display: 'block' }}>
                    <AlertPOP prop={alertValue} />
                    <Grid item xs={12} lg={12}>
                        <MainCard title="Pago recibido">
                            <div>
                                {' '}
                                <strong>Estatus: Activa</strong>
                            </div>
                            <CrudControlPagos
                                MessageInfo={messageInfo}
                                HandlerListar={handlerListar}
                                Options={optiones}
                                Modo={modo}
                                AplicarPago={() => {
                                    // setDataPagos((previewData) => {
                                    //     previewData.sucursal = DataCB.sucursal;
                                    //     previewData.cliente = DataCB.cliente;

                                    //     return previewData;
                                    // });
                                    // SetDataCB((previewData) => {
                                    //     previewData.pago = dataPagos;

                                    //     return previewData;
                                    // });

                                    cancelar();
                                }}
                                Cancelar={cancelar}
                            />

                            <div
                                style={{
                                    height: '155px',
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
                                                    handleChangeValue(value, '', '', 'cliente', 'p');
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
                                                    handleChangeValue(value, '', '', 'sucursal', 'p');
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
                                                    // onBlur={handleBlur}
                                                    fullWidth
                                                    error={errors.fecha_contabilizacion && touched.fecha_contabilizacion}
                                                    helperText={touched.fecha_contabilizacion && errors.fecha_contabilizacion}
                                                    onChange={(value) => {
                                                        handleChangeValue(value, '', '', 'fecha_contabilizacion', 'p');
                                                    }}
                                                    renderInput={(params) => <TextField size="small" fullWidth {...params} />}
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
                                                        handleChangeValue(value, '', '', 'fecha_vencimiento', 'p');
                                                    }}
                                                    renderInput={(params) => <TextField size="small" fullWidth {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </Item>
                                    </Grid>
                                    {/* <Grid item xs={6}>
                                        <Item>
                                            <TextField
                                                //  defaultValue={facturas.proceso_medio_pago.comentarios}
                                                value={facturas.proceso_medio_pago ? facturas.proceso_medio_pago.comentarios : ''}
                                                id="comentarios"
                                                name="comentarios"
                                                fullWidth
                                                multiline
                                                size="small"
                                                label="Comentarios"
                                                onBlur={(value) => {
                                                    handleChangeValue(value.target.value, '', '', 'comentarios', 'p');
                                                }}
                                                // onBlur={handleBlur}
                                                error={errors.comentarios && touched.comentarios}
                                                helperText={touched.comentarios && errors.comentarios}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </Item>
                                    </Grid> */}

                                    {/* <Grid item xs={6}>
                                        <Item>
                                            <TextField
                                                // defaultValue={formatter.format(dataPagos.descuentos)}
                                                // value={formatter.format(valueDescuentoCB)}
                                                value={facturas.proceso_medio_pago ? facturas.proceso_medio_pago.descuentos : ''}
                                                id="descuentos"
                                                name="descuentos"
                                                fullWidth
                                                size="small"
                                                label="Descuentos"
                                                onChange={(value) => {
                                                    handleChangeValue(value.target.value, '', '', 'descuentos', 'p');
                                                }}
                                                onBlur={(event) => {
                                                    HandleValueChange(event, dataPagos);
                                                }}
                                                // onBlur={handleBlur}
                                                error={errors.descuentos && touched.descuentos}
                                                helperText={touched.descuentos && errors.descuentos}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </Item>
                                    </Grid> */}
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
                                    height: '155px',
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
                                                id="totalFacturado"
                                                style={{
                                                    textAlign: 'left'
                                                }}
                                                size="small"
                                                variant="standard"
                                                value="Total facturado:"
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
                                                id="totalAplicado"
                                                style={{ textAlign: 'left' }}
                                                size="small"
                                                variant="standard"
                                                value="Total Aplicado:"
                                            />
                                        </Item>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Item>
                                            <TextField
                                                disabled
                                                id="totalAplicado"
                                                style={{ textAlign: 'right' }}
                                                size="small"
                                                variant="standard"
                                                value={formatter.format(facturas.montoAplicado)}
                                            />
                                        </Item>
                                    </Grid>
                                    <Divider />
                                    <Grid item xs={6}>
                                        <Item>
                                            <TextField
                                                disabled
                                                id="totalPendiente"
                                                style={{ textAlign: 'left' }}
                                                size="small"
                                                variant="standard"
                                                value="Pendiente:"
                                            />
                                        </Item>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Item>
                                            <TextField
                                                disabled
                                                id="totalPendiente"
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
                                <GridPagosRecibidos
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    setFieldValue={setFieldValue}
                                    handleChange={handleChange}
                                    handleChangeValue={handleChangeValue}
                                    // HandleValueChange={handleChangeValue}
                                    setSubTotal={setSubTotal}
                                    datosPagos={dataPagos}
                                    facturas={facturas}
                                    setFacturas={setFacturas}
                                    HandlerChangeValues={HandlerChangeValues}
                                />
                            </div>
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default PagosRecibidos;
