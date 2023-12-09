import React from 'react';
import Navbar from './Components/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import ErrorPage from './Pages/ErrorPage'
import { Grid, ThemeProvider, createTheme } from '@mui/material';
import { useUser } from './Context/UserContext';
import SideBar from './Components/SideBar';
import BikerDashboard from './Components/BikerPages/BikerDashboard';
import InProgress from './Components/BikerPages/InProgress';
import PastOrders from './Components/BikerPages/PastOrders';
import SenderDashboard from './Components/SenderPages/SenderDashboard';
import CreateNewParcel from './Components/SenderPages/CreateNewParcel';
import PreviousParcels from './Components/SenderPages/PreviousParcels';
import { Toaster } from 'react-hot-toast';

function App() {
  const { user } = useUser();

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <Navbar />
        <Toaster
          position="bottom-center"
          reverseOrder={false}
        />
        {!user ? (
          <Routes>
            <Route path="/" element={!user ? <Navigate to="/login" /> : <Navigate to="/" />} />
            <Route path='/login' element={!user ? <Login /> : <ErrorPage />} />
            <Route path='/signUp' element={!user ? <SignUp /> : <ErrorPage />} />
            <Route path='*' element={user ? <ErrorPage /> : <Navigate to="/login" />} />
          </Routes>
        ) : (
          <Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3} sx={{ padding: 4 }}>
                <SideBar userType={user.userType} />
              </Grid>
              <Grid item xs={12} md={9}>
                {user.userType === 'sender' ? (
                  <Routes>
                    <Route path='/' element={<Navigate to="/User/dashboard" />} />
                    <Route path='/User/dashboard' element={<SenderDashboard />} />
                    <Route path='/User/createNewOrder' element={<CreateNewParcel />} />
                    <Route path='/User/previousOrders' element={<PreviousParcels />} />
                    <Route path='*' element={<ErrorPage />} />
                  </Routes>
                ) : (
                  <Routes>
                    <Route path='/' element={<Navigate to="/Captain/dashboard" />} />
                    <Route index path='/Captain/dashboard' element={<BikerDashboard />} />
                    <Route path='/Captain/inProgress' element={<InProgress />} />
                    <Route path='/Captain/pastOrders' element={<PastOrders />} />
                    <Route path='*' element={<ErrorPage />} />
                  </Routes>
                )}
              </Grid>
            </Grid>
          </Grid>
        )}
      </ThemeProvider>
    </>
  );
}

export default App;