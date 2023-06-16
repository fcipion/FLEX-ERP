// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    estadoDocs: [],
    estadoDoc: [],
    addresses: []
};

const slice = createSlice({
    name: 'estadoDoc',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.estadoDocs = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.estadoDoc = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getEstadoDocs() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_estados`);

            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getEstadoDocById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_estados/${id}`);

            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
