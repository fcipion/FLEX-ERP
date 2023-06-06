// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    monedas: [],
    moneda: []
};

const slice = createSlice({
    name: 'moneda',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET monedas
        getCompaniasSuccess(state, action) {
            state.monedas = action.payload;
        },
        // GET Monedas by ID
        getCompaniasSuccessById(state, action) {
            state.moneda = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getMoneda() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_monedas`);

            dispatch(slice.actions.getCompaniasSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getMonedaById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_monedas/${id}`);
            dispatch(slice.actions.getCompaniasSuccessById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
