import { useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import Stack from '@mui/material/Stack';
import CreateIcon from '@mui/icons-material/Create';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddUpdateOrden from './AddUpdateOrden';
import axios from 'utils/axios';
import { url } from '../../api/Peticiones';

const columns = [
    { field: 'id', headerName: 'ID', width: 40 },
    { field: 'cliente', headerName: 'Cliente', width: 150 },
    { field: 'sucursal', headerName: 'Sucursal', width: 150 },
    { field: 'doctor', headerName: 'Doctor', width: 150 },
    { field: 'createdAt', headerName: 'Creación', width: 100 },
    { field: 'estatus', headerName: 'Estatus', width: 160, headerAlign: 'center', align: 'center', },
    {
        field: 'acciones',
        headerName: 'Acción',
        headerAlign: 'center',
        align: 'center',
        width: 200,
        renderCell: () => {
            return (
                <Stack direction="row" spacing={2}>
                    <Button><VisibilityIcon /></Button>
                    <Button><CreateIcon /></Button>
                </Stack>
            )
        }
    }
];

const OrdenServicios = () => {

    const [ordenes, setOrdenes] = useState([]);
    const [showForm, setShowForm] = useState(false);

    // ===== Obtener Ordernes ====
    const getOrdenes = async () => {
        let result = await axios.get(`${url}/listar_orden_servicio`);
        setOrdenes(result.data.rows)
    }

    // ===== Agregar Orden ====
    const newOrden = async () => {
        setShowForm(true)
    }

    useEffect(() => {
        getOrdenes()
    }, [showForm])


    return (showForm ?
        <> <AddUpdateOrden /> </>
        :
        <>
            {/* =============== Ordenes ============== */}
            <div style={{ width: '100%', background: 'white' }}>

                {/* ===== Header ===== */}
                <MainCard title="Listado de ordenes">
                    <div style={{
                        backgroundColor: '#e3f2fd',
                        borderRadius: '5px',
                        border: '1px solid #e3f2fd',
                        textAlign: 'right'
                    }}>
                        {/* ===== Botón: Agregar Orden ===== */}
                        <Button onClick={newOrden} style={{ margin: 10 }} variant="outlined" endIcon={<AddCircleOutlineIcon />}>Agregar</Button>
                    </div>
                </MainCard>


                {/* ===== Tabla y filtros ===== */}
                <DataGrid
                    style={{ height: 400 }}
                    rows={ordenes}
                    columns={columns}
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    components={{ Toolbar: GridToolbar }}
                    autoPageSize
                    componentsProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                            printOptions: { disableToolbarButton: true },
                            csvOptions: { disableToolbarButton: true },
                        }
                    }}
                />
            </div>
        </>
    )
}

export default OrdenServicios