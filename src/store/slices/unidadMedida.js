// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    unidadMedidas: [],
    unidadMedida: [],
    addresses: []
};

const slice = createSlice({
    name: 'unidadMedida',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.unidadMedidas = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.unidadMedida = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getUnidadMedida() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_unidad_medida`);
            console.log('data', response);
            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getUnidadMedidaById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_unidad_medida/${id}`);
            console.log('data', response);
            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
