import { render, screen } from '@testing-library/react';
import { ExpertsList } from '../../../components/Lists/ExpertsList';

describe('ExpertsList', () => {
  it('render a component', () => {
    render(<ExpertsList />);
    expect(screen.getByTestId('expertsList')).toBeInTheDocument();
  });
});
