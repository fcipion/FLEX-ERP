import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { styled, useTheme } from '@mui/material/styles';
// import { TextField, Grid, Divider, FormControl, InputAdornment, Card, Alert, FormControlLabel, Button, IconButton } from '@mui/material';
import {
    Divider,
    Button,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Checkbox
} from '@mui/material';
import DropProductos from './DropProductos';
import DropUnidadMedida from './DropUnidadMedida';
import DropAlmacen from './DropAlmacen';
import DropListaPrecios from './DropListaPrecios';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DropITBIS from './DropITBIS';
import DropCodicionPago from './DropCodicionPago';
import DropmedioPago from './DropMediosPago';
import DropMonedas from './DropMonedas';
import DroptipoIngreso from './DropTipoIngresos';
import DroptasaCambios from './DropTipoCambio';
import DropCajas from './DropCajas';
import DropEstado from './DropEstado';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});
export default function ControlDetalleOrdenServicios({
    values,
    handleBlur,
    errors,
    touched,
    setFieldValue,
    handleChangeValue,
    setSubTotal,
    cliente,
    dataRows,
    setDataRows,
    handlerChange,
    DatosCliente,
    Facturas,
    SetFacturas,
    HandlerChangeValues
}) {
    console.log('FacturasDetalle', Facturas);
    const [valueTab, setValueTab] = React.useState('1');
    const [camposRequerdioValue, setCamposRequerdio] = React.useState({ descripcion: '' });
    //     {
    //         line_id: 0,
    //         producto: { title: '', value: '' },
    //         unidadMedida: { title: '', value: '' },
    //         cantidad: 0,
    //         almacen: { title: '', value: '' },
    //         lista_precio: { title: '', value: '' },
    //         precios: 0,
    //         totalAntesDescuentos: 0,
    //         descuentos: 0,
    //         totalTrasDescuentos: 0,
    //         itbis: { title: '', value: '' },
    //         total_itbis: 0,
    //         totalSinItbis: 0,
    //         totalConItbis: 0,
    //         total_line: 0
    //     }
    // ]);

    const handleChangeTab = (event, newValue) => {
        setValueTab(newValue);
    };

    const camposRequeridos = (values) => {
        setCamposRequerdio((previewValue) => {
            previewValue.descripcion = '';
            return previewValue;
        });
        values.forEach((element) => {
            // validar que producto sea un campo requerido;
            if (element.producto === '') {
                setCamposRequerdio((previewValue) => {
                    previewValue.descripcion = `Por favor seleccionar un producto, para la linea ${element.line_id + 1}`;
                    return previewValue;
                });

                return;
            }

            // validar que la unidad de medida sea un campo requeido;
            if (element.unidad_medida === '') {
                setCamposRequerdio((previewValue) => {
                    previewValue.descripcion = `Por favor seleccionar la unidad de medida, para la linea ${element.line_id + 1}`;
                    return previewValue;
                });

                return;
            }

            // validar que la cantidad se mayor a cero;
            if (element.cantidad === 0) {
                setCamposRequerdio((previewValue) => {
                    previewValue.descripcion = `Por favor seleccionar una cantidad mayor a cero, para la linea ${element.line_id + 1}`;
                    return previewValue;
                });

                return;
            }

            // validar que el campo de almacen a nivel de linea sea requerido.;
            if (element.almacen === '') {
                setCamposRequerdio((previewValue) => {
                    previewValue.descripcion = `Por favor seleccionar un almacen, para la linea ${element.line_id + 1}`;
                    return previewValue;
                });

                return;
            }

            // validar que el campo de lista de precios a nivel de linea sea requerido.;
            if (element.lista_precio === '') {
                setCamposRequerdio((previewValue) => {
                    previewValue.descripcion = `Por favor seleccionar una lista de precios, para la linea ${element.line_id + 1}`;
                    return previewValue;
                });

                return;
            }

            // validar que el campo precios a nivel de linea sea requerido.;
            if (element.precio === 0) {
                setCamposRequerdio((previewValue) => {
                    previewValue.descripcion = `Por favor asignar un precio, para la linea ${element.line_id + 1}`;
                    return previewValue;
                });

                return;
            }

            // validar que el campo de ITBIS a nivel de linea sea requerido.;
            if (element.itbis === '') {
                setCamposRequerdio((previewValue) => {
                    previewValue.descripcion = `Por favor asignar un precio, para la linea ${element.line_id + 1}`;
                    return previewValue;
                });
            }
        });
    };
    const addValues = () => {
        SetFacturas((previewFacturas) => {
            const data = {
                line_id: previewFacturas.detalles.length,
                producto: '',
                unidad_medida: '',
                cantidad: 0,
                almacen: '',
                lista_precio: '',
                precio: 0,
                totalAntesDescuentos: 0,
                descuentos: 0,
                totalTrasDescuentos: 0,
                itbis: '',
                total_itbis: 0,
                totalSinItbis: 0,
                totalConItbis: 0,
                total_line: 0,
                estatus: true
            };

            // Validar campos requeridos;
            camposRequeridos(previewFacturas.detalles);

            if (previewFacturas.detalles.length !== 0) {
                // alert(camposRequerdioValue.descripcion);
                if (camposRequerdioValue.descripcion === '') {
                    previewFacturas.detalles.push(data);
                    // return [...previewFacturas, data];
                    setFieldValue('detalles', previewFacturas.detalles);
                } else {
                    alert(camposRequerdioValue.descripcion);
                }
            } else {
                previewFacturas.detalles.push(data);
                // return [...previewFacturas, data];
                setFieldValue('detalles', previewFacturas.detalles);
            }

            return previewFacturas;
        });
    };

    console.log('Facturas', Facturas);

    const deleteValues = (row, setFieldValue) => {
        // SetFacturas((previewRows) => [...previewRows.filter((Row) => Row.line_id !== row.line_id)]);
        SetFacturas((previewFacturas) => {
            previewFacturas.detalles = previewFacturas.detalles.filter((Row) => Row.line_id !== row.line_id);
            setFieldValue('detalles', previewFacturas.detalles);

            return previewFacturas;
        });
    };

    // const handlerChange = (value, Row, SetFieldValue, Id) => {
    //     const indexRow = dataRows.findIndex((dataRow) => dataRow.line_id === Row.line_id);
    //     console.log('indexRow', value);

    //     setDataRows((previewRows) => {
    //         previewRows[indexRow][Id] = value;
    //         previewRows[indexRow].totalAntesDescuentos = previewRows[indexRow].cantidad * previewRows[indexRow].precios;
    //         previewRows[indexRow].totalTrasDescuentos =
    //             previewRows[indexRow].cantidad * previewRows[indexRow].precios - previewRows[indexRow].descuentos;
    //         previewRows[indexRow].totalSinItbis =
    //             previewRows[indexRow].cantidad * previewRows[indexRow].precios - previewRows[indexRow].descuentos;
    //         previewRows[indexRow].totalConItbis = 0; // previewRows[indexRow].cantidad * previewRows[indexRow].precios - previewRows[indexRow].descuentos;
    //         previewRows[indexRow].total_line =
    //             previewRows[indexRow].cantidad * previewRows[indexRow].precios - previewRows[indexRow].descuentos;

    //         // subTotal
    //         let subTotal = 0;
    //         let totalDescuentos = 0;
    //         let itbis = 0;
    //         let total = 0;
    //         previewRows.forEach((dataRow) => {
    //             subTotal += parseFloat(dataRow.totalAntesDescuentos);
    //             totalDescuentos += parseFloat(dataRow.descuentos);
    //             itbis += parseFloat(dataRow.total_itbis);
    //             total += parseFloat(dataRow.total_line);
    //         });

    //         SetFieldValue('subTotal', subTotal);
    //         SetFieldValue('totalDescuentos', totalDescuentos);
    //         SetFieldValue('itbis', itbis);
    //         SetFieldValue('total', total);
    //         console.log('dataRows', dataRows);
    //         SetFieldValue('detalle', dataRows);

    //         return [...previewRows];
    //     });
    // };

    const HandleValueChange = (event, valueField) => {
        const { id, name } = event.target;

        console.log('valueField', valueField);
        document.getElementsByName([name]).value = formatter.format(valueField);
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary
    }));

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={valueTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                        <Tab label="Articulos" value="1" />
                        {/* <Tab label="Datos Repr. comercial" value="2" />
                        <Tab label="Finanzas" value="3" /> */}
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
                                                Repetida
                                            </TableCell>
                                            <TableCell style={{ minWidth: 100 }} align="right">
                                                Comentarios
                                            </TableCell>
                                            <TableCell style={{ minWidth: 200 }} align="right">
                                                Estado
                                            </TableCell>
                                            <TableCell style={{ minWidth: 200 }} align="left">
                                                Galeria
                                            </TableCell>
                                            {/* <TableCell style={{ minWidth: 150 }} align="right">
                                                Estatus
                                            </TableCell> */}
                                            <TableCell align="center" style={{ minWidth: 100, maxWidth: 100 }}>
                                                Acción
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {console.log('Facturas detalle', Facturas.detalles)}
                                        {Facturas.detalles.map((row) => (
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
                                                        Onchange={(value, Row, SetFieldValue, Id, DatosProducto) => {
                                                            // handlerChange(value, Row, SetFieldValue, Id, 'd', DatosProducto);
                                                            HandlerChangeValues(
                                                                'producto',
                                                                value,
                                                                'FACTURA_DETALLE',
                                                                Row,
                                                                SetFieldValue,
                                                                DatosProducto,
                                                                Id
                                                            );

                                                            // value, row, SetFieldValue, id, type
                                                        }}
                                                    />
                                                </TableCell>

                                                <TableCell style={{ minWidth: 200 }} component="th" scope="row">
                                                    {/* //{alert(JSON.stringify(datosProducto))} */}
                                                    <DropUnidadMedida
                                                        HandleBlur={handleBlur}
                                                        variant="standard"
                                                        Errors={errors}
                                                        Touched={touched}
                                                        Id="unidad_medida"
                                                        SetFieldValue={setFieldValue}
                                                        Label=""
                                                        /* eslint no-underscore-dangle: 0 */
                                                        Value={row.unidad_medida}
                                                        Row={row}
                                                        Onchange={(value, Row, SetFieldValue, Id) => {
                                                            // handlerChange(value, Row, SetFieldValue, Id, 'd', '');
                                                            HandlerChangeValues(
                                                                'unidad_medida',
                                                                value,
                                                                'FACTURA_DETALLE',
                                                                Row,
                                                                SetFieldValue,
                                                                'DatosProducto',
                                                                Id
                                                            );
                                                        }}
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
                                                                // handlerChange(value.target.value, row, setFieldValue, 'cantidad', 'd', '');
                                                                HandlerChangeValues(
                                                                    'cantidad',
                                                                    value.target.value,
                                                                    'FACTURA_DETALLE',
                                                                    row,
                                                                    setFieldValue,
                                                                    'DatosProducto',
                                                                    'cantidad'
                                                                );
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
                                                        /* eslint no-underscore-dangle: 0 */
                                                        Value={row.almacen}
                                                        Row={row}
                                                        Onchange={(value, Row, SetFieldValue, Id) => {
                                                            // handlerChange(value, Row, SetFieldValue, Id, 'd', '');
                                                            HandlerChangeValues(
                                                                'almacen',
                                                                value,
                                                                'FACTURA_DETALLE',
                                                                Row,
                                                                SetFieldValue,
                                                                'DatosProducto',
                                                                Id
                                                            );
                                                        }}
                                                    />
                                                </TableCell>

                                                <TableCell align="right">
                                                    <Grid item xs={12}>
                                                        <Checkbox defaultChecked size="small" variant="standard" />
                                                    </Grid>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            variant="standard"
                                                            id="comentarios" // {`precios_${row.line_id}`}
                                                            name={`precios_${row.line_id}`}
                                                            label=""
                                                            // value={formatter.format(parseFloat(row.precio))}
                                                            // defaultValue={r}
                                                            onChange={(value, text) => {
                                                                // handlerChange(value.target.value, row, setFieldValue, 'precios', 'd', '');
                                                                HandlerChangeValues(
                                                                    'precio',
                                                                    value.target.value,
                                                                    'FACTURA_DETALLE',
                                                                    row,
                                                                    setFieldValue,
                                                                    'DatosProducto',
                                                                    'precio'
                                                                );
                                                            }}
                                                            // onBlur={(event) => {
                                                            //     HandleValueChange(event, row.precio);
                                                            // }}
                                                            size="small"
                                                        />
                                                    </Grid>
                                                </TableCell>

                                                <TableCell style={{ minWidth: 200 }} component="th" scope="row">
                                                    <DropEstado
                                                        HandleBlur={handleBlur}
                                                        variant="standard"
                                                        Errors={errors}
                                                        Touched={touched}
                                                        Id="esatado"
                                                        SetFieldValue={setFieldValue}
                                                        Label=""
                                                        Value={row.itbis}
                                                        Row={row}
                                                        // Onchange={(value, Row, SetFieldValue, Id) => {
                                                        //     // handlerChange(value, Row, SetFieldValue, Id, 'd', '');
                                                        //     HandlerChangeValues(
                                                        //         'estado',
                                                        //         value,
                                                        //         'FACTURA_DETALLE',
                                                        //         Row,
                                                        //         SetFieldValue,
                                                        //         'DatosProducto',
                                                        //         Id
                                                        //     );
                                                        // }}
                                                    />
                                                </TableCell>

                                                <TableCell align="right">
                                                    <Grid item xs={12}>
                                                        <input id="fileUpload" type="file" multiple accept="application/pdf, image/png" />
                                                    </Grid>
                                                </TableCell>

                                                {/* <TableCell align="right">
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            variant="standard"
                                                            id="descuentos" // {`descuentos_${row.line_id}`}
                                                            name="descuentos" // {`descuentos_${row.line_id}`}
                                                            label=""
                                                            // value={formatter.format(row.precios)}
                                                            defaultValue={formatter.format(row.descuentos)}
                                                            onChange={(value, text) => {
                                                                // handlerChange(  value.target.value, row,  setFieldValue, 'descuentos',  'd',  '' );
                                                                HandlerChangeValues(
                                                                    'descuentos',
                                                                    value.target.value,
                                                                    'FACTURA_DETALLE',
                                                                    row,
                                                                    setFieldValue,
                                                                    'DatosProducto',
                                                                    'descuentos'
                                                                );
                                                            }}
                                                            onBlur={(event) => {
                                                                HandleValueChange(event, row.descuentos);
                                                            }}
                                                            size="small"
                                                        />
                                                    </Grid>
                                                </TableCell> */}

                                                <TableCell align="right">
                                                    <Grid item xs={12}>
                                                        {/* <IconButton
                                                            aria-label="Agregar"
                                                            style={{ width: '30px' }}
                                                            onClick={() => {
                                                                alert('Agregar');
                                                            }}
                                                        >
                                                            <AddCircleTwoToneIcon titleAccess="Agregar" fontSize="medium" color="primary" />
                                                        </IconButton> */}

                                                        <IconButton aria-label="Agregar" style={{ width: '30px' }}>
                                                            <DeleteTwoToneIcon
                                                                onClick={() => {
                                                                    deleteValues(row, setFieldValue);
                                                                    // handlerChangeValues('', '', 'ELIMINAR_LINEA_DETALLE', row.line_id);
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
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="documento"
                            name="documento"
                            defaultValue={DatosCliente.documento ? DatosCliente.documento : Facturas.rnc}
                            label="NRC/Cedula"
                            onChange={(value, text) => {
                                setFieldValue('documento', value.target.value);
                            }}
                            size="small"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <DropCodicionPago
                            HandleBlur={handleBlur}
                            Errors={errors}
                            Touched={touched}
                            Id="condicion_pago"
                            SetFieldValue={setFieldValue}
                            Label="condicion_pago"
                            Value={Facturas.condicion_pago}
                            Onchange={(value) => {
                                HandlerChangeValues('condicion_pago', value, 'FACTURA_CABECERA', '', setFieldValue);
                            }}
                        />
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
                                    Value={Facturas.medio_pago}
                                    Onchange={(value) => {
                                        // handleChangeValue(value, '', '', 'medio_pago_cheque', 'cheque');
                                        HandlerChangeValues('medio_pago', value, 'FACTURA_CABECERA', '', setFieldValue, '', 'medio_pago');
                                    }}
                                />
                            </Item>
                        </Grid>

                        <Grid item xs={12}>
                            <Item>
                                <DropMonedas
                                    HandleBlur={handleBlur}
                                    Errors={errors}
                                    Touched={touched}
                                    Id="moneda"
                                    SetFieldValue={setFieldValue}
                                    Label="Moneda"
                                    Value={Facturas.moneda}
                                    Onchange={(value) => {
                                        // handleChangeValue(value, '', '', 'medio_pago_cheque', 'cheque');
                                        HandlerChangeValues('moneda', value, 'FACTURA_CABECERA', '', setFieldValue, '', 'moneda');
                                    }}
                                />
                            </Item>
                        </Grid>

                        <Grid item xs={12}>
                            <Item>
                                <DroptipoIngreso
                                    HandleBlur={handleBlur}
                                    Errors={errors}
                                    Touched={touched}
                                    Id="tipo_ingreso"
                                    SetFieldValue={setFieldValue}
                                    Label="Tipo de ingreso"
                                    Value={Facturas.tipo_ingreso}
                                    Onchange={(value) => {
                                        // handleChangeValue(value, '', '', 'medio_pago_cheque', 'cheque');
                                        HandlerChangeValues(
                                            'tipo_ingreso',
                                            value,
                                            'FACTURA_CABECERA',
                                            '',
                                            setFieldValue,
                                            '',
                                            'tipo_ingreso'
                                        );
                                    }}
                                />
                            </Item>
                        </Grid>

                        <Grid item xs={12}>
                            <Item>
                                <DroptasaCambios
                                    HandleBlur={handleBlur}
                                    Errors={errors}
                                    Touched={touched}
                                    Id="tipo_cambio"
                                    SetFieldValue={setFieldValue}
                                    Label="Tasa de cambio"
                                    Value={Facturas.tipo_cambio}
                                    Onchange={(value) => {
                                        // handleChangeValue(value, '', '', 'medio_pago_cheque', 'cheque');
                                        HandlerChangeValues('tipo_cambio', value, 'FACTURA_CABECERA', '', setFieldValue, '', 'tipo_cambio');
                                    }}
                                />
                            </Item>
                        </Grid>

                        <Grid item xs={12}>
                            <Item>
                                <DropCajas
                                    HandleBlur={handleBlur}
                                    Errors={errors}
                                    Touched={touched}
                                    Id="caja"
                                    SetFieldValue={setFieldValue}
                                    Label="Caja"
                                    Value={Facturas.caja}
                                    Onchange={(value) => {
                                        HandlerChangeValues('caja', value, 'FACTURA_CABECERA', '', setFieldValue);
                                    }}
                                />
                            </Item>
                        </Grid>
                        <Divider />
                    </Grid>
                </TabPanel>
            </TabContext>
        </Box>
    );
}
