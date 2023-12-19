import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Facilities() {
    const [open, setOpen] = React.useState(false);
    const [facilityData, setFacilityData] = useState([])
    const [updateData, setUpdateData] = useState(false)

    const SUPPORTED_FORMATS = ['image/jpg', 'image/JPG', 'image/jpeg', 'image/JPEG', 'image/png', 'image/PNG'];

    useEffect(() => {
        const storedData = localStorage.getItem('facility');
        // console.log(storedData);
        if (storedData) {
            setFacilityData(JSON.parse(storedData));
        }
    }, []);

    const facilitySchema = yup.object({
        file: yup
            .mixed()
            .nullable()
            .required('Please upload image')
            .test('Fichier taille',
                'File size is too large', (value) => !value || (value && value.size <= 1024 * 1024))
            .test('format',
                'Please upload jpg, jpeg or png file', (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))),
        facility: yup.string().required("Enter facility").matches(/^([a-zA-Z ]{2,30})||([0-9])$/, "Please enter valid name"),
        description: yup.string()
            .required("Enter description")
            .test('description', "Description in between 10 to 30 word", function (val) {
                let array = val.split(" ");

                if (array.length >= 10 && array.length <= 30) {
                    return true;
                } else {
                    return false
                }
            })
    })

    const handleAdd = (values) => {
        console.log(values);

        let id = Math.floor(Math.random() * 1000);

        let localData = JSON.parse(localStorage.getItem('facility'));
        console.log(localData);

        if (localData) {
            localData.push({ ...values, id: id });
            localStorage.setItem('facility', JSON.stringify(localData))
            setFacilityData(localData)
        } else {
            localStorage.setItem('facility', JSON.stringify([{ ...values, id: id }]));
            setFacilityData([{ ...values, id: id }])
        }
    }

    const handleUpdate = (data) => {
        console.log(data);
    
        let localData = JSON.parse(localStorage.getItem('facility'))
        console.log(localData);

        let updatedData = localData.map((v) => {
            if (v.id == data.id) {
                v = data;
            }
            return v;
        })

         console.log(updatedData);

        localStorage.setItem('facility', JSON.stringify(updatedData))

        setFacilityData(updatedData)
    }

    let formikObj = useFormik({
        initialValues: {
            file: '',
            facility: '',
            description: '',
        },
        validationSchema: facilitySchema,
        onSubmit: (values, { resetForm }) => {
            if (updateData) {
                handleUpdate(values)
            } else {
                handleAdd(values);
            }
            setUpdateData(false)
            handleClose();
            resetForm()
        }
    })

    let { handleSubmit, handleChange, handleBlur, touched, errors, values, resetForm, setValues, setFieldValue } = formikObj



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        resetForm();
    };

    const handleEdit = (data) => {
        handleClickOpen()
        setValues(data)
        setUpdateData(true)
    }

    const handleDelete = (data) => {
        console.log(data);
        console.log(JSON.parse(data.id));

        let id = JSON.parse(data.id)

        let localData = JSON.parse(localStorage.getItem('facility'))
        console.log(localData);

        let newFacilityData = localData.filter((v) => v.id !== id)
        console.log(newFacilityData);
        localStorage.setItem('facility', JSON.stringify(newFacilityData))
        setFacilityData(newFacilityData)
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'facility', headerName: 'Facility', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <EditIcon onClick={() => handleEdit(params.row)} fontSize="small" style={{ color: 'grey' }} />
                    <IconButton onClick={() => handleDelete(params.row)} aria-label="delete" size="small">
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </>
            )
        },
    ];

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
                            type="file"
                            id="file"
                            name='file'
                            onChange={(event) => setFieldValue("file", event.target.files[0])}
                        />
                        <span>{errors.file && touched.file ? errors.file : null}</span>


                        <TextField
                            margin="dense"
                            id="facility"
                            name='facility'
                            label="Facility"
                            type="text"
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
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                        />
                        <span>{errors.description && touched.description ? errors.description : null}</span>

                        <DialogActions>
                            <Button type='submit'>{updateData ? 'Update' : 'Add'}</Button>
                            <Button onClick={handleClose}>Cancel</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={facilityData}
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