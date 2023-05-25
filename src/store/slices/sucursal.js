// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    sucursales: [],
    sucursal: [],
    addresses: []
};

const slice = createSlice({
    name: 'sucursal',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        getSucursalSuccess(state, action) {
            state.sucursales = action.payload;
        },
        // GET PRODUCT
        getSucursalSuccessById(state, action) {
            state.sucursal = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getSucursales() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_sucursales`);
            console.log('data', response);
            dispatch(slice.actions.getSucursalSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getSucursalById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_sucursales/${id}`);
            console.log('data', response);
            dispatch(slice.actions.getSucursalSuccessById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
