import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { useFormik } from 'formik';


export default function Doctors() {

    let degree = ['mbbs', 'md', 'bhms', 'physiotherapy', 'dermatology', 'pediatrics', 'skin&vd', 'orthopaedics', 'gynaecology']

    const doctorSchema = yup.object({
        name: yup.string().required("Enter doctor name").matches(/^[a-zA-Z ]{2,30}$/, "Please enter valid name"),
        position : yup.string().required("Enter position").matches(/^[a-zA-Z ]{2,30}$/, "Please enter valid name"),
        degree : yup.string().required("Enter degree")
            .test('degree','Enter valid degree', function(val) {
                console.log(val);

                let value = val.toLowerCase();

                if(degree.includes(value)){
                    return true;
                }else{
                    return false
                }
            })
    })

    let formikObj = useFormik({
        initialValues: {
            name: '',
            position: '',
            degree: ''
        },
        validationSchema: doctorSchema,
        onSubmit: values => {
            console.log(values);
        },
    })

    let { handleSubmit, handleChange, handleBlur, touched, errors, values } = formikObj;


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Doctors
            </Button>
            <Dialog open={open} onClose={handleClose} onSubmit={handleSubmit}>
                <DialogTitle>Doctors</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
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
                        autoFocus
                        margin="dense"
                        id="name"
                        name='position'
                        label="Position"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                    />
                    <span>{errors.position && touched.position ? errors.position : null}</span>

                    <TextField
                        autoFocus
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} type='submit'>Add</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

// function Department(props) {
//     return (
//         <div>
//             <Container>
//                 <h1>Admin Department Page</h1>
//             </Container>

//         </div>
//     );
// }

// export default Department;