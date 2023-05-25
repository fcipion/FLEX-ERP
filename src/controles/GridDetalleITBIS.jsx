import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
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
    TextField
} from '@mui/material';
import DropProductos from './DropProductos';
import DropUnidadMedida from './DropUnidadMedida';
import DropAlmacen from './DropAlmacen';
import DropListaPrecios from './DropListaPrecios';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DropTipoItbis from './DropTipoItbis';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});
export default function GridDetalleITBIS({ handleBlur, errors, touched, setFieldValue, handleChangeValue, setSubTotal, detalles }) {
    const [valueTab, setValueTab] = React.useState('1');
    const [dataRows, setDataRows] = React.useState([
        {
            line_id: 0,
            tipo_itbis: { title: '', value: '' },
            cuentaContable: 0
        }
    ]);

    const handleChangeTab = (event, newValue) => {
        setValueTab(newValue);
    };

    const addValues = () => {
        setDataRows((previewRows) => {
            const data = {
                line_id: previewRows.length,
                tipo_itbis: { title: '', value: '' },
                cuentaContable: 0
            };
            return [...previewRows, data];
        });
    };

    const deleteValues = (row, setFieldValue) => {
        setDataRows((previewRows) => [...previewRows.filter((Row) => Row.line_id !== row.line_id)]);
        setFieldValue('detalles', dataRows);
    };

    const handlerChange = (value, Row, SetFieldValue, Id) => {
        const indexRow = dataRows.findIndex((dataRow) => dataRow.line_id === Row.line_id);
        console.log('indexRow', value);

        setDataRows((previewRows) => {
            previewRows[indexRow][Id] = value;
            // previewRows[indexRow].totalAntesDescuentos = previewRows[indexRow].cantidad * previewRows[indexRow].precios;
            // previewRows[indexRow].totalTrasDescuentos =
            //     previewRows[indexRow].cantidad * previewRows[indexRow].precios - previewRows[indexRow].descuentos;
            // previewRows[indexRow].totalSinItbis =
            //     previewRows[indexRow].cantidad * previewRows[indexRow].precios - previewRows[indexRow].descuentos;
            // previewRows[indexRow].totalConItbis = 0; // previewRows[indexRow].cantidad * previewRows[indexRow].precios - previewRows[indexRow].descuentos;
            // previewRows[indexRow].total_line =
            //     previewRows[indexRow].cantidad * previewRows[indexRow].precios - previewRows[indexRow].descuentos;

            // // subTotal
            // let subTotal = 0;
            // let totalDescuentos = 0;
            // let itbis = 0;
            // let total = 0;
            // previewRows.forEach((dataRow) => {
            //     subTotal += parseFloat(dataRow.totalAntesDescuentos);
            //     totalDescuentos += parseFloat(dataRow.descuentos);
            //     itbis += parseFloat(dataRow.total_itbis);
            //     total += parseFloat(dataRow.total_line);
            // });

            // SetFieldValue('subTotal', subTotal);
            // SetFieldValue('totalDescuentos', totalDescuentos);
            // SetFieldValue('itbis', itbis);
            // SetFieldValue('total', total);
            // console.log('dataRows', dataRows);
            SetFieldValue('detalles', dataRows);

            return [...previewRows];
        });
    };

    const HandleValueChange = (event, valueField) => {
        const { id } = event.target;

        console.log('valueField', id);
        document.getElementById([id]).value = formatter.format(valueField);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={valueTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                        <Tab label="ITBIS" value="1" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Grid item xs={12}>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer component={Paper} sx={{ maxHeight: 390 }}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow style={{ backgroundColor: 'ButtonFace' }}>
                                            <TableCell style={{ minWidth: 100, maxWidth: 100 }}>Tipo ITBIS</TableCell>
                                            <TableCell style={{ minWidth: 200 }} align="right">
                                                Cuenta contable
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
                                                    <DropTipoItbis
                                                        HandleBlur={handleBlur}
                                                        variant="standard"
                                                        Errors={errors}
                                                        Touched={touched}
                                                        Id="tipo_itbis"
                                                        SetFieldValue={setFieldValue}
                                                        Label=""
                                                        Value={row.tipo_itbis}
                                                        Row={row}
                                                        Onchange={handlerChange}
                                                    />
                                                </TableCell>

                                                <TableCell align="right">
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            variant="standard"
                                                            id="cuentaContable"
                                                            name="cuentaContable"
                                                            label=""
                                                            type="number"
                                                            value={row.cuentaContable}
                                                            onChange={(value) => {
                                                                handlerChange(value.target.value, row, setFieldValue, 'cuentaContable');
                                                            }}
                                                            size="small"
                                                        />
                                                    </Grid>
                                                </TableCell>

                                                {/* <TableCell style={{ minWidth: 200 }} component="th" scope="row">
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
                                                        Onchange={handlerChange}
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
                                                                handlerChange(value.target.value, row, setFieldValue, 'cantidad');
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
                                                        Onchange={handlerChange}
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
                                                        Onchange={handlerChange}
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
                                                                handlerChange(value.target.value, row, setFieldValue, 'precios');
                                                            }}
                                                            onBlur={(event) => {
                                                                HandleValueChange(event, row.precios);
                                                            }}
                                                            size="small"
                                                        />
                                                    </Grid>
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
                                                        Onchange={handlerChange}
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
                                                                handlerChange(value.target.value, row, setFieldValue, 'descuentos');
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
                                                                handlerChange(value.target.value, row, setFieldValue, 'total_line');
                                                            }}
                                                            onBlur={(event) => {
                                                                HandleValueChange(event, row.total_line);
                                                            }}
                                                            size="small"
                                                        />
                                                    </Grid>
                                                </TableCell>
 */}
                                                <TableCell align="center">
                                                    <Grid item xs={12}>
                                                        {/* <IconButton aria-label="Agregar" style={{ width: '30px' }} onClick={addValues}>
                                                            <AddCircleTwoToneIcon titleAccess="Agregar" fontSize="medium" color="primary" />
                                                        </IconButton> */}

                                                        <IconButton aria-label="Eliminar" style={{ width: '30px' }}>
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
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
        </Box>
    );
}
