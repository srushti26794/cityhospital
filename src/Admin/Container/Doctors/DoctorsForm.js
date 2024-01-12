import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { useFormik } from 'formik';

function DoctorsForm({handleAdd, handleUpdate, updateData}) {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if(updateData){
            handleClickOpen();
            setValues(updateData);
        }
    }, [updateData])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        resetForm()
    };

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
            // setUpdateData(false)
            handleClose();
            resetForm();
        },
    })

    let { handleSubmit, handleChange, handleBlur, touched, errors, values, resetForm, setValues } = formikObj;
    return (
        <>
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
        </>
    );
}

export default DoctorsForm;