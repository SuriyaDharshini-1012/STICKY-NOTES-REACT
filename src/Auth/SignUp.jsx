import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../App.css'; 
import { useSignupMutation } from '../redux/Service/SignUpApi';

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  termsAccepted: yup.boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const [signup] = useSignupMutation();
  const navigate = useNavigate();
  const setMessage=useState("");

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await signup(data).unwrap();
      console.log("Sign-Up Response: ", response);
      setMessage("account created sucessfully")
      navigate('/Home');

      // toast.success("Account created successfully!", {
      //   autoClose: 3000,
      //   onClose: () => {
      //     navigate('/Home');  
      //   }}
      //  );

      reset();
    } catch (err) {
      console.error("Error during signup: ", err);
      toast.error("Signup failed. Please try again.");
    }
  };

  const formFields = [
    { name: 'firstName', type: 'text', placeholder: 'First Name' },
    { name: 'lastName', type: 'text', placeholder: 'Last Name' },
    { name: 'email', type: 'email', placeholder: 'Email' },
    { name: 'password', type: 'password', placeholder: 'Password' },
  ];

  return (
    <div className="bg-image text-center text-dark min-vh-100">
      <div className="container text-center">
        <div className="row justify-content-center mb-4">
          <div className="col-10 mb-4">
            <div className="card bg-light text-dark">
              <div className="card-body">
                <h5 className="card-title">📝 Brainstorming</h5>
                <p className="card-text">Capture your ideas quickly and easily with sticky notes.</p>
              </div>
            </div>
          </div>

          <div className="col-8 mb-2">
            <div className="card bg-info text-white">
              <div className="card-body">
                <h5 className="card-title">✅ To-Do Lists</h5>
                <p className="card-text">Stay organized and keep track of your tasks effortlessly.</p>
              </div>
            </div>
          </div>

          <div className="col-6 mb-6">
            <div className="card bg-warning text-white">
              <div className="card-body">
                <h5 className="card-title">⏰ Reminders</h5>
                <p className="card-text">Set reminders for tasks and never miss a deadline.</p>
              </div>
            </div>
          </div>

          <div className="col-md-6" style={{ marginTop: '-500px', marginLeft: '1000px' }}>
            <div className="card w-75">
              <div className="card-body mt-4">
                <h3 className="card-title text-center">Sign Up</h3><br />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row mb-3">
                    <div className="col">
                      <input
                        type="text"
                        className={`form-control large-input ${errors.firstName ? 'is-invalid' : ''}`}
                        {...register("firstName")}
                        placeholder="First Name"
                      />
                      {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className={`form-control large-input ${errors.lastName ? 'is-invalid' : ''}`}
                        {...register("lastName")}
                        placeholder="Last Name"
                      />
                      {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
                    </div>
                  </div>

                  {formFields.slice(2).map((field) => (
                    <div className="form-group mb-3" key={field.name}>
                      <input
                        type={field.type}
                        className={`form-control large-input ${errors[field.name] ? 'is-invalid' : ''}`}
                        {...register(field.name)}
                        placeholder={field.placeholder}
                      />
                      {errors[field.name] && <div className="invalid-feedback">{errors[field.name].message}</div>}
                    </div>
                  ))}

                  <div className="form-group form-check mb-3">
                    <input
                      type="checkbox"
                      className={`form-check-input ${errors.termsAccepted ? 'is-invalid' : ''}`}
                      {...register("termsAccepted", { required: true })}
                    />
                    <label className="form-check-label text-dark text-start">
                      I accept the terms and conditions
                    </label>
                    {errors.termsAccepted && <div className="invalid-feedback">{errors.termsAccepted.message}</div>}
                  </div>

                  <button type="submit" className="btn bg-info btn-block text-white mb-1">
                    Create Account
                  </button>

                  {errors.submit && (
                    <div className="alert alert-danger mt-3">
                      <strong>Error:</strong> {errors.submit.message || 'There was an issue with your submission.'}
                    </div>
                  )}

                  <p className="text-center mt-1 text-dark">
                    Already a member? <Link to="/" className="text-primary">Sign In</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
