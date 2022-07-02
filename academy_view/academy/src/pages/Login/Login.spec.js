import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from '.';

describe('Login', () => {
  describe('layout', () => {
    it('has login header', () => {
      const { container } = render(<Login />);
      const header = container.querySelector('h4');
      expect(header).toHaveTextContent('Login');
    });
    it('has username field', () => {
      const { queryByPlaceholderText } = render(<Login />);
      const username = queryByPlaceholderText(
        'Please Enter Your Username'
      );
      expect(username).toBeInTheDocument();
    });

    it('has input for password', () => {
      const { queryByPlaceholderText } = render(<Login />);
      const passwordInput = queryByPlaceholderText(
        'Please Enter your Password'
      );
      expect(passwordInput).toBeInTheDocument();
    });

    it('has password type for password input', () => {
      const { queryByPlaceholderText } = render(<Login />);
      const passwordInput = queryByPlaceholderText(
        'Please Enter your Password'
      );
      expect(passwordInput.type).toBe('password');
    });
  });
  describe('interactions', () => {
    const changeEvent = (content) => {
      return {
        target: {
          value: content,
        },
      };
    };

    let usernameInput, passwordInput, button;
    const setupForSubmit = (props) => {
      const rendered = render(<Login {...props} />);

      const { container, queryByPlaceholderText } = rendered;

      usernameInput = queryByPlaceholderText(
        'Please Enter Your Username'
      );
      fireEvent.change(usernameInput, changeEvent('my-user-name'));
      passwordInput = queryByPlaceholderText(
        'Please Enter your Password'
      );
      fireEvent.change(passwordInput, changeEvent('P4ssword'));
      button = container.querySelector('button');

      return rendered;
    };
    it('displays alert when login fails', async () => {
      const actions = {
        postLogin: jest.fn().mockRejectedValue({
          response: {
            data: {
              message: 'Login failed',
            },
          },
        }),
      };
      const { findByText } = setupForSubmit({ actions });
      fireEvent.click(button);

      const alert = await findByText('Login failed');
      expect(alert).toBeInTheDocument();
    });
  });
});
