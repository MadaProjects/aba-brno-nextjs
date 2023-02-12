import { render, screen, waitFor } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { mswServer } from '../../../helpers/tests/api-mocks/msw-server';
import {
  expertsSuccessHandler_1_Experts,
  expertsSuccessHandler_3_Experts,
  expertsSuccessHandler_4_Experts,
  expertsErrorHandler,
} from '../../../helpers/tests/api-mocks/handlers';
import fetchMock from 'jest-fetch-mock';
import { ExpertsList } from '../../../components/Lists/ExpertsList';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ExpertsList', () => {
  it('render a component', async () => {
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ExpertsList />
      </SWRConfig>
    );

    await waitFor(() => screen.getByTestId('expertsList'));

    expect(screen.getByTestId('expertsList')).toBeInTheDocument();
  });

  it('render heading', async () => {
    const headingText = 'Lorem ipsum';
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ExpertsList headingText={headingText} />
      </SWRConfig>
    );

    await waitFor(() => screen.getByTestId('expertsList'));
    expect(screen.getByText(headingText)).toBeInTheDocument();
    expect(screen.getByText(headingText).tagName).toEqual('H1');
  });

  it('render perex', async () => {
    const headingText = 'Lorem  ipsum';
    const perex = 'Lorrem et donor tex';
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ExpertsList perex={perex} headingText={headingText} />
      </SWRConfig>
    );

    await waitFor(() => screen.getByTestId('expertsList'));
    expect(screen.getByText(perex)).toBeInTheDocument();
    expect(screen.getByText(perex).tagName).toEqual('P');
  });

  it('render graphic text', async () => {
    const headingText = 'Lorem  ipsum';
    const graphicText = 'Lorrem graphic donor et';
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ExpertsList graphicText={graphicText} headingText={headingText} />
      </SWRConfig>
    );

    await waitFor(() => screen.getByTestId('expertsList'));
    expect(screen.getByText(graphicText)).toBeInTheDocument();
    expect(screen.getByText(graphicText).tagName).toEqual('SPAN');
  });

  it('render one expert in list', async () => {
    mswServer.use(expertsSuccessHandler_1_Experts);
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ExpertsList />
      </SWRConfig>
    );

    await waitFor(() => screen.getByTestId('expertsList'));

    expect(screen.getAllByTestId('expert').length).toEqual(1);
  });

  it('render 3 experts in list', async () => {
    mswServer.use(expertsSuccessHandler_3_Experts);
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ExpertsList />
      </SWRConfig>
    );

    await waitFor(() => screen.getByTestId('expertsList'));

    expect(screen.getAllByTestId('expert').length).toEqual(3);
  });

  it('render max 4 experts even when there is more experts from api', async () => {
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ExpertsList />
      </SWRConfig>
    );

    await waitFor(() => screen.getByTestId('expertsList'));

    expect(screen.getAllByTestId('expert').length).toEqual(4);
  });

  it('render a error text on failed fetch', async () => {
    mswServer.use(expertsErrorHandler);
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ExpertsList />
      </SWRConfig>
    );

    await waitFor(() => screen.getByText(/Failed to load/i));

    expect(screen.getByText(/Failed to load/i)).toBeInTheDocument();
  });

  it('has a show all button', async () => {
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ExpertsList showAll={false} />
      </SWRConfig>
    );

    await waitFor(() => screen.getByTestId('expertsList'));
    expect(screen.getByText(/Všichni odborníci/i)).toBeInTheDocument();
    expect(screen.getByText(/Všichni odborníci/i).tagName).toEqual('A');
    expect(screen.getByText(/Všichni odborníci/i).href).toContain(
      'odbornici'
    );
  });
});
