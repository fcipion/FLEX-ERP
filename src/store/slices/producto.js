// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    productos: [],
    producto: [],
    addresses: []
};

const slice = createSlice({
    name: 'producto',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.productos = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.producto = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getProductos() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_producto`);
            console.log('data', response);
            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getProductoById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_producto/${id}`);
            // console.log('DataProductos', response);
            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
