// third-party
import { combineReducers } from "redux";

// project imports
import snackbarReducer from "./slices/snackbar";
import menuReducer from "./slices/menu";
import rols from "./slices/rol";
import paginas from "./slices/paginas";
import companias from "./slices/compania";
import monedas from "./slices/moneda";
import sucursales from "./slices/sucursal";
import rolesAccesos from "./slices/rolesAccesos";
import usuarios from "./slices/usuarios";
import idiomas from "./slices/idioma";
import tComprobantes from "./slices/tiposComprobante";
import rangoComprobantes from "./slices/rangoComprobantes";
import tasaCambios from "./slices/tasaCambio";
import tipoProductos from "./slices/tipoProducto";
import claseProductos from "./slices/claseProducto";
import unidadMedidas from "./slices/unidadMedida";
import cajas from "./slices/caja";
import medioPagos from "./slices/medioPago";
import bancos from "./slices/banco";
import tarjetas from "./slices/tarjeta";
import turnos from "./slices/turnos";
import procesoCajas from "./slices/procesoCaja";
import claseReprComerciales from "./slices/claseReprComerciales";
import clientes from "./slices/clientes";
import proveedores from "./slices/proveedore";
import almacens from "./slices/almacen";
import productos from "./slices/producto";
import listaPrecios from "./slices/listaPrecios";
import determinacionPrecios from "./slices/determinacionPrecio";
import movimientosMercancias from "./slices/movimientosMercancia";
import tipoDocumentos from "./slices/tipoDocumento";
import TerminoPagos from "./slices/TerminoPago";
import condicionesPagos from "./slices/condicionesPago";
import doctores from "./slices/doctor";
import tipoIngresos from "./slices/tipoIngreso";
import ventas from "./slices/venta";
import tipoitbiss from "./slices/tipoitbis";
import itbiss from "./slices/itbis";
import cuentas from "./slices/cuenta";
import estadoDocs from "./slices/estadoDoc";
import ordenes from "./slices/orden";
import files from "./slices/file";
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  orden: ordenes,
  snackbar: snackbarReducer,
  menu: menuReducer,
  rol: rols,
  pagina: paginas,
  compania: companias,
  moneda: monedas,
  sucursal: sucursales,
  rolesAcceso: rolesAccesos,
  usuario: usuarios,
  idioma: idiomas,
  tComprobante: tComprobantes,
  rangoComprobante: rangoComprobantes,
  tasaCambio: tasaCambios,
  tipoProducto: tipoProductos,
  tipoDocumento: tipoDocumentos,
  claseProducto: claseProductos,
  unidadMedida: unidadMedidas,
  caja: cajas,
  medioPago: medioPagos,
  banco: bancos,
  tarjeta: tarjetas,
  turno: turnos,
  procesoCaja: procesoCajas,
  terminoPago: TerminoPagos,
  condicionesPago: condicionesPagos,
  claseReprComerciale: claseReprComerciales,
  cliente: clientes,
  proveedore: proveedores,
  almacen: almacens,
  producto: productos,
  listaPrecio: listaPrecios,
  determinacionPrecio: determinacionPrecios,
  movimientosMercancia: movimientosMercancias,
  doctor: doctores,
  tipoIngreso: tipoIngresos,
  venta: ventas,
  tipoitbis: tipoitbiss,
  itbis: itbiss,
  cuenta: cuentas,
  estadoDoc: estadoDocs,
  files,
});

export default reducer;
