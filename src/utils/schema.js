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


export const profileUserDataSchema = Yup.object().shape({
  photo: Yup.mixed(),
  name: Yup.string()
    .min(0, 'Name must be')
    .max(32, 'Name must be than 32 characters'),
  email: Yup.string()
    .email('Incorrect mail format'),
  passwordOutdated: Yup.string().when(['passwordNew', 'newPasswordRepeat'], {
    is: (passwordNew, newPasswordRepeat) => {
      return (passwordNew && passwordNew.length > 0) || (newPasswordRepeat && newPasswordRepeat.length > 0);
    },
    then: (schema) => schema
      .required('Old password is required'),
  }),
  passwordNew: Yup.string().when(['passwordOutdated', 'newPasswordRepeat'], {
    is: (passwordOutdated, newPasswordRepeat) => {
      return (passwordOutdated && passwordOutdated.length > 0) || (newPasswordRepeat && newPasswordRepeat.length > 0);
    },
    then: (schema) => schema
      .required('New password is required')
      .min(8, 'Password must min 8 characters')
      .max(64, 'Password must min 8 characters'),
  }),
  newPasswordRepeat: Yup.string().when(['passwordNew', 'passwordOutdated'], {
    is: (passwordOutdated, passwordNew) => {
      return (passwordOutdated && passwordOutdated.length > 0) || (passwordNew && passwordNew.length > 0);
    },
    then: (schema) => schema
      .required('Old password is required')
      .oneOf([Yup.ref('passwordNew'), null], 'Passwords must match'),
  }),
  gender: Yup.string()
    .oneOf(['female', 'man'], 'Gender must be either'),
}, [
  ['passwordOutdated', 'passwordNew'],
  ['passwordOutdated', 'newPasswordRepeat'],
  ['newPasswordRepeat', 'passwordNew'],
])
