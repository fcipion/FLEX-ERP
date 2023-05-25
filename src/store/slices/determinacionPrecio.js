// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    determinacionPrecios: [],
    determinacionPrecio: [],
    addresses: []
};

const slice = createSlice({
    name: 'determinacionPrecio',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET PRODUCTS
        get(state, action) {
            state.determinacionPrecios = action.payload;
        },
        // GET PRODUCT
        getById(state, action) {
            state.determinacionPrecio = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getDeterminacionPrecios() {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_determinacion_precio`);
            console.log('data', response);
            dispatch(slice.actions.get(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getDeterminacionPrecioById(id) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_determinacion_precio/${id}`);
            // const response = await axios.get(`${url}/listar_determinacion_precio`);

            /* eslint no-underscore-dangle: 0 */
            // const data = response.data.rows.find((data) => data._id === id);
            // console.log(
            //     'determinacionPrecioData',
            //     response.data.rows.find((data) => data._id === id)
            // );
            console.log('listar_determinacion_precio', response.data);
            dispatch(slice.actions.getById(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
