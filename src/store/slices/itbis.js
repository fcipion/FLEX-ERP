// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    itbiss: [],
    itbis: [],
    addresses: []
};

const slice = createSlice({
    name: 'itbis',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.itbiss = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.itbis = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getItbiss() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_itbis`);
            console.log('data', response);
            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getItbisById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_itbis/${id}`);
            console.log('data', response);
            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
