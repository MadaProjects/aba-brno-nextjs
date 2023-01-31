import { screen, render } from '@testing-library/react';
import { Header, MENU_QUERY } from '../../../components/Header/Header';
import { MockedProvider } from '@apollo/client/testing';

const emptyMock = [
  {
    request: {
      query: MENU_QUERY,
    },
    result: {
      data: {
        headerMenu: {
          data: [],
        },
      },
    },
  },
];

const newtorkErrorMocks = [
  {
    request: {
      query: MENU_QUERY,
    },

    error: new Error('An error occurred'),
  },
];

describe('Header', () => {
  it('shows loading text on graphq load', async () => {
    render(
      <MockedProvider mocks={emptyMock} addTypename={false}>
        <Header />
      </MockedProvider>
    );

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
  });

  it('render component', async () => {
    render(
      <MockedProvider mocks={newtorkErrorMocks} addTypename={false}>
        <Header />
      </MockedProvider>
    );
    expect(
      await screen.findByText('An error occurred')
    ).toBeInTheDocument();

    //expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
