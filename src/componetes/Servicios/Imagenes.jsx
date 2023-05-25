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
import DropITBIS from './DropITBIS';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});
export default function Imagenes({
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
    DatosCliente
}) {
    const [valueTab, setValueTab] = React.useState('1');
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
                                            <TableCell style={{ minWidth: 100, maxWidth: 100 }}>Imagen</TableCell>
                                            {/* <TableCell hidden style={{ minWidth: 200 }} align="right">
                                                Unidad medida
                                            </TableCell> */}
                                            <TableCell align="right">Comentarios</TableCell>
                                            <TableCell align="right">Repetida</TableCell>
                                            {/* <TableCell style={{ minWidth: 200 }} align="right">
                                                Almacen
                                            </TableCell> */}
                                            {/* <TableCell style={{ minWidth: 200 }} align="right">
                                                Lista precios
                                            </TableCell>
                                            <TableCell style={{ minWidth: 100 }} align="right">
                                                Precios
                                            </TableCell>
                                            <TableCell style={{ minWidth: 200 }} align="right">
                                                Tipo itbis
                                            </TableCell>
                                            <TableCell style={{ minWidth: 200 }} align="right">
                                                Total itbis
                                            </TableCell>
                                            <TableCell style={{ minWidth: 150 }} align="right">
                                                Descuentos
                                            </TableCell>
                                             */}
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
                                                <TableCell align="right">
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            variant="standard"
                                                            id="imagen"
                                                            name="imagen"
                                                            label=""
                                                            type="file"
                                                            onChange={(value) => {
                                                                handlerChange(value.target.value, row, setFieldValue, 'cantidad', 'd', '');
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
                                                            id="comentarios"
                                                            name="comentarios"
                                                            label=""
                                                            onChange={(value, text) => {
                                                                handlerChange(
                                                                    value.target.value,
                                                                    row,
                                                                    setFieldValue,
                                                                    'total_line',
                                                                    'd',
                                                                    ''
                                                                );
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
                                                            <AddPhotoAlternateIcon
                                                                titleAccess="Imagenes"
                                                                fontSize="medium"
                                                                color="primary"
                                                            />
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
                {/* <TabPanel value="2">
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="documento"
                            name="documento"
                            defaultValue={DatosCliente.documento ? DatosCliente.documento : ''}
                            label="NRC/Cedula"
                            onChange={(value, text) => {
                                setFieldValue('documento', value.target.value);
                            }}
                            size="small"
                        />
                    </Grid>
                </TabPanel>
                <TabPanel value="3"> Finanzas </TabPanel> */}
            </TabContext>
        </Box>
    );
}
