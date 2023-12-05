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

function App() {
  return (
    <>
      <Header />
      <Home />
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
