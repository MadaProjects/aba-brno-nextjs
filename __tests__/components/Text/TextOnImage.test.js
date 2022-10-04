import { screen, render } from '@testing-library/react';
import { TextOnImage } from '../../../components/Text/TextOnImage';

describe('TextOnImage', () => {
  it('render a component', () => {
    render(<TextOnImage />);
    expect(screen.getByTestId('textOnImage')).toBeInTheDocument();
  });

  it('should have by default h1 heading', () => {
    render(<TextOnImage />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('render h6 heading', () => {
    render(<TextOnImage headingLevel={6} />);
    expect(screen.getByRole('heading', { level: 6 })).toBeInTheDocument();
  });

  it('render heading text', () => {
    const testHeadingContent = 'Lorem ipsum';
    render(
      <TextOnImage headingLevel={3} headingText={testHeadingContent} />
    );
    const headingEl = screen.getByRole('heading', { level: 3 });

    expect(headingEl).toBeInTheDocument();
    expect(headingEl.textContent).toEqual(testHeadingContent);
  });

  it('render diferent heading text', () => {
    const testHeadingContent = 'Test heading';
    render(
      <TextOnImage headingLevel={2} headingText={testHeadingContent} />
    );
    const headingEl = screen.getByRole('heading', { level: 2 });

    expect(headingEl).toBeInTheDocument();
    expect(headingEl.textContent).toEqual(testHeadingContent);
  });

  it('render paragraph', () => {
    const paragraphText = 'Lorem ipsume et donor';
    render(<TextOnImage paragraphText={paragraphText} />);
    const paragraphEl = screen.getByText(paragraphText);

    expect(paragraphEl).toBeInTheDocument();
    expect(paragraphEl.tagName).toEqual('P');
  });

  it('render diferent paragraph', () => {
    const paragraphText = 'Test ipsum donor';
    render(<TextOnImage paragraphText={paragraphText} />);
    const paragraphEl = screen.getByText(paragraphText);

    expect(paragraphEl).toBeInTheDocument();
  });

  it('render image', () => {
    const imgUrl = ' https://test.com/testimageurl.jpg';
    render(<TextOnImage imgUrl={imgUrl} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img').alt).toEqual('');
  });

  it('render perex', () => {
    const perex = 'test subheading';
    render(<TextOnImage perexText={perex} />);
    expect(screen.getByText(perex)).toBeInTheDocument();
  });

  it('render diferent perex', () => {
    const perex = 'perex lorem ipsum';
    render(<TextOnImage perexText={perex} />);
    expect(screen.getByText(perex)).toBeInTheDocument();
  });
});
