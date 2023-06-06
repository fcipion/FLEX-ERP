// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    clientes: [],
    cliente: [],
    addresses: []
};

const slice = createSlice({
    name: 'cliente',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.clientes = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.cliente = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getClientes() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_cliente`);

            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getClienteById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_cliente/${id}`);

            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
