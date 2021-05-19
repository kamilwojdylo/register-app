import * as Yup from 'yup';
export const validateUsername = async (username: string) => {
  try {
    await Yup.string()
      .min(5, 'Username should be at least 5 characters long')
      .matches(
        /^[a-zA-Z0-9]+$/,
        'Only letters and numbers are allowed for username'
      )
      .test(
          'is-unique-username',
        '"${value}" user is already registered',
          async (value, context) => {
              return false;
          }
      )
      .validate(username);
  } catch (err) {
    return err.message;
  }
};

export const validatePassword = async (password: string) => {
  try {
    await Yup.string()
      .min(8, 'Password should be at least 8 characters long')
      .matches(/[0-9]+/, 'Password should contain at least one number')
      .matches(
        /[A-Z]+/,
        'Password should contain at least one uppercase character'
      )
      .matches(
        /[a-z]+/,
        'Password should contain at least one lowercase character'
      )
      .validate(password);
  } catch (err) {
    return err.message;
  }
};

export const validatePasswordRepeat = (
  password: string,
  passwordRepeat: string
) => {
  if (password !== passwordRepeat) {
    return 'Both passwords should be the same';
  }
  return '';
};
