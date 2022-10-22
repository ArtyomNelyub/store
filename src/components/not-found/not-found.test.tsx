import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import NotFound from './not-found';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import Layout from '../layout/layout';
import Main from '../main/main';
import { store } from '../../app-store';

test('renders learn react link', async () => {
  render(
    <MemoryRouter initialEntries={['/easlknwi']}>
      <Provider store={store}>
        <Routes>
          <Route path='*' element={<NotFound />}></Route>
          <Route path='/' element={<Layout />}>
            <Route index element={<Main />}></Route>
          </Route>
        </Routes>
      </Provider>
    </MemoryRouter>
  );
  const notFoundElement = screen.getByTestId(/not-found-page/i);
  const linkToMain = screen.getByText(/go main/i);
  expect(notFoundElement).toBeInTheDocument();
  expect(linkToMain).toBeInTheDocument();
  userEvent.click(linkToMain);
  const mainBlock = await screen.findByTestId(/items-block/i);
  expect(mainBlock).toBeInTheDocument();
});
