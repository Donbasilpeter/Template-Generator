import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LeftRight from './LeftRight';
import Login from './Login';
import CreateAccount from './SignUp';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify';
import Home from './Home';
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
              <Login />
          }
        />
        <Route
          path="/create"
          element={
              <CreateAccount />
          }
        />
        <Route
          path="/"
          element={
            
              <Home />
          }
        />

        {/* Protected routes */}
        <Route path="/create*" element={<PrivateRoute />}>
          <Route index element={<LeftRight />} />
        </Route>
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
};

export default App;
