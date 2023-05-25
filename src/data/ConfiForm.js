 

const data = {
    columns: [

        {
            field: 'id',
            headerName: 'Config. Id',
            hide: false,
            size: 'small'
        },
        {
            field: 'compania',
            headerName: 'compania',
            hide: false,
            size: 'small'
        },
        {
            field: 'usuario',
            headerName: 'usuario',
            hide: false,
            size: 'small'
        },
        {
            field: 'idForm',
            headerName: 'Formulario ID',
            hide: false,
            size: 'small'
        },
       
        
        {
            field: 'idcampo',
            headerName: 'Campo ID',
            sortable: false,
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            size: 'small'
        },
        {
            field: 'descripcion',
            headerName: 'Descripción del campo',
            sortable: false,
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            hide: false,
            size: 'small'
        },        
        {
            field: 'texto',
            headerName: 'Nombre a mostrar',
            sortable: false,
            filterable: false,
            type: 'string',
            editable: true,
            groupable: false,
            aggregable: false,
            disableExport: true,
            hide: false,
            size: 'small'
        },
        {
            field: 'type',
            headerName: 'Tipo de datos',
            sortable: false,
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            hide: false
        },
        {
            field: 'longitud',
            headerName: 'Tamaño del campo',
            sortable: false,
            type: 'number',
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            hide: true
        },
        {
            field: 'editable',
            headerName: 'Campo editable?',
            sortable: false,
            editable: true,
            type: 'boolean',
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            hide: true
        }, 
        {
            field: 'visible',
            headerName: 'Visible?',
            sortable: false,
            type: 'boolean',
            editable: true,
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            hide: true
        } 
    ],
    rows: [
        {
            id: 'Id de la config. (01)',
            compania: 'id de la compania',
            usuario: 'nombre usuario',
            idForm: 'Id del formulario',
            idcampo: 'id del campo',
            descripcion: 'Descripcion del campo',
            texto: 'El texto que se va a mostrar del camo en el formulario',
            type: 'Tipo de dato que almacena',
            longitud: 'el tamaño del campo',
            editable: 'Un boolean para saber si el campo es editable o no, colocar true o false',
            editable: 'Un boolean para saber si el campo es visible o no, colocar true o false',
        }, 
        {
            id: 'Id de la config. (02)',
            compania: 'id de la compania',
            usuario: 'nombre usuario',
            idForm: 'Id del formulario',
            idcampo: 'id del campo',
            descripcion: 'Descripcion del campo',
            texto: 'El texto que se va a mostrar del camo en el formulario',
            type: 'Tipo de dato que almacena',
            longitud: 'el tamaño del campo',
            editable: 'Un boolean para saber si el campo es editable o no, colocar true o false',
            editable: 'Un boolean para saber si el campo es visible o no, colocar true o false',
        }
    ]
} 
