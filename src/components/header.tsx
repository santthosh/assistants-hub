
import { Button, Navbar, NavbarBrand } from 'flowbite-react';
import Image from 'next/image';

export function Header() {
  return (
    <Navbar fluid rounded>
      <NavbarBrand href="https://assistants-hub.vercel.app">
        <Image src="/logo.png" className="mr-3 h-6 sm:h-9" alt="Assistants Hub Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Assistants Hub</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Button outline gradientDuoTone="purpleToBlue" size="sm">Login</Button>
      </div>
    </Navbar>
  );
}
