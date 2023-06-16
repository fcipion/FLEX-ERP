// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    tComprobantes: [],
    tComprobante: [],
    addresses: []
};

const slice = createSlice({
    name: 'tComprobante',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.tComprobantes = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.tComprobante = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getTComprobantes() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_tipos_comprobantes`);

            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getTComprobantesById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_tipos_comprobantes/${id}`);

            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
