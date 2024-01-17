import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { useFormik } from 'formik';

function MedicineForm({handleAdd, handleUpdate, updateData}) {
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
    };

    let d = new Date();
    let nd = new Date();
    nd.setDate(d.getDate() - 1)


    const SUPPORTED_FORMATS = ['image/jpg', 'image/JPG', 'image/jpeg', 'image/JPEG', 'image/png', 'image/PNG'];

    const medicineSchema = yup.object({
        // file: yup
        //     .mixed()
        //     .nullable()
        //     .required('A file is required')
        //     .test('Fichier taille',
        //         'File size is too large', (value) => !value || (value && value.size <= 1024 * 1024))
        //     .test('format',
        //         'Please upload jpg, jpeg or png file', (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))),
        name: yup.string().required("Enter medicine name").matches(/^([a-zA-Z ]{2,30})||([0-9])$/, "Please enter valid name"),
        price: yup.string().required("Enter price")
            .test('price', 'price can not be zero or negative', function (val) {
                if (val >= 1) {
                    return true;
                } else {
                    return false;
                }
            }),
        expiry: yup.date().min(nd, "Date must be future").required("Please enter expiry"),
        desc: yup.string()
            .required("Enter description")
            .test('desc', "Description in between 10 to 30 word", function (val) {
                let array = val.split(" ");

                if (array.length >= 10 && array.length <= 50) {
                    return true;
                } else {
                    return false
                }
            })
    })

    let formikObj = useFormik({
        initialValues: {
            // file: '',
            name: '',
            price: '',
            expiry: '',
            desc: ''
        },
        validationSchema: medicineSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);

            if (updateData) {
                handleUpdate(values)
            } else {
                handleAdd(values);
            }
            // setUpdateData(false)
            handleClose();
            resetForm();
        },
    })

    let { handleSubmit, handleChange, handleBlur, touched, errors, values, resetForm, setFieldValue, setValues } = formikObj;
    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Medicine
            </Button>
            <Dialog open={open} onClose={handleClose} onSubmit={handleSubmit}>
                <DialogTitle>Medicine</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        {/* <input
                            type="file"
                            id="file"
                            name='file'
                            onChange={(event) => setFieldValue("file", event.target.files[0])}
                        />
                        <span>{errors.file && touched.file ? errors.file : null}</span> */}

                        <TextField

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
                            margin="dense"
                            id="name"
                            name='desc'
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.desc}
                        />
                        <span>{errors.desc && touched.desc ? errors.desc : null}</span>

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

export default MedicineForm;