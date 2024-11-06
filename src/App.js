import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home'
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp'; 
import Note from './pages/Note'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="Note" element={<Note/>} />
      </Routes>
    </Router>
  );
};

export default App;
