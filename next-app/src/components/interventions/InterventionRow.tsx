// next-app/src/components/interventions/InterventionRow.tsx
import React from 'react';
import { Intervention, InterventionStatus } from '@/models/Intervention';
import { FiEdit2 } from 'react-icons/fi';

interface InterventionRowProps {
  intervention: Intervention;
  onEdit: (intervention: Intervention) => void;
}

const interventionStatusClasses: Record<InterventionStatus, string> = {
  'Action prioritaire': 'bg-int-action-prioritaire text-white',
  'Arrivée du jour': 'bg-int-arrivee-du-jour text-green-800',
  'demande inter': 'bg-int-demande-inter text-orange-800',
  'résolu': 'bg-int-resolu text-white',
  'En Attente': 'bg-int-en-attente text-purple-800',
  'En Commande': 'bg-int-en-commande text-yellow-800',
  'départ du client': 'bg-int-depart-du-client text-white',
  'VTA': 'bg-int-vta text-sky-800',
  'bloqué tech': 'bg-int-bloque-tech text-white',
};

const statusDisplayNames: Record<InterventionStatus, string> = {
    'Action prioritaire': 'Action Prioritaire',
    'Arrivée du jour': 'Arrivée du Jour',
    'demande inter': 'Demande Inter',
    'résolu': 'Résolu',
    'En Attente': 'En Attente',
    'En Commande': 'En Commande',
    'départ du client': 'Départ Client',
    'VTA': 'VTA',
    'bloqué tech': 'Bloqué Tech',
};

const InterventionRow: React.FC<InterventionRowProps> = ({ intervention, onEdit }) => {
  const currentClass = interventionStatusClasses[intervention.statut] || 'bg-gray-200 text-gray-800';
  return (
    // Added rounded-md, shadow-sm, hover:shadow-md. Removed border-b from original as spacing is handled by table.
    <tr className="bg-white rounded-md shadow-sm hover:shadow-md"> 
      <td className="p-2 text-sm hidden sm:table-cell">{intervention.date}</td>
      <td className="p-2 text-sm hidden md:table-cell">{intervention.post}</td>
      <td className="p-2 text-sm font-semibold">{intervention.appartement}</td> {/* Lieu */}
      <td className="p-2 text-sm">{intervention.natureInervention}</td>
      <td className="p-2 text-sm hidden lg:table-cell">{intervention.remarque}</td>
      <td className="p-2 text-sm text-center">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${currentClass}`}>
          {statusDisplayNames[intervention.statut] || intervention.statut}
        </span>
      </td>
      <td className="p-2 text-center">
        <button 
          onClick={() => onEdit(intervention)} 
          className="p-2 text-blue-600 hover:text-blue-800"
          title="Modifier Intervention"
        >
          <FiEdit2 className="text-lg" />
        </button>
      </td>
    </tr>
  );
};

export default InterventionRow;
