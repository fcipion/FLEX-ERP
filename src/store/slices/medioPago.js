// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    medioPagos: [],
    medioPago: [],
    addresses: []
};

const slice = createSlice({
    name: 'medioPago',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.medioPagos = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.medioPago = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getMedioPago() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_medio_pago`);

            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getMedioPagoById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_medio_pago/${id}`);

            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
