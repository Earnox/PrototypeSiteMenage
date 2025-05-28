// next-app/src/components/interventions/InterventionRow.tsx
import React from 'react';
import { Intervention, InterventionStatus } from '@/models/Intervention';
import { FiEdit2 } from 'react-icons/fi';

interface InterventionRowProps {
  intervention: Intervention;
  onEdit: (intervention: Intervention) => void;
}

// Based on style1.css and helperTech.js
const statusStyles: Record<InterventionStatus, string> = {
  'Action prioritaire': 'bg-red-500 text-white',
  'Arrivée du jour': 'bg-lime-200 text-lime-800', // rgb(191, 233, 166)
  'demande inter': 'bg-orange-300 text-orange-800', // lightsalmon
  'résolu': 'bg-green-500 text-white', // lightseagreen
  'En Attente': 'bg-purple-300 text-purple-800', // rgb(246, 176, 246)
  'En Commande': 'bg-yellow-300 text-yellow-800', // #ffe599
  'départ du client': 'bg-fuchsia-500 text-white', // rgb(190, 84, 190)
  'VTA': 'bg-sky-300 text-sky-800', // lightskyblue
  'bloqué tech': 'bg-indigo-700 text-white', // #1600dd
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
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100 bg-white">
      <td className="p-2 text-sm">{intervention.date}</td>
      <td className="p-2 text-sm">{intervention.post}</td>
      <td className="p-2 text-sm font-semibold">{intervention.appartement}</td>
      <td className="p-2 text-sm">{intervention.natureInervention}</td>
      <td className="p-2 text-sm">{intervention.remarque}</td>
      <td className="p-2 text-sm text-center">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[intervention.statut] || 'bg-gray-200 text-gray-800'}`}>
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
