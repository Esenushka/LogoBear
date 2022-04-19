import { render, screen } from '@testing-library/react';
import LetMeIn from './pages/LetMeIn';

test('renders learn react link', () => {
  render(<LetMeIn />);
  const linkElement = screen.getByText(/Let me in/i);
  expect(linkElement).toBeInTheDocument();
});
