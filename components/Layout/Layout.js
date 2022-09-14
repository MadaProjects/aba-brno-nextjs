import { MainFooter } from '../Footer/MainFooter';
import { Header } from '../Header/Header';

export const Layout = ({ children }) => {
  return (
    <div data-testid='layout'>
      <Header />
      test<div>{children}</div>
      <MainFooter />
    </div>
  );
};
