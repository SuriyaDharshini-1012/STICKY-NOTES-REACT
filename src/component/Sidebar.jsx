import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
  return (
    <div className="d-flex flex-column vh-100 bg-light border-end" style={{ width: '250px' }}>
      <div className="p-3">
        <h4>Sticky Notes</h4>
      </div>
      <ul className="nav flex-column d">
        <li className="nav-item">
          <Link className="nav-link" to="/create">Create Note</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/update">Update Note</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/delete">Delete Note</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/hide">Hide Note</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
