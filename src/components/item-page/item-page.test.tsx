import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { defaultItemsState } from '../../app-store/itemsReducer';
import { defaultUserState } from '../../app-store/userReducer';
import { renderWithRedux } from '../tests/helpers/renderWithRedux';
import {items as mockItems} from '../../mocks/items';
import {users as mockUsers} from '../../mocks/users';
import ItemPage from './item-page';
import NotFound from '../not-found/not-found';
import userEvent from '@testing-library/user-event';

describe('Testing item page component', () => {
  test('Rendering preloader without item', () => {
    render(
      renderWithRedux(
        <MemoryRouter>
          <ItemPage />
        </MemoryRouter>,
        defaultItemsState,
        defaultUserState
      )
    );

    const preLoader = screen.getByText(/loading/i);
    expect(preLoader).toBeInTheDocument();
  });

  test('Redirect to not-found if currentItem === null', () => {
    render(
      renderWithRedux(
        <MemoryRouter>
           <Routes>
            <Route path='/' element={<ItemPage />}></Route>
            <Route path='/not-found' element={<NotFound />}></Route>
          </Routes>
        </MemoryRouter>,
        {...defaultItemsState, currentItem: null, isItemLoaded: true},
        defaultUserState
      )
    );

    expect(screen.getByTestId(/not-found-page/i)).toBeInTheDocument();
  });

  test('Rendering item', () => {
    render(
      renderWithRedux(
        <MemoryRouter>
          <ItemPage />
        </MemoryRouter>,
        {...defaultItemsState, currentItem: mockItems[9], isItemLoaded: true},
        defaultUserState
      )
    );

    
    const itemBlock = screen.getByTestId(/item-block/i);

    expect(itemBlock).toBeInTheDocument();
  });

  test('Render user-mode if user is not admin', () => {
    render(
      renderWithRedux(
        <MemoryRouter>
           <Routes>
            <Route path='/' element={<ItemPage />}></Route>
            <Route path='/not-found' element={<NotFound />}></Route>
          </Routes>
        </MemoryRouter>,
        {...defaultItemsState, currentItem: mockItems[9], isItemLoaded: true},
        {user: mockUsers[0], isAuth: true}
      )
    );

    expect(screen.getByTestId(/user-mode/i)).toBeInTheDocument();
  });

  test('Render admin-mode after click correct-button if user is admin', () => {
    render(
      renderWithRedux(
        <MemoryRouter>
           <Routes>
            <Route path='/' element={<ItemPage />}></Route>
            <Route path='/not-found' element={<NotFound />}></Route>
          </Routes>
        </MemoryRouter>,
        {...defaultItemsState, currentItem: mockItems[9], isItemLoaded: true},
        {user: mockUsers[1], isAuth: true}
      )
    );

    const correctButton = screen.getByTestId(/correct-button/i);
    expect(correctButton).toBeInTheDocument();
    userEvent.click(correctButton);
    expect(screen.getByTestId(/admin-mode/i)).toBeInTheDocument();
  });
});
