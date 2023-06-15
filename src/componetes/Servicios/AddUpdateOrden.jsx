import React, { useState, useEffect } from 'react'
import { formSchema } from "./schemas/index";
import MainCard from 'ui-component/cards/MainCard';

// ======== MUI ==========
import { Button, Grid, TextField, IconButton } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// ======= Icons ========
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import PrintIcon from '@mui/icons-material/Print';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// ====== Formik =======
import { Form, Formik } from "formik";

// ====== Drops =======
import DropSucursal from 'controles/DropSucursal';
import Dropcliente from 'controles/DropCliente';
import DropDoctores from 'controles/DropDoctores';
import DropVendedor from 'controles/DropVendedor';
import DropProductos from 'controles/DropProductos';
import DropUnidadMedida from 'controles/DropUnidadMedida';
import DropAlmacen from 'controles/DropAlmacen';
import DropEstado from 'controles/DropEstado';

// ====== Galeria =====
import ModalGaleria from './ModalGaleria';

// ====== Componentes =====
import FileList from './FileList';
import OrdenPdf from './OrdenPdf';

// ====== Estilos =====
import './Orden.css'

// ====== Request =====
import axios from 'utils/axios';
import { url } from '../../api/Peticiones';


// ====== PDF =====
import { PDFViewer } from '@react-pdf/renderer';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary
}));


const AddUpdateOrden = ({ setShowForm, setError, orden, setOrden, setOpenAlert }) => {

  const vendedor = JSON.parse(localStorage.getItem('userData')).sub

  // ===== setear orden ====
  useEffect(() => {
    if (orden) setDataRows(orden.detalles)
    console.log('========== orden =========', orden);
  }, [orden])



  const onSubmit = async (values, actions) => {
    console.log('========== Valores =========', values);

    if (values.detalles.length) submitOrden(values, actions)
    else showError('Agrega al menos un producto')
  };


  // ========== Crear Orden =========
  const submitOrden = async (values, actions) => {

    let formdata = new FormData();

    formdata.append("sucursal", values.sucursal);
    formdata.append("cliente", values.cliente);
    formdata.append("doctor", values.doctor);
    formdata.append("vendedor", vendedor);
    formdata.append("comentarios", values.comentarios);
    formdata.append("fecha", values.fecha);
    formdata.append("fecha_compromiso", values.fecha_compromiso);
    formdata.append("estatus", values.estatus);
    formdata.append("compania", '');
    formdata.append('detalles', JSON.stringify(values.detalles));

    values.detalles.forEach(function (detalle, indice) {
      var galeria = detalle.galeria;
      galeria.forEach(function (imagen, indiceImagen) {
        if (typeof imagen !== 'string') {
          var fieldName = 'galeria_' + detalle.line_id;
          formdata.append(fieldName, imagen);
        }
      });
    });

    // =========== Actualizar Orden ==============
    if (orden) {
      await axios.put(`${url}/actualizar_orden_servicio/${orden._id}`, formdata).then(res => {
        setOpenAlert(true)
        setShowForm(false);
        actions.resetForm();

      }).catch((error) => {
        console.log('error', error);
        showError('Hay campos vacíos. Completa todos los campos del formulario');
      })
    }

    // =========== Crear Orden ==============
    else {
      await axios.post(`${url}/registro_orden_servicio`, formdata).then(res => {
        setOpenAlert(true)
        setShowForm(false);
        actions.resetForm();

      }).catch((error) => {
        console.log('error', error);
        showError('Hay campos vacíos. Completa todos los campos del formulario');
      })

    }

  }


  // ===== Mostrar Error ======
  const showError = (error) => {
    setOpenAlert(true)
    setError(error)
    setTimeout(() => { setError('') }, 4000);
  }

  // ===== Salir del formulario ====
  const cancel = () => {
    setShowForm(false)
    setOrden(null)
  }

  // ==== Galeria ====
  const [openGallery, setOpenGallery] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);

  // ==== Lista de archivos ====
  const [fileListOpen, setFileListOpen] = useState({ line_id: '', isOpen: false });

  // ==== Generar Url para visualizar cada imagen en la galeria ====
  const imagesPreview = (files) => {
    if (!files) return;

    if (orden) {


    } else {
      let tmp = [];
      for (let i = 0; i < files.length; i++) {
        tmp.push({ src: URL.createObjectURL(files[i]) });
      }
      const objectUrls = tmp;
      setGalleryImages(objectUrls);
      setOpenGallery(true)

      for (let i = 0; i < objectUrls.length; i++) {
        return () => {
          URL.revokeObjectURL(objectUrls[i]);
        };
      }
    }

  }

  // ==== Mostrar PDF ====
  const [showPDF, setShowPDF] = useState(false);

  // ==== Artículos ====
  const [dataRows, setDataRows] = useState([]);

  // ========== Agregar fila de Artículo ======
  const addValues = () => {
    setDataRows((previewRows) => {
      const data = {
        line_id: previewRows.length + 1,
        producto: '',
        cantidad: 0,
        repetida: false,
        estatus: true,
        galeria: [],
        unidad_medida: '',
        almacen: '',
        estado: '',
        comentarios: ''
      };
      return [...previewRows, data];
    });
  };

  // ========== Eliminar fila de Artículo ======
  const deleteValues = (row, setFieldValue) => {
    setDataRows((previewRows) => [...previewRows.filter((Row) => Row.line_id !== row.line_id)]);
    if (row.line_id == 1) setFieldValue('detalles', []);
    else setFieldValue('detalles', dataRows);
  };

  // ========== Actualizar cambio en fila de Artículo ======
  const handleChangeValue = (value, row, SetFieldValue, id) => {
    const indexRow = dataRows.findIndex((dataRow) => dataRow.line_id === row.line_id);

    setDataRows((previewRows) => {
      previewRows[indexRow][id] = value;

      return [...previewRows];
    });

    console.log('======= la data row ======', dataRows);
    SetFieldValue('detalles', dataRows);
  };


  return (
    <>
      {showPDF && orden ?

      <>
      {/* ===== Volver al formulario ===== */}
      <Button onClick={() => { setShowPDF(false) }} color="inherit" style={{ margin: 10 }} variant="outlined" startIcon={<ArrowBackIcon />}>Volver al formulario</Button>

       <PDFViewer style={{width: '100%', height:'100vh'}}>
          <OrdenPdf orden={orden} setShowPDF={setShowPDF} />
        </PDFViewer>
      </>
        
       

        :
        <div style={{ width: '100%', background: 'white', minHeight: 400 }}>

          {/* ======= Formulario ====== */}

          <Formik
            initialValues={{
              cliente: orden && orden.cliente ? orden.cliente._id : '',
              compania: orden && orden.compania ? orden.compania._id : '',
              sucursal: orden && orden.sucursal ? orden.sucursal._id : '',
              doctor: orden && orden.doctor ? orden.doctor._id : '',
              fecha: orden && orden.fecha ? orden.fecha : Date.now(),
              fecha_compromiso: orden  && orden.fecha_compromiso ? orden.fecha_compromiso : '',
              vendedor: orden && orden.vendedor ? orden.vendedor.id : vendedor,
              createdAt: orden && orden.createdAt ? orden.createdAt : Date.now(),
              comentarios: orden && orden.comentarios ? orden.comentarios : '',
              estatus: orden ? orden.estatus : true,
              detalles: orden ? orden.detalles : dataRows
            }}
            validationSchema={formSchema}
            onSubmit={onSubmit}
          >
            {({ values, errors, touched, isSubmitting, setFieldValue, handleChange, handleSubmit, handleBlur }) => (
              <Form>

                {/* ================= Header ================= */}
                <MainCard title={orden ? "Actualizar Orden" : "Registrar nueva orden"}>
                  <div style={{
                    backgroundColor: '#e3f2fd',
                    borderRadius: '5px',
                    border: '1px solid #e3f2fd',
                    textAlign: 'right'
                  }}>

                    {/* ===== Botón: Imprimir ===== */}
                    {orden ?
                      <Button onClick={() => { setShowPDF(true) }} color="inherit" style={{ margin: 10 }} variant="outlined" endIcon={<PrintIcon />}>Imprimir</Button> : null
                    }

                    {/* ===== Botón: Cancelar ===== */}
                    <Button onClick={cancel} style={{ margin: 10 }} variant="outlined" endIcon={<DeleteIcon />} color="error">Cancelar</Button>

                    {/* ===== Botón: Crear Orden ===== */}
                    <Button disabled={isSubmitting} type="submit" style={{ margin: 10 }} variant="outlined" endIcon={<SaveIcon />}>{orden ? 'Actualizar Orden' : 'Crear Orden'}</Button>
                  </div>
                </MainCard>

                <Grid style={{ padding: 10 }} container spacing="2">

                  {/* ======== Cliente ======= */}
                  {!orden ?
                    <Grid item xs={6}>
                      <Item>
                        <Dropcliente
                          required
                          HandleBlur={handleBlur}
                          Errors={errors}
                          Touched={touched}
                          Id="cliente"
                          SetFieldValue={setFieldValue}
                          Label="Cliente"
                          Value={values.cliente}
                          Onchange={(value) => { setFieldValue('cliente', value); }}
                        />
                      </Item>
                    </Grid> : null
                  }


                  {/* ======== Sucursal ======= */}
                  <Grid item xs={6}>
                    <Item>
                      <DropSucursal
                        HandleBlur={handleBlur}
                        Errors={errors}
                        Touched={touched}
                        required
                        Id="sucursal"
                        SetFieldValue={setFieldValue}
                        Label="Sucursal"
                        Value={values.sucursal}
                        Onchange={(value) => { }}
                      />
                    </Item>
                  </Grid>


                  {/* ======== Fecha ======= */}
                  <Grid item xs={6}>
                    <Item>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          id="fecha_compromiso"
                          label="Fecha"
                          value={values.fecha_compromiso}
                          onBlur={handleBlur}
                          fullWidth
                          required
                          onChange={(value) => { setFieldValue('fecha_compromiso', (new Date(value.toDate())).getTime()); }}
                          renderInput={(params) => (
                            <TextField size="small" fullWidth {...params} required />
                          )}
                        />
                      </LocalizationProvider>
                    </Item>
                  </Grid>


                  {/* ======== Doctor ======= */}
                  <Grid item xs={6}>
                    <Item>
                      <DropDoctores
                        HandleBlur={handleBlur}
                        Errors={errors}
                        Touched={touched}
                        Id="doctor"
                        SetFieldValue={setFieldValue}
                        Label="Doctor"
                        required
                        Value={values.doctor}
                        Onchange={(value) => { }}
                      />
                    </Item>
                  </Grid>


                  {/* ======== Vendedor ======= */}
                  {/* <Grid item xs={6}>
                <Item>
                  <DropVendedor
                    Id="vendedor"
                    SetFieldValue={setFieldValue}
                    Value={values.vendedor}
                    Label="Vendedor"
                    Errors={errors}
                    Touched={touched}
                    OnBlur={handleBlur}
                  />
                </Item>
              </Grid> */}

                  {/* ======== Estatus ======= */}
                  <Grid item xs={6}>
                    <Item>
                      <FormControl fullWidth size="small">
                        <InputLabel id="estatus">Estatus</InputLabel>
                        <Select
                          labelId="estatus"
                          id="estatus"
                          nombre="estatus"
                          value={values.estatus}
                          label="Estatus"
                          onChange={(event) => { setFieldValue('estatus', event.target.value); }}
                        >
                          <MenuItem value={true}>Activo</MenuItem>
                          <MenuItem value={false}>Inactivo</MenuItem>
                        </Select>
                      </FormControl>
                    </Item>
                  </Grid>


                  {/* ======== Comentarios ======= */}
                  <Grid item xs={6}>
                    <Item>
                      <TextField
                        defaultValue={values.comentarios}
                        id="comentarios"
                        name="comentarios"
                        fullWidth
                        multiline
                        size="small"
                        label="Comentarios"
                        onChange={(event) => { setFieldValue('comentarios', event.target.value); }}
                        onBlur={(value) => { }}
                        error={errors.comentarios && touched.comentarios}
                        helperText={touched.comentarios && errors.comentarios}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Item>
                  </Grid>

                </Grid>



                {/* =============== Ártículos ============== */}
                <MainCard title='Ártículos'>
                  <div style={{
                    padding: 10
                  }}>
                    <Grid item xs={12}>
                      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer component={Paper} sx={{ maxHeight: 390 }}>
                          <Table
                            sx={{ minWidth: 1650 }}
                            size="small"
                            aria-label="a dense table"
                          >

                            {/* =========== Tabla Header ======= */}
                            <TableHead>
                              <TableRow style={{ backgroundColor: 'ButtonFace' }}>
                                <TableCell>Artículo</TableCell>
                                <TableCell>Unidad Medida</TableCell>
                                <TableCell>Almacen</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Cantidad</TableCell>
                                <TableCell align="center">Imágenes</TableCell>
                                <TableCell align="center">Repetida</TableCell>
                                <TableCell align="center">Estatus</TableCell>
                                <TableCell align="center">Comentarios</TableCell>
                                <TableCell align="center">Eliminar</TableCell>
                              </TableRow>
                            </TableHead>


                            {/* =========== Tabla Body ======= */}
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

                                  {/* =========== Producto ======= */}
                                  <TableCell
                                    style={{ width: 50 }}
                                    component="th"
                                    scope="row"
                                  >
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
                                      required
                                      Onchange={handleChangeValue}
                                    />
                                  </TableCell>

                                  {/* ============= Unidad de Medida ============= */}
                                  <TableCell style={{ width: 200 }} align="right">
                                    <DropUnidadMedida
                                      HandleBlur={handleBlur}
                                      Errors={errors}
                                      variant="standard"
                                      Touched={touched}
                                      Id="unidad_medida"
                                      SetFieldValue={setFieldValue}
                                      Value={row.unidad_medida}
                                      Onchange={handleChangeValue}
                                      Row={row}
                                      required
                                    />
                                  </TableCell>

                                  {/* ============= Almacen ============= */}
                                  <TableCell style={{ width: 200 }} align="right">
                                    <DropAlmacen
                                      HandleBlur={handleBlur}
                                      Errors={errors}
                                      variant="standard"
                                      Touched={touched}
                                      Id="almacen"
                                      SetFieldValue={setFieldValue}
                                      Label=""
                                      Value={row.almacen}
                                      Onchange={handleChangeValue}
                                      Row={row}
                                      required
                                    />
                                  </TableCell>

                                  {/* ============= Estado ============= */}
                                  <TableCell style={{ width: 200 }} align="right">
                                    <DropEstado
                                      HandleBlur={handleBlur}
                                      Errors={errors}
                                      variant="standard"
                                      Touched={touched}
                                      Id="estado"
                                      SetFieldValue={setFieldValue}
                                      Label=""
                                      Value={row.estado}
                                      Onchange={(value) => { handleChangeValue(value, row, setFieldValue, 'estado'); }}
                                      Row={row}
                                      required
                                    />
                                  </TableCell>

                                  {/* ============= Cantidad ============= */}
                                  <TableCell style={{ width: 100 }} align="right">
                                    <Grid item xs={12}>
                                      <TextField
                                        fullWidth
                                        variant="standard"
                                        id="cantidad"
                                        name="cantidad"
                                        label=""
                                        type="number"
                                        defaultValue={row.cantidad}
                                        onBlur={(event) => { handleChangeValue(event.target.value, row, setFieldValue, 'cantidad'); }}
                                        size="small"
                                        required
                                      />
                                    </Grid>
                                  </TableCell>

                                  {/* ============= Agregar Imagen ============= */}
                                  <TableCell align="center">

                                    <Button
                                      onClick={() => setFileListOpen({ isOpen: true, line_id: row.line_id })}
                                      size="small"
                                      variant="outlined"
                                      endIcon={<CollectionsOutlinedIcon />}
                                    >
                                      Gestionar
                                    </Button>


                                    <FileList
                                      setFileListOpen={setFileListOpen}
                                      fileListOpen={fileListOpen}
                                      row={row}
                                      setFieldValue={setFieldValue}
                                      handleChangeValue={handleChangeValue}
                                      imagesPreview={imagesPreview}
                                    />

                                  </TableCell>

                                  {/* ============= Repetida ============= */}
                                  <TableCell align="center">

                                    <FormControlLabel
                                      label={row.repetida ? 'Si' : 'No'}
                                      control={
                                        <Switch
                                          id="repetida"
                                          name="repetida"
                                          defaultValue={row.repetida}
                                          onChange={(event) => { handleChangeValue(event.target.checked, row, setFieldValue, 'repetida'); }}
                                        />}
                                    />

                                  </TableCell>

                                  {/* ============= Estatus ============= */}
                                  <TableCell align="center">
                                    <FormControlLabel
                                      label={row.estatus ? 'Activo' : 'Inactivo'}
                                      control={
                                        <Switch
                                          id="estatus"
                                          name="estatus"
                                          defaultValue={row.estatus}
                                          onChange={(event) => { handleChangeValue(event.target.checked, row, setFieldValue, 'estatus'); }}
                                        />}
                                    />
                                  </TableCell>

                                  {/* ============= Comentarios ============= */}
                                  <TableCell align="center">
                                    <TextField
                                      variant="standard"
                                      defaultValue={row.comentarios}
                                      id="comentarios"
                                      name="comentarios"
                                      fullWidth
                                      multiline
                                      size="small"
                                      label=""
                                      onChange={(event) => { handleChangeValue(event.target.value, row, setFieldValue, 'comentarios'); }}
                                      onBlur={(value) => { }}
                                      error={errors.comentarios && touched.comentarios}
                                      helperText={touched.comentarios && errors.comentarios}
                                      renderInput={(params) => <TextField {...params} />}
                                    />

                                  </TableCell>


                                  {/* ===== Eliminar Fila ===== */}
                                  <TableCell align="center">
                                    <Grid item xs={12}>

                                      <IconButton
                                        aria-label="Agregar"
                                        style={{ width: '30px' }}
                                      >
                                        <DeleteTwoToneIcon
                                          onClick={() => { deleteValues(row, setFieldValue); setGalleryImages(row.galeria) }}
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
                  </div>
                  <div style={{ textAlign: 'center', padding: 10 }}>
                    <Button
                      onClick={() => { addValues(); }}
                      size="small"
                      variant="outlined"
                      endIcon={<AddCircleTwoToneIcon />}
                    >
                      Agregar Árticulo
                    </Button>
                  </div>
                </MainCard>


                <ModalGaleria
                  openGallery={openGallery}
                  setOpenGallery={setOpenGallery}
                  galleryImages={galleryImages}
                  setGalleryImages={setGalleryImages}
                />
              </Form>
            )}
          </Formik>

        </div>
      }
    </>



  )
}

export default AddUpdateOrden