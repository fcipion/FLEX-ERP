/**
 * Transforma el objeto de datos filtrando y mapeando las filas a una nueva estructura.
 * El objeto de datos transformado contiene las propiedades "columns" y "rows".
 *
 * @param {Object} data - El objeto de datos original con las propiedades "columns" y "rows".
 * @param {Object} mappings - El objeto de mapeo que especifica las propiedades de destino y las rutas para obtener los valores correspondientes del objeto de datos original.
 * @returns {Object} - El objeto de datos transformado con las filas filtradas y mapeadas.
 */
const transformData = (data, mappings) => {
    const { rows, columns } = data;

    const transformedRows = rows.reduce((accumulator, row) => {
        const newRow = Object.entries(mappings).reduce((obj, [key, value]) => {
            const properties = value.split('.');
            let nestedValue = row[properties[0]];

            // eslint-disable-next-line no-plusplus
            for (let i = 1; i < properties.length; i++) {
                if (nestedValue) {
                    nestedValue = nestedValue[properties[i]];
                } else {
                    break;
                }
            }

            obj[key] = nestedValue;
            return obj;
        }, {});

        accumulator.push(newRow);
        return accumulator;
    }, []);

    return {
        columns,
        rows: transformedRows
    };
};

const transformInvoiceData = (data) => {
    const mappings = {
        id: 'id',
        fecha_contabilizacion: 'fecha_contabilizacion',
        vendedor: 'vendedor.nombres',
        estatus: 'estatus',
        importe: 'montoAplicado',
        'caja.descripcion': 'caja.descripcion',
        'vendedor.nombre': 'vendedor.nombres',
        'cliente.nombre': 'cliente.nombre',
        descripcion: 'cliente.descripcion'
    };

    return transformData(data, mappings);
};

const transformUserData = (data) => {
    const mappings = {
        id: 'id',
        descripcion: 'descripcion',
        apellidos: 'apellidos',
        email: 'email',
        'rol.descripcion': 'rol.descripcion',
        telefono: 'telefono',
        estatus: 'estatus'
    };

    return transformData(data, mappings);
};

const transformInventoryData = (data) => {
    const mappings = {
        id: 'id',
        'sucursal.descripcion': 'sucursal.descripcion',
        descripcion: 'descripcion',
        estatus: 'estatus'
    };

    return transformData(data, mappings);
};

const transformProductData = (data) => {
    const mappings = {
        id: 'id',
        descripcion: 'descripcion',
        'sucursal.descripcion': 'sucursal.descripcion',
        'almacen.descripcion': 'almacen.descripcion',
        'tipo_producto.descripcion': 'tipo_producto.descripcion',
        'clase_producto.descripcion': 'clase_producto.descripcion',
        cantidad_stock: 'cantidad_stock',
        cantidad_comprometida: 'cantidad_comprometida',
        cantidad_disponible: 'cantidad_disponible',
        estatus: 'estatus'
    };

    return transformData(data, mappings);
};

const transformPaymentMethodData = (data) => {
    const mappings = {
        id: 'id',
        descripcion: 'descripcion',
        'sucursal.descripcion': 'sucursal.nombre',
        estatus: 'estatus'
    };

    return transformData(data, mappings);
};

const transformCreditCardData = (data) => {
    const mappings = {
        id: 'id',
        descripcion: 'descripcion',
        'sucursal.descripcion': 'sucursal.descripcion',
        estatus: 'estatus'
    };

    return transformData(data, mappings);
};

const transformTurnsData = (data) => {
    const mappings = {
        id: 'id',
        descripcion: 'descripcion',
        'sucursal.descripcion': 'sucursal.descripcion',
        estatus: 'estatus'
    };

    return transformData(data, mappings);
};

export {
    transformInvoiceData,
    transformUserData,
    transformInventoryData,
    transformProductData,
    transformPaymentMethodData,
    transformCreditCardData,
    transformTurnsData
};
