import * as React from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import { NumericFormat } from 'react-number-format';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

const TextMaskCustom = function TextMaskCustom(props, ref) {
    const { onChange, Name, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="(#00) 000-0000"
            definitions={{
                '#': /[1-9]/
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: Name, value } })}
            overwrite
        />
    );
};

TextMaskCustom.propTypes = {
    Name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

const NumericFormatCustom = function NumericFormatCustom(props, ref) {
    const { onChange, Name, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: Name,
                        value: values.value
                    }
                });
            }}
            thousandSeparator
            valueIsNumericString
            prefix="$"
        />
    );
};

NumericFormatCustom.propTypes = {
    Name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default function FormattedInputs() {
    const [values, setValues] = React.useState({
        textmask: '(100) 000-0000',
        numberformat: '1320'
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    return (
        <Box
            sx={{
                '& > :not(style)': {
                    m: 1
                }
            }}
        >
            <TextField
                label="react-number-format"
                value={values.numberformat}
                onChange={handleChange}
                name="numberformat"
                id="formatted-numberformat-input"
                InputProps={{
                    inputComponent: NumericFormatCustom
                }}
                variant="standard"
            />
        </Box>
    );
}
