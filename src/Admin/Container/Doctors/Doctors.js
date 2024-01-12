import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDoctorData, getDoctorData, postDoctorData, updateDoctorData } from '../../../redux/action/doctors.actions';
import DoctorsForm from './DoctorsForm';


export default function Doctors() {
    const [doctorData, setDoctorData] = useState([])
    const [updateData, setUpdateData] = useState(false)

    const dispatch = useDispatch();

    const doctors = useSelector(state => state.doctors)
    console.log(doctors.doctors);

    useEffect(() => {
        dispatch(getDoctorData())
    }, []);

    const handleAdd = (values) => {
        console.log(values);

        dispatch(postDoctorData(values))
    }

    const handleUpdate = (data) => {
        console.log(data);
    
        dispatch(updateDoctorData(data))
    }

    const handleDelete = (data) => {
        console.log(data);

        dispatch(deleteDoctorData(data.id))
    }

    const handleEdit = (data) => {
        // handleClickOpen()
        // setValues(data)
        setUpdateData(data)
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

            <DoctorsForm handleAdd = {handleAdd} handleUpdate = {handleUpdate} updateData = {updateData}/>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={doctors.doctors}
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