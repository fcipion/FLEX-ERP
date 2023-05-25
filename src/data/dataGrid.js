import { DataGrid, GridActionsCellItem, GridRowId, GridColumns } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { randomCreatedDate, randomUpdatedDate } from '@mui/x-data-grid-generator';
import { IconView360 } from '@tabler/icons';
import { flexbox } from '@mui/system';

// const dataGrid = {
//     columns: [
//         {
//             field: 'id',
//             hide: true
//         },
//         {
//             field: 'avatar',
//             headerName: 'Avatar',
//             sortable: false,
//             filterable: false,
//             groupable: false,
//             aggregable: false,
//             disableExport: true,
//             hide: true
//         },
//         {
//             field: 'name',
//             headerName: 'Name',
//             dataGeneratorUniquenessEnabled: true,
//             width: 120,
//             editable: true,
//             groupable: false,
//             aggregable: false
//         }
//     ],
//     rows: [
//         {
//             id: '588dcd8a-e3b4-565d-83ab-dcd79efba8be',
//             avatar: '#2196f3',
//             name: 'Harriett Cook',
//             website: 'http://sir.kn/ani',
//             rating: 2,
//             email: 'vili@ato.cw',
//             phone: '(722) 941-5383',
//             username: '@mufpu',
//             city: 'Sihowi'
//         }
//     ],
//     initialState: {
//         columns: {
//             columnVisibilityModel: {
//                 id: false,
//                 avatar: false,
//                 website: false,
//                 email: false,
//                 phone: false,
//                 username: false,
//                 city: false,
//                 company: false,
//                 position: false,
//                 lastUpdated: true,
//                 salary: true,
//                 name: true
//             }
//         }
//     }
// };

const dataGrid = {
    columns: [
        {
            field: 'id',
            hide: false,
            size: 'small'
        },
        {
            field: 'nombre',
            headerName: 'Nombre',
            sortable: false,
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            size: 'small'
        },
        {
            field: 'descripcion',
            headerName: 'Descripcion',
            sortable: false,
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            hide: false,
            size: 'small'
        },
        {
            field: 'rnc',
            headerName: 'Rnc',
            sortable: false,
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            hide: false
        },
        {
            field: 'direccion',
            headerName: 'Dirección',
            sortable: false,
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            hide: true
        },
        {
            field: 'email',
            headerName: 'Email',
            sortable: false,
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            hide: true
        },
        {
            field: 'telefono',
            headerName: 'Teléfono',
            sortable: false,
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            hide: false,
            size: 'small'
        },
        {
            field: 'celular',
            headerName: 'Celular',
            sortable: false,
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            hide: true
        },
        {
            field: 'whatsapp',
            headerName: 'Whatsapp',
            sortable: false,
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            hide: true
        },
        {
            field: 'mision',
            headerName: 'Misión',
            sortable: false,
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            hide: true
        },
        {
            field: 'vision',
            headerName: 'Visión',
            sortable: false,
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            hide: true
        },
        {
            field: 'Valores',
            headerName: 'valores',
            sortable: false,
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            hide: true
        },
        {
            field: 'estatus',
            headerName: 'Estatus',
            sortable: false,
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            hide: false
        },
        {
            field: 'fecha_establecida',
            headerName: 'Fecha Establecida',
            sortable: false,
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            hide: true
        },
        {
            field: 'logo',
            headerName: 'Logo',
            sortable: false,
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            hide: false
        },
        {
            field: 'sitio_web',
            headerName: 'Sitio Web',
            sortable: false,
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            hide: true
        },
        {
            field: 'moneda_curso',
            headerName: 'Moneda curso',
            sortable: false,
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            hide: true
        },
        {
            field: 'moneda_paralela',
            headerName: 'Moneda paralela',
            sortable: false,
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            hide: true
        }
    ],
    rows: [
        {
            _id: '6350d461c9b459ca1d63c243',
            nombre: 'Demo',
            rnc: '12345678',
            telefono: '829-531-3219',
            celular: '829-938-3421',
            whatsapp: '829-938-3421',
            mision: 'Ser los mejores',
            vision: 'Ser los numero 1',
            valores: 'Respetuosos y responsables',
            estatus: true,
            fecha_establecida: '2022-10-20T00:00:00.000Z',
            logo: 'Prueba.png',
            createdAt: '2022-10-20T04:53:53.482Z',
            id: 2,
            __v: 0
        },
        {
            _id: '63d6c498a804fa1a67572ac0',
            nombre: 'Compania de prueba Mobile',
            descripcion: 'Compania de prueba Mobile',
            estatus: true,
            createdAt: '2023-01-29T19:10:16.860Z',
            id: 1,
            __v: 0
        }
    ]
};
export default dataGrid;
