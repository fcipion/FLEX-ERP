import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/system/Unstable_Grid/Grid';

export default function LineProgress() {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Grid
            item
            xs={12}
            style={{
                display: 'block',
                backgroundColor: '#e3f2fd',
                borderRadius: '5px',
                padding: '10px',
                border: '1px solid blue',
                marginBottom: '10px'
            }}
        >
            <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={progress} style={{ display: 'block' }} />
            </Box>
        </Grid>
    );
}
