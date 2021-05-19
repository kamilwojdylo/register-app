import { Formik, FormikHelpers } from 'formik';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';
import {
  validateUsername,
  validatePassword,
  validatePasswordRepeat,
} from '../common/validators';

interface FormValues {
  username: string;
  password: string;
  passwordRepeat: string;
}

const RegisterForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ): void | Promise<any> => {
    console.log(values, actions);
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    });
  };

  const onValidate = async (values: FormValues) => {
    const errors = { username: '', password: '', passwordRepeat: '' };
    errors.username = await validateUsername(values.username);
    errors.password = await validatePassword(values.password);
    errors.passwordRepeat = validatePasswordRepeat(
      values.password,
      values.passwordRepeat
    );

    return errors;
  };

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Register your new account
        </Header>
        <Formik
          initialValues={{ username: '', password: '', passwordRepeat: '' }}
          onSubmit={onSubmit}
          validate={onValidate}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,
            /* and other goodies */
          }) => (
            <Form size="large" onSubmit={handleSubmit}>
              <Segment stacked>
                <Form.Input
                  id="username"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  type="input"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  error={
                    errors.username &&
                    touched.username && {
                      id: 'username-error',
                      content: errors.username,
                      pointing: 'below',
                    }
                  }
                />
                <Form.Input
                  id="password"
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={
                    errors.password &&
                    touched.password && {
                      id: 'password-error',
                      content: errors.password,
                      pointing: 'below',
                    }
                  }
                />

                <Form.Input
                  id="passwordRepeat"
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Repeat password"
                  type="password"
                  name="passwordRepeat"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.passwordRepeat}
                  error={
                    errors.passwordRepeat !== '' &&
                    touched.passwordRepeat && {
                      id: 'passwordRepeat-error',
                      content: errors.passwordRepeat,
                      pointing: 'below',
                    }
                  }
                />
                <Button
                  id="register-btn"
                  color="teal"
                  fluid
                  size="large"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Register
                </Button>
                {values.username}
                <Message
                  id="feedback-msg"
                  success
                  visible={values.username === 'ProperUsername1'}
                  header="Registration Completed"
                  content="Your account has been registered"
                />
              </Segment>
            </Form>
          )}
        </Formik>
      </Grid.Column>
    </Grid>
  );
};

export default RegisterForm;
