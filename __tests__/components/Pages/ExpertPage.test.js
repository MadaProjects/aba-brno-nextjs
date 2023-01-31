import { render, screen } from '@testing-library/react';
import { ExpertPage } from '../../../components/Pages/ExpertPage';
import { expertsMock } from '../../../__mocks__/expertsMocks';

describe('ExpertPage', () => {
  it('render a component', () => {
    const pageData = expertsMock.data[0].attributes;
    render(<ExpertPage pageData={pageData} />);
    expect(screen.getByTestId('expertPage')).toBeInTheDocument();
  });

  it('render expert name as main heading', () => {
    const pageData = expertsMock.data[0].attributes;
    render(<ExpertPage pageData={pageData} />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 }).textContent).toEqual(
      pageData.Name
    );
  });

  it('render expert perex', () => {
    const pageData = expertsMock.data[0].attributes;
    render(<ExpertPage pageData={pageData} />);
    expect(screen.getByText(pageData.Perex)).toBeInTheDocument();
    expect(screen.getByText(pageData.Perex).tagName).toEqual('P');
  });

  it.skip('render expert text', () => {
    const pageData = expertsMock.data[1].attributes;
    render(<ExpertPage pageData={pageData} />);
    expect(screen.getByText(pageData.Text)).toBeInTheDocument();
  });

  it('render an image', () => {
    const pageData = expertsMock.data[1].attributes;
    render(<ExpertPage pageData={pageData} />);
    expect(
      screen.getByRole('img', { name: pageData.Name })
    ).toBeInTheDocument();
  });
});
