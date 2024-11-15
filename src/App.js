import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home'
import SignUp from './auth/SignUp';
import Note from './pages/Note';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="Note" element={<Note/>} />
        <Route path="profile" element={<Profile/>} />
      </Routes>
    </Router>
  );
};

export default App;
