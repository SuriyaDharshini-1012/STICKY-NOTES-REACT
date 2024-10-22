import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify'; 
import '../App.css';
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
  const [signin] = useSigninMutation();

  const onSubmit = async (data) => {
    try {
      const result = await signin(data);
      console.log("API Response: ", result);

      if (result?.data?.statusCode === 200) {
        const { accessToken, refreshToken } = result.data; 
        
        sessionStorage.setItem('Token', accessToken);
        sessionStorage.setItem('RefreshToken', refreshToken); 

        toast.success("Login successful!", { autoClose: 1000 });
        setTimeout(() => navigate('/note'), 1000);
        reset(); 
      } else {
        const errorMessage = result.data.message || "Login failed. Please try again.";
        toast.error(errorMessage, { autoClose: 1000 });
      }
    } catch (error) {
      console.error("Error during login: ", error.message);
      toast.error(error.message || "An error occurred during submission. Please try again.", { autoClose: 500 });
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

          <button type="submit" className="btn btn-dark btn-block">Let's post your idea</button>
          <p className="mt-3 text-center text-white">
            Become a member  <Link to="/SignUp" className='text-white'>Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
