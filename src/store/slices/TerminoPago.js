// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    terminoPagos: [],
    terminoPago: [],
    addresses: []
};

const slice = createSlice({
    name: 'terminoPago',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.terminoPagos = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.terminoPago = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getTerminoPagos() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_termino_pago`);
            console.log('data', response);
            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getTerminoPagoById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_termino_pago/${id}`);
            console.log('data', response);
            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
