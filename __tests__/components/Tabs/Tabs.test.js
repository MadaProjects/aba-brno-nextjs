import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from '../../../components/Tabs/Tabs';
import { expertsMock } from '../../../__mocks__/expertsMocks';

const defaultPageData = [
  {
    Title: 'Lorem ipsum',
    Text: 'Et donor test',
  },
  {
    Title: 'Epsum et donor',
    Text: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur',
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
    expect(screen.getByText(defaultPageData[0].Title)).toBeInTheDocument();
    expect(screen.getByText(defaultPageData[0].Text)).toBeVisible();
  });

  it('has a contact form', () => {
    render(<Tabs tabs={defaultPageData} />);
    expect(screen.getByTestId('contactForm')).toBeInTheDocument();
  });

  it('show first tab text on load', () => {
    render(<Tabs tabs={defaultPageData} />);
    expect(screen.getByTestId('tabpanel-0')).not.toHaveClass('hidden');
    expect(screen.getByTestId('tabpanel-1')).toHaveClass('hidden');
  });

  it('shows second tab text on click', async () => {
    const user = userEvent.setup();

    render(<Tabs tabs={defaultPageData} />);
    const tab = screen.getByRole('tab', {
      name: defaultPageData[1].Title,
    });

    await user.click(tab);

    expect(screen.getByTestId('tabpanel-0')).toHaveClass('hidden');
    expect(screen.getByTestId('tabpanel-1')).not.toHaveClass('hidden');
  });

  it('has a contact form on the last tab', async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={defaultPageData} />);
    const lastTab = screen.getByRole('tab', { name: 'Kontakt' });
    expect(screen.getByTestId('tabpanel-kontakt-form')).toHaveClass(
      'hidden'
    );

    await user.click(lastTab);

    expect(screen.getByTestId('tabpanel-kontakt-form')).not.toHaveClass(
      'hidden'
    );
  });
});
