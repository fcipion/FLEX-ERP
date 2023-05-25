import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Monedas from 'componetes/Gestion/Monedas';
import ClaseProductos from 'componetes/Gestion/ClaseProductos';
import UnidadMedidas from 'componetes/Gestion/UnidadMedidas';
import Cajas from 'componetes/Gestion/Cajas';
import MediosPagos from 'componetes/Gestion/MediosPagos';
import Tarjetas from 'componetes/Gestion/Tarjetas';
import Turnos from 'componetes/Gestion/Turnos';
import TipoCP from 'componetes/ReprComerciales/TipoCP';
import Bancos from 'componetes/Gestion/Bancos';
import Clientes from 'componetes/ReprComerciales/Clientes';
import Proveedores from 'componetes/ReprComerciales/Proveedores';
import Vendedores from 'componetes/ReprComerciales/Vendedores';
import Doctores from 'componetes/ReprComerciales/Doctores';
import TipoDocumentos from 'componetes/administracion/TipoDocumentos';
import TerminoPago from 'componetes/administracion/TerminoPago';
import CondicionesPagos from 'componetes/administracion/CondicionesPagos';
import Almacen from 'componetes/Inventarios/Almacen';
import Producto from 'componetes/Inventarios/Producto';
import ListaPrecio from 'componetes/Inventarios/ListaPrecio';
import DeterminacionPrecio from 'componetes/Inventarios/DeterminacionPrecio';
import TipoIngresos from 'componetes/administracion/TipoIngresos';
import FacturasVentas from 'componetes/Ventas/FacturasVentas';
import NotaCredito from 'componetes/Ventas/NotaCredito';
import NotaDebito from 'componetes/Ventas/NotaDebito';
import Devolucion from 'componetes/Ventas/Devolucion';
import FacturasCompras from 'componetes/Compras/FacturasCompras';
import NotaCreditoCompras from 'componetes/Compras/NotaCredito';
import NotaDebitoCompras from 'componetes/Compras/NotaDebito';
import DevolucionCompras from 'componetes/Compras/Devolucion';
import PagosRecibidos from 'componetes/Ventas/PagosRecibidos';
import TipoItbis from 'componetes/Gestion/TipoITBIS';
import Itbis from 'componetes/Gestion/Itbis';
import Cuentas from 'componetes/Finzanas/Cuentas';
import OrdenServicios from 'componetes/Servicios/OrdenServicios';
import EstadoDoc from 'componetes/administracion/EstadoDoc';

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const Rol = Loadable(lazy(() => import('../componetes/administracion/Roles')));
const Compania = Loadable(lazy(() => import('../componetes/administracion/Compania')));
const Sucursal = Loadable(lazy(() => import('../componetes/administracion/Sucursales')));
const Usuarios = Loadable(lazy(() => import('../componetes/administracion/Usuarios')));
const TipoComprobantes = Loadable(lazy(() => import('../componetes/Gestion/TipoComprobantes')));
const RangoComprobantes = Loadable(lazy(() => import('../componetes/Gestion/RangoComprobantes')));
const TasaCambios = Loadable(lazy(() => import('../componetes/Gestion/TasaCambios')));
const TipoProductos = Loadable(lazy(() => import('../componetes/Gestion/TipoProductos')));
// ==============================|| MAIN ROUTING ||============================== //

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const DashboardAnalytics = Loadable(lazy(() => import('views/dashboard/Analytics')));

// widget routing
const WidgetStatistics = Loadable(lazy(() => import('views/widget/Statistics')));
const WidgetData = Loadable(lazy(() => import('views/widget/Data')));
const WidgetChart = Loadable(lazy(() => import('views/widget/Chart')));

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: 'dashboard/default',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard/analytic',
            element: <DashboardAnalytics />
        },
        {
            path: 'widget/statistics',
            element: <WidgetStatistics />
        },
        {
            path: 'widget/data',
            element: <WidgetData />
        },
        {
            path: 'widget/chart',
            element: <WidgetChart />
        },
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/sample-page',
            element: <DashboardDefault />
        },
        {
            path: '/rol/:modo/:id/:accion',
            element: <Rol />
        },
        {
            path: '/compania/:modo/:id/:accion',
            element: <Compania />
        },
        {
            path: '/sucursal/:modo/:id/:accion',
            element: <Sucursal />
        },
        {
            path: '/usuario/:modo/:id/:accion',
            element: <Usuarios />
        },

        // Gestion
        {
            path: '/tipoComprobante/:modo/:id/:accion',
            element: <TipoComprobantes />
        },

        // Finanzas
        {
            path: '/cuenta/:modo/:id/:accion',
            element: <Cuentas />
        },

        // Servicios
        {
            path: '/ordenServicio/:modo/:id/:accion',
            element: <OrdenServicios />
        },

        {
            path: '/rangoComprobante/:modo/:id/:accion',
            element: <RangoComprobantes />
        },

        {
            path: '/tasaCambio/:modo/:id/:accion',
            element: <TasaCambios />
        },

        {
            path: '/moneda/:modo/:id/:accion',
            element: <Monedas />
        },
        {
            path: '/tipoProducto/:modo/:id/:accion',
            element: <TipoProductos />
        },
        {
            path: '/claseProducto/:modo/:id/:accion',
            element: <ClaseProductos />
        },
        {
            path: '/unidadMedida/:modo/:id/:accion',
            element: <UnidadMedidas />
        },
        {
            path: '/caja/:modo/:id/:accion',
            element: <Cajas />
        },
        {
            path: '/mediosPago/:modo/:id/:accion',
            element: <MediosPagos />
        },
        {
            path: '/banco/:modo/:id/:accion',
            element: <Bancos />
        },
        {
            path: '/tarjeta/:modo/:id/:accion',
            element: <Tarjetas />
        },
        {
            path: '/turno/:modo/:id/:accion',
            element: <Turnos />
        },

        // Representes comerciales;
        {
            path: '/claseReprComerciale/:modo/:id/:accion',
            element: <TipoCP />
        },
        {
            path: '/cliente/:modo/:id/:accion',
            element: <Clientes />
        },
        {
            path: '/proveedore/:modo/:id/:accion',
            element: <Proveedores />
        },
        {
            path: '/vendedores/:modo/:id/:accion',
            element: <Vendedores />
        },
        {
            path: '/doctor/:modo/:id/:accion',
            element: <Doctores />
        },
        {
            path: '/tipoDocumento/:modo/:id/:accion',
            element: <TipoDocumentos />
        },
        {
            path: '/terminoPago/:modo/:id/:accion',
            element: <TerminoPago />
        },
        {
            path: '/condicionesPago/:modo/:id/:accion',
            element: <CondicionesPagos />
        },
        {
            path: '/tipoitbis/:modo/:id/:accion',
            element: <TipoItbis />
        },

        {
            path: '/itbis/:modo/:id/:accion',
            element: <Itbis />
        },

        // Inventarios;
        {
            path: '/almacen/:modo/:id/:accion',
            element: <Almacen />
        },
        {
            path: '/producto/:modo/:id/:accion',
            element: <Producto />
        },
        {
            path: '/listaprecio/:modo/:id/:accion',
            element: <ListaPrecio />
        },
        {
            path: '/determinacionPrecio/:modo/:id/:accion',
            element: <DeterminacionPrecio />
        },
        {
            path: '/tipoIngreso/:modo/:id/:accion',
            element: <TipoIngresos />
        },

        // Ventas;
        {
            path: '/facturaVenta/:modo/:id/:accion',
            element: <FacturasVentas />
        },
        {
            path: '/notaCreditoVenta/:modo/:id/:accion',
            element: <NotaCredito />
        },
        {
            path: '/notaDebitoVenta/:modo/:id/:accion',
            element: <NotaDebito />
        },
        {
            path: '/devolucionVenta/:modo/:id/:accion',
            element: <Devolucion />
        },
        {
            path: '/pagosRecibido/:modo/:id/:accion',
            element: <PagosRecibidos />
        },
        // Ventas;
        {
            path: '/facturaCompra/:modo/:id/:accion',
            element: <FacturasCompras />
        },
        {
            path: '/notaCreditoCompra/:modo/:id/:accion',
            element: <NotaCreditoCompras />
        },
        {
            path: '/notaDebitoCompra/:modo/:id/:accion',
            element: <NotaDebitoCompras />
        },
        {
            path: '/devolucionCompra/:modo/:id/:accion',
            element: <DevolucionCompras />
        },
        {
            path: '/estadoDoc/:modo/:id/:accion',
            element: <EstadoDoc />
        }
    ]
};

export default MainRoutes;
