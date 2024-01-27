import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import Alert from './Component/Alert/Alert';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <SnackbarProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Alert/>
        <Routes>
          <Route path='/*' element={<UserRoutes />} />
          <Route path='/Admin/*' element={<AdminRoutes />} />
        </Routes>
      </PersistGate>
    </Provider>
    </SnackbarProvider>
  );
}

export default App;
