import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useSigninMutation } from '../redux/Service/SignUpApi';


const schema = yup.object().shape({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters long"),
});

const SignIn = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema), 
  });
  const navigate = useNavigate();
  
  const [signin, { isLoading, isError, error }] = useSigninMutation(); 
  const onSubmit = async (data) => {
    try {
      const result = await signin(data).unwrap();  
      console.log('Signin result:', result);
  
    
      const { accessToken, refreshToken } = result?.data || {}; 
      if (accessToken) {
      
        localStorage.setItem('Token', accessToken);
        localStorage.setItem('RefreshToken', refreshToken);
  
        reset(); 
        console.log("User signed in successfully, navigating to /note");
        navigate('/note');
      } else {
        console.error('Access token not found in the result.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      if (error?.data) {
        console.error('Error data:', error.data); 
      }
    }
  };

  return (
    <div className="bg-image d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className='mt-0'>
        <h2 className="mt-1 text-center text-white">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="border p-3 rounded shadow">
        
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

          
          <button type="submit" className="btn bg-dark btn-block text-white" disabled={isLoading}>
            {isLoading ? 'Logging in...' : "Let's post your idea"}
          </button>

         
          {isError && (
            <div className="alert alert-danger mt-3">
              <strong>Error:</strong> {error?.data?.message || 'Login failed. Please try again.'}
            </div>
          )}

          
          <p className="mt-3 text-center text-white">
            Become a member <Link to="/SignUp" className='text-white'>Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
