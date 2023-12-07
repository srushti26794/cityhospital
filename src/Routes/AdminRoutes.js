import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Department from '../Admin/Container/Department';

function AdminRoutes(props) {
    return (
        <>
            <Routes>
               <Route exact path='/department' element = {<Department/>}/>
            </Routes> 
        </>
    );
}

export default AdminRoutes;