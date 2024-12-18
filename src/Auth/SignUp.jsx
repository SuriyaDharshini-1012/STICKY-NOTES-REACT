import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css'; 
import { useSignupMutation } from '../redux/Service/SignUpApi';
import SignUpSchema from '../utils/SignUpSchema';
import { SignUpFields } from '../constant/index';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(SignUpSchema),
  });
  const [signup] = useSignupMutation();
  const navigate = useNavigate();
  
  const onSubmit = async (data) => {
    console.log(data);  
    try {
     await signup(data).unwrap();
    toast.success("Account created successfully", { autoClose: 3000 }); 
    setTimeout(()=>{
      navigate('/');  
    } ,1000 )   
      reset();  
    } catch (err) { 
      toast.error("Signup failed. Please try again.");
    }
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
              <h3 className="card-title text-center">Sign Up</h3><br />
              <form onSubmit={handleSubmit(onSubmit)}>
               <div className="row mb-3 mt-3">
                  <div className="col">
                    <input
                      type="text"
                      className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                      {...register("firstName")}
                      placeholder="First Name"
                      style={{ maxWidth: '300px', width: '100%' }} 
                    />
                    {errors.firstName && <div className="text-danger">{errors.firstName.message}</div>}
                  </div>

                  <div className="col">
                    <input
                      type="text"
                      className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                      {...register("lastName")}
                      placeholder="Last Name"
                      style={{ maxWidth: '300px', width: '100%' }} 
                    />
                    {errors.lastName && <div className="text-danger">{errors.lastName.message}</div>}
                  </div>
                </div>
             {SignUpFields.slice(2).map((field) => (
                  <div className="form-group mb-3" key={field.name}>
                    <input
                      type={field.type}
                      className={`form-control ${errors[field.name] ? 'is-invalid' : ''}`}
                      {...register(field.name)}
                      placeholder={field.placeholder}
                    />
                    {errors[field.name] && <div className="text-danger">{errors[field.name].message}</div>}
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
                  {errors.termsAccepted && <div className="text-danger">{errors.termsAccepted.message}</div>}
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
      <ToastContainer />
    </div>
  );
};

export default SignUp;
