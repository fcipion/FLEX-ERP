// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    rangoComprobantes: [],
    rangoComprobante: []
};

const slice = createSlice({
    name: 'rangoComprobante',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.rangoComprobantes = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.rangoComprobante = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getRangoComprobantes() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_rango_comprobante`);
            console.log('data', response);
            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getRangoComprobantesById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_rango_comprobante/${id}`);
            console.log('data', response);
            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
