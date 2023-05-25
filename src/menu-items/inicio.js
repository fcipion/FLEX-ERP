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

const Inicio = {
    id: 'adm',
    title: <FormattedMessage id="ERP" />,
    caption: <FormattedMessage id="Integra ERP" />,
    icon: icons.IconKey,
    type: 'group'
};

export default Inicio;
