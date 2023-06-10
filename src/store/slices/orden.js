// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    ordenes: [],
    orden: [],
    addresses: []
};

const slice = createSlice({
    name: 'orden',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET ORDENES
        get(state, action) {
            state.ordenes = action.payload;
        },
        // GET ORDEN
        getById(state, action) {
            state.orden = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getOrdenes() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_orden_servicio`);
            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getOrdenById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_orden_servicio/${id}`);
            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
