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
import { useDispatch, useSelector } from 'react-redux';
import { deleteDoctorData, getDoctorData, postDoctorData, updateDoctorData } from '../../redux/action/doctors.actions';


export default function Doctors() {
    const [doctorData, setDoctorData] = useState([])
    const [updateData, setUpdateData] = useState(false)

    const dispatch = useDispatch();

    const doctors = useSelector(state => state.doctors)
    console.log(doctors.doctors);

    useEffect(() => {
        dispatch(getDoctorData())
    }, []);

    let degree = ['mbbs', 'md', 'bhms', 'physiotherapy', 'dermatology', 'pediatrics', 'skin&vd', 'orthopaedics', 'gynaecology']

    const doctorSchema = yup.object({
        name: yup.string().required("Enter doctor name").matches(/^[a-zA-Z ]{2,30}$/, "Please enter valid name"),
        designation: yup.string().required("Enter designation").matches(/^[a-zA-Z ]{2,30}$/, "Please enter valid name"),
        degree: yup.string().required("Enter degree")
            .test('degree', 'Enter valid degree', function (val) {
                console.log(val);

                let value = val.toLowerCase();

                if (degree.includes(value)) {
                    return true;
                } else {
                    return false
                }
            })
    })



    const handleAdd = (values) => {
        console.log(values);

        dispatch(postDoctorData(values))
    }

    const handleUpdate = (data) => {
        console.log(data);
    
        dispatch(updateDoctorData(data))
    }

    let formikObj = useFormik({
        initialValues: {
            name: '',
            designation: '',
            degree: ''
        },
        validationSchema: doctorSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);

            if(updateData){
                handleUpdate(values)
            }else{
                handleAdd(values);
            }
            setUpdateData(false)
            handleClose();
            resetForm();
        },
    })

    let { handleSubmit, handleChange, handleBlur, touched, errors, values, resetForm, setValues } = formikObj;


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        resetForm()
    };

    const handleDelete = (data) => {
        console.log(data);

        dispatch(deleteDoctorData(data.id))
    }

    const handleEdit = (data) => {
        handleClickOpen()
        setValues(data)
        setUpdateData(true)
    }


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Doctor name', width: 130 },
        { field: 'designation', headerName: 'Designation', width: 130 },
        { field: 'degree', headerName: 'Degree', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <EditIcon onClick={() => handleEdit(params.row)} fontSize="small" fill='grey' />
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
                Add Doctors
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Doctors</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit} id='add_doctor_form'>
                        <TextField
                            margin="dense"
                            id="name"
                            name='name'
                            label="Doctor name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />
                        <span>{errors.name && touched.name ? errors.name : null}</span>
                        <TextField
                            margin="dense"
                            id="designation"
                            name='designation'
                            label="Designation"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.designation}
                        />
                        <span>{errors.designation && touched.designation ? errors.designation : null}</span>

                        <TextField
                            margin="dense"
                            id="degree"
                            name='degree'
                            label="Degree"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.degree}
                        />
                        <span>{errors.degree && touched.degree ? errors.degree : null}</span>

                        <DialogActions>
                            <Button type='submit'>{updateData ? 'Update' : 'Add'}</Button>
                            <Button onClick={handleClose}>Cancel</Button>
                        </DialogActions>
                    </form>
                </DialogContent>

            </Dialog>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={doctors.doctors}
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