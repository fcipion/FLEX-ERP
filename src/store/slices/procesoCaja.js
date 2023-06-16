// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    procesoCajas: [],
    procesoCaja: [],
    addresses: []
};

const slice = createSlice({
    name: 'procesoCaja',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.procesoCajas = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.procesoCaja = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getProcesoCajas() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_proceso_caja`);

            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getProcesoCajasById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_proceso_caja/${id}`);

            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
