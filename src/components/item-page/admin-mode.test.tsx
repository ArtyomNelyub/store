import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { defaultItemsState } from '../../app-store/itemsReducer';
import { renderWithRedux } from '../tests/helpers/renderWithRedux';
import { items as mockItems } from '../../mocks/items';
import { users as mockUsers } from '../../mocks/users';
import ItemPage from './item-page';
import userEvent from '@testing-library/user-event';

describe('Testing admin mode', () => {
  test('Render admin-mode with inputs', () => {
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
        { user: mockUsers[1], isAuth: true }
      )
    );

    const correctButton = screen.getByTestId(/correct-button/i);
    expect(correctButton).toBeInTheDocument();
    userEvent.click(correctButton);
    const inputCorrectName = screen.getByTestId(/input-correct-name/i);
    const inputCorrectPrice = screen.getByTestId(/input-correct-price/i);
    const inputCorrectCount = screen.getByTestId(/input-correct-count/i);
    const textareaCorrectDescription = screen.getByTestId(
      /textarea-correct-description/i
    );
    const saveButton = screen.getByTestId(/save-button/i);
    const cancelButton = screen.getByTestId(/cancel-button/i);
    expect(inputCorrectName).toBeInTheDocument();
    expect(inputCorrectPrice).toBeInTheDocument();
    expect(inputCorrectCount).toBeInTheDocument();
    expect(textareaCorrectDescription).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  test('testing correct item', () => {
    render(
      renderWithRedux(
        <MemoryRouter>
          <ItemPage />
        </MemoryRouter>,
        {
          ...defaultItemsState,
          currentItem: { ...mockItems[9] },
          isItemLoaded: true,
        },
        { user: mockUsers[1], isAuth: true }
      )
    );

    const correctButton = screen.getByTestId(/correct-button/i);
    expect(correctButton).toBeInTheDocument();
    userEvent.click(correctButton);
    const inputCorrectName = screen.getByTestId(/input-correct-name/i);
    const inputCorrectPrice = screen.getByTestId(/input-correct-price/i);
    const inputCorrectCount = screen.getByTestId(/input-correct-count/i);
    const textareaCorrectDescription = screen.getByTestId(
      /textarea-correct-description/i
    );
    const saveButton = screen.getByTestId(/save-button/i);

    userEvent.clear(inputCorrectName);
    userEvent.clear(inputCorrectPrice);
    userEvent.clear(inputCorrectCount);
    userEvent.clear(textareaCorrectDescription);
    userEvent.type(inputCorrectName, 'testName');
    userEvent.type(inputCorrectPrice, '987');
    userEvent.type(inputCorrectCount, '50');
    userEvent.type(textareaCorrectDescription, 'testDescription');
    userEvent.click(saveButton);

    const fieldName = screen.getByTestId(/name-field-user-mode/i);
    const fieldPrice = screen.getByTestId(/price-field-user-mode/i);
    const fieldCount = screen.getByTestId(/item-count-in-store/i);
    const fieldDescription = screen.getByTestId(/description-field-user-mode/i);

    expect(fieldName.innerHTML).toBe('testName');
    expect(fieldPrice.innerHTML).toBe('987 р.');
    expect(fieldCount.innerHTML).toBe('В наличии: 50 шт.');
    expect(fieldDescription.innerHTML).toBe('testDescription');
  });

  test('testing when admin changed inputs and clicked cancel', () => {
    render(
      renderWithRedux(
        <MemoryRouter>
          <ItemPage />
        </MemoryRouter>,
        {
          ...defaultItemsState,
          currentItem: { ...mockItems[9] },
          isItemLoaded: true,
        },
        { user: mockUsers[1], isAuth: true }
      )
    );

    const correctButton = screen.getByTestId(/correct-button/i);
    expect(correctButton).toBeInTheDocument();
    userEvent.click(correctButton);
    const inputCorrectName = screen.getByTestId(/input-correct-name/i);
    const inputCorrectPrice = screen.getByTestId(/input-correct-price/i);
    const inputCorrectCount = screen.getByTestId(/input-correct-count/i);
    const textareaCorrectDescription = screen.getByTestId(
      /textarea-correct-description/i
    );
    const cancelButton = screen.getByTestId(/cancel-button/i);

    userEvent.clear(inputCorrectName);
    userEvent.clear(inputCorrectPrice);
    userEvent.clear(inputCorrectCount);
    userEvent.clear(textareaCorrectDescription);
    userEvent.type(inputCorrectName, 'testName');
    userEvent.type(inputCorrectPrice, '987');
    userEvent.type(inputCorrectCount, '50');
    userEvent.type(textareaCorrectDescription, 'testDescription');
    userEvent.click(cancelButton);

    const fieldName = screen.getByTestId(/name-field-user-mode/i);
    const fieldPrice = screen.getByTestId(/price-field-user-mode/i);
    const fieldCount = screen.getByTestId(/item-count-in-store/i);
    const fieldDescription = screen.getByTestId(/description-field-user-mode/i);

    expect(fieldName.innerHTML).toBe('Sword10');
    expect(fieldPrice.innerHTML).toBe('1000 р.');
    expect(fieldCount.innerHTML).toBe('В наличии: 10 шт.');
    expect(fieldDescription.innerHTML).toBe('Lorem ipsum dolor sit.');
  });

  test('testing when admin enters fraction into count-input', () => {
    render(
      renderWithRedux(
        <MemoryRouter>
          <ItemPage />
        </MemoryRouter>,
        {
          ...defaultItemsState,
          currentItem: { ...mockItems[9] },
          isItemLoaded: true,
        },
        { user: mockUsers[1], isAuth: true }
      )
    );

    const correctButton = screen.getByTestId(/correct-button/i);
    expect(correctButton).toBeInTheDocument();
    userEvent.click(correctButton);
    const inputCorrectCount = screen.getByTestId(/input-correct-count/i);
    const saveButton = screen.getByTestId(/save-button/i);
    userEvent.clear(inputCorrectCount);
    userEvent.type(inputCorrectCount, '50.8');
    userEvent.click(saveButton);
    const fieldCount = screen.getByTestId(/item-count-in-store/i);
    expect(fieldCount.innerHTML).toBe('В наличии: 51 шт.');
  });
});
