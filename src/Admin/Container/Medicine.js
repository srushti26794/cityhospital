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


export default function Medicine() {
    const [medicineData, setMedicineData] = useState([])

    let update = null;

    useEffect(() => {
        const storedData = localStorage.getItem('medicine');
        console.log(storedData);
        if (storedData) {
            setMedicineData(JSON.parse(storedData));
        }
    }, [medicineData]);

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


    const handleAdd = (values) => {
        console.log(values);

        let id = Math.floor(Math.random() * 1000)

        let localData = JSON.parse(localStorage.getItem("medicine"));

        if (localData) {
            localData.push({ ...values, id: id });
            localStorage.setItem('medicine', JSON.stringify(localData))
            setMedicineData(localData)
        } else {
            localStorage.setItem('medicine', JSON.stringify([{ ...values, id: id }]));
            setMedicineData([{ ...values, id: id }])
        }
    }

    let formikObj = useFormik({
        initialValues: {
            file: '',
            name: '',
            price: '',
            expiry: '',
            description: ''
        },
        validationSchema: medicineSchema,
        onSubmit: values => {
            console.log(values);

            handleAdd(values);
            handleClose();
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

        let localData = JSON.parse(localStorage.getItem('medicine'))

        let medicineData = localData.filter((v) => v.id !== id);

        localStorage.setItem('medicine', JSON.stringify(medicineData))

        setMedicineData(medicineData);
    }

    const handleEdit = (data) => {
        let id = JSON.parse(data.id)

        console.log(id);

        let localData = JSON.parse(localStorage.getItem('medicine'))
        
        values.name = data.name;
        values.price = data.price;
        values.expiry = data.expiry;
        values.description = data.description

        update = id;

        handleClickOpen()
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Medicine name', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        { field: 'expiry', headerName: 'Expiry', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        { field: 'file', headerName: 'Medicine Photo', width: 130 },
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
                Add Medicine
            </Button>
            <Dialog open={open} onClose={handleClose} onSubmit={handleSubmit}>
                <DialogTitle>Medicine</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
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

                        <DialogActions>
                            <Button onClick={handleClose} type='submit'>Add</Button>
                            <Button onClick={handleClose}>Cancel</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={medicineData}
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