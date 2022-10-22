import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './app';

describe('Test app', () => {
  describe('Test routing', () => {
    test('about link', async () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
      const aboutLink = await screen.findByTestId(/about-link/i);
      userEvent.click(aboutLink);
      const aboutBlock = await screen.findByTestId(/about-block/i);
      expect(aboutBlock).toBeInTheDocument();
    });

    test('main link', async () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
      const mainLink = await screen.findByTestId(/items-block/i);
      userEvent.click(mainLink);
      const mainBlock = await screen.findByTestId(/items-block/i);
      expect(mainBlock).toBeInTheDocument();
    });

    test('cart-link', async () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
      const cartLink = await screen.findByTestId(/cart-link/i);
      userEvent.click(cartLink);
      const cartBlock = await screen.findByTestId(/cart-block/i);
      expect(cartBlock).toBeInTheDocument();
    });

    test('not-found', () => {
      render(
        <MemoryRouter initialEntries={['/easlknwi']}>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByTestId(/not-found-page/i)).toBeInTheDocument();
    });

    test('item-page', async () => {
      render(
        <MemoryRouter  initialEntries={['/item/1']}>
          <App />
        </MemoryRouter>
      );
      const itemBlock = await screen.findByTestId(/item-block/i);
      expect(itemBlock).toBeInTheDocument();
    });
  });
});
