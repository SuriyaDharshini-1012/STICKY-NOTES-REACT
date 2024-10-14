import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom'; 
import '../App.css';

const schema = yup.object().shape({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters long"),
});

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Add your authentication logic here

    // Navigate to dashboard or another page after successful login
    window.location.href = '/dashboard'; // Change '/dashboard' to your desired route
  };

  return (
    <div className="bg-image d-flex justify-content-center align-items-center" style={{ minHeight: '500px' }}>
      <div
        style={{
          width: '400px',
          padding: '2rem',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <h2 className="mb-4 text-center">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="border p-3 rounded shadow smaller-card">
          <div className="form-group">
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              {...register("email")}
              placeholder="Email"
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          <div className="form-group">
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register("password")}
              placeholder="Password"
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <button type="submit" className="btn btn-primary btn-block">Let's create an account</button>
          <p className="mt-3 text-center">
            Become a member - Create an account <Link to="/SignUp">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
