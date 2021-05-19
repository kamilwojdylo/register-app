import { useState } from 'react';
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

type FeedbackStatus = 'none' | 'success' | 'error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RegisterForm = ({ usersDb }: { usersDb: any }) => {
  const [feedbackStatus, setFeedbackStatus] = useState<FeedbackStatus>('none');
  const onSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): void | Promise<any> => {
    const { username, password } = values;
    usersDb
      .put({ _id: username, password })
      .then(() => {
        actions.setSubmitting(false);
        actions.resetForm();
        setFeedbackStatus('success');
      })
      .catch((err: Error) => {
        console.error(err);
        setFeedbackStatus('error');
      })
      .finally(() => {
        setTimeout(() => setFeedbackStatus('none'), 5000);
      });
  };

  const onValidate = async (values: FormValues) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errors: any = {};
    const userErrors = await validateUsername(values.username, usersDb);
    const passwordErrors = await validatePassword(values.password);
    const passwordRepeatErrors = await validatePasswordRepeat(
      values.password,
      values.passwordRepeat
    );
    if (userErrors) {
      errors.username = userErrors;
    }
    if (passwordErrors) {
      errors.password = passwordErrors;
    }

    if (passwordRepeatErrors) {
      errors.passwordRepeat = passwordRepeatErrors;
    }

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
                    errors.passwordRepeat &&
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
                  loading={isSubmitting}
                >
                  Register
                </Button>
                <Message
                  id="feedback-msg"
                  positive={feedbackStatus === 'success'}
                  negative={feedbackStatus === 'error'}
                  hidden={feedbackStatus === 'none'}
                  visible={feedbackStatus !== 'none'}
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
