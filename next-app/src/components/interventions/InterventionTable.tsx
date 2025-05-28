// next-app/src/components/interventions/InterventionTable.tsx
import React from 'react';
import { Intervention } from '@/models/Intervention';
import InterventionRow from './InterventionRow';

interface InterventionTableProps {
  interventions: Intervention[];
  onEditIntervention: (intervention: Intervention) => void;
  // onAddNewIntervention: () => void; // Button for this will be likely at page level
}

const InterventionTable: React.FC<InterventionTableProps> = ({ interventions, onEditIntervention }) => {
  if (!interventions || interventions.length === 0) {
    return <p className="text-center p-4">Aucune intervention pour le moment.</p>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200 border-b-2 border-gray-300">
          <tr>
            <th className="p-3 text-left text-sm font-semibold text-gray-700">Date</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-700">Poste</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-700">Lieu (#)</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-700">Nature d'intervention</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-700">Remarque</th>
            <th className="p-3 text-center text-sm font-semibold text-gray-700">Statut</th>
            <th className="p-3 text-center text-sm font-semibold text-gray-700">Modifier</th>
          </tr>
        </thead>
        <tbody>
          {interventions.map(intervention => (
            <InterventionRow
              key={intervention.id} 
              intervention={intervention}
              onEdit={onEditIntervention}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InterventionTable;
