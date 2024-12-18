import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().required('Email is required').email('Invalid email'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  termsAccepted: Yup.bool().oneOf([true], 'You must accept the terms and conditions').required(),
});

export default SignUpSchema;
