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

export default function Department() {
  const [departmentData, setDepartmentData] = useState([])
  const [updateData, setUpdateData] = useState(false)

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('department'));
    console.log(localData);
    if (localData) {
      setDepartmentData(localData);
    }
  }, []);

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


  const handleAdd = (values) => {
    console.log(values);

    let id = Math.floor(Math.random() * 1000)

    let localData = JSON.parse(localStorage.getItem("department"));

    if (localData) {
      localData.push({ ...values, id: id });
      localStorage.setItem('department', JSON.stringify(localData))
      setDepartmentData(localData)
    } else {
      localStorage.setItem('department', JSON.stringify([{ ...values, id: id }]));
      setDepartmentData([{ ...values, id: id }])
    }
  }

  const handleUpdate = (data) => {
    console.log(data);
    
    let localData = JSON.parse(localStorage.getItem('department'))
    console.log(localData);

    let updatedData = localData.map((v) => {
        if (v.id == data.id) {
            v = data;
        }
        return v;
    })

     console.log(updatedData);

    localStorage.setItem('department', JSON.stringify(updatedData))

    setDepartmentData(updatedData)
  }

  let formikObj = useFormik({
    initialValues: {
      name: '',
      description: ''
    },
    validationSchema: departmentSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      if (updateData) {
        handleUpdate(values)
      } else {
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

    let localData = JSON.parse(localStorage.getItem('department'))

    let departmentData = localData.filter((v) => v.id !== id);

    localStorage.setItem('department', JSON.stringify(departmentData))

    setDepartmentData(departmentData);
  }

  const handleEdit = (data) => {
    handleClickOpen()
    setValues(data)
    setUpdateData(true)
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Department name', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
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
        Add Department
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Department</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
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
          rows={departmentData}
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