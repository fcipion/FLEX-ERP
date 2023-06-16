// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    companias: [],
    compania: [],
    addresses: []
};

const slice = createSlice({
    name: 'compania',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        getCompaniasSuccess(state, action) {
            state.companias = action.payload;
        },
        // GET PRODUCT
        getCompaniasSuccessById(state, action) {
            state.compania = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getCompanias() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_compania`);

            dispatch(slice.actions.getCompaniasSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getCompaniaById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_compania/${id}`);

            dispatch(slice.actions.getCompaniasSuccessById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
