import { MainFooter } from '../Footer/MainFooter';
import { Header } from '../Header/Header';

export const Layout = ({ children }) => {
  return (
    <div data-testid='layout'>
      <Header />
      <div className='text-base text-forText'>{children}</div>
      <MainFooter />
    </div>
  );
};
