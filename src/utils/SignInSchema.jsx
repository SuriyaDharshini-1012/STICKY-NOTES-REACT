import * as yup from 'yup';

const signInSchema = yup.object().shape({ 
  email: yup.string().required("Email is required").email("Enter a valid email"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters long"),
});

export default signInSchema;
