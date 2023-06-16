// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    claseReprComerciales: [],
    claseReprComerciale: [],
    addresses: []
};

const slice = createSlice({
    name: 'claseReprComerciales',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.claseReprComerciales = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.claseReprComerciale = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getClaseReprComerciales() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_tipo_cliente`);

            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getClaseReprComercialesById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_tipo_cliente/${id}`);

            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
