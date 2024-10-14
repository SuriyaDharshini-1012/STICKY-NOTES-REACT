import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../src/component/Navbar';
import Note from '../src/component/Note';
import SignUp from './Auth/SignUp';
import SignIn from './Auth/SignIn';
// import Sidebar from './component/Sidebar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
         <Route path="/notes" element={<Note />} />
         <Route path="/" element={<Navbar/>} /> 
        {/* <Route path="/" element={<Sidebar />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
