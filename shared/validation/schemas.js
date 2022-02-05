import * as yup from 'yup';

export const User = yup.object().shape({
  firstName: yup.string().required('Please enter your first name.'),
  lastName: yup.string().required('Please enter your last name.'),
  email: yup.string().email('Please enter a valid email address.'),
});

export const SignIn = yup.object().shape({
  email: yup.string().email('Please enter a valid email address.'),
  password: yup.string().required('Please enter a valid password.'),
});
