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


export default function Medicine() {
    // const MAX_FILE_SIZE = 3145728; // 3 mb

    // const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

    // function isValidFileType(fileName, fileType) {
    //     return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
    // }

    const medicineSchema = yup.object({
        file: yup
            .mixed()
            .required('File is required')
            .test(
                'file',
                'File size is too large',
                (value) => !value || value.size <= 3145728
            )
            .test(
                'fileType',
                'Unsupported file format',
                value => value && ['image/jpeg', 'image/png'].includes(value.type)
            ),
        name: yup.string().required("Enter medicine name").matches(/^([a-zA-Z ]{2,30})||([0-9])$/, "Please enter valid name"),
        price: yup.string().required("Enter price")
            .test('price', 'price can not be zero or negative', function (val) {
                if (val >= 1) {
                    return true;
                } else {
                    return false;
                }
            }),
        expiry: yup.string().required("Enter expiry"),
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

    let formikObj = useFormik({
        initialValues: {
            name: '',
            description: ''
        },
        validationSchema: medicineSchema,
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
                Add Medicine
            </Button>
            <Dialog open={open} onClose={handleClose} onSubmit={handleSubmit}>
                <DialogTitle>Medicine</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name='file'
                        label="Medicine photo"
                        type="file"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.file}
                    />
                    <span>{errors.file && touched.file ? errors.file : null}</span>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name='name'
                        label="Medicine name"
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
                        name='price'
                        label="Price"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.price}
                    />
                    <span>{errors.price && touched.price ? errors.price : null}</span>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name='expiry'
                        label="Expiry"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.expiry}
                    />
                    <span>{errors.expiry && touched.expiry ? errors.expiry : null}</span>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
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