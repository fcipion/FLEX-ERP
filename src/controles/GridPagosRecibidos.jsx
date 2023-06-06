import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
    Button,
    Divider,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from '@mui/material';
import DropProductos from './DropProductos';
import DropUnidadMedida from './DropUnidadMedida';
import DropAlmacen from './DropAlmacen';
import DropListaPrecios from './DropListaPrecios';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DropITBIS from './DropITBIS';
import DropmedioPago from './DropMediosPago';
import { styled, useTheme } from '@mui/material/styles';
import DropTarjeta from './DropTarjeta';
import DropBanco from './DropBanco';
import DropCuentas from './DropCuentas';

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
export default function GridPagosRecibidos({
    values,
    handleBlur,
    errors,
    touched,
    setFieldValue,
    handleChangeValue,
    setSubTotal,
    cliente,
    datosPagos,
    Facturas,
    SetFacturas,
    productos,
    itbiss,
    ventas,
    venta
}) {
    const [valueTab, setValueTab] = React.useState('2');
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

    const addValues = () => {
        setDataRows((previewRows) => {
            const data = {
                line_id: previewRows.length,
                producto: '',
                unidadMedida: '',
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

    const HandlerChangeValues = (field, value, proceso, row, SetFieldValue, idProducto, id) => {
        // const DatosProducto = productos.rows.find((result) => result._id === idProducto);

        SetFacturas((previewValues) => {
            // Retornar valores de la cabecera de la facturas
            // Agregar datos de la cabecera de la factura;
            // const montoAplicado = parseFloat(previewValues.montoAplicado);
            // const totalPendiente = parseFloat(previewValues.totalPendiente);

            // if (proceso === 'FACTURA_CABECERA') {
            //     previewValues[field] = value;
            //     SetFieldValue[field] = value;
            // }

            // if (proceso === 'FACTURA_DETALLE') {
            //     // Extrar el index de la linea de la factura;
            //     // debugger;

            //     const indexRow = Facturas.detalles.findIndex((dataRow) => dataRow.line_id === row.line_id);

            //     // Determinación de precios; Se recorre el arreglo de determinacion de precios, para idicar el precio del ariticulo;
            //     const datosDeterminacionPrecios = determinacionPrecios.rows
            //         .find((result) => result.lista_precio._id === DatosProducto.lista_precio_venta._id)
            //         .detalles.find((dResulto) => {

            //             return (
            //                 /* eslint no-underscore-dangle: 0 */
            //                 dResulto.producto._id ===
            //                     /* eslint no-underscore-dangle: 0 */
            //                     DatosProducto._id && dResulto.unidad_medida._id === DatosProducto.unidad_medida_venta._id
            //             );
            //         }); // DatosProducto.lista_precio_venta)

            //     // Determinación de ITBIS; determinar el ITBIS que tiene asignado el articulo.
            //     let porcentajeITBIS = 0;
            //     const datosDeterminacionItbis = itbiss.rows.find((result) => result._id === value);
            //     if (datosDeterminacionItbis) {
            //         datosDeterminacionItbis.detalles.forEach((data) => {
            //             porcentajeITBIS += parseFloat(data.tipo_itbis.porcentaje);
            //         });
            //     }

            //     // DatosProducto.lista_precio_venta)
            //     SetFacturas((previewRows) => {
            //         previewRows.detalles[indexRow].porcentajeITBIS =
            //             id === 'itbis' ? porcentajeITBIS : previewRows.detalles[indexRow].porcentajeITBIS;
            //         previewRows.detalles[indexRow][id] = value;
            //         /* eslint no-underscore-dangle: 0 */
            //         previewRows.detalles[indexRow].unidad_medida = DatosProducto.unidad_medida_venta._id
            //             ? DatosProducto.unidad_medida_venta._id
            //             : previewRows.detalles[indexRow].unidad_medida;
            //         /* eslint no-underscore-dangle: 0 */
            //         previewRows.detalles[indexRow].almacen = DatosProducto.almacen
            //             ? DatosProducto.almacen._id
            //             : previewRows.detalles[indexRow].almacen;
            //         /* eslint no-underscore-dangle: 0 */
            //         previewRows.detalles[indexRow].lista_precio = DatosProducto.lista_precio_venta
            //             ? DatosProducto.lista_precio_venta._id
            //             : null;
            //         /* eslint no-underscore-dangle: 0 */
            //         previewRows.detalles[indexRow].precio = datosDeterminacionPrecios
            //             ? datosDeterminacionPrecios.precio
            //             : previewRows.detalles[indexRow].precio;
            //         previewRows.detalles[indexRow].itbis = DatosProducto.itbis._id
            //             ? DatosProducto.itbis._id
            //             : previewRows.detalles[indexRow].itbis;
            //         previewRows.detalles[indexRow].total_itbis =
            //             ((parseFloat(previewRows.detalles[indexRow].cantidad) * parseFloat(previewRows.detalles[indexRow].precio)) / 100) *
            //             previewRows.detalles[indexRow].porcentajeITBIS;
            //         // console.log(
            //         //     'ITBIS',
            //         //     ((parseFloat(previewRows[indexRow].cantidad) * parseFloat(previewRows[indexRow].precios)) / 100) * porcentajeITBIS
            //         // );
            //         previewRows.detalles[indexRow].totalAntesDescuentos =
            //             previewRows.detalles[indexRow].cantidad * previewRows.detalles[indexRow].precio;
            //         previewRows.detalles[indexRow].totalTrasDescuentos =
            //             previewRows.detalles[indexRow].cantidad * previewRows.detalles[indexRow].precio -
            //             previewRows.detalles[indexRow].descuentos;
            //         previewRows.detalles[indexRow].totalSinItbis =
            //             previewRows.detalles[indexRow].cantidad * previewRows.detalles[indexRow].precio -
            //             previewRows.detalles[indexRow].descuentos;
            //         previewRows.detalles[indexRow].totalConItbis =
            //             previewRows.detalles[indexRow].cantidad * previewRows.detalles[indexRow].precio -
            //             previewRows.detalles[indexRow].descuentos;
            //         previewRows.detalles[indexRow].total_line =
            //             previewRows.detalles[indexRow].cantidad * previewRows.detalles[indexRow].precio -
            //             previewRows.detalles[indexRow].descuentos;

            //         previewRows.detalles[indexRow].total_itbis =
            //             previewRows.detalles[indexRow].total_line * DatosProducto.itbis.detalles[0].tasa; // Temporar

            //         // subtotal
            //         let subtotal = 0;
            //         let totalDescuentos = 0;
            //         let itbis = 0;
            //         let total = 0;
            //         previewRows.detalles.forEach((dataRow) => {
            //             subtotal += parseFloat(dataRow.totalAntesDescuentos);
            //             totalDescuentos += parseFloat(dataRow.descuentos);
            //             itbis += parseFloat(dataRow.total_itbis);
            //             total += parseFloat(dataRow.total_line);
            //         });

            //         previewRows.subtotal = subtotal;
            //         previewRows.totalDescuentos = totalDescuentos;
            //         previewRows.itbis = itbis;
            //         previewRows.total = total + itbis;
            //         // setsubtotal(subtotal);
            //         // setTotalDesc(totalDescuentos);
            //         // setValueItbis(itbis);
            //         // setTotal(total);

            //         SetFieldValue('subtotal', subtotal);
            //         SetFieldValue('totalDescuentos', totalDescuentos);
            //         SetFieldValue('itbis', itbis);
            //         SetFieldValue('total', total);
            //         SetFieldValue('estado', 'PENDIENTE');
            //         return previewRows;
            //     });
            // }

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

            // Monto Aplicado
            previewValues.montoAplicado = totalAplicado;
            previewValues.totalDescuentos = totalDescuentos + previewValues.descuentosCB;
            // Monto Pendiente;
            const totalPendiente = previewValues.subtotal - totalAplicado;

            previewValues.totalPendiente = totalPendiente;
            // SetFieldValue('montoAplicado', totalAplicado);
            // SetFieldValue('totalPendiente', totalPendiente);
            // SetFieldValue('nota_debito', false);
            // SetFieldValue('proceso_medio_pago', previewValues.proceso_medio_pago);
            // SetFieldValue('detalles', previewValues.detalles);
            // SetFieldValue('estado', 'PENDIENTE');

            // Sumar total pendiente cobros

            return previewValues; // .proceso_medio_pago.filter((resultData) => resultData.monto !== 0);
        });
    };

    const HandleValueChange = (event, valueField) => {
        const { id } = event.target;

        document.getElementById([id]).value = formatter.format(valueField);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={valueTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                        <Tab label="Facturas" value="1" style={{ display: 'none' }} />
                        <Tab label="Efectivo" value="2" />
                        <Tab label="Tarjeta" value="3" />
                        <Tab label="Cheque" value="4" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Grid item xs={12}>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer component={Paper} sx={{ maxHeight: 390 }}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow style={{ backgroundColor: 'ButtonFace' }}>
                                            <TableCell style={{ minWidth: 100, maxWidth: 100 }}>Articulo</TableCell>
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
                                            <TableCell align="center" style={{ minWidth: 100, maxWidth: 100 }}>
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
                                                <TableCell style={{ minWidth: 200 }} component="th" scope="row">
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

                                                <TableCell style={{ minWidth: 200 }} component="th" scope="row">
                                                    <DropUnidadMedida
                                                        HandleBlur={handleBlur}
                                                        variant="standard"
                                                        Errors={errors}
                                                        Touched={touched}
                                                        Id="unidadMedida"
                                                        SetFieldValue={setFieldValue}
                                                        Label=""
                                                        Value={row.unidadMedida}
                                                        Row={row}
                                                        Onchange={handleChangeValue}
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
                                                            value={row.cantidad}
                                                            onChange={(value) => {
                                                                handleChangeValue(value.target.value, row, setFieldValue, 'cantidad');
                                                            }}
                                                            size="small"
                                                        />
                                                    </Grid>
                                                </TableCell>

                                                <TableCell style={{ minWidth: 200 }} component="th" scope="row">
                                                    <DropAlmacen
                                                        HandleBlur={handleBlur}
                                                        variant="standard"
                                                        Errors={errors}
                                                        Touched={touched}
                                                        Id="almacen"
                                                        SetFieldValue={setFieldValue}
                                                        Label=""
                                                        Value={row.almacen}
                                                        Row={row}
                                                        Onchange={handleChangeValue}
                                                    />
                                                </TableCell>

                                                <TableCell style={{ minWidth: 200 }} component="th" scope="row">
                                                    <DropListaPrecios
                                                        HandleBlur={handleBlur}
                                                        variant="standard"
                                                        Errors={errors}
                                                        Touched={touched}
                                                        Id="lista_precio"
                                                        SetFieldValue={setFieldValue}
                                                        Label=""
                                                        Value={row.lista_precio}
                                                        Row={row}
                                                        Onchange={handleChangeValue}
                                                    />
                                                </TableCell>

                                                <TableCell align="right">
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            variant="standard"
                                                            id={`precios_${row.line_id}`}
                                                            name={`precios_${row.line_id}`}
                                                            label=""
                                                            // value={formatter.format(row.precios)}
                                                            defaultValue={formatter.format(row.precios)}
                                                            onChange={(value, text) => {
                                                                handleChangeValue(value.target.value, row, setFieldValue, 'precios');
                                                            }}
                                                            onBlur={(event) => {
                                                                HandleValueChange(event, row.precios);
                                                            }}
                                                            size="small"
                                                        />
                                                    </Grid>
                                                </TableCell>

                                                <TableCell style={{ minWidth: 200 }} component="th" scope="row">
                                                    <DropITBIS
                                                        HandleBlur={handleBlur}
                                                        variant="standard"
                                                        Errors={errors}
                                                        Touched={touched}
                                                        Id="itbis"
                                                        SetFieldValue={setFieldValue}
                                                        Label=""
                                                        Value={row.itbis}
                                                        Row={row}
                                                        Onchange={handleChangeValue}
                                                    />
                                                </TableCell>

                                                <TableCell align="right">
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            variant="standard"
                                                            id={`descuentos_${row.line_id}`}
                                                            name={`descuentos_${row.line_id}`}
                                                            label=""
                                                            // value={formatter.format(row.precios)}
                                                            defaultValue={formatter.format(row.descuentos)}
                                                            onChange={(value, text) => {
                                                                handleChangeValue(value.target.value, row, setFieldValue, 'descuentos');
                                                            }}
                                                            onBlur={(event) => {
                                                                HandleValueChange(event, row.descuentos);
                                                            }}
                                                            size="small"
                                                        />
                                                    </Grid>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            variant="standard"
                                                            id={`total_line_${row.line_id}`}
                                                            name={`total_line_${row.line_id}`}
                                                            defaultValue={formatter.format(row.total_line)}
                                                            label=""
                                                            onChange={(value, text) => {
                                                                handleChangeValue(value.target.value, row, setFieldValue, 'total_line');
                                                            }}
                                                            onBlur={(event) => {
                                                                HandleValueChange(event, row.total_line);
                                                            }}
                                                            size="small"
                                                        />
                                                    </Grid>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <Grid item xs={12}>
                                                        <IconButton aria-label="Agregar" style={{ width: '30px' }} onClick={addValues}>
                                                            <AddCircleTwoToneIcon titleAccess="Agregar" fontSize="medium" color="primary" />
                                                        </IconButton>

                                                        <IconButton aria-label="Agregar" style={{ width: '30px' }}>
                                                            <DeleteTwoToneIcon
                                                                onClick={() => {
                                                                    deleteValues(row, setFieldValue);
                                                                }}
                                                                titleAccess="Eliminar"
                                                                fontSize="medium"
                                                                color="error"
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
                <TabPanel value="2">
                    <Grid container spacing="2">
                        <Grid item xs={12}>
                            <Item>
                                <DropmedioPago
                                    HandleBlur={handleBlur}
                                    Errors={errors}
                                    Touched={touched}
                                    Id="medio_pago"
                                    SetFieldValue={setFieldValue}
                                    Label="Medios de pago"
                                    Value={Facturas ? Facturas.proceso_medio_pago[0].medio_pago : null}
                                    Onchange={(value) => {
                                        // handleChangeValue(value, '', '', 'medio_pago_efectivo', 'efectivo', '');
                                        HandlerChangeValues(
                                            'medio_pago',
                                            value,
                                            'PAGO_RECIBIDO_EFECTIVO',
                                            '',
                                            setFieldValue,
                                            '',
                                            'medio_pago'
                                        );
                                    }}
                                />
                            </Item>
                        </Grid>
                        <Divider />
                        <Grid item xs={12}>
                            <Item>
                                <DropCuentas
                                    HandleBlur={handleBlur}
                                    Errors={errors}
                                    Touched={touched}
                                    Id="cuenta_efectivo"
                                    SetFieldValue={setFieldValue}
                                    Label="cuenta"
                                    Value={Facturas ? Facturas.proceso_medio_pago[0].cuenta : null}
                                    Onchange={(value) => {
                                        HandlerChangeValues('cuenta', value, 'PAGO_RECIBIDO_EFECTIVO', '', setFieldValue, '', 'cuenta');

                                        // field, value, proceso, row, SetFieldValue, DatosProducto, id
                                    }}
                                />
                            </Item>
                        </Grid>
                        <Divider />
                        <Grid item xs={12}>
                            <Item>
                                <TextField
                                    defaultValue={formatter.format(Facturas ? Facturas.proceso_medio_pago[0].monto : 0)}
                                    // value={formatter.format(valueDescuentoCB)}
                                    id="monto_efectivo"
                                    name="monto_efectivo"
                                    fullWidth
                                    multiline
                                    size="small"
                                    label="Monto"
                                    // onChange={handleChangeValue}
                                    onBlur={(event) => {
                                        // handleChangeValue(event.target.value, '', '', 'monto_efectivo', 'efectivo');
                                        HandlerChangeValues(
                                            'monto',
                                            event.target.value,
                                            'PAGO_RECIBIDO_EFECTIVO',
                                            '',
                                            setFieldValue,
                                            '',
                                            'monto'
                                        );
                                    }}
                                    // onBlur={handleBlur}
                                    error={errors.monto_efectivo && touched.monto}
                                    helperText={touched.monto_efectivo && errors.monto}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Item>
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value="3">
                    <Grid container spacing="2">
                        <Grid item xs={12}>
                            <Item>
                                <DropmedioPago
                                    HandleBlur={handleBlur}
                                    Errors={errors}
                                    Touched={touched}
                                    Id="medio_pago"
                                    SetFieldValue={setFieldValue}
                                    Label="Medios de pago"
                                    Value={Facturas ? Facturas.proceso_medio_pago[1].medio_pago : null}
                                    Onchange={(value) => {
                                        // handleChangeValue(value, '', '', 'medio_pago_tarjeta', 'tarjeta', '');
                                        HandlerChangeValues(
                                            'medio_pago',
                                            value,
                                            'PAGO_RECIBIDO_TARJETA',
                                            '',
                                            setFieldValue,
                                            '',
                                            'medio_pago'
                                        );
                                    }}
                                />
                            </Item>
                        </Grid>
                        <Divider />
                        <Grid item xs={12}>
                            <Item>
                                <DropCuentas
                                    HandleBlur={handleBlur}
                                    Errors={errors}
                                    Touched={touched}
                                    Id="cuenta"
                                    SetFieldValue={setFieldValue}
                                    Label="cuenta"
                                    Value={Facturas ? Facturas.proceso_medio_pago[1].cuenta : null}
                                    Onchange={(value) => {
                                        // handleChangeValue(value, '', '', 'cuenta_tarjeta', 'tarjeta');
                                        HandlerChangeValues('cuenta', value, 'PAGO_RECIBIDO_TARJETA', '', setFieldValue, '', 'cuenta');
                                    }}
                                />
                            </Item>
                        </Grid>
                        <Divider />
                        <Grid item xs={12}>
                            <Item>
                                <TextField
                                    defaultValue={Facturas ? formatter.format(Facturas.proceso_medio_pago[1].monto) : 0}
                                    // value={formatter.format(valueDescuentoCB)}
                                    id="monto_tarjeta"
                                    name="monto_tarjeta"
                                    fullWidth
                                    multiline
                                    size="small"
                                    type="number"
                                    label="Monto"
                                    onChange={handleChangeValue}
                                    onBlur={(event) => {
                                        // handleChangeValue(event.target.value, '', '', 'monto_tarjeta', 'tarjeta');
                                        HandlerChangeValues(
                                            'monto',
                                            event.target.value,
                                            'PAGO_RECIBIDO_TARJETA',
                                            '',
                                            setFieldValue,
                                            '',
                                            'monto'
                                        );
                                    }}
                                    // onBlur={handleBlur}
                                    error={errors.monto_tarjeta && touched.monto_tarjeta}
                                    helperText={touched.monto_tarjeta && errors.monto_tarjeta}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Item>
                        </Grid>
                        <Grid item xs={12}>
                            <Item>
                                <DropTarjeta
                                    HandleBlur={handleBlur}
                                    Errors={errors}
                                    Touched={touched}
                                    Id="tarjeta"
                                    SetFieldValue={setFieldValue}
                                    Label="Tarjeta"
                                    Value={Facturas ? Facturas.proceso_medio_pago[1].datos_tarjeta[0].tarjeta : null}
                                    Onchange={(value) => {
                                        // handleChangeValue(value, '', '', 'tarjeta', 'datosTarjeta');
                                        HandlerChangeValues('tarjeta', value, 'PAGO_RECIBIDO_TARJETA', '', setFieldValue, '', 'tarjeta');
                                    }}
                                />
                            </Item>
                        </Grid>
                        <Grid item xs={12}>
                            <Item>
                                <TextField
                                    defaultValue={Facturas ? Facturas.proceso_medio_pago[1].datos_tarjeta[0].numero : 0}
                                    // value={formatter.format(valueDescuentoCB)}
                                    id="numero"
                                    name="numero"
                                    fullWidth
                                    multiline
                                    size="small"
                                    type="number"
                                    label="Numero de la tarjeta"
                                    onChange={handleChangeValue}
                                    onBlur={(event) => {
                                        // handleChangeValue(event.target.value, '', '', 'numero', 'datosTarjeta');
                                        HandlerChangeValues(
                                            'numero',
                                            event.target.value,
                                            'PAGO_RECIBIDO_TARJETA',
                                            '',
                                            setFieldValue,
                                            '',
                                            'numero'
                                        );
                                    }}
                                    // onBlur={handleBlur}
                                    error={errors.numero && touched.numero}
                                    helperText={touched.numero && errors.numero}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Item>
                        </Grid>
                        <Grid item xs={12}>
                            <Item>
                                <TextField
                                    defaultValue={Facturas ? Facturas.proceso_medio_pago[1].datos_tarjeta[0].propietario : ''}
                                    // value={formatter.format(valueDescuentoCB)}
                                    id="propietario"
                                    name="propietario"
                                    fullWidth
                                    multiline
                                    size="small"
                                    label="Propietario"
                                    // onChange={handleChangeValue}
                                    onBlur={(event) => {
                                        // handleChangeValue(event.target.value, '', '', 'propietario', 'datosTarjeta');
                                        HandlerChangeValues(
                                            'propietario',
                                            event.target.value,
                                            'PAGO_RECIBIDO_TARJETA',
                                            '',
                                            setFieldValue,
                                            '',
                                            'propietario'
                                        );
                                    }}
                                    // onBlur={handleBlur}
                                    error={errors.propietario && touched.propietario}
                                    helperText={touched.propietario && errors.propietario}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Item>
                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value="4">
                    <Grid container spacing="2">
                        <Grid item xs={12}>
                            <Item>
                                <DropmedioPago
                                    HandleBlur={handleBlur}
                                    Errors={errors}
                                    Touched={touched}
                                    Id="medio_pago_cheque"
                                    SetFieldValue={setFieldValue}
                                    Label="Medios de pago"
                                    Value={Facturas ? Facturas.proceso_medio_pago[2].medio_pago : null}
                                    Onchange={(value) => {
                                        // handleChangeValue(value, '', '', 'medio_pago_cheque', 'cheque');
                                        HandlerChangeValues(
                                            'medio_pago',
                                            value,
                                            'PAGO_RECIBIDO_CHEQUE',
                                            '',
                                            setFieldValue,
                                            '',
                                            'medio_pago'
                                        );
                                    }}
                                />
                            </Item>
                        </Grid>
                        <Divider />
                        <Grid item xs={12}>
                            <Item>
                                <DropCuentas
                                    HandleBlur={handleBlur}
                                    Errors={errors}
                                    Touched={touched}
                                    Id="cuenta_cheque"
                                    SetFieldValue={setFieldValue}
                                    Label="Cuenta"
                                    Value={Facturas ? Facturas.proceso_medio_pago[2].cuenta : null}
                                    Onchange={(value) => {
                                        // handleChangeValue(value, '', '', 'cuenta_cheque', 'cheque');
                                        HandlerChangeValues('cuenta', value, 'PAGO_RECIBIDO_CHEQUE', '', setFieldValue, '', 'cuenta');
                                    }}
                                />
                            </Item>
                        </Grid>
                        <Divider />
                        <Grid item xs={12}>
                            <Item>
                                <TextField
                                    defaultValue={formatter.format(Facturas ? Facturas.proceso_medio_pago[2].monto : 0)}
                                    // value={formatter.format(valueDescuentoCB)}
                                    id="monto_cheque"
                                    name="monto_cheque"
                                    fullWidth
                                    multiline
                                    size="small"
                                    type="number"
                                    label="Monto"
                                    // onChange={handleChangeValue}
                                    onBlur={(event) => {
                                        // handleChangeValue(event.target.value, '', '', 'monto_cheque', 'datosCheque');
                                        HandlerChangeValues(
                                            'monto',
                                            event.target.value,
                                            'PAGO_RECIBIDO_CHEQUE',
                                            '',
                                            setFieldValue,
                                            '',
                                            'monto'
                                        );
                                    }}
                                    // onBlur={handleBlur}
                                    error={errors.monto && touched.monto}
                                    helperText={touched.monto && errors.monto}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Item>
                        </Grid>
                        <Grid item xs={12}>
                            <Item>
                                <DropBanco
                                    HandleBlur={handleBlur}
                                    Errors={errors}
                                    Touched={touched}
                                    Id="banco"
                                    SetFieldValue={setFieldValue}
                                    Label="Banco"
                                    Value={Facturas ? Facturas.proceso_medio_pago[2].datos_cheque[0].banco : null}
                                    Onchange={(value) => {
                                        // handleChangeValue(value, '', '', 'banco', 'datosCheque');
                                        HandlerChangeValues('banco', value, 'PAGO_RECIBIDO_CHEQUE', '', setFieldValue, '', 'banco');
                                    }}
                                />
                            </Item>
                        </Grid>
                        <Grid item xs={12}>
                            <Item>
                                <TextField
                                    defaultValue={Facturas ? Facturas.proceso_medio_pago[2].datos_cheque[0].numero : ''}
                                    // value={formatter.format(valueDescuentoCB)}
                                    id="numero"
                                    name="numero"
                                    fullWidth
                                    multiline
                                    size="small"
                                    type="number"
                                    label="Numero"
                                    // onChange={handleChangeValue}
                                    onBlur={(event) => {
                                        // handleChangeValue(event.target.value, '', '', 'numero', 'datosCheque');
                                        HandlerChangeValues(
                                            'numero',
                                            event.target.value,
                                            'PAGO_RECIBIDO_CHEQUE',
                                            '',
                                            setFieldValue,
                                            '',
                                            'numero'
                                        );
                                    }}
                                    // onBlur={handleBlur}
                                    error={errors.numero && touched.numero}
                                    helperText={touched.numero && errors.numero}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Item>
                        </Grid>
                        {/* <Grid item xs={12}>
                            <Item>
                                <TextField
                                    defaultValue={formatter.format(values.descuentosCB)}
                                    // value={formatter.format(valueDescuentoCB)}
                                    id="monto"
                                    name="monto"
                                    fullWidth
                                    multiline
                                    size="small"
                                    type="number"
                                    label="Monto"
                                    onChange={handleChangeValue}
                                    onBlur={(event) => {
                                        HandleValueChange(event, values);
                                    }}
                                    // onBlur={handleBlur}
                                    error={errors.descuentosCB && touched.descuentosCB}
                                    helperText={touched.descuentosCB && errors.descuentosCB}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Item>
                        </Grid> */}
                    </Grid>
                </TabPanel>
            </TabContext>
        </Box>
    );
}
