import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


export default function Doctors() {
    const [doctorData, setDoctorData] = useState([])

    let update = null;

    useEffect(() => {
        const storedData = localStorage.getItem('doctors');
        console.log(storedData);
        if (storedData) {
            setDoctorData(JSON.parse(storedData));
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

    let formikObj = useFormik({
        initialValues: {
            name: '',
            designation: '',
            degree: ''
        },
        validationSchema: doctorSchema,
        onSubmit: (values, {resetForm}) => {
            console.log(values);

            handleAdd(values);
            handleClose();
            resetForm();
        },
    })

    let { handleSubmit, handleChange, handleBlur, touched, errors, values, resetForm } = formikObj;


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
        let id = JSON.parse(data.id)

        console.log(id);

        let localData = JSON.parse(localStorage.getItem('doctors'))
        
        values.name = data.name;
        values.designation = data.designation;
        values.degree = data.degree;

        update = id;

        handleClickOpen()
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
                    <IconButton onClick={() => handleDelete(params.row)} aria-label="delete" size="small">
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                    <EditIcon onClick={() => handleEdit(params.row)} fontSize="small" fill='grey' />
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
                            id="name"
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
                            id="name"
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
                            <Button type='submit'>Add</Button>
                            <Button>Cancel</Button>
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