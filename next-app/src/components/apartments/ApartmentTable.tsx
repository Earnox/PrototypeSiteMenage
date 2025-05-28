// next-app/src/components/apartments/ApartmentTable.tsx
import React from 'react';
import { Apartment, ApartmentStatus } from '@/models/Apartment';
import ApartmentRow from './ApartmentRow';

interface ApartmentTableProps {
  apartments: Apartment[];
  onStatusChange: (apartmentId: string | number, newStatus: ApartmentStatus) => void;
  onEditApartment: (apartment: Apartment) => void;
}

const ApartmentTable: React.FC<ApartmentTableProps> = ({ apartments, onStatusChange, onEditApartment }) => {
  if (!apartments || apartments.length === 0) {
    return <p>No apartment data available.</p>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100 border-b-2 border-gray-300">
          <tr>
            <th className="p-3 text-left text-sm font-semibold text-gray-600 w-16">#</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600 min-w-[170px]">Status</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">Typologie</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">Nom</th>
            <th className="p-3 text-center text-sm font-semibold text-gray-600">Arrivé</th>
            <th className="p-3 text-center text-sm font-semibold text-gray-600">Départ</th>
            <th className="p-3 text-center text-sm font-semibold text-gray-600">CK</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600 max-w-xs">Commentaire</th>
            <th className="p-3 text-center text-sm font-semibold text-gray-600">Modifier</th>
          </tr>
        </thead>
        <tbody>
          {apartments.map(apartment => (
            <ApartmentRow
              key={apartment.numeroApp}
              apartment={apartment}
              onStatusChange={onStatusChange}
              onEdit={onEditApartment}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApartmentTable;
