// next-app/src/components/layout/Footer.tsx
const Footer: React.FC = () => {
  return (
    <footer className="bg-[#438eb9] text-white p-4 text-center mt-auto">
      <p>&copy; {new Date().getFullYear()} Application Gouvernance. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
