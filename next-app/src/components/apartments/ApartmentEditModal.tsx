// next-app/src/components/apartments/ApartmentEditModal.tsx
import React, { useState, useEffect } from 'react';
import { Apartment, ApartmentStatus } from '@/models/Apartment';
import { FiKey, FiLogIn, FiLogOut } from 'react-icons/fi';

interface ApartmentEditModalProps {
  isOpen: boolean;
  apartment: Apartment | null;
  onClose: () => void;
  onSave: (apartmentId: string | number, newComment: string) => void;
}

const ApartmentEditModal: React.FC<ApartmentEditModalProps> = ({ isOpen, apartment, onClose, onSave }) => {
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (apartment) {
      setComment(apartment.commentaire || '');
    }
  }, [apartment]);

  // Effect to handle Escape key for closing the modal
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !apartment) {
    return null;
  }

  const handleSave = () => {
    onSave(apartment.numeroApp, comment);
  };
  
  const statusDisplayNames: Record<ApartmentStatus, string> = {
    occupé: 'Occupé',
    'app en chauffe': 'En Chauffe',
    prêt: 'Prêt',
    BCS: 'BCS',
    'libre/sale': 'Libre/Sale',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#438eb9]">Modifier Appartement: {apartment.numeroApp}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 text-sm">
          <div><strong>Status:</strong> {statusDisplayNames[apartment.status]}</div>
          <div><strong>Typologie:</strong> {apartment.typologie}</div>
          <div><strong>Nom:</strong> {apartment.name || '-'}</div>
          <div className="flex items-center">
            <strong>Arrivé:</strong> 
            {apartment.arrive === 'oui' ? <FiLogIn className="ml-2 text-green-600 text-lg" /> : <span className="ml-2">-</span>}
          </div>
          <div className="flex items-center">
            <strong>Départ:</strong> 
            {apartment.depart === 'oui' ? <FiLogOut className="ml-2 text-red-600 text-lg" /> : <span className="ml-2">-</span>}
          </div>
          <div className="flex items-center">
            <strong>CK:</strong> 
            {apartment.ck === 'oui' ? <FiKey className="ml-2 text-blue-600 text-lg" /> : <span className="ml-2">-</span>}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="modal-commentaire-text" className="block text-sm font-medium text-gray-700 mb-1">
            Commentaire:
          </label>
          <textarea
            id="modal-commentaire-text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Fermer
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApartmentEditModal;
