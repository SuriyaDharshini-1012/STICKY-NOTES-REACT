import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSigninMutation } from '../redux/Service/SignUpApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import signInSchema from '../utils/SignInSchema';

const SignIn = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(signInSchema),
  });
  const [signin, { isLoading, isError, error }] = useSigninMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await signin(data).unwrap();
      const { accessToken, refreshToken } = result?.data || {};
      if (accessToken) {
        localStorage.setItem('Token', accessToken);
        localStorage.setItem('RefreshToken', refreshToken);
        reset();
        toast.success("Successfully logged in", { autoClose: 3000 });
        setTimeout(() => {
          navigate('/StickyNote');
        }, 1000);
      }
    } catch (error) {
      if (error?.data) {
        toast.error('Login failed. Please try again.', { autoClose: 3000 }); 
      }}
  };

  return (
    <div className="bg-image">
      <div className="row d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        
      <div className="col-md-8 d-none d-md-block">
          <div className="row mb-3 justify-content-center">
            <div className="col-10 col-md-9">
              <div className="card bg-light text-dark">
                <div className="card-body">
                  <h5 className="card-title">📝 Brainstorming</h5>
                  <p className="card-text">Capture your ideas quickly and easily with sticky notes.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-3 justify-content-center">
            <div className="col-10 col-md-6 align-self-start">
              <div className="card bg-info text-white">
                <div className="card-body">
                  <h5 className="card-title">✅ To-Do Lists</h5>
                  <p className="card-text">Stay organized and keep track of your tasks effortlessly.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-10 col-md-4">
              <div className="card bg-warning text-white">
                <div className="card-body">
                  <h5 className="card-title">⏰ Reminders</h5>
                  <p className="card-text">Set reminders for tasks and never miss a deadline.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
<div className="col-12 col-md-4 d-flex justify-content-center align-items-center h-100">
          <div className="card col-10 col-md-8 mx-auto h-auto h-md-75 w-75 h-100">
            <div className="card-body">
              <h3 className="card-title text-center">Sign In</h3><br />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    {...register("email")}
                    placeholder="Email"
                    style={{ maxWidth: '300px', width: '100%' }}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>

                <div className="form-group mb-3">
                  <input
                    type="password"
                    className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                    {...register("password")}
                    placeholder="Password"
                    style={{ maxWidth: '300px', width: '100%' }}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                  <p className="mt-2 text-end">
                    <Link to="/ForgotPassword" className="text-primary">Forgot Password?</Link>
                  </p>
                </div>
                <button
                  type="submit"
                  className="btn bg-info btn-block text-lite"
                  value={isLoading ? 'Logging in...' : "Login"}
                  disabled={isLoading}
                >Login
                </button>
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
      <ToastContainer/> 
    </div>
  );
};

export default SignIn;
