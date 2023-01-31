import { render, screen } from '@testing-library/react';
import { Expert } from '../../../components/Lists/Expert';
import {
  expertsMock,
  expertsMock_1_Experts,
  expertsMock_3_Experts,
  expertsMock_4_Experts,
} from '../../../__mocks__/expertsMocks';

describe('Expert', () => {
  it('render a component', () => {
    render(<Expert />);
    expect(screen.getByTestId('expert')).toBeInTheDocument();
  });

  it('render name in heading', () => {
    const expertUnpackedData = expertsMock_1_Experts.data[0].attributes;
    render(<Expert expert={expertUnpackedData} />);
    const headingEl = screen.getByRole('heading', { level: 3 });

    expect(headingEl).toBeInTheDocument();
    expect(headingEl.textContent).toEqual(expertUnpackedData.Name);
  });

  it('render diferent name in heading', () => {
    const expertUnpackedData = expertsMock.data[2].attributes;
    render(<Expert expert={expertUnpackedData} />);
    const headingEl = screen.getByRole('heading', { level: 3 });

    expect(headingEl).toBeInTheDocument();
    expect(headingEl.textContent).toEqual(expertUnpackedData.Name);
  });

  it('render a perex', () => {
    const expertUnpackedData = expertsMock_1_Experts.data[0].attributes;
    render(<Expert expert={expertUnpackedData} />);
    expect(screen.getByText(expertUnpackedData.Perex)).toBeInTheDocument();
    expect(screen.getByText(expertUnpackedData.Perex).tagName).toEqual(
      'P'
    );
  });

  // TODO odbornici URL can not be hardcoded
  it('render a link', () => {
    const expertUnpackedData = expertsMock_1_Experts.data[0].attributes;
    render(<Expert expert={expertUnpackedData} />);
    expect(
      screen.getByRole('link', { name: expertUnpackedData.Name })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: expertUnpackedData.Name })
    ).toHaveAttribute('href', `/odbornici/${expertUnpackedData.Url}`);
  });

  it('has img of expert', () => {
    const expertUnpackedData = expertsMock_1_Experts.data[0].attributes;
    render(<Expert expert={expertUnpackedData} />);
    expect(
      screen.getByRole('img', { name: expertUnpackedData.Name })
    ).toBeInTheDocument();
  });
});
