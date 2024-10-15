import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Auth/SignUp';
import SignIn from './Auth/SignIn';
import Navbar from './component/Navbar';
import Home from './pages/Home';
import Note from './component/Note';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        {/* <Route path="/notes" element={<Note />} /> */}
        <Route path="/Note" element={<Note />} />
      </Routes>
    </Router>
  );
};

export default App;
