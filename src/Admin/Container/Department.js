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


export default function Department() {


  const departmentSchema = yup.object({
    name: yup.string().required("Enter department name").matches(/^[a-zA-Z ]{2,30}$/, "Please enter valid name"),
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
    validationSchema: departmentSchema,
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
        Add Department
      </Button>
      <Dialog open={open} onClose={handleClose} onSubmit={handleSubmit}>
        <DialogTitle>Department</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name='name'
            label="Department name"
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