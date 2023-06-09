// third-party
import { FormattedMessage } from 'react-intl';

// assets
import BusinessIcon from '@mui/icons-material/Business';

import { IconKey, IconBug, IconKeyOff } from '@tabler/icons';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { useDispatch, useSelector } from 'store';
import { getPaginas } from 'store/slices/paginas';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import AssessmentIcon from '@mui/icons-material/Assessment';
import StoreIcon from '@mui/icons-material/Store';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CategoryIcon from '@mui/icons-material/Category';
import ExtensionIcon from '@mui/icons-material/Extension';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import MoneyIcon from '@mui/icons-material/Money';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

import ClassIcon from '@mui/icons-material/Class';
import ManIcon from '@mui/icons-material/Man';

import WarehouseIcon from '@mui/icons-material/Warehouse'; // Almacen
import DescriptionIcon from '@mui/icons-material/Description'; // Productos
import LocalOfferIcon from '@mui/icons-material/LocalOffer'; // Lista de precios
import PriceChangeIcon from '@mui/icons-material/PriceChange'; // Determinacion de precios
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup'; // Movimientos mercancias
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'; // Facturas
import NoteIcon from '@mui/icons-material/Note'; // Nota de debito/nota de credito
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn'; // Devolucion
import SummarizeIcon from '@mui/icons-material/Summarize';
import { generateId } from 'fun/helper';
import AccountTreeSharpIcon from '@mui/icons-material/AccountTreeSharp';
import MonetizationOnSharpIcon from '@mui/icons-material/MonetizationOnSharp';
import DesignServicesIcon from '@mui/icons-material/DesignServices';

// constant
const icons = {
    BusinessIcon,
    AdminPanelSettingsIcon,
    IconBug,
    IconKey,
    ManageAccountsIcon,
    AddBusinessIcon,
    InventoryIcon,
    ShoppingCartIcon,
    PointOfSaleIcon,
    AssessmentIcon,
    StoreIcon,
    SubtitlesIcon,
    PeopleAltIcon,
    LanguageIcon,
    SettingsSuggestIcon,
    HomeWorkIcon,
    AssignmentIcon,
    ReceiptLongIcon,
    CurrencyExchangeIcon,
    MonetizationOnIcon,
    CategoryIcon,
    ExtensionIcon,
    SquareFootIcon,
    AppRegistrationIcon,
    MoneyIcon,
    AccountBalanceIcon,
    CreditCardIcon,
    ChangeCircleIcon,
    ClassIcon,
    ManIcon,
    WarehouseIcon,
    DescriptionIcon,
    LocalOfferIcon,
    PriceChangeIcon,
    WifiProtectedSetupIcon,
    AddShoppingCartIcon,
    NoteIcon,
    AssignmentReturnIcon,
    ShoppingCartCheckoutIcon,
    SummarizeIcon,
    AccountTreeSharpIcon,
    MonetizationOnSharpIcon,
    DesignServicesIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const MenuItems = {
    id: 'adm',
    title: <FormattedMessage id="MODULOS" />,
    // caption: <FormattedMessage id="Integra ERP" />,
    icon: icons.IconKey,
    type: 'group',
    children: [
        {
            id: 'adm',
            title: <FormattedMessage id="Administración" />,
            type: 'collapse',
            icon: icons.AdminPanelSettingsIcon,
            children: [
                {
                    id: 'compania',
                    title: <FormattedMessage id="Compañías" />,
                    type: 'item',
                    url: `/compania/Index/0/${generateId()}`,
                    icon: icons.BusinessIcon,
                    target: false
                },
                {
                    id: 'sucursal',
                    title: <FormattedMessage id="Sucursales" />,
                    type: 'item',
                    url: `/sucursal/Index/0/${generateId()}`,
                    icon: icons.StoreIcon,
                    target: false
                },
                // {
                //     id: 'accesos',
                //     title: <FormattedMessage id="Accesos" />,
                //     type: 'item',
                //     url: `/accesos`,
                //     icon: icons.ManageAccountsIcon,
                //     target: false
                // },
                {
                    id: 'rol',
                    title: <FormattedMessage id="Rol" />,
                    type: 'item',
                    url: `/rol/Index/0/${generateId()}`,
                    icon: SupervisorAccountIcon,
                    target: false
                },

                // {
                //     id: 'rolAcceso',
                //     title: <FormattedMessage id="Rol accesos" />,
                //     type: 'item',
                //     url: `/rolAccesos`,
                //     icon: SupervisorAccountIcon,
                //     target: false
                // },
                {
                    id: 'usuario',
                    title: <FormattedMessage id="Usuarios" />,
                    type: 'item',
                    url: `/usuario/Index/0/${generateId()}`,
                    icon: icons.PeopleAltIcon,
                    target: false
                },
                // {
                //     id: 'idioma',
                //     title: <FormattedMessage id="Idiomas" />,
                //     type: 'item',
                //     url: `/idiomas`,
                //     icon: icons.LanguageIcon,
                //     target: false
                // },
                {
                    id: 'tipoDocumento',
                    title: <FormattedMessage id="Tipo de documentos" />,
                    type: 'item',
                    url: `/tipoDocumento/Index/0/${generateId()}`,
                    icon: icons.ReceiptLongIcon,
                    target: false
                },
                {
                    id: 'terminoPago',
                    title: <FormattedMessage id="Terminos de pago" />,
                    type: 'item',
                    url: `/terminoPago/Index/0/${generateId()}`,
                    icon: icons.ReceiptLongIcon,
                    target: false
                },
                {
                    id: 'condicionesPago',
                    title: <FormattedMessage id="Condiciones de pago" />,
                    type: 'item',
                    url: `/condicionesPago/Index/0/${generateId()}`,
                    icon: icons.ReceiptLongIcon,
                    target: false
                },
                {
                    id: 'tipoIngreso',
                    title: <FormattedMessage id="Tipo de ingresos" />,
                    type: 'item',
                    url: `/tipoIngreso/Index/0/${generateId()}`,
                    icon: icons.ReceiptLongIcon,
                    target: false
                },
                {
                    id: 'estadoDoc',
                    title: <FormattedMessage id="Estado documentos" />,
                    type: 'item',
                    url: `/estadoDoc/Index/0/${generateId()}`,
                    icon: icons.ReceiptLongIcon,
                    target: false
                }
            ]
        },
        {
            id: 'gest',
            title: <FormattedMessage id="Gestión" />,
            type: 'collapse',
            icon: icons.SettingsSuggestIcon,
            children: [
                {
                    id: 'fiscal',
                    title: <FormattedMessage id="Fiscal" />,
                    type: 'collapse',
                    icon: icons.HomeWorkIcon,
                    children: [
                        {
                            id: 'tComprobantes',
                            title: <FormattedMessage id="Tipos de comprobantes" />,
                            type: 'item',
                            url: `/tipoComprobante/Index/0/${generateId()}`,
                            icon: icons.AssignmentIcon,
                            target: false
                        },
                        {
                            id: 'rcomprobantes',
                            title: <FormattedMessage id="Rangos de comprobantes" />,
                            type: 'item',
                            url: `/rangoComprobante/Index/0/${generateId()}`,
                            icon: icons.ReceiptLongIcon,
                            target: false
                        }
                    ]
                },
                {
                    id: 'monedas',
                    title: <FormattedMessage id="Monedas" />,
                    type: 'item',
                    url: `/moneda/Index/0/${generateId()}`,
                    icon: icons.MonetizationOnIcon,
                    target: false
                },
                {
                    id: 'tcambio',
                    title: <FormattedMessage id="Tasa de cambio" />,
                    type: 'item',
                    url: `/tasaCambio/Index/0/${generateId()}`,
                    icon: icons.CurrencyExchangeIcon,
                    target: false
                },
                {
                    id: 'tproducto',
                    title: <FormattedMessage id="Tipo de productos" />,
                    type: 'item',
                    url: `/tipoProducto/Index/0/${generateId()}`,
                    icon: icons.ExtensionIcon,
                    target: false
                },

                {
                    id: 'cproductos',
                    title: <FormattedMessage id="Clase de productos" />,
                    type: 'item',
                    url: `/claseProducto/Index/0/${generateId()}`,
                    icon: icons.CategoryIcon,
                    target: false
                },
                {
                    id: 'unidadm',
                    title: <FormattedMessage id="Unidad de medidas" />,
                    type: 'item',
                    url: `/unidadMedida/Index/0/${generateId()}`,
                    icon: icons.SquareFootIcon,
                    target: false
                },
                {
                    id: 'caja',
                    title: <FormattedMessage id="Cajas" />,
                    type: 'item',
                    url: `/caja/Index/0/${generateId()}`,
                    icon: icons.PointOfSaleIcon,
                    target: false
                },
                {
                    id: 'mpago',
                    title: <FormattedMessage id="Medios de pagos" />,
                    type: 'item',
                    url: `/mediosPago/Index/0/${generateId()}`,
                    icon: icons.MoneyIcon,
                    target: false
                },
                {
                    id: 'banco',
                    title: <FormattedMessage id="Bancos" />,
                    type: 'item',
                    url: `/banco/creatactualizar_tipo_itbise/0/${generateId()}`,
                    icon: icons.AccountBalanceIcon,
                    target: false
                },
                {
                    id: 'tarjeta',
                    title: <FormattedMessage id="Tarjetas" />,
                    type: 'item',
                    url: `/tarjeta/Index/0/${generateId()}`,
                    icon: icons.CreditCardIcon,
                    target: false
                },
                {
                    id: 'turno',
                    title: <FormattedMessage id="Turnos" />,
                    type: 'item',
                    url: `/turno/Index/0/${generateId()}`,
                    icon: icons.ChangeCircleIcon,
                    target: false
                },

                {
                    id: 'tipoItbis',
                    title: <FormattedMessage id="Tipo ITBIS" />,
                    type: 'item',
                    url: `/tipoitbis/Index/0/${generateId()}`,
                    icon: icons.ChangeCircleIcon,
                    target: false
                },

                {
                    id: 'itbis',
                    title: <FormattedMessage id="Itbis" />,
                    type: 'item',
                    url: `/itbis/Index/0/${generateId()}`,
                    icon: icons.ChangeCircleIcon,
                    target: false
                }
            ]
        },
        {
            id: 'finanza',
            title: <FormattedMessage id="Finanzas" />,
            type: 'collapse',
            icon: icons.MonetizationOnSharpIcon,
            children: [
                {
                    id: 'cuentas',
                    title: <FormattedMessage id="Cuentas contable" />,
                    type: 'item',
                    url: `/cuenta/Index/0/${generateId()}`,
                    icon: icons.AccountTreeSharpIcon,
                    target: false
                }
            ]
        },
        {
            id: 'Servicios',
            title: <FormattedMessage id="Servicios" />,
            type: 'collapse',
            icon: icons.DesignServicesIcon,
            children: [
                {
                    id: 'ordenServicio',
                    title: <FormattedMessage id="Orden de servicios" />,
                    type: 'item',
                    url: `/ordenServicio`,
                    icon: icons.ReceiptLongIcon,
                    target: false
                }
            ]
        },
        {
            id: 'resp',
            title: <FormattedMessage id="Repr. comerciales" />,
            type: 'collapse',
            icon: icons.AddBusinessIcon,
            children: [
                {
                    id: 'claseReprComerciale',
                    title: <FormattedMessage id="Clase Repr." />,
                    type: 'item',
                    url: `/claseReprComerciale/Index/0/${generateId()}`,
                    icon: icons.ClassIcon,
                    target: false
                },
                {
                    id: 'cliente',
                    title: <FormattedMessage id="Clientes" />,
                    type: 'item',
                    url: `/cliente/Index/0/${generateId()}`,
                    icon: icons.BusinessIcon,
                    target: false
                },
                {
                    id: 'proveedore',
                    title: <FormattedMessage id="Proveedores" />,
                    type: 'item',
                    url: `/proveedore/Index/0/${generateId()}`,
                    icon: icons.BusinessIcon,
                    target: false
                },
                {
                    id: 'doctor',
                    title: <FormattedMessage id="Doctores" />,
                    type: 'item',
                    url: `/doctor/Index/0/${generateId()}`,
                    icon: icons.ManIcon,
                    target: false
                }
            ]
        },
        {
            id: 'inv',
            title: <FormattedMessage id="Inventarios" />,
            type: 'collapse',
            icon: icons.InventoryIcon,
            children: [
                {
                    id: 'almacen',
                    title: <FormattedMessage id="Almacen" />,
                    type: 'item',
                    url: `/almacen/Index/0/${generateId()}`,
                    icon: icons.WarehouseIcon,
                    target: false
                },
                {
                    id: 'producto',
                    title: <FormattedMessage id="Productos" />,
                    type: 'item',
                    url: `/producto/Index/0/${generateId()}`,
                    icon: icons.DescriptionIcon,
                    target: false
                },
                {
                    id: 'listaPrecio',
                    title: <FormattedMessage id="Lista de precios" />,
                    type: 'item',
                    url: `/listaPrecio/Index/0/${generateId()}`,
                    icon: icons.LocalOfferIcon,
                    target: false
                },
                {
                    id: 'determinacionPrecio',
                    title: <FormattedMessage id="Determinación de precios" />,
                    type: 'item',
                    url: `/determinacionPrecio/Index/0/${generateId()}`,
                    icon: icons.PriceChangeIcon,
                    target: false
                },
                {
                    id: 'emercancias',
                    title: <FormattedMessage id="Entrada de Mercancías" />,
                    type: 'item',
                    url: `/entradaMercancias`,
                    icon: icons.WifiProtectedSetupIcon,
                    target: false
                },
                {
                    id: 'smercancias',
                    title: <FormattedMessage id="Salida de Mercancías" />,
                    type: 'item',
                    url: `/salidaMercancias`,
                    icon: icons.WifiProtectedSetupIcon,
                    target: false
                },
                {
                    id: 'tmercancias',
                    title: <FormattedMessage id="Transf. de Mercancías" />,
                    type: 'item',
                    url: `/transferenciaMercancias`,
                    icon: icons.WifiProtectedSetupIcon,
                    target: false
                }
            ]
        },
        {
            id: 'comp',
            title: <FormattedMessage id="Compras" />,
            type: 'collapse',
            icon: icons.ShoppingCartIcon,
            children: [
                {
                    id: 'facturasCompras',
                    title: <FormattedMessage id="Facturas de compras (+Pagos)" />,
                    type: 'item',
                    url: `/facturaCompra/Index/0/${generateId()}`,
                    icon: icons.AddShoppingCartIcon,
                    target: false
                },
                {
                    id: 'notaCreditoCompra',
                    title: <FormattedMessage id="Nota de credito compras" />,
                    type: 'item',
                    url: `/notaCreditoCompra/Index/0/${generateId()}`,
                    icon: icons.NoteIcon,
                    target: false
                },
                {
                    id: 'notaDebitoCompra',
                    title: <FormattedMessage id="Nota de debito compras" />,
                    type: 'item',
                    url: `/notaDebitoCompra/Index/0/${generateId()}`,
                    icon: icons.NoteIcon,
                    target: false
                },
                {
                    id: 'devolucionCompra',
                    title: <FormattedMessage id="devolución en compras" />,
                    type: 'item',
                    url: `/devolucionCompra/Index/0/${generateId()}`,
                    icon: icons.AssignmentReturnIcon,
                    target: false
                }
            ]
        },
        {
            id: 'ven',
            title: <FormattedMessage id="Ventas" />,
            type: 'collapse',
            icon: icons.PointOfSaleIcon,
            children: [
                {
                    id: 'facturasVenta',
                    title: <FormattedMessage id="Facturas de ventas (+Pagos)" />,
                    type: 'item',
                    url: `/facturaVenta/Index/0/${generateId()}`,
                    icon: icons.ShoppingCartCheckoutIcon,
                    target: false
                },
                {
                    id: 'notaCredito',
                    title: <FormattedMessage id="Nota de crédito" />,
                    type: 'item',
                    url: `/notaCreditoVenta/Index/0/${generateId()}`,
                    icon: icons.NoteIcon,
                    target: false
                },
                {
                    id: 'notaDebito',
                    title: <FormattedMessage id="Nota de débitos" />,
                    type: 'item',
                    url: `/notaDebitoVenta/Index/0/${generateId()}`,
                    icon: icons.NoteIcon,
                    target: false
                },
                {
                    id: 'devoluciones',
                    title: <FormattedMessage id="Devoluciones" />,
                    type: 'item',
                    url: `/devolucionVenta/Index/0/${generateId()}`,
                    icon: icons.AssignmentReturnIcon,
                    target: false
                },
                {
                    id: 'pcaja',
                    title: <FormattedMessage id="Proceso de caja" />,
                    type: 'item',
                    url: `/procesoCaja`,
                    icon: icons.PointOfSaleIcon,
                    target: false
                }
            ]
        },
        {
            id: 'rep',
            title: <FormattedMessage id="Reportes" />,
            type: 'collapse',
            icon: icons.AssessmentIcon,
            children: [
                {
                    id: 'cuadre',
                    title: <FormattedMessage id="Cuadre de caja" />,
                    type: 'item',
                    url: `/cuadreCaja`,
                    icon: icons.SummarizeIcon,
                    target: false
                }
            ]
        }
    ]
};

export default MenuItems;
