import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute'; // New PublicRoute component
import Home from './Home';
import Login from './Login';
import CreateAccount from './SignUp';
import NotFound from './NotFound'; // New NotFound component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/create"
          element={
            <PublicRoute>
              <CreateAccount />
            </PublicRoute>
          }
        />

        {/* Protected routes */}
        <Route path="/*" element={<PrivateRoute />}>
          <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
        </Route>


      </Routes>
    </Router>
  );
};

export default App;
