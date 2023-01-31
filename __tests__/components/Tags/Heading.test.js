import { render, screen } from '@testing-library/react';
import { Heading } from '../../../components/Tags/Heading';

describe('Heading', () => {
  it('render a component', () => {
    render(<Heading />);
    expect(screen.getByTestId('heading')).toBeInTheDocument();
  });

  it('should render h1 by default', () => {
    render(<Heading />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('render correct heading level', () => {
    render(<Heading level={2} />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('render correct heading level', () => {
    render(<Heading level={6} />);
    expect(screen.getByRole('heading', { level: 6 })).toBeInTheDocument();
  });

  it('does not allow heading level to be bigger than 6', () => {
    render(<Heading level={100} />);
    expect(screen.getByRole('heading', { level: 6 })).toBeInTheDocument();
  });

  it('does not allow heading level to be lower than 1', () => {
    render(<Heading level={-100} />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('render h1 when there is string in level', () => {
    render(<Heading level={`test string `} />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('render h1 on float level prop', () => {
    render(<Heading level={4.565} />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders children', () => {
    const headingContent = 'Lorem ipsum et';
    render(<Heading>{headingContent}</Heading>);
    const headingEl = screen.getByRole('heading', { level: 1 });

    expect(headingEl).toBeInTheDocument();
    expect(headingEl.textContent).toEqual(headingContent);
  });

  it('renders diferent children', () => {
    const headingContent = 'Test heading';
    render(<Heading level={3}>{headingContent}</Heading>);
    const headingEl = screen.getByRole('heading', { level: 3 });

    expect(headingEl).toBeInTheDocument();
    expect(headingEl.textContent).toEqual(headingContent);
  });
});
