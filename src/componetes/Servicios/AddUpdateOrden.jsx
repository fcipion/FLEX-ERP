import React, { useState, useEffect, useCallback } from "react";
import { formSchema } from "./schemas/index";
import MainCard from "ui-component/cards/MainCard";
import { useSelector, dispatch } from "store";
import { getOrdenById } from "store/slices/orden";
import {
  changeStatusModalUpload,
  addMultipleUploadFile,
} from "store/slices/file";

// ======== MUI ==========
import { Button, Grid, TextField, IconButton } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LoadingButton from "@mui/lab/LoadingButton";

// ======= Icons ========
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// ====== Formik =======
import { Form, Formik } from "formik";

// ====== Drops =======
import DropSucursal from "controles/DropSucursal";
import Dropcliente from "controles/DropCliente";
import DropDoctores from "controles/DropDoctores";
import DropVendedor from "controles/DropVendedor";
import DropProductos from "controles/DropProductos";
import DropUnidadMedida from "controles/DropUnidadMedida";
import DropAlmacen from "controles/DropAlmacen";
import DropEstado from "controles/DropEstado";
import FileManager from "../app/FileManager";

// ====== Galeria =====
import ModalGaleria from "./ModalGaleria";

// ====== Componentes =====
import FileList from "./FileList";
import OrdenPdf from "./OrdenPdf";

// ====== Estilos =====
import "./Orden.css";

// ====== Request =====
import axios from "utils/axios";
import { url } from "../../api/Peticiones";

// ====== PDF =====
import { PDFViewer } from "@react-pdf/renderer";

import servicioProvider from "../../providers/server/servicio";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const AddUpdateOrden = ({
  setShowForm,
  setError,
  orden,
  setOrden,
  setOpenAlert,
}) => {
  const vendedor = JSON.parse(localStorage.getItem("userData")).sub;
  const { ordenDetail } = useSelector((state) => state.orden);

  useEffect(() => {
    if (!orden) return;

    setDataRows(orden);
    dispatch(getOrdenById(orden._id));
  }, [orden]);

  const onSubmit = async (values, actions) => {
    if (values.detalles.length) return submitOrden(values, actions);
    showError("Agrega al menos un producto");
  };

  // ========== Crear Orden =========
  const submitOrden = async (values, actions) => {
    let data = servicioProvider.formatDataOrder(vendedor, values);
    let response = {};

    setLoading(true);

    if (orden) {
      response = await servicioProvider.updateOrder(orden._id, data);
    } else {
      response = await servicioProvider.create(data);
    }

    if (response.error) {
      setLoading(false);
      return showError(
        "Hay campos vacíos. Completa todos los campos del formulario"
      );
    }

    // cancel();
    // setOpenAlert(true);
    setLoading(false);
    dispatch(changeStatusModalUpload(true));

    Array.from(values.detalles || []).forEach((detalle) => {
      if (!Array.isArray(detalle.galeria)) return;
      let files = Array.from(detalle.galeria).filter(
        (file) => file instanceof File
      );
      if (!files.length) return;

      dispatch(
        addMultipleUploadFile({
          files,
          reference: detalle.uuid,
          orderId: response.data._id,
        })
      );
    });
  };

  // ===== Mostrar Error ======
  const showError = (error) => {
    setOpenAlert(true);
    setError(error);
    setTimeout(() => {
      setError("");
    }, 4000);
  };

  // ===== Salir del formulario ====
  const cancel = () => {
    setShowForm(false);
    setOrden(null);
  };

  const [loading, setLoading] = useState(false);
  const [openGallery, setOpenGallery] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [fileListOpen, setFileListOpen] = useState({
    line_id: "",
    isOpen: false,
    index: null,
  });
  const [showPDF, setShowPDF] = useState(false);
  const [dataRows, setDataRows] = useState([]);

  const generateUUIDTMP = useCallback(() => {
    let running = true;

    do {
      let uuid = crypto.randomUUID();
      let exist = dataRows.find((d) => d.uuid == uuid);
      if (!exist) return uuid;
    } while (running);
  }, [dataRows]);

  const addValues = () => {
    setDataRows((previewRows) => {
      const data = {
        uuid: generateUUIDTMP(),
        line_id: previewRows.length + 1,
        producto: "",
        cantidad: 0,
        repetida: false,
        estatus: true,
        galeria: [],
        unidad_medida: "",
        almacen: "",
        estado: "",
        comentarios: "",
      };
      return [...previewRows, data];
    });
  };

  // ========== Eliminar fila de Artículo ======
  const deleteValues = (row, setFieldValue) => {
    setDataRows((previewRows) => [
      ...previewRows.filter((Row) => Row.line_id !== row.line_id),
    ]);
    if (row.line_id == 1) setFieldValue("detalles", []);
    else setFieldValue("detalles", dataRows);
  };

  // ========== Actualizar cambio en fila de Artículo ======
  const handleChangeValue = (value, row, SetFieldValue, id) => {
    const indexRow = dataRows.findIndex(
      (dataRow) => dataRow.line_id === row.line_id
    );

    setDataRows((previewRows) => {
      previewRows[indexRow][id] = value;

      return [...previewRows];
    });

    SetFieldValue("detalles", dataRows);
  };

  const handleOpenManage = useCallback((index, row) => {
    setFileListOpen({ isOpen: true, line_id: row.line_id, index });
  }, []);

  const handleSetListFiles = useCallback(
    (files) => {
      setDataRows(
        dataRows.map((row, i) => {
          i == fileListOpen.index && (row.galeria = files);
          return row;
        })
      );
      setFileListOpen({ line_id: "", isOpen: false, index: null });
    },
    [fileListOpen, dataRows]
  );

  return (
    <React.Fragment>
      {showPDF && orden ? (
        <>
          {/* ===== Volver al formulario ===== */}
          <Button
            onClick={() => {
              setShowPDF(false);
            }}
            color="inherit"
            style={{ margin: 10 }}
            variant="outlined"
            startIcon={<ArrowBackIcon />}
          >
            Volver al formulario
          </Button>

          {ordenDetail ? (
            <PDFViewer style={{ width: "100%", height: "100vh" }}>
              <OrdenPdf orden={ordenDetail} />
            </PDFViewer>
          ) : null}
        </>
      ) : (
        <div
          style={{
            width: "100%",
            background: "white",
            minHeight: 400,
            position: "relative",
          }}
        >
          <FileManager
            show={fileListOpen.isOpen}
            handleSetListFiles={handleSetListFiles}
            items={dataRows[fileListOpen.index]?.galeria || []}
          />
          {/* ======= Formulario ====== */}

          <Formik
            initialValues={{
              cliente: orden && orden.cliente ? orden.cliente._id : "",
              compania: orden && orden.compania ? orden.compania._id : "",
              sucursal: orden && orden.sucursal ? orden.sucursal._id : "",
              doctor: orden && orden.doctor ? orden.doctor._id : "",
              fecha: orden && orden.fecha ? orden.fecha : Date.now(),
              fecha_compromiso:
                orden && orden.fecha_compromiso ? orden.fecha_compromiso : "",
              vendedor: orden && orden.vendedor ? orden.vendedor._id : vendedor,
              createdAt:
                orden && orden.createdAt ? orden.createdAt : Date.now(),
              comentarios: orden && orden.comentarios ? orden.comentarios : "",
              estatus: orden ? orden.estatus : true,
              detalles: orden ? orden.detalles : dataRows,
            }}
            validationSchema={formSchema}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              isSubmitting,
              setFieldValue,
              handleChange,
              handleSubmit,
              handleBlur,
            }) => (
              <Form>
                {/* ================= Header ================= */}
                <MainCard
                  title={orden ? "Actualizar Orden" : "Registrar nueva orden"}
                >
                  <div
                    style={{
                      backgroundColor: "#e3f2fd",
                      borderRadius: "5px",
                      border: "1px solid #e3f2fd",
                      textAlign: "right",
                    }}
                  >
                    {/* ===== Botón: Imprimir ===== */}
                    {orden ? (
                      <Button
                        disabled={loading}
                        onClick={() => {
                          setShowPDF(true);
                        }}
                        color="inherit"
                        style={{ margin: 10 }}
                        variant="outlined"
                        endIcon={<PrintIcon />}
                      >
                        Imprimir
                      </Button>
                    ) : null}

                    {/* ===== Botón: Cancelar ===== */}
                    <Button
                      disabled={loading}
                      onClick={cancel}
                      style={{ margin: 10 }}
                      variant="outlined"
                      endIcon={<DeleteIcon />}
                      color="error"
                    >
                      Cancelar
                    </Button>

                    {/* ===== Botón: Crear Orden ===== */}
                    {loading ? (
                      <LoadingButton
                        style={{ margin: 10, width: 170, height: 36 }}
                        loading={loading}
                        variant="outlined"
                        disabled
                      >
                        Cargando
                      </LoadingButton>
                    ) : (
                      <>
                        <Button
                          type="submit"
                          style={{ margin: 10, width: 170 }}
                          variant="outlined"
                          endIcon={<SaveIcon />}
                        >
                          {orden ? "Actualizar Orden" : "Crear Orden"}
                        </Button>
                      </>
                    )}
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
                        Onchange={(value) => {
                          setFieldValue("cliente", value);
                        }}
                        disabled={orden ? true : false}
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
                        disabled={true}
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
                        Onchange={(value) => {}}
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
                          onChange={(value) => {
                            setFieldValue(
                              "fecha_compromiso",
                              new Date(value.toDate()).getTime()
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              size="small"
                              fullWidth
                              {...params}
                              required
                            />
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
                        Onchange={(value) => {}}
                      />
                    </Item>
                  </Grid>

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
                          onChange={(event) => {
                            setFieldValue("estatus", event.target.value);
                          }}
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
                        onChange={(event) => {
                          setFieldValue("comentarios", event.target.value);
                        }}
                        onBlur={(value) => {}}
                        error={errors.comentarios && touched.comentarios}
                        helperText={touched.comentarios && errors.comentarios}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Item>
                  </Grid>
                </Grid>

                {/* =============== Artículos ============== */}
                <MainCard title="Artículos">
                  <div
                    style={{
                      padding: 10,
                    }}
                  >
                    <Grid item xs={12}>
                      <Paper sx={{ width: "100%", overflow: "hidden" }}>
                        <TableContainer
                          component={Paper}
                          sx={{ maxHeight: 390 }}
                        >
                          <Table
                            sx={{ minWidth: 1650 }}
                            size="small"
                            aria-label="a dense table"
                          >
                            {/* =========== Tabla Header ======= */}
                            <TableHead>
                              <TableRow
                                style={{ backgroundColor: "ButtonFace" }}
                              >
                                <TableCell>Artículo</TableCell>
                                <TableCell>Unidad Medida</TableCell>
                                <TableCell>Almacen</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Cantidad</TableCell>
                                <TableCell align="center">Imágenes</TableCell>
                                <TableCell align="center">Repetida</TableCell>
                                <TableCell align="center">Estatus</TableCell>
                                <TableCell align="center">
                                  Comentarios
                                </TableCell>
                                <TableCell align="center">Eliminar</TableCell>
                              </TableRow>
                            </TableHead>

                            {/* =========== Tabla Body ======= */}
                            <TableBody>
                              {dataRows.map((row, i) => (
                                <TableRow
                                  key={row.line_id}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
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
                                  <TableCell
                                    style={{ width: 200 }}
                                    align="right"
                                  >
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
                                  <TableCell
                                    style={{ width: 200 }}
                                    align="right"
                                  >
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
                                  <TableCell
                                    style={{ width: 200 }}
                                    align="right"
                                  >
                                    <DropEstado
                                      HandleBlur={handleBlur}
                                      Errors={errors}
                                      variant="standard"
                                      Touched={touched}
                                      Id="estado"
                                      SetFieldValue={setFieldValue}
                                      Label=""
                                      Value={row.estado}
                                      Onchange={(value) => {
                                        handleChangeValue(
                                          value,
                                          row,
                                          setFieldValue,
                                          "estado"
                                        );
                                      }}
                                      Row={row}
                                      required
                                    />
                                  </TableCell>

                                  {/* ============= Cantidad ============= */}
                                  <TableCell
                                    style={{ width: 100 }}
                                    align="right"
                                  >
                                    <Grid item xs={12}>
                                      <TextField
                                        fullWidth
                                        variant="standard"
                                        id="cantidad"
                                        name="cantidad"
                                        label=""
                                        type="number"
                                        defaultValue={row.cantidad}
                                        onBlur={(event) => {
                                          handleChangeValue(
                                            event.target.value,
                                            row,
                                            setFieldValue,
                                            "cantidad"
                                          );
                                        }}
                                        size="small"
                                        required
                                      />
                                    </Grid>
                                  </TableCell>

                                  {/* ============= Agregar Imagen ============= */}
                                  <TableCell align="center">
                                    <Button
                                      onClick={() => handleOpenManage(i, row)}
                                      size="small"
                                      variant="outlined"
                                      endIcon={<CollectionsOutlinedIcon />}
                                    >
                                      Gestionar
                                    </Button>

                                    {/* <FileList
                                      setFileListOpen={setFileListOpen}
                                      fileListOpen={fileListOpen}
                                      row={row}
                                      setFieldValue={setFieldValue}
                                      handleChangeValue={handleChangeValue}
                                      imagesPreview={imagesPreview}
                                    /> */}
                                  </TableCell>

                                  {/* ============= Repetida ============= */}
                                  <TableCell align="center">
                                    <FormControlLabel
                                      label={row.repetida ? "Si" : "No"}
                                      control={
                                        <Switch
                                          id="repetida"
                                          name="repetida"
                                          defaultValue={row.repetida}
                                          onChange={(event) => {
                                            handleChangeValue(
                                              event.target.checked,
                                              row,
                                              setFieldValue,
                                              "repetida"
                                            );
                                          }}
                                        />
                                      }
                                    />
                                  </TableCell>

                                  {/* ============= Estatus ============= */}
                                  <TableCell align="center">
                                    <FormControlLabel
                                      label={
                                        row.estatus ? "Activo" : "Inactivo"
                                      }
                                      control={
                                        <Switch
                                          id="estatus"
                                          name="estatus"
                                          defaultValue={row.estatus}
                                          onChange={(event) => {
                                            handleChangeValue(
                                              event.target.checked,
                                              row,
                                              setFieldValue,
                                              "estatus"
                                            );
                                          }}
                                        />
                                      }
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
                                      onChange={(event) => {
                                        handleChangeValue(
                                          event.target.value,
                                          row,
                                          setFieldValue,
                                          "comentarios"
                                        );
                                      }}
                                      onBlur={(value) => {}}
                                      error={
                                        errors.comentarios &&
                                        touched.comentarios
                                      }
                                      helperText={
                                        touched.comentarios &&
                                        errors.comentarios
                                      }
                                      renderInput={(params) => (
                                        <TextField {...params} />
                                      )}
                                    />
                                  </TableCell>

                                  {/* ===== Eliminar Fila ===== */}
                                  <TableCell align="center">
                                    <Grid item xs={12}>
                                      <IconButton
                                        aria-label="Agregar"
                                        style={{ width: "30px" }}
                                      >
                                        <DeleteTwoToneIcon
                                          onClick={() => {
                                            deleteValues(row, setFieldValue);
                                            setGalleryImages(row.galeria);
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
                  <div style={{ textAlign: "center", padding: 10 }}>
                    <Button
                      onClick={() => {
                        addValues();
                      }}
                      size="small"
                      variant="outlined"
                      endIcon={<AddCircleTwoToneIcon />}
                    >
                      Agregar Artículo
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
      )}
    </React.Fragment>
  );
};

export default AddUpdateOrden;
