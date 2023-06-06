// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    tipoProductos: [],
    tipoProducto: [],
    addresses: []
};

const slice = createSlice({
    name: 'tipoProducto',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.tipoProductos = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.tipoProducto = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getTipoProductos() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_tipo_producto`);

            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getTipoProductosById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_tipo_producto/${id}`);

            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
