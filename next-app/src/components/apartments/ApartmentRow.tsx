// next-app/src/components/apartments/ApartmentRow.tsx
import React from 'react';
import { Apartment, ApartmentStatus } from '@/models/Apartment';
import ApartmentStatusDropdown from './ApartmentStatusDropdown';
import { FiKey, FiLogIn, FiLogOut, FiEdit2 } from 'react-icons/fi';

interface ApartmentRowProps {
  apartment: Apartment;
  onStatusChange: (apartmentId: string | number, newStatus: ApartmentStatus) => void;
  onEdit: (apartment: Apartment) => void;
}

const typologyColorClasses: { [key: string]: string } = {
  '2p4': 'bg-typo-2p4',
  '3p6': 'bg-typo-3p6',
  '2p4-5': 'bg-typo-2p4-5',
  '3p6-7': 'bg-typo-3p6-7',
  'staff': 'bg-typo-staff',
};

const ApartmentRow: React.FC<ApartmentRowProps> = ({ apartment, onStatusChange, onEdit }) => {
  const normalizedTypologyKey = apartment.typologie.replace('/', '-');
  const typologyClass = typologyColorClasses[normalizedTypologyKey] || 'bg-gray-50'; // Default background

  // Apply hover effect to the combined class string. Original border-b might be redundant if table uses border-spacing
  const baseRowClass = `border-b border-gray-200 ${typologyClass} hover:brightness-95`;

  return (
    <tr className={`${baseRowClass}`}>
      {/* Apply typologyClass to cells that should have this background, and new text styles for numeroApp */}
      <td className={`p-2 text-xl sm:text-2xl font-bold text-center ${typologyClass}`}>{apartment.numeroApp}</td>
      <td className="p-2 min-w-[150px]"> {/* This cell should not inherit typologyClass if it needs to be white for dropdown */}
        <ApartmentStatusDropdown
          currentStatus={apartment.status}
          apartmentId={apartment.numeroApp}
          onStatusChange={onStatusChange}
        />
      </td>
      <td className={`p-2 text-center font-medium hidden md:table-cell ${typologyClass}`}>{apartment.typologie}</td>
      <td className={`p-2 hidden lg:table-cell ${typologyClass}`}>{apartment.name}</td> {/* Assuming name cell also gets typology background */}
      <td className={`p-2 text-center ${typologyClass}`}>
        {apartment.arrive === 'oui' && <FiLogIn className="mx-auto text-green-600 text-lg" title="Arrivé" />}
      </td>
      <td className={`p-2 text-center ${typologyClass}`}>
        {apartment.depart === 'oui' && <FiLogOut className="mx-auto text-red-600 text-lg" title="Départ" />}
      </td>
      <td className={`p-2 text-center ${typologyClass}`}>
        {apartment.ck === 'oui' && <FiKey className="mx-auto text-blue-600 text-lg" title="CK" />}
      </td>
      <td className={`p-2 text-sm break-words max-w-xs hidden md:table-cell ${typologyClass}`}>{apartment.commentaire}</td>
      <td className={`p-2 text-center ${typologyClass}`}> {/* Modifier column kept visible */}
        <button 
          onClick={() => onEdit(apartment)} 
          className="p-2 text-blue-600 hover:text-blue-800" // Text color for button, background is from cell
          title="Modifier"
        >
          <FiEdit2 className="text-lg" />
        </button>
      </td>
    </tr>
  );
};

export default ApartmentRow;
