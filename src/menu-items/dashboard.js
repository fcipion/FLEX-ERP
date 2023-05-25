// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconChartArcs, IconClipboardList, IconChartInfographic } from '@tabler/icons';

// constant
const icons = {
    IconChartArcs,
    IconClipboardList,
    IconChartInfographic
};

// ==============================|| WIDGET MENU ITEMS ||============================== //

const dashboard = {
    id: 'Dashboard',
    title: <FormattedMessage id="Dashboard" />,
    icon: icons.IconChartArcs,
    type: 'group',
    children: [
        {
            id: 'default',
            title: <FormattedMessage id="Por defecto" />,
            type: 'item',
            url: '/dashboard/default',
            icon: icons.IconChartArcs
        },
        {
            id: 'analytic',
            title: <FormattedMessage id="Analítico" />,
            type: 'item',
            url: '/dashboard/analytic',
            icon: icons.IconClipboardList
        }
    ]
};

export default dashboard;
