import * as React from 'react';
import Box from '@mui/material/Box';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
import { DataGrid, GridToolbar, ridActionsCellItem, GridRowId, GridColumns, GridActionsCellItem } from '@mui/x-data-grid';

import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { randomCreatedDate, randomUpdatedDate, useDemoData } from '@mui/x-data-grid-generator';
import { IconView360 } from '@tabler/icons';
import { Alert, Button, Divider, Grid, IconButton } from '@mui/material';
import { color, Stack } from '@mui/system';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import PrintSharpIcon from '@mui/icons-material/PrintSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import SkipNextSharpIcon from '@mui/icons-material/SkipNextSharp';
import SkipPreviousSharpIcon from '@mui/icons-material/SkipPreviousSharp';
import { Link } from 'react-router-dom';
import AccionButton from './AccionButton';
import ManageSearchTwoToneIcon from '@mui/icons-material/ManageSearchTwoTone';
import DescriptionAlerts from './Alert';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import HistoryIcon from '@mui/icons-material/History';
import SettingsSuggestTwoToneIcon from '@mui/icons-material/SettingsSuggestTwoTone';
import LineProgress from './LineProgress';
import LocalOfferIcon from '@mui/icons-material/LocalOffer'; // Lista de precios

const CrudControl = ({
    IsSubmitting,
    MessageInfo,
    HandlerDelete,
    HandlerCreate,
    HandlerPrint,
    Options,
    HandlerListar,
    HandlerNavegate,
    Modo
}) => (
    <>
        <Grid
            item
            xs={12}
            style={{
                display: IsSubmitting ? 'block' : 'none'
            }}
        >
            <LineProgress />
        </Grid>
        <Grid
            item
            xs={12}
            style={{
                display: MessageInfo.type !== '' ? 'block' : 'none',
                borderRadius: '5px',
                padding: '10px',
                border: '1px solid blue',
                marginBottom: '10px'
            }}
        >
            <DescriptionAlerts type={MessageInfo.type} menssage={MessageInfo.title} />
        </Grid>

        {/* <Alert style={{ display: DisplayError }} severity={TypeMessage}>
            {TitleMessage}!
        </Alert> */}

        <Divider />
        <Grid
            container
            spacing="2"
            style={{
                backgroundColor: '#e3f2fd',
                borderRadius: '5px',
                padding: '10px',
                border: '1px solid blue'
            }}
        >
            <Grid item xs={8}>
                {/* <Button
                onClick={HandleSubmit}
                style={{ margin: '5px', marginBottom: '5px' }}
                variant="contained"
                endIcon={<AddCircleOutlineSharpIcon />}
                color="primary"
            >
                Grabar
            </Button> */}
                <Button
                    size="medium"
                    color="inherit"
                    onClick={HandlerPrint}
                    style={{ margin: '2px' }}
                    variant="outlined"
                    endIcon={<PrintSharpIcon />}
                    disabled={IsSubmitting}
                >
                    Imprimir
                </Button>

                <Button
                    size="medium"
                    color="error"
                    onClick={HandlerDelete}
                    style={{ margin: '2px' }}
                    variant="outlined"
                    endIcon={<DeleteSharpIcon />}
                    disabled={IsSubmitting}
                >
                    Eliminar
                </Button>
                <AccionButton isSubmitting={IsSubmitting} handlerCreate={HandlerCreate} options={Options} />

                {/* <Button
                    size="medium"
                    color="primary"
                    onClick={HandlerPrint}
                    style={{ margin: '2px' }}
                    variant="outlined"
                    endIcon={<LocalOfferIcon />}
                    disabled={IsSubmitting}
                >
                    Precios
                </Button> */}
            </Grid>
            <Grid item xs={4} textAlign="right">
                <IconButton
                    onClick={() => {
                        HandlerListar('+');
                    }}
                    size="small"
                    title="Configuración"
                    color="inherit"
                    disabled={IsSubmitting}
                >
                    {/* <ManageSearchTwoToneIcon style={{ height: '30px', variant: 'contained' }} /> */}
                    <SettingsSuggestTwoToneIcon fontSize="small" />
                </IconButton>
                <IconButton
                    onClick={() => {
                        HandlerListar('+');
                    }}
                    size="small"
                    title="Historial"
                    color="inherit"
                    disabled={IsSubmitting}
                >
                    {/* <ManageSearchTwoToneIcon style={{ height: '30px', variant: 'contained' }} /> */}
                    <HistoryIcon fontSize="small" />
                </IconButton>
                <IconButton
                    disabled={IsSubmitting}
                    title="Atras"
                    size="small"
                    onClick={() => {
                        HandlerNavegate('-');
                    }}
                >
                    <SkipPreviousSharpIcon fontSize="small" />
                </IconButton>
                <IconButton
                    disabled={IsSubmitting}
                    title="Siguiente"
                    size="small"
                    onClick={() => {
                        HandlerNavegate('+');
                    }}
                >
                    <SkipNextSharpIcon fontSize="small" />
                </IconButton>

                <IconButton
                    disabled={IsSubmitting}
                    onClick={() => {
                        HandlerListar('+');
                    }}
                    size="small"
                    title="Listart"
                    color="inherit"
                >
                    {/* <ManageSearchTwoToneIcon style={{ height: '30px', variant: 'contained' }} /> */}
                    <ManageSearchTwoToneIcon fontSize="small" />
                </IconButton>
            </Grid>
        </Grid>
    </>
);

export default CrudControl;
