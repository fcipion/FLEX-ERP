// third-party
import { createSlice } from '@reduxjs/toolkit';
import { Post, Get, Put, DeleteData, PostLogin, url } from '../../api/Peticiones';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    paginas: [],
    modulos: []
};

const slice = createSlice({
    name: 'paginas',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },
        // GET PRODUCT
        getPaginasSuccess(state, action) {
            state.paginas = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getPaginas(wjtToken) {
    return async () => {
        try {
            const response = await axios.get(`${url}/listar_menu`, { token: wjtToken });
            dispatch(slice.actions.getPaginasSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
