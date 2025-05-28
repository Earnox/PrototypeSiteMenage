// next-app/src/components/apartments/ApartmentStatusDropdown.tsx
import React from 'react';
import { ApartmentStatus } from '@/models/Apartment';

interface ApartmentStatusDropdownProps {
  currentStatus: ApartmentStatus;
  apartmentId: string | number;
  onStatusChange: (apartmentId: string | number, newStatus: ApartmentStatus) => void;
}

const statusSelectClasses: Record<ApartmentStatus, string> = {
  occupé: 'bg-status-occupe text-yellow-800 font-semibold',
  'app en chauffe': 'bg-status-en-chauffe text-orange-800 font-semibold',
  prêt: 'bg-status-pret text-green-800 font-semibold',
  BCS: 'bg-status-bcs text-white font-semibold', // Assuming text-white for contrast with #29ab87
  'libre/sale': 'bg-status-libre-sale text-pink-800 font-semibold',
};
const statusOptions: ApartmentStatus[] = ["occupé", "app en chauffe", "prêt", "BCS", "libre/sale"];
const statusDisplayNames: Record<ApartmentStatus, string> = {
    occupé: 'Occupé',
    'app en chauffe': 'En Chauffe',
    prêt: 'Prêt',
    BCS: 'BCS',
    'libre/sale': 'Libre/Sale',
};

const ApartmentStatusDropdown: React.FC<ApartmentStatusDropdownProps> = ({ currentStatus, apartmentId, onStatusChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(apartmentId, event.target.value as ApartmentStatus);
  };
  const currentSelectClass = statusSelectClasses[currentStatus] || 'bg-gray-200 text-gray-800';

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      className={`p-2 border rounded w-full text-sm ${currentSelectClass}`}
    >
      {statusOptions.map(status => (
        // Applying class to option for dropdown style consistency, though browser support varies
        <option key={status} value={status} className={`${statusSelectClasses[status] || 'font-semibold'}`}> 
          {statusDisplayNames[status]}
        </option>
      ))}
    </select>
  );
};

export default ApartmentStatusDropdown;
