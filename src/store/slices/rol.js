// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    rols: [],
    rol: {},
    addresses: []
};

const slice = createSlice({
    name: 'rol',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.rols = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.rol = action.payload;
        },

        // ADD ADDRESS
        addRolSuccess(state, action) {
            state.addresses = action.payload;
        },

        // EDIT ADDRESS
        editRolSuccess(state, action) {
            state.addresses = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getRols() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_roles`);
            console.log('data', response);
            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getRolById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_roles/${id}`);
            // console.log('response', response.data);
            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function addRols(address) {
    return async () => {
        try {
            const response = await axios.post('/api/address/new', address);
            dispatch(slice.actions.addAddressSuccess(response.data.address));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function editRols(address) {
    return async () => {
        try {
            const response = await axios.post('/api/address/edit', address);
            dispatch(slice.actions.editAddressSuccess(response.data.address));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
