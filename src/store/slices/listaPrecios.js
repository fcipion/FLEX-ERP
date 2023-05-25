// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    listaPrecios: [],
    listaPrecio: [],
    addresses: []
};

const slice = createSlice({
    name: 'listaPrecio',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.listaPrecios = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.listaPrecio = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getListaPrecios() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_lista_precio`);
            console.log('data', response);
            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getListaPreciosById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_lista_precio/${id}`);
            console.log('data', response);
            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
