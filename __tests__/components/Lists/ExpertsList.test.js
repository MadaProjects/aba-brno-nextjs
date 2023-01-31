import { render, screen, waitFor } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { mswServer } from '../../../helpers/tests/api-mocks/msw-server';
import {
  expertsSuccessHandler,
  expertsSuccessHandler_1_Experts,
  expertsSuccessHandler_3_Experts,
  expertsSuccessHandler_4_Experts,
  expertsErrorHandler,
} from '../../../helpers/tests/api-mocks/handlers';
import fetchMock from 'jest-fetch-mock';
import { ExpertsList } from '../../../components/Lists/ExpertsList';

describe('ExpertsList', () => {
  it('render a component', async () => {
    mswServer.use(expertsSuccessHandler);
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ExpertsList />
      </SWRConfig>
    );

    await waitFor(() => screen.getByTestId('expertsList'));

    expect(screen.getByTestId('expertsList')).toBeInTheDocument();
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
    mswServer.use(expertsSuccessHandler);
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
});
