// next-app/src/components/layout/Header.tsx
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  pageType: 'gouvernance' | 'technique';
}

const Header: React.FC<HeaderProps> = ({ pageType }) => {
  return (
    <header className="bg-brand-header text-white p-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center">
        <Image src="/assets/iconErnoixjpg.jpg" alt="App Icon" width={40} height={40} className="mr-3" />
        <h1 className="text-xl font-bold">Prototype Application Gouvernance</h1>
      </div>
      <nav className="flex items-center space-x-4 flex-wrap justify-end"> {/* Added flex-wrap and justify-end */}
        {pageType === 'gouvernance' && (
          <>
            <Link href="/#rdc" className="hover:bg-white hover:text-brand-header p-2 rounded">RDC</Link>
            <Link href="/#etage1" className="hover:bg-white hover:text-brand-header p-2 rounded">Etage 1</Link>
            <Link href="/#etage2" className="hover:bg-white hover:text-brand-header p-2 rounded">Etage 2</Link>
            <Link href="/interventions" className="hover:bg-white hover:text-brand-header p-2 rounded">Technique</Link>
          </>
        )}
        {pageType === 'technique' && (
          <>
            {/* Placeholder for New Intervention Button - Functionality to be added later */}
            <button className="bg-brand-button text-white border-2 border-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75">
              +
            </button>
            <Link href="/" className="hover:bg-white hover:text-brand-header p-2 rounded">Gouvernance</Link>
            {/* <Link href="#menu" className="hover:bg-white hover:text-brand-header p-2 rounded">Menu</Link> */}
          </>
        )}
         {/* Spinner placeholder - logic to be added later */}
        {/* <div className="a-nav-gouv spinner-border d-none" role="status" id="spinerHeader">
          <span className="sr-only">Loading...</span>
        </div> */}
      </nav>
    </header>
  );
};

export default Header;
