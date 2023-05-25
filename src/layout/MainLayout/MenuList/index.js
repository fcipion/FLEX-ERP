import React, { memo, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Typography, useMediaQuery } from '@mui/material';

// // project imports
// import menuItem from 'menu-items';
import NavGroup from './NavGroup';
import LAYOUT_CONST from 'constant';
import { HORIZONTAL_MAX_ITEM } from 'config';
import useConfig from 'hooks/useConfig';
// third-party
// third-party
import { FormattedMessage } from 'react-intl';

// assets
import MenuItems from 'menu-items/menuItems';
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
import { flexbox } from '@mui/system';
import widget from 'menu-items/widget';
import dashboard from 'menu-items/dashboard';
import Inicio from 'menu-items/inicio';
// constant
const icons = { IconBug, IconKey, ManageAccountsIcon, AddBusinessIcon, InventoryIcon, ShoppingCartIcon, PointOfSaleIcon, AssessmentIcon };

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    // const menuItem = [];
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const { layout } = useConfig();
    // Acceder a registros de la paginas
    const dispatch = useDispatch();
    const { paginas, error } = useSelector((state) => state.pagina);
    const [admMenu, setAdmMenu] = useState([]);
    // const { paginas } = useSelector((state) => state.pagina);
    React.useEffect(() => {
        dispatch(getPaginas());
    }, [dispatch]);

    React.useEffect(() => {
        const rowsPaginas = [];
        if (paginas.length !== 0) {
            const { data } = paginas;
            const { Administración } = data;

            console.log('Administración', Administración);
            Administración.pagina.forEach((data) => {
                if (data.code) {
                    rowsPaginas[rowsPaginas.length] = {
                        id: data.code,
                        title: <FormattedMessage id="Rol" />,
                        type: 'item',
                        url: `/${data.code}`,
                        icon: SupervisorAccountIcon,
                        target: false
                    };
                }
            });

            setAdmMenu(rowsPaginas);
            console.log('rowsPaginas', rowsPaginas);
        }
    }, []);

    const modulo = [
        {
            id: 'adm',
            title: <FormattedMessage id="Administración" />,
            type: 'collapse',
            icon: AdminPanelSettingsIcon,
            children: []
        },
        {
            id: 'gest',
            title: <FormattedMessage id="Gestión" />,
            type: 'collapse',
            icon: icons.ManageAccountsIcon,
            children: []
        },
        {
            id: 'resp',
            title: <FormattedMessage id="Repr. comerciales" />,
            type: 'collapse',
            icon: icons.AddBusinessIcon,
            children: []
        },
        {
            id: 'inv',
            title: <FormattedMessage id="Inventarios" />,
            type: 'collapse',
            icon: icons.InventoryIcon,
            children: []
        },
        {
            id: 'comp',
            title: <FormattedMessage id="Compras" />,
            type: 'collapse',
            icon: icons.ShoppingCartIcon,
            children: []
        },
        {
            id: 'ven',
            title: <FormattedMessage id="Ventas" />,
            type: 'collapse',
            icon: icons.PointOfSaleIcon,
            children: []
        },
        {
            id: 'rep',
            title: <FormattedMessage id="Reportes" />,
            type: 'collapse',
            icon: icons.AssessmentIcon,
            children: []
        }
    ];

    // Set paginas modulos administrativo
    modulo[0].children = admMenu;

    const menu = {
        id: 'adm',
        title: <FormattedMessage id="ERP" />,
        caption: <FormattedMessage id="Integra" />,
        icon: icons.IconKey,
        type: 'group',
        children: ''
    };

    menu.children = modulo;

    const menuItem = {
        items: [Inicio, dashboard, widget, MenuItems]
    };

    // last menu-item to show in horizontal menu bar
    const lastItem = layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && !matchDownMd ? HORIZONTAL_MAX_ITEM : null;

    let lastItemIndex = menuItem.items.length - 1;
    let remItems = [];
    let lastItemId;

    if (lastItem && lastItem < menuItem.items.length) {
        lastItemId = menuItem.items[lastItem - 1].id;
        lastItemIndex = lastItem - 1;
        remItems = menuItem.items.slice(lastItem - 1, menuItem.items.length).map((item) => ({
            title: item.title,
            elements: item.children
        }));
    }

    const navItems = menuItem.items.slice(0, lastItemIndex + 1).map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} lastItem={lastItem} remItems={remItems} lastItemId={lastItemId} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default memo(MenuList);
