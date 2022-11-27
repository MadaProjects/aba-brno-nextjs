import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { SWRConfig } from 'swr';
import fetchMock from 'jest-fetch-mock';
import { articlesErrorHandler } from '../../handlers';
import { mswServer } from '../../msw-server';
import { ArticlesList } from '../../../components/Lists/ArticlesList';

describe('ArticlesList', () => {
  it('render a component', async () => {
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ArticlesList />
      </SWRConfig>
    );
    await waitFor(() => screen.getByTestId('articlesList'));

    expect(screen.getByTestId('articlesList')).toBeInTheDocument();
  });

  it('render heading', async () => {
    const headingText = 'Lorem  ipsum';
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ArticlesList headingText={headingText} />
      </SWRConfig>
    );
    await waitFor(() => screen.getByTestId('articlesList'));

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 }).textContent).toEqual(
      headingText
    );
  });

  it('render perex', async () => {
    const perex = 'Lorrem et donor tex';
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ArticlesList perex={perex} />
      </SWRConfig>
    );
    await waitFor(() => screen.getByTestId('articlesList'));

    expect(screen.getByText(perex)).toBeInTheDocument();
    expect(screen.getByText(perex).tagName).toEqual('P');
  });

  it('render graphic text', async () => {
    const graphicText = 'Lorrem graphic donor et';
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ArticlesList graphicText={graphicText} />
      </SWRConfig>
    );
    await waitFor(() => screen.getByTestId('articlesList'));

    expect(screen.getByText(graphicText)).toBeInTheDocument();
    expect(screen.getByText(graphicText).tagName).toEqual('SPAN');
  });

  it('render a loading text on loading', () => {
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ArticlesList />
      </SWRConfig>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('render a error text on failed fetch', async () => {
    mswServer.use(articlesErrorHandler);
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ArticlesList />
      </SWRConfig>
    );

    await waitFor(() => screen.getByText('Failed to load'));
    expect(screen.getByText('Failed to load')).toBeInTheDocument();
  });

  it('shows max 3 articles', async () => {
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ArticlesList />
      </SWRConfig>
    );

    await waitFor(() => screen.getByTestId('articlesList'));
    expect(screen.getAllByRole('heading', { level: 3 }).length).toEqual(3);
  });
});
