import { render, screen } from '@testing-library/react';
import { NiceTitle } from '../../../components/Text/NiceTitle';

describe('Nice title', () => {
  it('render a component', () => {
    render(<NiceTitle />);
    expect(screen.getByTestId('niceTitle')).toBeInTheDocument();
  });

  it('render heading', () => {
    const headingText = 'Lorem ipsum';
    render(<NiceTitle headingText={headingText} />);
    const headingEl = screen.getByRole('heading', { level: 2 });
    expect(headingEl).toBeInTheDocument();
    expect(headingEl.textContent).toBe(headingText);
  });

  it('render graphic title', () => {
    const graphicTitleText = 'Et donor son';
    render(<NiceTitle graphicText={graphicTitleText} />);
    expect(screen.getByText(graphicTitleText)).toBeInTheDocument();
  });

  it('render perex text', () => {
    const perex = 'Lorem ipsumet donoro so man';
    render(<NiceTitle perex={perex} />);
    const perexEl = screen.getByText(perex);
    expect(perexEl).toBeInTheDocument();
    expect(perexEl.tagName).toEqual('P');
  });
});
