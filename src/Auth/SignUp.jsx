import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom'; 
import '../App.css';

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .min(10, "Phone number must be at least 10 characters long"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords must match")
    .required("Confirm Password is required"),
  terms: yup
    .boolean()
    .oneOf([true],"You must accept the terms and conditions"),
});

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Add logic to handle successful sign up (e.g., API call)
  };

  return (
    <div className="bg-image d-flex " style={{ minHeight: '200px' }}>
      <div className='card-bg'>
        <h2 className="mb-4 text-center text-white">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="border p-3 rounded shadow smaller-card">
          <div className="form-group" >

            <input
              type="text"
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              {...register("firstName")}
              placeholder="First Name"
            />
            {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
          </div>

          <div className="form-group">
            <input
              type="text"
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              {...register("lastName")}
              placeholder="Last Name"
            />
            {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
          </div>

          <div className="form-group">
            <input
              type="tel"
              className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
              {...register("phoneNumber")}
              placeholder="Phone Number"
            />
            {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber.message}</div>}
          </div>

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

          <div className="form-group">
            <input
              type="password"
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              {...register("confirmPassword")}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
          </div>

          <div className="form-group form-check">
            <input
              type="checkbox"
              className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`}
              {...register("terms")}
            />
            <label className="form-check-label text-white">
              I accept the terms and conditions
            </label>
            {errors.terms && <div className="invalid-feedback">{errors.terms.message}</div>}
          </div>

          <button type="submit" className="btn bg-dark btn-block text-white">Create Account</button>
          <p className="text-center mt-3 text-white">
            Already a member? Let’s pick up where you left off! ->
            <Link to="/SignIn" className='text-white'> Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
