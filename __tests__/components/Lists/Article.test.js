import { render, screen } from '@testing-library/react';
import { articlesMocks } from '../../../__mocks__/articlesMocks';
import { Article } from '../../../components/Lists/Article';

describe('Article', () => {
  it('render a component', () => {
    render(<Article data={articlesMocks.data[0].attributes} />);
    expect(screen.getByTestId('article')).toBeInTheDocument();
  });

  it('render heading', () => {
    const headingText = articlesMocks.data[0].attributes.Title;
    render(<Article data={articlesMocks.data[0].attributes} />);
    expect(screen.getByText(headingText)).toBeInTheDocument();
    expect(screen.getByText(headingText).tagName).toEqual('H2');
  });

  it('render perex', () => {
    const perex = articlesMocks.data[0].attributes.Perex;
    render(<Article data={articlesMocks.data[0].attributes} />);
    expect(screen.getByText(perex)).toBeInTheDocument();
    expect(screen.getByText(perex).tagName).toEqual('P');
  });

  it('has link to article on article title', () => {
    const articleTitle = articlesMocks.data[0].attributes.Title;
    const articleSlug = articlesMocks.data[0].attributes.Url;
    render(<Article data={articlesMocks.data[0].attributes} />);
    expect(screen.getByText(articleTitle)).toBeInTheDocument();
    expect(screen.getByText(articleTitle).parentElement.tagName).toEqual(
      'A'
    );
    expect(screen.getByText(articleTitle).parentElement.href).toContain(
      articleSlug
    );
  });

  it('has image with alt from caption', () => {
    const imageAlt =
      articlesMocks.data[0].attributes.Image.data.attributes.caption;
    const articleUrl = articlesMocks.data[0].attributes.Url;
    render(<Article data={articlesMocks.data[0].attributes} />);
    expect(screen.getByAltText(imageAlt)).toBeInTheDocument();
    expect(screen.getByAltText(imageAlt).tagName).toEqual('IMG');
  });

  it('has right alt for image when caption is empty', () => {
    const imageAlt = articlesMocks.data[1].attributes.Title;
    render(<Article data={articlesMocks.data[1].attributes} />);
    expect(screen.getByAltText(imageAlt)).toBeInTheDocument();
    expect(screen.getByAltText(imageAlt).tagName).toEqual('IMG');
  });

  it('has link to article on image', () => {
    const imageAlt =
      articlesMocks.data[0].attributes.Image.data.attributes.caption;
    const articleUrl = articlesMocks.data[0].attributes.Url;

    render(<Article data={articlesMocks.data[0].attributes} />);
    expect(
      screen.getByAltText(imageAlt).parentElement.parentElement.href
    ).toContain(articleUrl);
  });

  it('render published date', () => {
    const publishedDate = new Date(
      articlesMocks.data[0].attributes.publishedAt
    );
    const publishedDateFormatted = `${publishedDate.getDate()}. ${
      publishedDate.getMonth() + 1
    }. ${publishedDate.getFullYear()}`;
    render(<Article data={articlesMocks.data[0].attributes} />);
    expect(screen.getByText(publishedDateFormatted)).toBeInTheDocument();
    expect(screen.getByText(publishedDateFormatted).tagName).toEqual(
      'TIME'
    );
    expect(screen.getByText(publishedDateFormatted).dateTime).toEqual(
      articlesMocks.data[0].attributes.publishedAt
    );
  });

  it('has author', () => {
    const authorName =
      articlesMocks.data[0].attributes.Author.data.attributes.Name;
    const authorSlug =
      articlesMocks.data[0].attributes.Author.data.attributes.Url;
    render(<Article data={articlesMocks.data[0].attributes} />);
    expect(screen.getByText(authorName)).toBeInTheDocument();
    expect(screen.getByText(authorName).tagName).toBe('A');
    expect(screen.getByText(authorName).href).toContain(authorSlug);
  });

  // TODO: fix this test - it fails because of the next/image component
  /*
  it.skip('has image with right src', () => {
    expect(screen.getByAltText(imageAlt).parentElement).toContain(
      articlesMocks.data[0].attributes.Image.data.attributes.url
    );
  });
  */
});
