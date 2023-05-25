import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function DescriptionAlerts({ type, menssage }) {
    return (
        <Stack sx={{ width: '100%', borderRadius: '5px', border: '1px solid blue', marginBottom: '10px' }} spacing={2}>
            <Alert style={{ display: type === 'error' ? 'block' : 'none' }} variant="filled" color="error" severity="error">
                <AlertTitle>
                    {' '}
                    <strong>¡Error!</strong>
                </AlertTitle>
                Esta es una alerta de error — <strong>{menssage}!</strong>
            </Alert>
            <Alert style={{ display: type === 'warning' ? 'block' : 'none' }} variant="filled" severity="warning">
                <AlertTitle>
                    <strong>¡Advertencia!</strong>{' '}
                </AlertTitle>
                Esta es una alerta de advertencia — <strong>{menssage}!</strong>
            </Alert>
            <Alert style={{ display: type === 'info' ? 'block' : 'none' }} variant="filled" severity="info">
                <AlertTitle>
                    {' '}
                    <strong>¡Info!</strong>{' '}
                </AlertTitle>
                Esta es una alerta de información — <strong>{menssage}!</strong>
            </Alert>
            <Alert style={{ display: type === 'success' ? 'block' : 'none' }} variant="filled" severity="success">
                <AlertTitle>
                    {' '}
                    <strong>¡Satisfatorio!</strong>
                </AlertTitle>
                Esta es una alerta de satisfación — ¡<strong>{menssage}!</strong>
            </Alert>
        </Stack>
    );
}
