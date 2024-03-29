// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    condicionesPagos: [],
    condicionesPago: [],
    addresses: []
};

const slice = createSlice({
    name: 'condicionesPago',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.condicionesPagos = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.condicionesPago = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getCondicionesPagos() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_condiciones_pago`);

            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getCondicionesPagoById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_condiciones_pago/${id}`);

            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
