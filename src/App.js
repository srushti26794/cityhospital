import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import { store } from './redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store = {store}>
      <Routes>
        <Route path='/*' element={<UserRoutes />} />
        <Route path='/Admin/*' element={<AdminRoutes />} />
      </Routes>
    </Provider>
  );
}

export default App;
