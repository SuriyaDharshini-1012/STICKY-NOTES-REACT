import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';  
import { useSigninMutation } from '../redux/Service/SignUpApi';

const schema = yup.object().shape({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters long"),
});

const Home = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const [signin, { isLoading, isError, error }] = useSigninMutation();
  const navigate = useNavigate();  

  const onSubmit = async (data) => {
    try {
      const result = await signin(data).unwrap();  
      console.log('Signin result:', result);

      const { accessToken, refreshToken } = result?.data || {}; 
      if (accessToken) {
        localStorage.setItem('Token', accessToken);
        localStorage.setItem('RefreshToken', refreshToken);
        reset(); 
        console.log("User signed in successfully.");

       
        navigate('/Note');
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

          <div className="col-8 mb-4">
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
            <div className="card w-75" >
              <div className="card-body mt-4">
                <h3 className="card-title text-center">Sign In</h3><br />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      {...register("email")}
                      placeholder="Email"
                    /> 
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                  </div>
                  <br />
                  <div className="form-group">
                    <input
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      {...register("password")}
                      placeholder="Password"
                    /> 
                    <p className="mt-2 text-end">
                      <Link to="/ForgotPassword" className="text-primary">Forgot Password?</Link>
                    </p>
                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                  </div>

                  <br />
                  <button type="submit" className="btn bg-info btn-block text-lite" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : "Login"}
                  </button>
                  <br />
                  {isError && (
                    <div className="alert alert-danger mt-3">
                      <strong>Error:</strong> {error?.data?.message || 'Login failed. Please try again.'}
                    </div>
                  )}

                  <p className="mt-3 text-center text-dark">
                    Don't have an Account? <Link to="/SignUp" className="text-primary">Create an account</Link>
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

export default Home;
