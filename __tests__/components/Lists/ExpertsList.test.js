import { render, screen } from '@testing-library/react';
import { ExpertsList } from '../../../components/Lists/ExpertsList';
import {
  expertExamples_1Expert,
  expertExamples_3Expert,
  expertMock_10Expert,
} from '../../../__mocks__/expertsMocks';

describe('ExpertsList', () => {
  it('render a component', () => {
    render(<ExpertsList />);
    expect(screen.getByTestId('expertsList')).toBeInTheDocument();
  });

  it('render one expert in list', () => {
    render(<ExpertsList experts={expertExamples_1Expert} />);

    expect(screen.getAllByTestId('expert').length).toEqual(1);
  });

  it('render 3 experts in list', () => {
    render(<ExpertsList experts={expertExamples_3Expert} />);
    expect(screen.getAllByTestId('expert').length).toEqual(3);
  });

  it('render max 4 experts', () => {
    render(<ExpertsList experts={expertMock_10Expert} />);
    expect(screen.getAllByTestId('expert').length).toEqual(4);
  });
});
