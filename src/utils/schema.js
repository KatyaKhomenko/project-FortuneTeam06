import * as Yup from "yup";

export const validationLoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email!')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password should be at least 8 characters')
    .max(64, 'Password must be the most 64 characters')
    .required('Password is required'),
});


export const validationRegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email!')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be at most 64 characters')
    .required('Password is required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});
