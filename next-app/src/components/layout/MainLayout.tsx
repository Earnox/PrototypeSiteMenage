// next-app/src/components/layout/MainLayout.tsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  pageType: 'gouvernance' | 'technique';
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, pageType }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header pageType={pageType} />
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
