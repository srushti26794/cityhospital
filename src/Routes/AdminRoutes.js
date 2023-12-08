import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Department from '../Admin/Container/Department';
import Layout from '../Admin/Component/Layout';
import Medicine from '../Admin/Container/Medicine';
import Doctors from '../Admin/Container/Doctors';

function AdminRoutes(props) {
    return (
        <>
            <Layout>
                <Routes>
                    <Route exact path='/department' element={<Department />} />
                    <Route exact path='/medicine' element={<Medicine/>} />
                    <Route exact path='/doctors' element={<Doctors/>} />
                </Routes>
            </Layout>
        </>
    );
}

export default AdminRoutes;