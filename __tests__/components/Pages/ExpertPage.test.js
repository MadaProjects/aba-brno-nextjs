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

  it('render expert tabs', () => {
    const pageData = expertsMock.data[0].attributes;
    render(<ExpertPage pageData={pageData} />);
    expect(screen.getByTestId('tabs')).toBeInTheDocument();
  });

  it('render an image with alt from caption', () => {
    const pageData = expertsMock.data[1].attributes;
    const imgCaption =
      expertsMock.data[1].attributes.Image.data.attributes.caption;
    render(<ExpertPage pageData={pageData} />);
    expect(
      screen.getByRole('img', { name: imgCaption })
    ).toBeInTheDocument();
  });

  it('render an image with alt from expert name', () => {
    const pageData = expertsMock.data[2].attributes;
    const imgCaption = expertsMock.data[2].attributes.Name;
    render(<ExpertPage pageData={pageData} />);
    expect(
      screen.getByRole('img', { name: imgCaption })
    ).toBeInTheDocument();
  });

  // TODO this should be in a separate test file + test for all social networks
  describe('Social networks', () => {
    it('show social networks', () => {
      const pageData = expertsMock.data[0].attributes;
      render(<ExpertPage pageData={pageData} />);
      expect(screen.getByTestId('socialNetworks')).toBeInTheDocument();
    });

    it('show social networks with links', () => {
      const pageData = expertsMock.data[0].attributes;
      render(<ExpertPage pageData={pageData} />);
      expect(screen.getByTestId('socialNetworks')).toBeInTheDocument();
      expect(screen.getByTestId('socialNetworks').children.length).toEqual(
        expertsMock.data[0].attributes.social_media_sites.data.length
      );
    });
  });
});
