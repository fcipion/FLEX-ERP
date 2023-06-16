import React, { useState, useEffect } from 'react'
import { useSelector, dispatch } from 'store';
import { getOrdenes } from 'store/slices/orden';
import MainCard from 'ui-component/cards/MainCard';
import AddUpdateOrden from './AddUpdateOrden';

// ======== MUI ==========
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// ======= Icons ========
import CreateIcon from '@mui/icons-material/Create';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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

const OrdenServicios = () => {

    const columns = [
        { field: 'id', headerName: 'ID', width: 40 },
        { field: 'cliente', headerName: 'Cliente', width: 150, renderCell: ({ row }) => { return (row.cliente ? row.cliente.nombre : '') } },
        { field: 'sucursal', headerAlign: 'center', headerName: 'Sucursal', width: 250, renderCell: ({ row }) => { return (row.sucursal ? row.sucursal.descripcion : '') } },
        { field: 'doctor', headerName: 'Doctor', headerAlign: 'center',  align: 'center', width: 160, renderCell: ({ row }) => { return (row.doctor ? row.doctor.nombre : '') } },
        { field: 'createdAt', headerName: 'Creación', width: 100 },
        { field: 'estatus', headerName: 'Estatus', width: 140, headerAlign: 'center', align: 'center', renderCell: renderEstatusCell },
        {
            field: 'acciones',
            headerName: 'Editar',
            headerAlign: 'center',
            align: 'center',
            width: 200,
            renderCell: (cellValues) => {
                return (
                    <Stack direction="row" spacing={2}>
                        <Button onClick={(event) => updateOrden(cellValues.row)}><CreateIcon /></Button>
                    </Stack>
                )
            }
        }
    ];

    const { ordenes } = useSelector((state) => state.orden);
    const [orden, setOrden] = useState('')
    const [showForm, setShowForm] = useState(false);

    // ===== Obtener Ordenes ====
    useEffect(() => {
        dispatch(getOrdenes())
        console.log(ordenes);
    }, [dispatch, showForm])


    // ===== Agregar Orden ====
    const newOrden = async () => {
        setShowForm(true)
    }

    // ===== Actualizar Orden ====
    const updateOrden = async (orden) => {
        setShowForm(true)
        setOrden(orden)
      
    }

    {/* ======= Alerta ====== */ }
    const [openAlert, setOpenAlert] = useState(false);
    const [error, setError] = useState('');
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


    return (

        <>
            {/* ======= Alerta ====== */}
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
                    {error ?
                        <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                            {error}
                        </Alert> :
                        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                            {orden ? 'Orden actualizada con éxito' : 'Orden creada con éxito'}
                        </Alert>
                    }
                </Snackbar>
            </Stack>



            {showForm ?
                <> <AddUpdateOrden setOpenAlert={setOpenAlert} setError={setError} setShowForm={setShowForm} orden={orden} setOrden={setOrden} /> </>
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
                        {ordenes && ordenes.rows ?
                            <DataGrid
                                style={{ height: 400 }}
                                rows={ordenes.rows}
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
                            :
                            null
                        }

                    </div>
                </>}

        </>





    )
}

export default OrdenServicios
