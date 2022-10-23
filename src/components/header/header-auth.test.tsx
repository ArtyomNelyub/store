import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { defaultItemsState } from '../../app-store/itemsReducer';
import { defaultUserState } from '../../app-store/userReducer';
import { renderWithRedux } from '../tests/helpers/renderWithRedux';
import {users as mockUsers} from '../../mocks/users';
import Header from './header';

describe('Testing header-auth component', ()=>{
  test('header-auth component when user is null', () => {
    render(
      renderWithRedux(
        <MemoryRouter>
          <Header setIsModal={(a: boolean): void => {}} />
        </MemoryRouter>,
        defaultItemsState,
        defaultUserState
      )
    );
    const loginText = screen.getByTestId('login-text');
    const userName = screen.queryByTestId('user-name-in-header');
    expect(loginText).toBeInTheDocument();
    expect(userName).toBeNull();
  });

  test('header-auth component when user is Son', () => {
    render(
      renderWithRedux(
        <MemoryRouter>
          <Header setIsModal={(a: boolean): void => {}} />
        </MemoryRouter>,
        defaultItemsState,
        {user: mockUsers[0], isAuth: true}
      )
    );
    const loginText = screen.queryByTestId('login-text');
    const userName = screen.getByTestId('user-name-in-header');
    expect(loginText).toBeNull();
    expect(userName.innerHTML).toBe('Son');
  });
})
