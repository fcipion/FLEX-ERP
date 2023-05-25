// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    usuarios: [],
    usuario: [],
    addresses: []
};

const slice = createSlice({
    name: 'usuario',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.usuarios = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.usuario = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getUsuarios() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_usuario`);
            console.log('data', response);
            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getUsuarioById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_usuario/${id}`);
            console.log('data', response);
            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
