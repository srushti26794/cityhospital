import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';
import * as yup from 'yup';
import { useFormik } from 'formik';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function Facilities() {
    const [open, setOpen] = React.useState(false);

    const FaciltiesSchema = yup.object({
        image: yup.mixed().required('Choose image'),
        facility: yup.string().required('Enter facilities').matches(/^[A-Za-z ]||[0-9]*$/, 'Please enter valid name'),
        description: yup.string().required('Enter description')
    })

    // const handleAdd = (values) => {
    //     console.log(values);
    // }

    const formikObj = useFormik({
        initialValues: {
            image: '',
            facility: '',
            description: ''
        },
        validationSchema: FaciltiesSchema,
        onSubmit: values => {
            console.log(values);
            // handleAdd(values);
        },
    })

    let { handleSubmit, handleBlur, handleChange, touched, errors, values } = formikObj

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'image', headerName: 'Image', width: 130 },
        { field: 'facility', headerName: 'Facility', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => {
                <>
                    <IconButton aria-label="delete" size="small">
                        <ModeEditIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="delete" size="small">
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </>
            }
        },
    ]

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add facilities
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Facilities</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <input
                            margin="dense"
                            id="image"
                            name='image'
                            label="Add Image"
                            type="file"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.image}
                        />
                        <span>{errors.image && touched.image ? errors.image : null}</span>

                        <TextField
                            margin="dense"
                            id="facility"
                            name='facility'
                            label="Facility"
                            type="email"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.facility}
                        />
                        <span>{errors.facility && touched.facility ? errors.facility : null}</span>

                        <TextField
                            margin="dense"
                            id="description"
                            name='description'
                            label="Description"
                            type="email"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                        />
                        <span>{errors.description && touched.description ? errors.description : null}</span>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button type='submit' onClick={handleClose}>Add</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={values}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </React.Fragment>
    );
}