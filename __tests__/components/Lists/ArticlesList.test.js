import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { SWRConfig } from 'swr';
import fetchMock from 'jest-fetch-mock';
import {
  articlesErrorHandler,
  articlesSuccessHandler_2_Articles,
  articlesSuccessHandler_0_Articles,
} from '../../../helpers/tests/api-mocks/handlers';
import { mswServer } from '../../../helpers/tests/api-mocks/msw-server';
import { ArticlesList } from '../../../components/Lists/ArticlesList';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

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
    const headingText = 'Lorem ipsum';
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ArticlesList headingText={headingText} />
      </SWRConfig>
    );
    await waitFor(() => screen.getByTestId('articlesList'));

    expect(screen.getByText(headingText)).toBeInTheDocument();
    expect(screen.getByText(headingText).tagName).toEqual('H1');
  });

  it('render perex', async () => {
    const headingText = 'Lorem  ipsum';
    const perex = 'Lorrem et donor tex';
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ArticlesList perex={perex} headingText={headingText} />
      </SWRConfig>
    );
    await waitFor(() => screen.getByTestId('articlesList'));

    expect(screen.getByText(perex)).toBeInTheDocument();
    expect(screen.getByText(perex).tagName).toEqual('P');
  });

  it('render graphic text', async () => {
    const headingText = 'Lorem  ipsum';
    const graphicText = 'Lorrem graphic donor et';
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ArticlesList
          graphicText={graphicText}
          headingText={headingText}
        />
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
      <SWRConfig
        value={{ provider: () => new Map(), dedupingInterval: 0 }}>
        <ArticlesList />
      </SWRConfig>
    );

    await waitFor(() => screen.getByText(/Failed to load/i));
    expect(screen.getByText(/Failed to load/i)).toBeInTheDocument();
  });

  it('shows max 3 articles', async () => {
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ArticlesList />
      </SWRConfig>
    );

    await waitFor(() => screen.getByTestId('articlesList'));
    expect(screen.getAllByRole('heading', { level: 2 }).length).toEqual(3);
  });

  it('shows only 2 articles where there is not enought articles', async () => {
    mswServer.use(articlesSuccessHandler_2_Articles);
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ArticlesList />
      </SWRConfig>
    );

    await waitFor(() => screen.getByTestId('articlesList'));
    expect(screen.getAllByRole('heading', { level: 2 }).length).toEqual(2);
  });

  it('does not show any articles where there is zero articles', async () => {
    mswServer.use(articlesSuccessHandler_0_Articles);
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ArticlesList />
      </SWRConfig>
    );
    await waitFor(() => screen.getByTestId('articlesList'));
    expect(screen.getByText(/No articles found/i)).toBeInTheDocument();
    expect(screen.getByText(/No articles found/i).tagName).toBe('P');
  });

  it('shows a link to all articles', async () => {
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ArticlesList />
      </SWRConfig>
    );
    await waitFor(() => screen.getByTestId('articlesList'));
    expect(screen.getByText(/Všechny články/i)).toBeInTheDocument();
    expect(screen.getByText(/Všechny články/i).tagName).toBe('A');
    expect(screen.getByText(/Všechny články/i).href).toContain('clanky');
  });
});
