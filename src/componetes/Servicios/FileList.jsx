import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    minHeight: 300,
    bgcolor: 'background.paper',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
};

const FileList = ({ fileListOpen, setFileListOpen, row, handleChangeValue, setFieldValue, imagesPreview }) => {


    const addImage = (event) => {
        let galeria = [...row.galeria, event.target.files[0]]
        handleChangeValue(galeria, row, setFieldValue, 'galeria');
    }

    const removeImage = (index) => {
        let galeria = row.galeria;
        galeria.splice(index, 1);
        handleChangeValue(galeria, row, setFieldValue, 'galeria');
    }

    const handleClose = () => setFileListOpen(false);



    return (
        <div>

            <Modal
                open={fileListOpen.isOpen && fileListOpen.line_id === row.line_id}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='space-between'>
                        <h3>Imágenes: Artículo {row.line_id}</h3>
                        <div>
                            <input
                                id="galeria"
                                name="galeria"
                                type="file"
                                class="custom-file-input"
                                onChange={(event) => { addImage(event) }}
                            />

                            {row.galeria.length ?

                                <IconButton
                                    aria-label="Galeria"
                                    style={{ width: '30px' }}
                                >
                                    <CollectionsOutlinedIcon
                                        onClick={() => { imagesPreview(row.galeria) }}
                                        titleAccess="Galeria"
                                        fontSize="medium"
                                        color="primary"
                                    />
                                </IconButton>
                                :
                                null
                            }





                        </div>


                    </div>


                    {row.galeria && row.galeria.map((file, index) => (

                        <ListItem
                            key={index}
                            secondaryAction={
                                <IconButton onClick={() => removeImage(index)} edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary={`${index + 1}. ` + file.name}
                            />
                        </ListItem>


                    ))}

                    {!row.galeria.length ?
                        <div className='empty'>
                            <CollectionsOutlinedIcon
                                titleAccess="Galeria"
                                style={{ fontSize: 90 }}
                                color="medium"
                            />

                            <h3>Este artículo no tiene imágenes</h3>
                        </div>
                        :
                        null

                    }

                </Box>
            </Modal>
        </div>
    );
}

export default FileList