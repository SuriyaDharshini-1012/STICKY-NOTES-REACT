import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Auth/SignUp';
import SignIn from './Auth/SignIn';
import Home from './pages/Home';
import Note from './pages/Note';

const App = () => {
  return (
    <Router>
      
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Note" element={<Note />} />
      </Routes>
    </Router>
  );
};

export default App;
