import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { defaultItemsState } from '../../app-store/itemsReducer';
import { defaultUserState } from '../../app-store/userReducer';
import { renderWithRedux } from '../tests/helpers/renderWithRedux';
import { items as mockItems } from '../../mocks/items';
import ItemCards from './item-cards';
import { AppRoute } from '../../const/app-route';
import ItemPage from '../item-page/item-page';
import userEvent from '@testing-library/user-event';

describe('Testing item cards component', () => {
  test('Rendering item cards', () => {
    render(
      renderWithRedux(
        <MemoryRouter>
          <ItemCards />
        </MemoryRouter>,
        {
          ...defaultItemsState,
          items: [{ ...mockItems[9] }],
          isItemsLoaded: true,
        },
        defaultUserState
      )
    );

    const itemCard = screen.getByTestId('item-10');
    expect(itemCard).toBeInTheDocument();
  });

  test('Redirect to item page after click on image', () => {
    render(
      renderWithRedux(
        <MemoryRouter>
          <Routes>
            <Route index element={<ItemCards />}></Route>
            <Route path={`${AppRoute.ITEM}/:id`} element={<ItemPage />}></Route>
          </Routes>
        </MemoryRouter>,
        {
          ...defaultItemsState,
          items: [{ ...mockItems[9] }],
          isItemsLoaded: true,
        },
        defaultUserState
      )
    );

    const itemImage = screen.getByTestId('item-image');
    userEvent.click(itemImage);
    const itemBlock =screen.getByTestId('item-block')
    expect(itemBlock).toBeInTheDocument();
  });

  test('Redirect to item page after click on item-name', () => {
    render(
      renderWithRedux(
        <MemoryRouter>
          <Routes>
            <Route index element={<ItemCards />}></Route>
            <Route path={`${AppRoute.ITEM}/:id`} element={<ItemPage />}></Route>
          </Routes>
        </MemoryRouter>,
        {
          ...defaultItemsState,
          items: [{ ...mockItems[9] }],
          isItemsLoaded: true,
        },
        defaultUserState
      )
    );

    const itemName = screen.getByTestId('item-name');
    userEvent.click(itemName);
    const itemBlock =screen.getByTestId('item-block')
    expect(itemBlock).toBeInTheDocument();
  });
});
