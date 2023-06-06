// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    rolesAccesos: [],
    rolesAcceso: [],
    addresses: []
};

const slice = createSlice({
    name: 'rolesAcceso',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.rolesAccesos = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.rolesAcceso = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getRolesAccesos() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_roles_acceso`);

            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getRolesAccesosById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_roles_acceso/${id}`);

            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
