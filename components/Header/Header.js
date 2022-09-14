import { Navbar, DarkThemeToggle } from 'flowbite-react';
import Image from 'next/image';

export const Header = () => {
  return (
    <div className='container mx-auto'>
      <Navbar fluid={true} rounded={false}>
        <Navbar.Brand href='/'>
          <Image
            src='/logo.png'
            className='mr-3 h-6 sm:h-9'
            alt='Aba Brno'
            width={100}
            height={44}
          />
          <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
            ABA Brno
          </span>
        </Navbar.Brand>
        <div className='flex justify-center items-center'>
          <div className='md:order-last md:ml-6'>
            <DarkThemeToggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link href='/navbars' active={true}>
              Home
            </Navbar.Link>
            <Navbar.Link href='/navbars'>About</Navbar.Link>
            <Navbar.Link href='/navbars'>Services</Navbar.Link>
            <Navbar.Link href='/navbars'>Pricing</Navbar.Link>
            <Navbar.Link href='/navbars'>Contact</Navbar.Link>
          </Navbar.Collapse>

          <Navbar.Toggle />
        </div>
      </Navbar>
    </div>
  );
};
