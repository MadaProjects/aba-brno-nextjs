import { screen, render } from '@testing-library/react';
import { Tabs } from '../../../components/Tabs/Tabs';
import { expertsMock } from '../../../__mocks__/expertsMocks';

const defaultPageData = [
  {
    Title: 'Lorem ipsum',
    Text: 'Et donor test',
  },
];

describe('Tabs', () => {
  it('render a component', () => {
    render(<Tabs />);
    expect(screen.getByTestId('tabs')).toBeInTheDocument();
  });

  it('render tablist', () => {
    render(<Tabs tabs={defaultPageData} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('render tab text on single tab', () => {
    //const pageData = expertsMock.data[0].attributes.TabText;

    render(<Tabs tabs={defaultPageData} />);
    expect(screen.getByText(defaultPageData[0].Text)).toBeInTheDocument();
    expect(screen.getByText(defaultPageData[0].Title)).toBeInTheDocument();
  });
});
