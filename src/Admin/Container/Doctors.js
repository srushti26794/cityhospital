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


export default function Doctors() {
    const [doctorData, setDoctorData] = useState([])
    const [updateData, setUpdateData] = useState(false)

    useEffect(() => {
        let localData = JSON.parse(localStorage.getItem('doctors'))
        console.log(localData);
        if (localData) {
            setDoctorData(localData);
        }
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

        let id = Math.floor(Math.random() * 1000)

        let localData = JSON.parse(localStorage.getItem("doctors"));

        if (localData) {
            localData.push({ ...values, id: id });
            localStorage.setItem('doctors', JSON.stringify(localData))
            setDoctorData(localData)
        } else {
            localStorage.setItem('doctors', JSON.stringify([{ ...values, id: id }]));
            setDoctorData([{ ...values, id: id }])
        }
    }

    const handleUpdate = (data) => {
        console.log(data);
    
        let localData = JSON.parse(localStorage.getItem('doctors'))
        console.log(localData);

        let updatedData = localData.map((v) => {
            if (v.id == data.id) {
                v = data;
            }
            return v;
        })

         console.log(updatedData);

        localStorage.setItem('doctors', JSON.stringify(updatedData))

        setDoctorData(updatedData)
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
        console.log(JSON.parse(data.id));

        let id = JSON.parse(data.id)

        let localData = JSON.parse(localStorage.getItem('doctors'))

        let doctorData = localData.filter((v) => v.id !== id);

        localStorage.setItem('doctors', JSON.stringify(doctorData))

        setDoctorData(doctorData);
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
                    rows={doctorData}
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