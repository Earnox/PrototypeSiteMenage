// next-app/src/components/apartments/ApartmentRow.tsx
import React from 'react';
import { Apartment, ApartmentStatus } from '@/models/Apartment';
import ApartmentStatusDropdown from './ApartmentStatusDropdown';
import { FiKey, FiLogIn, FiLogOut, FiEdit2 } from 'react-icons/fi'; // Using react-icons

interface ApartmentRowProps {
  apartment: Apartment;
  onStatusChange: (apartmentId: string | number, newStatus: ApartmentStatus) => void;
  onEdit: (apartment: Apartment) => void;
}

// Helper to map typologie to Tailwind CSS class for background
const typologyBackgrounds: { [key: string]: string } = {
  '2p4': 'bg-purple-100', // #f1d0ec
  '3p6': 'bg-lime-100',   // #b6d7a8
  '2p4-5': 'bg-yellow-100', // #ffe599
  '3p6-7': 'bg-blue-100',   // #a4c2f4
  'staff': 'bg-red-100',    // lightcoral
};

const ApartmentRow: React.FC<ApartmentRowProps> = ({ apartment, onStatusChange, onEdit }) => {
  const baseRowClass = 'border-b border-gray-200 hover:bg-gray-50';
  const typologyClass = typologyBackgrounds[apartment.typologie] || 'bg-gray-50';

  return (
    <tr className={`${baseRowClass} ${typologyClass}`}>
      <td className={`p-2 font-bold text-center ${typologyClass}`}>{apartment.numeroApp}</td>
      <td className="p-2 min-w-[150px]">
        <ApartmentStatusDropdown
          currentStatus={apartment.status}
          apartmentId={apartment.numeroApp}
          onStatusChange={onStatusChange}
        />
      </td>
      <td className={`p-2 text-center font-medium ${typologyClass}`}>{apartment.typologie}</td>
      <td className="p-2">{apartment.name}</td>
      <td className="p-2 text-center">
        {apartment.arrive === 'oui' && <FiLogIn className="mx-auto text-green-600 text-lg" title="Arrivé" />}
      </td>
      <td className="p-2 text-center">
        {apartment.depart === 'oui' && <FiLogOut className="mx-auto text-red-600 text-lg" title="Départ" />}
      </td>
      <td className="p-2 text-center">
        {apartment.ck === 'oui' && <FiKey className="mx-auto text-blue-600 text-lg" title="CK" />}
      </td>
      <td className="p-2 text-sm break-words max-w-xs">{apartment.commentaire}</td>
      <td className="p-2 text-center">
        <button 
          onClick={() => onEdit(apartment)} 
          className="p-2 text-blue-600 hover:text-blue-800"
          title="Modifier"
        >
          <FiEdit2 className="text-lg" />
        </button>
      </td>
    </tr>
  );
};

export default ApartmentRow;
