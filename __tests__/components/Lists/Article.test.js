import { render, screen } from '@testing-library/react';
import { Article } from '../../../components/Lists/Article';

// TODO add tests
describe('Article', () => {
  it.skip('render a component', () => {
    render(<Article />);
    expect(screen.getByTestId('article')).toBeInTheDocument();
  });
});
