import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { defaultItemsState } from '../../app-store/itemsReducer';
import { renderWithRedux } from '../tests/helpers/renderWithRedux';
import { items as mockItems } from '../../mocks/items';
import { users as mockUsers } from '../../mocks/users';
import ItemPage from './item-page';
import userEvent from '@testing-library/user-event';

describe('Testing user mode', () => {
  test('Render user-mode if user is not admin', () => {
    render(
      renderWithRedux(
        <MemoryRouter>
          <ItemPage />
        </MemoryRouter>,
        { ...defaultItemsState, currentItem: mockItems[9], isItemLoaded: true },
        { user: mockUsers[0], isAuth: true }
      )
    );

    expect(screen.getByTestId('user-mode')).toBeInTheDocument();
    const addButton = screen.getByTestId('add-button');
    const deleteButton = screen.getByTestId('delete-button');
    const countField = screen.getByTestId('item-count-in-store');
    const countInputField = screen.getByTestId('input-count-item');
    expect(addButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(countField).toBeInTheDocument();
    expect(countInputField).toBeInTheDocument();
  });

  test('If item was bought and count === 0', () => {
    render(
      renderWithRedux(
        <MemoryRouter>
          <ItemPage />
        </MemoryRouter>,
        { ...defaultItemsState, currentItem: mockItems[9], isItemLoaded: true },
        { user: mockUsers[0], isAuth: true }
      )
    );

    expect(screen.getByTestId('user-mode')).toBeInTheDocument();
    const addButton = screen.getByTestId('add-button');
    const deleteButton = screen.getByTestId('delete-button');
    const countField = screen.getByTestId('item-count-in-store');
    const countInputField = screen.getByTestId('input-count-item');
    userEvent.type(countInputField, '10');
    userEvent.click(addButton);

    expect(countField.innerHTML).toBe('В наличии: 0 шт.');
    expect(addButton).toHaveAttribute('disabled');
    expect(addButton.innerHTML).toBe('none');
    expect(deleteButton).not.toHaveAttribute('disabled');
  });

  test('If item was bought and 0 < count < maxCount', () => {
    render(
      renderWithRedux(
        <MemoryRouter>
          <ItemPage />
        </MemoryRouter>,
        {
          ...defaultItemsState,
          currentItem: { ...mockItems[9], count: 5 },
          isItemLoaded: true,
        },
        { user: mockUsers[0], isAuth: true }
      )
    );

    expect(screen.getByTestId('user-mode')).toBeInTheDocument();
    const addButton = screen.getByTestId('add-button');
    const deleteButton = screen.getByTestId('delete-button');
    const countField = screen.getByTestId('item-count-in-store');

    userEvent.click(addButton);

    expect(countField.innerHTML).toBe('В наличии: 4 шт.');
    expect(addButton).not.toHaveAttribute('disabled');
    expect(addButton.innerHTML).toBe('add');
    expect(deleteButton).not.toHaveAttribute('disabled');
  });

  test('If item was returned and 0 < count < maxCount', () => {
    render(
      renderWithRedux(
        <MemoryRouter>
          <ItemPage />
        </MemoryRouter>,
        {
          ...defaultItemsState,
          currentItem: { ...mockItems[9], count: 5 },
          isItemLoaded: true,
        },
        { user: mockUsers[0], isAuth: true }
      )
    );

    expect(screen.getByTestId('user-mode')).toBeInTheDocument();
    const addButton = screen.getByTestId('add-button');
    const deleteButton = screen.getByTestId('delete-button');
    const countField = screen.getByTestId('item-count-in-store');

    userEvent.click(deleteButton);

    expect(countField.innerHTML).toBe('В наличии: 6 шт.');
    expect(addButton).not.toHaveAttribute('disabled');
    expect(addButton.innerHTML).toBe('add');
    expect(deleteButton).not.toHaveAttribute('disabled');
  });

  test('If item was returned and count === maxCount', () => {
    render(
      renderWithRedux(
        <MemoryRouter>
          <ItemPage />
        </MemoryRouter>,
        {
          ...defaultItemsState,
          currentItem: { ...mockItems[9], count: 5 },
          isItemLoaded: true,
        },
        { user: mockUsers[0], isAuth: true }
      )
    );

    expect(screen.getByTestId('user-mode')).toBeInTheDocument();
    const addButton = screen.getByTestId('add-button');
    const deleteButton = screen.getByTestId('delete-button');
    const countField = screen.getByTestId('item-count-in-store');
    const countInputField = screen.getByTestId('input-count-item');
    userEvent.type(countInputField, '5');
    userEvent.click(deleteButton);

    expect(countField.innerHTML).toBe('В наличии: 10 шт.');
    expect(addButton).not.toHaveAttribute('disabled');
    expect(addButton.innerHTML).toBe('add');
    expect(deleteButton).toHaveAttribute('disabled');
  });
});
