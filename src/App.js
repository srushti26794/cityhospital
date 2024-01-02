import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import { store } from './redux/store';

function App() {
  return (
    <provider store = {store}>
      <Routes>
        <Route path='/*' element={<UserRoutes />} />
        <Route path='/Admin/*' element={<AdminRoutes />} />
      </Routes>
    </provider>
  );
}

export default App;
