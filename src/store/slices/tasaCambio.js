// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    tasaCambios: [],
    tasaCambio: [],
    addresses: []
};

const slice = createSlice({
    name: 'tasaCambio',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.tasaCambios = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.tasaCambio = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getTasaCambios() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_tasa_cambio`);
            console.log('data', response);
            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getTasaCambioById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_tasa_cambio/${id}`);
            console.log('data', response);
            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
