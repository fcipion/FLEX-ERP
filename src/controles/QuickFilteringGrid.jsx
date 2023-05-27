import * as React from 'react';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';

import { Box, Button, Divider, Grid, IconButton } from '@mui/material';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import SettingsSuggestTwoToneIcon from '@mui/icons-material/SettingsSuggestTwoTone';

export default function QuickFilteringGrid({ data, clickView, clickEdit, clickAdd }) {
    // Otherwise filter will be applied on fields such as the hidden column id
    // const columns = React.useMemo(() => data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)), [data.columns]);
    const resultado = {
        columns: data.columns,
        rows: data.rows
            .filter((result) => result.estatus === true)
            // eslint-disable-next-line camelcase
            .reduce((accumulator, { id, fecha_contabilizacion, estatus, montoAplicado, caja, vendedor, cliente }) => {
                const { descripcion: cajaDescripcion } = caja;
                const { nombre: clienteNombre, descripcion: clienteDescripcion } = cliente;

                const newRow = {
                    id,
                    // eslint-disable-next-line camelcase
                    fecha_contabilizacion,
                    vendedor,
                    estatus,
                    importe: montoAplicado,
                    'caja.descripcion': cajaDescripcion,
                    'vendedor.nombre': vendedor,
                    'cliente.nombre': clienteNombre,
                    'cliente.descripcion': clienteDescripcion
                };

                accumulator.push(newRow);
                return accumulator;
            }, [])
    };

    const actions = {
        field: 'actions',
        type: 'actions',
        headerName: 'Acción',
        headerClassName: 'headerStyle',
        width: 80,
        getActions: (params) => [
            <GridActionsCellItem
                icon={<RemoveRedEyeTwoToneIcon sx={{ fontSize: '1.3rem' }} color="info" />}
                label="Ver"
                onClick={() => {
                    /* eslint no-underscore-dangle: 0 */
                    clickView(params.row._id);
                }}
            />,
            <GridActionsCellItem
                icon={<EditTwoToneIcon sx={{ fontSize: '1.3rem' }} color="secondary" />}
                label="Toggle Admin"
                onClick={() => {
                    /* eslint no-underscore-dangle: 0 */
                    clickEdit(params.row._id);
                }}
            />
        ]
    };

    const columns = [...data.columns.filter((data) => data.field !== 'descripcion' && data.field !== 'id' && data.field !== 'estatus')];
    // columns[1].flex = '1';

    const nombre = {
        field: 'cliente.descripcion',
        headerName: 'Descripción',
        sortable: true,
        filterable: true,
        groupable: true,
        aggregable: true,
        disableExport: true,
        hide: false,
        size: 'small',
        flex: 1,
        color: 'red',
        headerClassName: 'headerStyle'
    };
    const id = {
        field: 'id',
        headerName: 'Id',
        sortable: true,
        filterable: true,
        groupable: true,
        aggregable: true,
        disableExport: true,
        hide: false,
        size: 'small',
        headerClassName: 'headerStyle'
    };

    const renderEstatusCell = ({ row }) => {
        const { estatus } = row;
        const backgroundColor = estatus ? '#00c853' : 'red';
        const text = estatus ? 'Activo' : 'Inactivo';

        return (
            <div
                style={{
                    textAlign: 'center',
                    backgroundColor,
                    borderRadius: '10px',
                    flex: 1,
                    color: 'white',
                    opacity: 0.6
                }}
            >
                {text}
            </div>
        );
    };

    const estatus = {
        field: 'estatus',
        headerName: 'Estatus',
        sortable: true,
        filterable: true,
        groupable: true,
        aggregable: true,
        disableExport: true,
        renderCell: renderEstatusCell,
        hide: false,
        size: 'small',
        color: 'red',
        headerClassName: 'headerStyle'
    };

    const columnsData = [id, nombre, ...columns, estatus, actions];
    // console.log('columns', columns[1].flex);

    return (
        <Box
            sx={{
                height: 400,
                width: 1,
                '& .headerStyle': {
                    backgroundColor: '#8CCAF5',
                    borderRadius: '0.1px',
                    border: '0.50px solid blue'
                }
            }}
        >
            <Grid
                container
                spacing="2"
                style={{
                    backgroundColor: '#e3f2fd',
                    borderRadius: '5px',
                    border: '1px solid blue'
                }}
            >
                <Grid container spacing="2">
                    <Grid item xs={8} style={{ textAlign: 'left' }}>
                        <IconButton
                            // onClick={() => {
                            //     {
                            //     }
                            // }}
                            size="medium"
                            title="Configuración"
                            color="inherit"
                            // disabled={IsSubmitting}
                        >
                            {/* <ManageSearchTwoToneIcon style={{ height: '30px', variant: 'contained' }} /> */}
                            <SettingsSuggestTwoToneIcon fontSize="medium" />
                        </IconButton>
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                        <Button
                            onClick={clickAdd}
                            style={{ marginTop: '1px', marginRight: '1px' }}
                            variant="outlined"
                            endIcon={<AddCircleOutlineSharpIcon />}
                        >
                            Agregar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <DataGrid
                style={{ marginTop: '10px' }}
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                rows={resultado.rows}
                columns={columnsData}
                components={{ Toolbar: GridToolbar }}
                rowHeight
                autoPageSize
                disableExtendRowFullWidth={false}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 }
                    }
                }}
            />
        </Box>
    );
}
