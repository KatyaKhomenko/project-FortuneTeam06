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
  oldPassword: Yup.string().when(['newPassword', 'newPasswordRepeat'], {
    is: (newPassword, newPasswordRepeat) => {
      return (newPassword && newPassword.length > 0) || (newPasswordRepeat && newPasswordRepeat.length > 0);
    },
    then: (schema) => schema
      .required('Old password is required'),
  }),
  newPassword: Yup.string().when(['oldPassword', 'newPasswordRepeat'], {
    is: (oldPassword, newPasswordRepeat) => {
      return (oldPassword && oldPassword.length > 0) || (newPasswordRepeat && newPasswordRepeat.length > 0);
    },
    then: (schema) => schema
      .required('New password is required')
      .min(8, 'Password must min 8 characters')
      .max(64, 'Password must max 64 characters'),
  }),
  newPasswordRepeat: Yup.string().when(['newPassword', 'oldPassword'], {
    is: (oldPassword, newPassword) => {
      return (oldPassword && oldPassword.length > 0) || (newPassword && newPassword.length > 0);
    },
    then: (schema) => schema
      .required('Old password is required')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  }),
  gender: Yup.string()
    .oneOf(['female', 'male'], 'Gender must be either'),
}, [
  ['oldPassword', 'newPassword'],
  ['oldPassword', 'newPasswordRepeat'],
  ['newPasswordRepeat', 'newPassword'],
])
