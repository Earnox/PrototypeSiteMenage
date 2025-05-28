// next-app/src/components/apartments/ApartmentStatusDropdown.tsx
import React from 'react';
import { ApartmentStatus } from '@/models/Apartment';

interface ApartmentStatusDropdownProps {
  currentStatus: ApartmentStatus;
  apartmentId: string | number;
  onStatusChange: (apartmentId: string | number, newStatus: ApartmentStatus) => void;
}

const statusOptions: ApartmentStatus[] = ["occupé", "app en chauffe", "prêt", "BCS", "libre/sale"];

const selectStyles: Record<ApartmentStatus, string> = {
  occupé: 'bg-yellow-200 text-yellow-800 font-semibold',
  'app en chauffe': 'bg-orange-200 text-orange-800 font-semibold',
  prêt: 'bg-green-200 text-green-800 font-semibold',
  BCS: 'bg-teal-200 text-teal-800 font-semibold',
  'libre/sale': 'bg-pink-200 text-pink-800 font-semibold',
};

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

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      className={`p-2 border rounded w-full text-sm ${selectStyles[currentStatus]}`}
    >
      {statusOptions.map(status => (
        <option key={status} value={status} className="font-semibold">
          {statusDisplayNames[status]}
        </option>
      ))}
    </select>
  );
};

export default ApartmentStatusDropdown;
