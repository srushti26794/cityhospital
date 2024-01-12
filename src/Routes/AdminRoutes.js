import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Department from '../Admin/Container/Department';
import Layout from '../Admin/Component/Layout';
import Facilties from '../Admin/Container/Facilties';
import Medicine from '../Admin/Container/Medicines/Medicine';
import Doctors from '../Admin/Container/Doctors/Doctors';

function AdminRoutes(props) {
    return (
        <>
            <Layout>
                <Routes>
                    <Route exact path='/department' element={<Department />} />
                    <Route exact path='/medicine' element={<Medicine/>} />
                    <Route exact path='/doctors' element={<Doctors/>} />
                    <Route exact path='/facilities' element={<Facilties/>} />
                </Routes>
            </Layout>
        </>
    );
}

export default AdminRoutes;