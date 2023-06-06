import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const data = [
    { label: 'Activo', value: true },
    { label: 'Inactivo', value: false }
];

export default function DropEstatus({ SetValue, Id, FormikValue }) {
    console.log('formik.va', FormikValue);
    return (
        <Autocomplete
            disablePortal
            ty
            id={Id}
            options={data}
            renderInput={(params) => <TextField {...params} label="Estatus" fullWidth />}
            // value= {data.find((data) => data.value === FormikValue.estatus)}
            onChange={(event, value) => {
                console.log('Value', value);
                SetValue(value);
                FormikValue[Id] = true;
            }}
            fullWidth
        />
    );
}
