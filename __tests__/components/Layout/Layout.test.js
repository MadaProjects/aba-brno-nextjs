import { screen, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { Layout } from '../../../components/Layout/Layout';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe('Layout', () => {
  it('render component', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Layout />
      </MockedProvider>
    );
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });
});
