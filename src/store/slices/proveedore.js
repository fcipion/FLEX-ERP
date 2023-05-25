// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    proveedores: [],
    proveedore: [],
    addresses: []
};

const slice = createSlice({
    name: 'proveedore',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.proveedores = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.proveedore = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getProveedores() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_proveedor`);
            console.log('data', response);
            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getProveedoreById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_proveedor/${id}`);
            console.log('data', response);
            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
