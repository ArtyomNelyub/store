import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { defaultItemsState } from '../../app-store/itemsReducer';
import { defaultUserState } from '../../app-store/userReducer';
import Layout from '../layout/layout';
import { renderWithRedux } from '../tests/helpers/renderWithRedux';

describe('Testing layout component', () => {
  test('rendering header and main-container', () => {
    render(
      renderWithRedux(
        <MemoryRouter>
          <Layout />
        </MemoryRouter>,
        defaultItemsState,
        defaultUserState
      )
    );

    const headerBlock = screen.getByTestId('header');
    const mainBlock = screen.getByTestId('main-container');
    expect(headerBlock).toBeInTheDocument();
    expect(mainBlock).toBeInTheDocument();

  });
});
