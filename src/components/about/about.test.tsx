import { render, screen } from '@testing-library/react';
import About from './about';

test('renders learn react link', () => {
  render(<About />)
  const AboutElement = screen.getByTestId('about-block');
  const AboutElementTitle = screen.getByRole('heading');
  expect(AboutElement).toBeInTheDocument();
  expect(AboutElementTitle).toBeInTheDocument();
});