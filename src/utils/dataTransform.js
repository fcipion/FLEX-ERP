/**
 * Transforma el objeto de datos filtrando y mapeando las filas a una nueva estructura.
 * El objeto de datos transformado contiene las propiedades "columns" y "rows".
 *
 * @param {Object} data - El objeto de datos original con las propiedades "columns" y "rows".
 * @returns {Object} - El objeto de datos transformado con las filas filtradas y mapeadas.
 */
const transformInvoiceData = (data) => {
    const { rows, columns } = data;

    const transformedRows = rows
        // eslint-disable-next-line camelcase
        .reduce((accumulator, { id, fecha_contabilizacion, estatus, montoAplicado, caja, vendedor, cliente }) => {
            const { descripcion: cajaDescripcion } = caja;
            const { nombre: clienteNombre, descripcion: clienteDescripcion } = cliente;
            const { nombres: vendedorNombre, apellidos: apellidoVendedor } = vendedor;

            const newRow = {
                id,
                // eslint-disable-next-line camelcase
                fecha_contabilizacion,
                vendedor,
                estatus,
                importe: montoAplicado,
                'caja.descripcion': cajaDescripcion,
                'vendedor.nombre': `${vendedorNombre} ${apellidoVendedor}`,
                'cliente.nombre': clienteNombre,
                descripcion: clienteDescripcion
            };

            accumulator.push(newRow);
            return accumulator;
        }, []);

    return {
        columns,
        rows: transformedRows
    };
};

const transformUserData = (data) => {
    const { rows, columns } = data;

    const transformedRows = rows
        // eslint-disable-next-line camelcase
        .reduce((accumulator, { id, descripcion, apellidos, email, rol, telefono, estatus }) => {
            const { descripcion: userRol } = rol;

            const newRow = {
                id,
                descripcion,
                apellidos,
                email,
                'rol.descripcion': userRol,
                telefono,
                estatus
            };

            accumulator.push(newRow);
            return accumulator;
        }, []);

    return {
        columns,
        rows: transformedRows
    };
};

const transformInventoryData = (data) => {
    const { rows, columns } = data;

    const transformedRows = rows
        // eslint-disable-next-line camelcase
        .reduce((accumulator, { id, sucursal, descripcion, estatus }) => {
            const { descripcion: sucursalDescription } = sucursal;

            const newRow = {
                id,
                'sucursal.descripcion': sucursalDescription,
                descripcion,
                estatus
            };

            accumulator.push(newRow);
            return accumulator;
        }, []);

    return {
        columns,
        rows: transformedRows
    };
};

const transformProductData = (data) => {
    const { rows, columns } = data;

    const transformedRows = rows
        // eslint-disable-next-line camelcase
        .reduce(
            (
                accumulator,
                {
                    id,
                    descripcion,
                    sucursal,
                    almacen,
                    // eslint-disable-next-line camelcase
                    tipo_producto,
                    // eslint-disable-next-line camelcase
                    clase_producto,
                    // eslint-disable-next-line camelcase
                    cantidad_stock,
                    // eslint-disable-next-line camelcase
                    cantidad_comprometida,
                    // eslint-disable-next-line camelcase
                    cantidad_disponible,
                    estatus
                }
            ) => {
                const { descripcion: sucursalDescription } = sucursal;
                const { descripcion: almacenDescription } = almacen;
                // eslint-disable-next-line camelcase
                const { descripcion: tipoProductoDescription } = tipo_producto;
                // eslint-disable-next-line camelcase
                const { descripcion: claseProductoDescription } = clase_producto;

                const newRow = {
                    id,
                    descripcion,
                    'sucursal.descripcion': sucursalDescription,
                    'almacen.descripcion': almacenDescription,
                    'tipo_producto.descripcion': almacenDescription,
                    'clase_producto.descripcion': almacenDescription,
                    // eslint-disable-next-line camelcase
                    cantidad_stock,
                    // eslint-disable-next-line camelcase
                    cantidad_comprometida,
                    // eslint-disable-next-line camelcase
                    cantidad_disponible,
                    estatus
                };

                accumulator.push(newRow);
                return accumulator;
            },
            []
        );

    return {
        columns,
        rows: transformedRows
    };
};

export { transformInvoiceData, transformUserData, transformInventoryData, transformProductData };
