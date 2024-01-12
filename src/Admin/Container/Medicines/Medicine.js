import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteMedicine, getMedicine, postMedicine, updateMedicine } from '../../../redux/action/medicine.action';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import MedicineForm from './MedicineForm';

export default function Medicine() {
    const [medicineData, setMedicineData] = useState([])
    const [updateData, setUpdateData] = useState(false)

    // console.log(updateData);
    const dispatch = useDispatch();

    const medicine = useSelector(state => state.medicines)
    console.log(medicine.medicines);

    useEffect(() => {
        dispatch(getMedicine());
    }, [])



    const handleAdd = (values) => {
        console.log(values);

        dispatch(postMedicine(values))

    }

    const handleUpdate = (data) => {
        console.log(data);

        dispatch(updateMedicine(data))
        setUpdateData(false)
    }

    const handleDelete = (data) => {
        console.log(data);

        dispatch(deleteMedicine(data.id))
    }

    const handleEdit = (data) => {
        // handleClickOpen()
        // setValues(data)
        setUpdateData(data)
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Medicine name', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        { field: 'expiry', headerName: 'Expiry', width: 130 },
        { field: 'desc', headerName: 'Description', width: 130 },
        {
            field: 'file', headerName: 'Medicine file', width: 130,
            // renderCell: (params) => {
            //     console.log(params.row);
            //     // <image>
            //     return (
            //         <img src={URL.createObjectURL(params.row.file)} />
            //     )


            // }
        },
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
          
            {
                medicine.isLoding ?
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box> :

                    medicine.error ?
                    <p>{medicine.error.message}</p> :

                    <>
                      <MedicineForm handleAdd = {handleAdd} handleUpdate = {handleUpdate} updateData = {updateData}/>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={medicine.medicines}
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
                    </>
            }

        </React.Fragment>
    );
}