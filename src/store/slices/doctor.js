// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    doctors: [],
    doctor: [],
    addresses: []
};

const slice = createSlice({
    name: 'doctor',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.doctors = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.doctor = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getDoctors() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_doctor`);

            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getDoctorById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_doctor/${id}`);

            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
