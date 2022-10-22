import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { defaultItemsState } from '../../app-store/itemsReducer';
import { defaultUserState } from '../../app-store/userReducer';
import { renderWithRedux } from '../tests/helpers/renderWithRedux';
import Header from './header';

test('render header component', () => {
  render(
    renderWithRedux(
      <MemoryRouter>
        <Header setIsModal={(a: boolean): void => {}} />
      </MemoryRouter>,
      defaultItemsState,
      defaultUserState
    )
  );
  const header = screen.getByTestId('header');
  expect(header).toBeInTheDocument();
});
