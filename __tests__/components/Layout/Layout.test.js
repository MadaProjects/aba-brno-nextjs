import { screen, render } from '@testing-library/react';
import { Layout } from '../../../components/Layout/Layout';

describe('Layout', () => {
  it('render component', () => {
    render(<Layout />);
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });
});
