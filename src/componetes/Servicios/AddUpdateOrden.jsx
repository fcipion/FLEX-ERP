import { useState, useEffect } from 'react'
import MainCard from 'ui-component/cards/MainCard';

// ======== MUI ==========
import { Button } from '@mui/material';

// ======= Icons ========
import PrintIcon from '@mui/icons-material/Print';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

// ====== Formik =======
import { Form, Formik } from "formik";

const AddUpdateOrden = ({ setShowForm, orden, setOrden }) => {

  // ===== Cancelar Orden ====
  const cancel = () => {
    setShowForm(false)
    setOrden(null)
}


  return (
    <div style={{ width: '100%', background: 'white', minHeight: 400 }}>

      {/* ================= Header ================= */}
      <MainCard title="Registrar nueva orden">
        <div style={{
          backgroundColor: '#e3f2fd',
          borderRadius: '5px',
          border: '1px solid #e3f2fd',
          textAlign: 'right'
        }}>

          {/* ===== Botón: Imprimir ===== */}
          <Button style={{ margin: 10 }} variant="outlined" endIcon={<PrintIcon />}>Imprimir</Button>

          {/* ===== Botón: Cancelar ===== */}
          <Button onClick={cancel} style={{ margin: 10 }} variant="outlined" endIcon={<DeleteIcon />} color="error">Cancelar</Button>

          {/* ===== Botón: Crear Orden ===== */}
          <Button style={{ margin: 10 }} variant="outlined" endIcon={<SaveIcon />}>{!orden ? 'Crear Orden' : 'Actualizar Orden'}</Button>
        </div>
      </MainCard>




   

    </div>
  )
}




export default AddUpdateOrden