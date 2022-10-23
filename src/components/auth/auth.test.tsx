import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { defaultItemsState } from '../../app-store/itemsReducer';
import { defaultUserState } from '../../app-store/userReducer';
import Layout from '../layout/layout';
import { renderWithRedux } from '../tests/helpers/renderWithRedux';

describe('Testing auth component', () => {
  test('Render auth component after click "log-in" in layout component', () => {
    render(
      renderWithRedux(
        <MemoryRouter>
          <Layout />
        </MemoryRouter>,
        defaultItemsState,
        defaultUserState
      )
    );
    const loginText = screen.getByTestId('login-text');
    userEvent.click(loginText);
    const loginModal = screen.getByTestId('login-modal');
    const loginError = screen.queryByTestId('login-error');
    expect(loginError).toBeNull();
    expect(loginModal).toBeInTheDocument();
  });

  test('Auth component will unmount after click "cancel" and "cross" in layout component', () => {
    render(
      renderWithRedux(
        <MemoryRouter>
          <Layout />
        </MemoryRouter>,
        defaultItemsState,
        defaultUserState
      )
    );
    const loginText = screen.getByTestId('login-text');
    userEvent.click(loginText);
    const cancelButton = screen.getByTestId('cancel-button');
    userEvent.click(cancelButton);
    const loginModal = screen.queryByTestId('login-modal');
    expect(loginModal).toBeNull();
    userEvent.click(loginText);
    const crossButton = screen.getByTestId('close-cross');
    userEvent.click(crossButton);
    expect(loginModal).toBeNull();
  });

  test('Mount error-field when user incorrect', () => {
    render(
      renderWithRedux(
        <MemoryRouter>
          <Layout />
        </MemoryRouter>,
        defaultItemsState,
        defaultUserState
      )
    );
    const loginText = screen.getByTestId('login-text');
    userEvent.click(loginText);
    const inputLogin = screen.getByTestId('login-input');
    const inputPassword = screen.getByTestId('password-input');
    const logInButton = screen.getByTestId('login-button');

    userEvent.type(inputLogin, 'test');
    userEvent.type(inputPassword, 'test');
    userEvent.click(logInButton);

    const errorField = screen.getByTestId('login-error');
    expect(errorField).toBeInTheDocument();
  });

  test('Unmount auth component after correct', () => {
    render(
      renderWithRedux(
        <MemoryRouter>
          <Layout />
        </MemoryRouter>,
        defaultItemsState,
        defaultUserState
      )
    );
    const loginText = screen.getByTestId('login-text');
    userEvent.click(loginText);
    const inputLogin = screen.getByTestId('login-input');
    const inputPassword = screen.getByTestId('password-input');
    const logInButton = screen.getByTestId('login-button');

    userEvent.type(inputLogin, 'Son');
    userEvent.type(inputPassword, 'qwerty');
    userEvent.click(logInButton);

    const loginModal = screen.queryByTestId('login-modal');
    expect(loginModal).toBeNull();
  });
});
