// next-app/src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Tailwind CSS import

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Prototype Application Gouvernance',
  description: 'Refactored application for managing governance and technical interventions.',
  icons: {
    icon: '/assets/iconErnoixjpg.jpg',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        {/* MainLayout will be applied at page level or specific layouts */}
        {children}
      </body>
    </html>
  );
}
