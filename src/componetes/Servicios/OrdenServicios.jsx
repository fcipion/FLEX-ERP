import { useState, useEffect } from 'react'
import MainCard from 'ui-component/cards/MainCard';
import AddUpdateOrden from './AddUpdateOrden';
import axios from 'utils/axios';
import { url } from '../../api/Peticiones';

// ======== MUI ==========
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';

// ======= Icons ========
import CreateIcon from '@mui/icons-material/Create';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const OrdenServicios = () => {

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
            renderCell: (cellValues) => {
                return (
                    <Stack direction="row" spacing={2}>
                        <Button onClick={(event) => updateOrden(cellValues.row)}><VisibilityIcon /></Button>
                        <Button onClick={(event) => updateOrden(cellValues.row)}><CreateIcon /></Button>
                    </Stack>
                )
            }
        }
    ];

    const [ordenes, setOrdenes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [orden, setOrden] = useState(null); // Orden para actualizar

    // ===== Obtener Ordernes ====
    const getOrdenes = async () => {
        let result = await axios.get(`${url}/listar_orden_servicio`)
        setOrdenes(result.data.rows)
    }

    // ===== Agregar Orden ====
    const newOrden = async () => {
        setShowForm(true)
    }

    // ===== Actualizar Orden ====
    const updateOrden = async (orden) => {
        setShowForm(true)
        setOrden(orden)
    }

    useEffect(() => {
        getOrdenes()
    }, [showForm])


    return (showForm ?
        <> <AddUpdateOrden setShowForm={setShowForm} orden={orden} setOrden={setOrden} /> </>
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