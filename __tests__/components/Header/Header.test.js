import { screen, render } from '@testing-library/react';
import { Header } from '../../../components/Header/Header';

describe('Header', () => {
  it('render component', () => {
    render(<Header />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
