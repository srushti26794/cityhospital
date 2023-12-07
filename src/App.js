import logo from './logo.svg';
import './App.css';
import Header from './Component/Header/Header';
import Footer from './Component/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';


function App() {


  return (
    <>
      <Header />

      <Routes>
        <Route path='/*' element = {<UserRoutes/>}/>
        <Route path='/Admin/*' element = {<AdminRoutes/>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
