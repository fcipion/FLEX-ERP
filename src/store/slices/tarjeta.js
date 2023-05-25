// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    tarjetas: [],
    tarjeta: [],
    addresses: []
};

const slice = createSlice({
    name: 'tarjeta',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.tarjetas = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.tarjeta = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getTarjetas() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_tarjetas`);
            console.log('data', response);
            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getTarjetaById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_tarjetas/${id}`);
            console.log('data', response);
            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
