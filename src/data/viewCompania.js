const dataViewCompania = {
    usuario: 'IdUsuario',
    compania: 'IdCompania',
    modelo: 'companias',
    columns: [
        {
            field: 'id',
            headerName: 'Codigo',
            sortable: false,
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            hide: false
        },
        {
            field: 'nombre',
            headerName: 'Nombre',
            sortable: false,
            filterable: false,
            groupable: false,
            aggregable: false,
            disableExport: true,
            hide: false
        }
    ]
};

export default dataViewCompania;
