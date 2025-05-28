// Revised content for next-app/src/components/layout/MainLayout.tsx
import React from 'react';
import Header from './Header'; // Header no longer takes pageType
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  // pageType: 'gouvernance' | 'technique'; // pageType is removed
}

// pageType prop removed from MainLayoutProps and from Header call
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header /> 
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
