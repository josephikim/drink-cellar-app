import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { login } from '../../store/authSlice';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useInput } from '../../hooks/useInput';
import { validateFields } from '../../validation';

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const userStatus = useAppSelector((state) => state.auth.status);

  const { value: username, bind: bindUsername, reset: resetUsername } = useInput('');
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput('');

  const handleSubmit = (evt): void => {
    evt.preventDefault();
    const usernameError = validateFields.validateUsername(username);
    const passwordError = validateFields.validatePassword(password);
    const validationErrors: { type: string; msg: string }[] = [];

    if (usernameError) validationErrors.push({ type: 'username error', msg: usernameError });
    if (passwordError) validationErrors.push({ type: 'password error', msg: passwordError });

    if (validationErrors.length === 0) {
      // no input errors, submit the form
      if (userStatus === 'idle') {
        alert(`Loggin in with username, password, pwconfirm: ${username} ${password}`);
        dispatch(login({ username, password }));
      }

      // reset fields
      resetUsername();
      resetPassword();
    } else {
      // alert user of input errors
      let errorMsg = '';

      for (const validationError of validationErrors) {
        errorMsg += `${validationError.type}: ${validationError.msg}\n`;
      }

      alert(errorMsg);
    }
  };

  return (
    <div className="login-form">
      <Form>
        <div className="text-primary">
          <h4>Returning User Login</h4>
        </div>

        <Form.Group controlId="username">
          <Form.Label className="text-primary">Username</Form.Label>
          <Form.Control name="username" placeholder="Enter username" {...bindUsername} />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label className="text-primary">Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Enter password" {...bindPassword} />
        </Form.Group>

        <Button type="submit" name="login-form-btn" variant="primary" onClick={handleSubmit}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;