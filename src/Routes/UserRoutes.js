import React from 'react';
import Home from '../Container/Home/Home';
import Department from '../Container/Department/Department';
import DepartmentDetails from '../Container/Department/DepartmentDetails';
import Doctors from '../Container/Doctors/Doctors';
import About from '../Container/About/About';
import Contact from '../Container/Contact/Contact';
import Medicines from '../Container/Medicines/Medicines';
import MedicineData from '../Container/Medicines/MedicineData';
import Appointment from '../Container/Appointment/Appointment';
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';

function UserRoutes(props) {
    return (
        <>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/Department' element={<Department />} />
                <Route exact path='/Department/:id' element={<DepartmentDetails />} />
                <Route exact path='/Doctors' element={<Doctors />} />
                <Route exact path='/About' element={<About />} />
                <Route exact path='/Contact' element={<Contact />} />

                <Route element={<PrivateRoutes />}>
                    
                    <Route exact path='/medicines' element={<Medicines />} />
                    <Route exact path='/medicines/:id' element={<MedicineData />} />
                    <Route exact path='/Appointment' element={<Appointment />} />
                </Route>

            </Routes>
        </>
    );
}

export default UserRoutes;