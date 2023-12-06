import logo from './logo.svg';
import './App.css';
import Header from './Component/Header/Header';
import Footer from './Component/Footer/Footer';
import Home from './Container/Home/Home';
import Appointment from './Container/Appointment/Appointment';
import Contact from './Container/Contact/Contact';
import Department from './Container/Department/Department';
import Doctors from './Container/Doctors/Doctors';
import About from './Container/About/About';
import { Route, Routes } from 'react-router-dom';
import DepartmentDetails from './Container/Department/DepartmentDetails';
import Medicines from './Component/Medicines/Medicines';


function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route exact path='/' element = {<Home/>}/>
        <Route exact path='/Department' element = {<Department/>}/>
        <Route exact path='/Department/:id' element = {<DepartmentDetails/>}/>
        <Route exact path='/Doctors' element = {<Doctors/>}/>
        <Route exact path='/About' element = {<About/>}/>
        <Route exact path='/Contact' element = {<Contact/>}/>
        <Route exact path='/medicines' element = {<Medicines/>}/>
        <Route exact path='/Appointment' element = {<Appointment/>}/>
      </Routes>

      {/* <Home /> */}
      {/* <Appointment/> */}
      {/* <Contact/> */}
      {/* <Department/> */}
      {/* <Doctors/> */}
      {/* <About/> */}
      <Footer />
    </>
  );
}

export default App;
