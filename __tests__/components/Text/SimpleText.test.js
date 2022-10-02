import { render, screen } from '@testing-library/react';
import { SimpleText } from '../../../components/Text/SimpleText';

describe('SimpleText', () => {
  it('render componenet', () => {
    render(<SimpleText />);
    expect(screen.getByTestId('simpleText')).toBeInTheDocument();
  });

  it('should have by default h1 heading', () => {
    render(<SimpleText />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('render h6 heading', () => {
    render(<SimpleText headingLevel={6} />);
    expect(screen.getByRole('heading', { level: 6 })).toBeInTheDocument();
  });

  it('render heading text', () => {
    const testHeadingContent = 'Lorem ipsum';
    render(
      <SimpleText headingLevel={3} headingText={testHeadingContent} />
    );
    const headingEl = screen.getByRole('heading', { level: 3 });

    expect(headingEl).toBeInTheDocument();
    expect(headingEl.textContent).toEqual(testHeadingContent);
  });

  it('render diferent heading text', () => {
    const testHeadingContent = 'Test heading';
    render(
      <SimpleText headingLevel={2} headingText={testHeadingContent} />
    );
    const headingEl = screen.getByRole('heading', { level: 2 });

    expect(headingEl).toBeInTheDocument();
    expect(headingEl.textContent).toEqual(testHeadingContent);
  });

  it('render paragraph', () => {
    const paragraphText = 'Lorem ipsume et donor';
    render(<SimpleText paragraphText={paragraphText} />);
    const paragraphEl = screen.getByText(paragraphText);

    expect(paragraphEl).toBeInTheDocument();
    expect(paragraphEl.tagName).toEqual('P');
  });

  it('render diferent paragraph', () => {
    const paragraphText = 'Test ipsum donor';
    render(<SimpleText paragraphText={paragraphText} />);
    const paragraphEl = screen.getByText(paragraphText);

    expect(paragraphEl).toBeInTheDocument();
  });
});
