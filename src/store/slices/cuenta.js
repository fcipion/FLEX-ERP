// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    cuentas: [],
    cuenta: [],
    addresses: []
};

const slice = createSlice({
    name: 'cuenta',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.cuentas = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.cuenta = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getCuentas() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_cuenta_contable`);
            console.log('data', response);
            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getCuentaById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_cuenta_contable/${id}`);
            console.log('data', response);
            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
