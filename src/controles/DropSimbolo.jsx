import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import DataSimbolo from 'data/DataSimbolo';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const data = DataSimbolo;

export default function DropSimbolo({ SetValue, Id, SetFieldValue, Value, HandleBlur, Errors, Touched }) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    const Values = data.find((data) => data.value === Value);

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                setOptions([...data]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id={Id}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.title === value.title}
            value={Values ? { title: Values.title, value: Values.value } : { title: '', value: '' }}
            getOptionLabel={(option) => option.title}
            options={options}
            loading={loading}
            onChange={(event, value) => {
                SetValue(value);
                SetFieldValue('simbolo', value.value);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Simbolo"
                    variant="outlined"
                    required
                    onBlur={HandleBlur}
                    error={Errors[Id] && Touched[Id]}
                    helperText={Touched[Id] && Errors[Id]}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        )
                    }}
                />
            )}
        />
    );
}
