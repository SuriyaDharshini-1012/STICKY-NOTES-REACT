import React from 'react';
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
  phoneNumber: yup.string()
    .required("Phone number is required")
    .min(10, "Phone number must be at least 10 characters long"),
  email: yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], "Passwords must match")
    .required("Confirm Password is required"),
  termsAccepted: yup.boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const [signup] = useSignupMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await signup(data).unwrap();
      console.log("Sign-Up Response: ", response);
      console.log("Response Status: ", response.status);
      console.log("Response Headers: ", response.headers);
      
      toast.success("Account created successfully!", {
        autoClose: 3000,
        onClose: () => navigate('/Home'), 
      });
  
      reset();
    } catch (err) {
      console.error("Error during signup: ", err);
      toast.error("Signup failed. Please try again.");
    }
  };

  const formFields = [
    { name: 'firstName', type: 'text', placeholder: 'First Name' },
    { name: 'lastName', type: 'text', placeholder: 'Last Name' },
    { name: 'phoneNumber', type: 'tel', placeholder: 'Phone Number' },
    { name: 'email', type: 'email', placeholder: 'Email' },
    { name: 'password', type: 'password', placeholder: 'Password' },
    { name: 'confirmPassword', type: 'password', placeholder: 'Confirm Password' },
  ];

  return (
    <div className=" bg-image d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className='card-bg'>
        <form onSubmit={handleSubmit(onSubmit)} className="card border p-2 rounded shadow" style={{ marginLeft: '200px', width: '500px'}}>
          <h2 className="">Sign Up</h2>
          {formFields.map(field => (
            <div className="form-group mb-3" key={field.name}>
              <input
                type={field.type}
                className={`form-control ${errors[field.name] ? 'is-invalid' : ''}`}
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
            <label className="form-check-label text-dark">
              I accept the terms and conditions
            </label>
            {errors.termsAccepted && <div className="invalid-feedback">{errors.termsAccepted.message}</div>}
          </div>
          <button type="submit" className="btn bg-secondary btn-block text-white mb-3">Create Account</button>
          <p className="text-center mt-3 text-dark">
            Already a member? Let’s pick up where you left off! 
            <Link to="/" className='text-primary'> Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
