// Revised content for next-app/src/components/layout/Header.tsx
import Link from 'next/link';
import Image from 'next/image';

// Removed HeaderProps and pageType as it's now only for gouvernance
const Header: React.FC = () => {
  return (
    <header className="bg-brand-header text-white p-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center">
        <Image src="/assets/iconErnoixjpg.jpg" alt="App Icon" width={40} height={40} className="mr-3" />
        <h1 className="text-xl font-bold">Prototype Application Gouvernance</h1>
      </div>
      <nav className="flex items-center space-x-4 flex-wrap justify-end">
        <Link href="/#rdc" className="hover:bg-white hover:text-brand-header p-2 rounded text-lg sm:text-xl">RDC</Link>
        <Link href="/#etage1" className="hover:bg-white hover:text-brand-header p-2 rounded text-lg sm:text-xl">Etage 1</Link>
        <Link href="/#etage2" className="hover:bg-white hover:text-brand-header p-2 rounded text-lg sm:text-xl">Etage 2</Link>
        {/* Spinner placeholder can be removed if not used, or kept if general loading indication is desired */}
        {/* <div className="a-nav-gouv spinner-border d-none" role="status" id="spinerHeader">
          <span className="sr-only">Loading...</span>
        </div> */}
      </nav>
    </header>
  );
};

export default Header;
