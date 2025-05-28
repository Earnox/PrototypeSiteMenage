// next-app/src/components/interventions/InterventionTable.tsx
import React from 'react';
import { Intervention } from '@/models/Intervention';
import InterventionRow from './InterventionRow';

interface InterventionTableProps {
  interventions: Intervention[];
  onEditIntervention: (intervention: Intervention) => void;
}

const InterventionTable: React.FC<InterventionTableProps> = ({ interventions, onEditIntervention }) => {
  if (!interventions || interventions.length === 0) {
    return <p className="text-center p-4">Aucune intervention pour le moment.</p>;
  }

  return (
    <div className="overflow-x-auto"> {/* Removed shadow from here, will be on rows */}
      <table className="min-w-full table-auto border-separate border-spacing-y-2"> {/* Added border-separate and spacing */}
        <thead className="bg-gray-200"> {/* Removed bottom border */}
          <tr>
            <th className="p-3 text-left text-lg font-semibold text-gray-700 hidden sm:table-cell">Date</th>
            <th className="p-3 text-left text-lg font-semibold text-gray-700 hidden md:table-cell">Poste</th>
            <th className="p-3 text-left text-lg font-semibold text-gray-700">Lieu (#)</th>
            <th className="p-3 text-left text-lg font-semibold text-gray-700">Nature d'intervention</th>
            <th className="p-3 text-left text-lg font-semibold text-gray-700 hidden lg:table-cell">Remarque</th>
            <th className="p-3 text-center text-lg font-semibold text-gray-700">Statut</th>
            <th className="p-3 text-center text-lg font-semibold text-gray-700">Modifier</th>
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
