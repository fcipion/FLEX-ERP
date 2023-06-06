// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    tipoDocumentos: [],
    tipoDocumento: [],
    addresses: []
};

const slice = createSlice({
    name: 'tipoDocumento',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.tipoDocumentos = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.tipoDocumento = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getTipoDocumentos() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_tipo_documento`);

            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getTipoDocumentosById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_tipo_documento/${id}`);

            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
