// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    tipoitbiss: [],
    tipoitbis: [],
    addresses: []
};

const slice = createSlice({
    name: 'tipoitbis',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.tipoitbiss = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.tipoitbis = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getTipoitbiss() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_tipo_itbis`);
            console.log('data', response);
            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getTipoitbisById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_tipo_itbis/${id}`);
            console.log('data', response);
            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
