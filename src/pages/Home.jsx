import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/Navbar';

const Home = () => {
  return (
    <div className="bg-image  text-center text-white ">
      < Navbar />
      <h1>Let create your Note in Post-it Note</h1>
      <p>Your digital sticky notes application to keep your thoughts organized.</p>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white ">
            <div className="card-body">
              <h5 className="card-title">📝 Brainstorming</h5>
              <p className="card-text">Capture your ideas quickly and easily with sticky notes.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-success text-white mb-4">
            <div className="card-body">
              <h5 className="card-title">✅ To-Do Lists</h5>
              <p className="card-text">Stay organized and keep track of your tasks effortlessly.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning text-white mb-4">
            <div className="card-body">
              <h5 className="card-title">⏰ Reminders</h5>
              <p className="card-text">Set reminders for important tasks and never miss a deadline.</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mt-4">Get Started!</h2>
      <p>Join our community and start using sticky notes today!</p>
      <div className="mt-1">
        <Link to="/SignIn" className="btn text-white">Sign In</Link>
        <Link to="/SignUp" className="btn text-white">Sign Up</Link>
      </div>
    </div>
  );
};

export default Home;
