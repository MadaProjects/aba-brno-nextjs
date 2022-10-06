import { render, screen } from '@testing-library/react';
import { Expert } from '../../../components/Lists/Expert';

const expertMock = {
  name: 'Lorem ipsum',
  perex: 'Et donor',
  url: 'testurl',
  img: '/imgurl.png',
};

const expertMockFirst = {
  name: 'Second lorm',
  perex: 'Second donor',
  url: 'testurlSecond',
  img: '/imgurlSecond.png',
};

describe('Expert', () => {
  it('render a component', () => {
    render(<Expert />);
    expect(screen.getByTestId('expert')).toBeInTheDocument();
  });

  it('render name in heading', () => {
    render(<Expert expert={expertMockFirst} />);
    const headingEl = screen.getByRole('heading', { level: 2 });

    expect(headingEl).toBeInTheDocument();
    expect(headingEl.textContent).toEqual(expertMockFirst.name);
  });

  it('render diferent name in heading', () => {
    render(<Expert expert={expertMock} />);
    const headingEl = screen.getByRole('heading', { level: 2 });

    expect(headingEl).toBeInTheDocument();
    expect(headingEl.textContent).toEqual(expertMock.name);
  });

  it('render a perex', () => {
    render(<Expert expert={expertMock} />);
    expect(screen.getByText(expertMock.perex)).toBeInTheDocument();
    expect(screen.getByText(expertMock.perex).tagName).toEqual('P');
  });

  it('render a link', () => {
    render(<Expert expert={expertMock} />);
    expect(
      screen.getByRole('link', { name: expertMock.name })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: expertMock.name })
    ).toHaveAttribute('href', expertMock.url);
  });

  it('has img of expert', () => {
    render(<Expert expert={expertMock} />);
    expect(
      screen.getByRole('img', { name: expertMock.name })
    ).toBeInTheDocument();
  });
});
