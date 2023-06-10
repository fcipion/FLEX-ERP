import { useState } from 'react'
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

// ======= Icons ========
import PrintIcon from '@mui/icons-material/Print';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

// ====== Formik =======
import { Form, Formik } from "formik";

// ====== Drops =======
import DropSucursal from 'controles/DropSucursal';
import Dropcliente from 'controles/DropCliente';
import DropDoctores from 'controles/DropDoctores';
import DropVendedor from 'controles/DropVendedor';
import DropProductos from 'controles/DropProductos';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));


const AddUpdateOrden = ({ setShowForm, orden, setOrden }) => {

  const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };

  const [datosClientes, SetDatosCliente] = useState({});

  // ===== Cancelar Orden ====
  const cancel = () => {
    setShowForm(false)
    setOrden(null)
  }

  const [dataRows, setDataRows] = useState([
    {
      line_id: 0,
      producto: { title: '', value: '' },
      cantidad: 0,
      galeria: []
    }
  ]);

  const addValues = () => {
    setDataRows((previewRows) => {
      const data = {
        line_id: previewRows.length,
        producto: '',
        cantidad: 0
      };
      return [...previewRows, data];
    });
  };

  const deleteValues = (row, setFieldValue) => {
    setDataRows((previewRows) => [...previewRows.filter((Row) => Row.line_id !== row.line_id)]);
    setFieldValue('detalle', dataRows);
  };


  return (
    <div style={{ width: '100%', background: 'white', minHeight: 400 }}>

      <Formik
        initialValues={{
          cliente: '',
          sucursal: '',
          doctor: '',
          fecha: '',
          vendedor: ''
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
                <Button color="inherit" style={{ margin: 10 }} variant="outlined" endIcon={<PrintIcon />}>Imprimir</Button>

                {/* ===== Botón: Cancelar ===== */}
                <Button onClick={cancel} style={{ margin: 10 }} variant="outlined" endIcon={<DeleteIcon />} color="error">Cancelar</Button>

                {/* ===== Botón: Crear Orden ===== */}
                <Button disabled={isSubmitting} type="submit" style={{ margin: 10 }} variant="outlined" endIcon={<SaveIcon />}>{orden ? 'Actualizar Orden' : 'Crear Orden'}</Button>
              </div>
            </MainCard>

            <Grid style={{ padding: 10 }} container spacing="2">

              {/* ======== Cliente ======= */}
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
                    SetDatosCliente={SetDatosCliente}
                    Onchange={(value) => { }}
                  />
                </Item>
              </Grid>

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
                      id="fecha"
                      label="Fecha"
                      value={values.fecha}
                      onBlur={handleBlur}
                      fullWidth
                      error={errors.fecha && touched.fecha}
                      helperText={
                        touched.fecha && errors.fecha
                      }
                      onChange={(value) => { }}
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
              <Grid item xs={6}>
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
                    onChange={(value) => { }}
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
                        sx={{ minWidth: 650 }}
                        size="small"
                        aria-label="a dense table"
                      >

                        {/* =========== Header ======= */}
                        <TableHead>
                          <TableRow style={{ backgroundColor: 'ButtonFace' }}>
                            <TableCell style={{ minWidth: 100, maxWidth: 100 }}>
                              Artículo
                            </TableCell>
                            <TableCell style={{ minWidth: 100, maxWidth: 100 }}>
                              Cantidad
                            </TableCell>
                            <TableCell style={{ minWidth: 100, maxWidth: 100 }}>
                              Imágenes
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{ minWidth: 100, maxWidth: 100 }}
                            >
                              Acción
                            </TableCell>
                          </TableRow>
                        </TableHead>


                        {/* =========== Body ======= */}
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
                                style={{ minWidth: 200 }}
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
                                  Onchange={(value) => { }}
                                />
                              </TableCell>

                              {/* ============= Cantidad ============= */}
                              <TableCell align="right">
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    variant="standard"
                                    id="cantidad"
                                    name="cantidad"
                                    label=""
                                    type="number"
                                    defaultValue={row.cantidad}
                                    onBlur={(value) => { }}
                                    size="small"
                                  />
                                </Grid>
                              </TableCell>

                              {/* ============= Galeria ============= */}
                              <TableCell align="right">
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    variant="standard"
                                    id="galeria"
                                    name="galeria"
                                    label=""
                                    type="file"
                                    defaultValue={row.galeria}
                                    onBlur={(value) => { }}
                                    size="small"
                                  />
                                </Grid>
                              </TableCell>

                              {/* ============= Remover ============= */}
                              <TableCell align="right">
                                <Grid item xs={12}>
                                  <IconButton
                                    aria-label="Agregar"
                                    style={{ width: '30px' }}
                                  >
                                    <DeleteTwoToneIcon
                                      onClick={() => {
                                        deleteValues(
                                          row,
                                          setFieldValue
                                        );
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
              </div>
              <div style={{ textAlign: 'center', padding: 10 }}>
                <Button
                  onClick={() => {
                    addValues();
                  }}
                  size="small"
                  variant="outlined"
                  endIcon={<AddCircleTwoToneIcon />}
                >
                  Agregar Árticulo
                </Button>
              </div>
            </MainCard>



          </Form>
        )}
      </Formik>

    </div>
  )
}




export default AddUpdateOrden