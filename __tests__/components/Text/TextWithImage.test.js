import { screen, render } from '@testing-library/react';
import { TextWithImage } from '../../../components/Text/TextWithImage';

describe('TextWithImage', () => {
  it('render a component', () => {
    render(<TextWithImage />);
    expect(screen.getByTestId('textWithImage')).toBeInTheDocument();
  });

  it('should have by default h1 heading', () => {
    render(<TextWithImage />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('render h6 heading', () => {
    render(<TextWithImage headingLevel={6} />);
    expect(screen.getByRole('heading', { level: 6 })).toBeInTheDocument();
  });

  it('render heading text', () => {
    const testHeadingContent = 'Lorem ipsum';
    render(
      <TextWithImage headingLevel={3} headingText={testHeadingContent} />
    );
    const headingEl = screen.getByRole('heading', { level: 3 });

    expect(headingEl).toBeInTheDocument();
    expect(headingEl.textContent).toEqual(testHeadingContent);
  });

  it('render diferent heading text', () => {
    const testHeadingContent = 'Test heading';
    render(
      <TextWithImage headingLevel={2} headingText={testHeadingContent} />
    );
    const headingEl = screen.getByRole('heading', { level: 2 });

    expect(headingEl).toBeInTheDocument();
    expect(headingEl.textContent).toEqual(testHeadingContent);
  });

  it('render paragraph', () => {
    const paragraphText = 'Lorem ipsume et donor';
    render(<TextWithImage paragraphText={paragraphText} />);
    const paragraphEl = screen.getByText(paragraphText);

    expect(paragraphEl).toBeInTheDocument();
    expect(paragraphEl.tagName).toEqual('P');
  });

  it('render diferent paragraph', () => {
    const paragraphText = 'Test ipsum donor';
    render(<TextWithImage paragraphText={paragraphText} />);
    const paragraphEl = screen.getByText(paragraphText);

    expect(paragraphEl).toBeInTheDocument();
  });

  it('render image', () => {
    const imgUrl = ' https://test.com/testimageurl.jpg';
    render(<TextWithImage imgUrl={imgUrl} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    // expect(screen.getByRole('img').src).toEqual(imgUrl);
    expect(screen.getByRole('img').alt).toEqual('');
  });

  it('render perex', () => {
    const perex = 'test subheading';
    render(<TextWithImage perexText={perex} />);
    expect(screen.getByText(perex)).toBeInTheDocument();
  });

  it('render diferent perex', () => {
    const perex = 'perex lorem ipsum';
    render(<TextWithImage perexText={perex} />);
    expect(screen.getByText(perex)).toBeInTheDocument();
  });
});
