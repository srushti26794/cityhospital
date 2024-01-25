import React, { useState } from 'react';
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
import Header from '../Component/Header/Header';
import Footer from '../Component/Footer/Footer';
import LoginSignup from '../Container/LoginSignup/LoginSignup';
import MyWishlist from '../Container/MyWishlist/MyWishlist';
import AddToCart from '../Container/AddToCart/AddToCart';
import Counter from '../Container/Counter/Counter';
import Logout from '../Container/Logout/Logout';

function UserRoutes(props) {
    const [wishlist, setWishlist] = useState([])
    const [cart, setCart] = useState([])

    return (
        <>
            <Header wishlist = {wishlist} cart = {cart} setCart = {setCart}/>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/Department' element={<Department />} />
                <Route exact path='/Department/:id' element={<DepartmentDetails />} />
                <Route exact path='/Doctors' element={<Doctors />} />
                <Route exact path='/About' element={<About />} />
                <Route exact path='/Contact' element={<Contact />} />
                <Route exact path='/LoginSignup' element={<LoginSignup />}/>
                <Route exact path='/MyWishlist' element={<MyWishlist wishlist = {wishlist} setWishlist = {setWishlist}/>} />
                <Route exact path='/Counter' element={<Counter />} />
                

                <Route element={<PrivateRoutes />}>

                    <Route exact path='/medicines' element={<Medicines cart = {cart} setCart = {setCart}/>} />
                    <Route exact path='/AddToCart' element={<AddToCart cart = {cart} setCart = {setCart}/>}/>
                    <Route exact path='/medicines/:id' element={<MedicineData />} />
                    <Route exact path='/Appointment' element={<Appointment />} />
                </Route>

            </Routes>
            <Footer />
        </>
    );
}

export default UserRoutes;