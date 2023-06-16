import React, { useEffect } from 'react'
import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';
import logo from '../../assets/images/logo.png';

const styles = StyleSheet.create({
    table: {
        display: "table",
        width: "auto",
        borderWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        textAlign: 'left',
        marginTop: 15
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableRowHeader: {
        margin: "auto",
        flexDirection: "row",
        backgroundColor: '#eeeded',
        paddingBottom: 5,
        marginTop: 10
    },
    tableCol: {
        width: "33%",
        borderStyle: "solid",
        borderWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableColArticulo: {
        width: "14.3%",
        borderStyle: "solid",
        borderWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        paddingTop: 10,
        paddingLeft: 5
    },
    tableCell: {
        margin: "auto",
        marginTop: 5,
        fontSize: 10
    }
});

const OrdenPdf = ({ orden }) => {

    return (
        <Document>
            <Page size="A4">

                {/* ========== Header ======== */}
                <View style={{ marginTop: 20, textAlign: 'center', fontSize: 12, fontWeight: 'bold' }}>
                    <Image src={logo} alt="logo" style={{ width: 230, height: 76, margin: '0 auto' }} />
                    <View>
                        <Text>Calle 27 de febrero No. 58, Local 101, San Francisco de Macoris, Republica Dominicana</Text>
                    </View>
                    <View>
                        <Text>integraimagenes3d@gmail.com</Text>
                    </View>
                    <View>
                        <Text>809-290-2166 | RNC.: 1-3203952-1</Text>
                    </View>

                    <View style={{ marginTop: 30, fontSize: 18, fontWeight: 'bold' }}>
                        <Text>Orden de Servicio</Text>
                    </View>
                </View>

                {/* ========== Tabla ======== */}
                <View style={styles.table}>

                    {/* ======================= */}
                    <View style={styles.tableRowHeader}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Cliente:</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Vendedor:</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Doctor:</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{orden.cliente && orden.cliente.nombre ? orden.cliente.nombre : ''}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{orden.vendedor && orden.vendedor.descripcion ? (orden.vendedor.descripcion + ' ' + orden.vendedor.apellidos) : ''}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{orden.doctor && orden.doctor.nombre ? orden.doctor.nombre : ''}</Text>
                        </View>
                    </View>

                    {/* ======================= */}
                    <View style={styles.tableRowHeader}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Sucursal:</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Fecha:</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Comentarios:</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{orden.sucursal && orden.sucursal.descripcion ? orden.sucursal.descripcion : ''}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{orden.fecha_compromiso ? orden.fecha_compromiso : ''}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{orden.comentarios ? orden.comentarios : null}</Text>
                        </View>
                    </View>

                    {/* ======================= */}
                    <View style={styles.tableRowHeader}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Estatus:</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}></Text>
                        </View>

                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}></Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{orden.estatus ? 'Activo' : 'Inactivo'}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}></Text>
                        </View>

                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}></Text>
                        </View>
                    </View>

                    {/* ======================= */}
                    <View style={styles.tableRowHeader}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}></Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Artículos</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}></Text>
                        </View>
                    </View>
                    <View style={styles.tableRowHeader}>
                        <View style={[styles.tableColArticulo, { width: '5%' }]}>
                            <Text style={styles.tableCell}>ID</Text>
                        </View>
                        <View style={styles.tableColArticulo}>
                            <Text style={styles.tableCell}>Artículo</Text>
                        </View>
                        <View style={styles.tableColArticulo}>
                            <Text style={styles.tableCell}>Unidad</Text>
                        </View>
                        <View style={styles.tableColArticulo}>
                            <Text style={styles.tableCell}>Almacen</Text>
                        </View>
                        <View style={styles.tableColArticulo}>
                            <Text style={styles.tableCell}>Estado</Text>
                        </View>
                        <View style={[styles.tableColArticulo, { width: '10%' }]}>
                            <Text style={styles.tableCell}>Cantidad</Text>
                        </View>
                        <View style={styles.tableColArticulo}>
                            <Text style={styles.tableCell}>Repetida</Text>
                        </View>
                        <View style={styles.tableColArticulo}>
                            <Text style={styles.tableCell}>Estatus</Text>
                        </View>
                    </View>

                    {orden.detalles && orden.detalles.map((detalle, index) => (

                        <View key={index} style={styles.tableRow}>
                            <View style={[styles.tableColArticulo, { width: '5%' }]}>
                                <Text style={styles.tableCell}>{detalle.line_id}</Text>
                            </View>
                            <View style={styles.tableColArticulo}>
                                <Text style={styles.tableCell}>{detalle.producto.descripcion}</Text>
                            </View>
                            <View style={styles.tableColArticulo}>
                                <Text style={styles.tableCell}>{detalle.unidad_medida.descripcion}</Text>
                            </View>
                            <View style={styles.tableColArticulo}>
                                <Text style={styles.tableCell}>{detalle.almacen.descripcion}</Text>
                            </View>
                            <View style={styles.tableColArticulo}>
                                <Text style={styles.tableCell}>{detalle.estado.descripcion}</Text>
                            </View>
                            <View style={[styles.tableColArticulo, { width: '10%' }]}>
                                <Text style={styles.tableCell}>{detalle.cantidad}</Text>
                            </View>
                            <View style={styles.tableColArticulo}>
                                <Text style={styles.tableCell}>{detalle.repetida ? 'Si' : 'No'}</Text>
                            </View>
                            <View style={styles.tableColArticulo}>
                                <Text style={styles.tableCell}>{detalle.estatus ? 'Activo' : 'Inactivo'}</Text>
                            </View>
                        </View>

                    ))}

                </View>













            </Page>
        </Document>
    )
}

export default OrdenPdf