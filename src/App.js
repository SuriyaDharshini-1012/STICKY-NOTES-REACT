import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import StickyNote from './pages/NewNotes';
import AllNotes from './pages/AllNotes';
import ProtectedRoute from './component/ProtectedRoute';
import ForgotPassword from './pages/ForgetPassword';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route element={<ProtectedRoute />} >
        <Route path="/StickyNote"  element={<StickyNote />}  />
        <Route path="/AllNotes" element={<AllNotes />}  />
        </Route>
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/*" element={<AllNotes />} />
      </Routes>
    </Router>
  );
};
export default App;
