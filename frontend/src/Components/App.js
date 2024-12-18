import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LeftRight from './LeftRight';
import Login from './Login';
import CreateAccount from './SignUp';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify';
import Home from './Home';
import 'react-toastify/ReactToastify.min.css';
import { useSelector } from 'react-redux';


const App = () => {

  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element= {isAuthenticated ? <Navigate to="/chat" replace /> : <Login />}
        />
        <Route
          path="/create"
          element={isAuthenticated ? <Navigate to="/chat" replace /> : <CreateAccount />}
        />
        <Route
          path="/"
          element={
            
              <Home />
          }
        />
        {/* Protected routes */}
        <Route path="/chat" element={<PrivateRoute />}>
          <Route index element={<LeftRight />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
};

export default App;
