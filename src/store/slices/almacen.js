// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    almacen: [],
    almacens: [],
    addresses: []
};

const slice = createSlice({
    name: 'almacen',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.almacens = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.almacen = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getAlmacens() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_almacen`);

            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getAlmacenById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_almacen/${id}`);

            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
