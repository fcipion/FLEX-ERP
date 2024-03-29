import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  TextField,
  Grid,
  Divider,
  FormControl,
  InputAdornment,
  Card,
  Alert,
  FormControlLabel,
} from "@mui/material";
import * as Yup from "yup";
import CrudControl from "controles/CrudControl";
import MainCard from "ui-component/cards/MainCard";
import { EmailTwoTone, Mode, ModeFanOff } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import { PatternFormat } from "react-number-format";
import LocalPhoneTwoToneIcon from "@mui/icons-material/LocalPhoneTwoTone";
import PhoneIphoneTwoToneIcon from "@mui/icons-material/PhoneIphoneTwoTone";
import ChatTwoToneIcon from "@mui/icons-material/ChatTwoTone";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Switch from "@mui/material/Switch";
import dayjs from "dayjs";
import DropEstatus from "controles/DropEstatus";
import DropMonedas from "controles/DropMonedas";
import DropSimbolo from "controles/DropSimbolo";
import Formulario from "controles/Formulario";
import { useRoutes, useNavigate, useParams } from "react-router-dom";
import QuickFilteringGrid from "controles/QuickFilteringGrid";
import { useDispatch, useSelector, dispatch } from "store";
import { getSucursales, getSucursalById } from "store/slices/sucursal";
import dataGrid from "data/dataGrid";
import AlertPOP from "controles/AlertPOP";
import {
  Post,
  Get,
  Put,
  DeleteData,
  PostLogin,
  url,
} from "../../api/Peticiones";
import axios from "utils/axios";
import AlertDialog from "controles/AlertDialog";
import { idID } from "@mui/material/locale";
import DataSimbolo from "data/DataSimbolo";
import { MensajeVisualizar } from "data/InfoData";
import { getNextValue } from "fun/helper";
import LineProgress from "controles/LineProgress";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const formSchema = Yup.object().shape({
  compania: Yup.string().required("Requerido"),
  descripcion: Yup.string().required("Requerido"),
  telefono: Yup.string().required("Rquerido"),
  // celular: Yup.string().required('Requerido'),
  // whatsapp: Yup.string().required('Requerido'),
  direccion: Yup.string().required("Rquerido"),
});

function generateId() {
  return Date.now().toString() + Math.random().toString().slice(2);
}

const Sucursales = ({ modo: modoProp }) => {
  const [value, setValue] = React.useState("2014-08-18T21:11:54");
  const [valueEstatus, setValueEstatus] = React.useState({
    label: "Activo",
    value: true,
  });
  const [valueMLocal, setValueMLocal] = React.useState({
    label: "Activo",
    value: "True",
  });
  const [valueSimbolo, setValueSimbolo] = React.useState({
    title: "",
    value: "",
  });
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [displayError, setDisplayError] = React.useState("none");
  const [messageInfo, setMessageInfo] = React.useState({ type: "", title: "" });
  const [optiones, setOptions] = React.useState([]);
  const { modo, id, accion } = useParams();
  const navegate = useNavigate();
  const { sucursales, sucursal, error } = useSelector(
    (state) => state.sucursal
  );
  const fetchSucursales = () => {
    dispatch(getSucursales());
  };
  React.useEffect(() => {
    fetchSucursales();
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getSucursalById(id));
  }, [id, accion, modo]);

  const [alertValue, setAlert] = useState({
    type: "",
    message: "",
    open: false,
  });
  const [modoAccion, setModoAccion] = useState();
  const [openConfDlg, setOpenConfDlg] = useState(false);

  const label = { inputProps: { "aria-label": "Switch demo" } };
  let formTitulo = "";
  switch (modo) {
    case "create":
      formTitulo = "Registro de sucursal";
      break;
    case "edit":
      formTitulo = "Editar sucursal";
      break;

    case "view":
      formTitulo = "Visualizar sucarsal";
      break;
    default:
      formTitulo = "Registro de sucursal";
      break;
  }

  useEffect(() => {
    if (modo === "Index") {
      setAlert({ type: "", message: "", open: false });
      setMessageInfo({ type: "", title: "" });
    }
  }, [accion]);
  React.useEffect(() => {
    const _modo = modo || modoProp;
    if (_modo === "create") {
      setOptions(["Crear", "Crear nuevo", "Crear editar"]);
    } else {
      setOptions(["Editar", "Editar nuevo", "Copiar"]);
    }
  }, [modo, modoProp]);
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handlerAdd = () => {
    navegate(`/sucursal/create/0/${generateId()}`);
  };

  const handlerListar = () => {
    navegate(`/sucursal/Index/${id}/${generateId()}`);
  };

  const clickEdit = (value) => {
    /* eslint no-underscore-dangle: 0 */

    navegate(`/sucursal/edit/${value}/${generateId()}`);
  };

  const clickView = (value) => {
    /* eslint no-underscore-dangle: 0 */

    navegate(`/sucursal/view/${value}/${generateId()}`);
  };

  // if (modo === 'edit' && moneda.length !== 0) {

  //     values.compania = moneda.data.compania;
  //     values.simbolo = moneda.data.simbolo;
  //     values.estatus = moneda.data.estatus;
  //     values.descripcion = moneda.data.descripcion;
  //     // set simbolo.
  //     const simbolo = JSON.stringify(DataSimbolo.find((data) => data.value === moneda.data.simbolo));
  //     setValueSimbolo(JSON.parse(simbolo));

  // }

  return modo === "Index" ? (
    <>
      {sucursales.length !== 0 ? (
        <MainCard title="Listado de sucursal">
          <QuickFilteringGrid
            data={sucursales}
            clickAdd={handlerAdd}
            clickEdit={clickEdit}
            clickView={clickView}
          />
        </MainCard>
      ) : (
        <LineProgress />
      )}
    </>
  ) : (
    <>
      <Grid
        container
        spacing="2"
        style={{
          opacity: "100",
          borderRadius: "5px",
          padding: "2px",
          backgroundColor: "#AED6F1",
        }}
      >
        <Formik
          enableReinitialize
          initialValues={{
            compania: userData.compania,
            descripcion: sucursal.data ? sucursal.data.descripcion : "",
            telefono: sucursal.data ? sucursal.data.telefono : "",
            celular: sucursal.data ? sucursal.data.celular : "",
            whatsapp: sucursal.data ? sucursal.data.whatsapp : "",
            direccion: sucursal.data ? sucursal.data.direccion : "",
            estatus: sucursal.data ? sucursal.data.estatus : true,
          }}
          validationSchema={formSchema}
          onSubmit={(value, { setSubmitting, resetForm }) => {
            setTimeout(async () => {
              // const modoAccion = modo;
              let result = "";

              if (modo === "view") {
                setAlert({
                  type: "warning",
                  open: true,
                  message: MensajeVisualizar,
                });
                setSubmitting(false);
                return;
              }

              try {
                switch (modoAccion) {
                  case "Crear":
                    result = await axios.post(
                      `${url}/registro_sucursal`,
                      value
                    );

                    if (!result.error) {
                      setMessageInfo({
                        type: "success",
                        title: `Creada la sucursal: ${result.data.data.descripcion}`,
                      });
                    }
                    break;
                  case "Crear nuevo":
                    result = await axios.post(
                      `${url}/registro_sucursal`,
                      value
                    );
                    resetForm();

                    if (!result.error) {
                      setMessageInfo({
                        type: "success",
                        title: `Creada la sucursal: ${result.data.data.descripcion}`,
                      });
                    }
                    dispatch(getSucursales());
                    break;
                  case "Crear editar":
                    result = await axios.post(
                      `${url}/registro_sucursal`,
                      value
                    );
                    /* eslint no-underscore-dangle: 0 */
                    navegate(
                      `/sucursal/edit/${result.data.data._id}/${generateId()}`
                    );

                    if (!result.error) {
                      setMessageInfo({
                        type: "success",
                        title: `Creada la sucursal: ${result.data.data.descripcion}`,
                      });
                    }
                    break;
                  case "Editar":
                    result = await axios.put(
                      `${url}/actualizar_sucursal/${id}`,
                      value
                    );

                    if (!result.error) {
                      setMessageInfo({
                        type: "success",
                        title: `Actualizada la sucursal: ${result.data.data.descripcion}`,
                      });
                    }
                    break;

                  case "Editar nuevo":
                    result = await axios.put(
                      `${url}/actualizar_sucursal/${id}`,
                      value
                    );
                    resetForm();
                    navegate(`/sucursal/create/0/${generateId()}`);

                    if (!result.error) {
                      setMessageInfo({
                        type: "success",
                        title: `Actualizada la sucursal: ${result.data.data.descripcion}`,
                      });
                    }
                    break;
                  case "Copiar":
                    result = await axios.post(
                      `${url}/registro_sucursal`,
                      value
                    );

                    if (!result.error) {
                      setMessageInfo({
                        type: "success",
                        title: `Copiada la sucursal: ${result.data.data.descripcion}`,
                      });
                    }
                    break;
                  case "delete":
                    result = await axios.delete(
                      `${url}/eliminar_sucursal/${id}`,
                      value
                    );

                    if (!result.error) {
                      setMessageInfo({
                        type: "warning",
                        title: `Sucursal eliminada: ${result.data.data.descripcion}`,
                      });
                    }
                    break;
                  default:
                    break;
                }
              } catch (error) {
                setSubmitting(false);
                setMessageInfo({
                  type: "error",
                  title: `Error creando sucursal: ${JSON.stringify(error)}`,
                });
              }

              setSubmitting(false);
            }, 400);
          }}
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
          }) => {
            values.compania = userData.compania;
            // setFieldValue('descripcion', 'Fleirin');

            const handlerDelete = () => {
              setModoAccion("delete");
              setOpenConfDlg(true);
            };

            const handlerCreate = (value) => {
              setModoAccion(value);
              handleSubmit();
            };
            const handlerPrint = () => {
              handleSubmit();
            };

            const handlerNavegateData = (value) => {
              if (modo === "edit" || modo === "view") {
                const idNexBack = getNextValue(
                  // Arreglo de monedas
                  sucursales.rows,
                  // Objeto monedas
                  sucursal.data,
                  value
                );
                if (idNexBack === 0)
                  setAlert({
                    type: "warning",
                    open: true,
                    message: "Registro no econtrado",
                  });
                if (idNexBack !== 0) {
                  navegate(`/sucursal/edit/${idNexBack}/${generateId()}`);
                }
              }
              //  else {
              //     setDisplayError('block');
              //     setTypeMessage('success');
              //     setTitleMessage('Creada');
              // }
            };

            return (
              <>
                {openConfDlg ? (
                  <AlertDialog
                    SetOpenConfDlg={setOpenConfDlg}
                    Open={openConfDlg}
                    setValue={() => {
                      handleSubmit();
                    }}
                    titulo="¿Esta usted seguro que desea eliminar este registro?"
                  />
                ) : (
                  ""
                )}
                <Grid container spacing="2">
                  <AlertPOP prop={alertValue} />
                  <Grid item xs={12} lg={12}>
                    <MainCard title={formTitulo}>
                      <Divider />
                      <CrudControl
                        HandlerDelete={handlerDelete}
                        HandlerCreate={handlerCreate}
                        HandlerPrint={handlerPrint}
                        MessageInfo={messageInfo}
                        HandlerListar={handlerListar}
                        Options={optiones}
                        HandlerNavegate={(value) => {
                          handlerNavegateData(value);
                        }}
                        IsSubmitting={isSubmitting}
                        Modo={modo}
                      />
                      <Divider />
                      <Grid
                        container
                        spacing={3}
                        style={{
                          marginTop: "5px",
                          pointerEvents: modo === "view" ? "none" : "fill",
                          opacity: modo === "view" ? "0.60" : "100",
                        }}
                      >
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="descripcion"
                            name="descripcion"
                            label="Nombre"
                            value={values.descripcion}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.descripcion && touched.descripcion}
                            helperText={
                              touched.descripcion && errors.descripcion
                            }
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Divider />
                        </Grid>
                        <Grid item xs={6}>
                          <PatternFormat
                            id="telefono"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LocalPhoneTwoToneIcon />
                                </InputAdornment>
                              ),
                            }}
                            format="+1 (###) ###-####"
                            mask="_"
                            customInput={TextField}
                            label="Telefono"
                            onBlur={handleBlur}
                            error={errors.telefono && touched.telefono}
                            helperText={touched.telefono && errors.telefono}
                            renderInput={(params) => <TextField {...params} />}
                            fullWidth
                            value={values.telefono}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <PatternFormat
                            id="celular"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PhoneIphoneTwoToneIcon />
                                </InputAdornment>
                              ),
                            }}
                            format="+1 (###) ###-####"
                            mask="_"
                            customInput={TextField}
                            label="Celular"
                            onBlur={handleBlur}
                            error={errors.celular && touched.celular}
                            helperText={touched.celular && errors.celular}
                            renderInput={(params) => <TextField {...params} />}
                            fullWidth
                            value={values.celular}
                            onChange={handleChange}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <PatternFormat
                            id="whatsapp"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <WhatsAppIcon />
                                </InputAdornment>
                              ),
                            }}
                            format="+1 (###) ###-####"
                            mask="_"
                            customInput={TextField}
                            label="Whatsapp"
                            onBlur={handleBlur}
                            error={errors.whatsapp && touched.whatsapp}
                            helperText={touched.whatsapp && errors.whatsapp}
                            renderInput={(params) => <TextField {...params} />}
                            fullWidth
                            value={values.whatsapp}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            id="direccion"
                            label="Dirección"
                            onBlur={handleBlur}
                            error={errors.direccion && touched.direccion}
                            helperText={touched.direccion && errors.direccion}
                            renderInput={(params) => <TextField {...params} />}
                            fullWidth
                            multiline
                            value={values.direccion}
                            onChange={handleChange}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Divider />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Switch
                                name="estatus"
                                checked={values.estatus}
                                onChange={(data) => {
                                  setFieldValue("estatus", data.target.checked);
                                }}
                              />
                            }
                            label="Activo"
                          />
                        </Grid>
                      </Grid>
                      {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <button type="submit" disabled={isSubmitting}>
                                            Submit
                                        </button>
                                    </div> */}
                    </MainCard>
                  </Grid>
                </Grid>
              </>
            );
          }}
        </Formik>
      </Grid>
    </>
  );
};

export default Sucursales;
