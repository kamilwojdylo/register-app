import * as Yup from 'yup';
import { MISSING_DOC } from 'pouchdb-errors';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateUsername = async (username: string, db: any) => {
  try {
    await Yup.string()
      .min(5, 'Username should be at least 5 characters long')
      .matches(
        /^[a-zA-Z0-9]+$/,
        'Only letters and numbers are allowed for username'
      )
      .validate(username);
  } catch (err) {
    return err.message;
  }
  try {
    await db.get(username);
  } catch(err) {
        if (err.name !== MISSING_DOC.name) {
          console.error(err);
        }
        return;
  }
  return `"${username}" user is already registered`;
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

export const validatePasswordRepeat = async (
  password: string,
  passwordRepeat: string
) => {
  if (password !== passwordRepeat) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Promise.resolve('Both passwords should be the same') as Promise<any>;
  }
};
