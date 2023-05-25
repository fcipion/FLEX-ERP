// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    movimientosMercanciaes: [],
    movimientosMercancia: [],
    addresses: []
};

const slice = createSlice({
    name: 'movimientosMercancia',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.movimientosMercanciaes = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.movimientosMercancia = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getMovimientosMercancias() {
    return async () => {
        try {
            const response = await axios.get(`${url}/obtener_movimiento_mercancia`);
            console.log('data', response);
            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getMovimientosMercanciaById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/obtener_movimiento_mercancia/${id}`);
            console.log('data', response);
            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
