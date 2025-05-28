// next-app/src/components/apartments/ApartmentStats.tsx
import React from 'react';
import { ApartmentStatsData, TypologyStats } from '@/utils/statistics';
import { ApartmentStatus } from '@/models/Apartment';

interface ApartmentStatsProps {
  stats: ApartmentStatsData | null;
  title: string;
}

const statusContainerClasses: Record<ApartmentStatus, string> = {
  occupé: 'bg-status-occupe border-yellow-500 text-yellow-800',
  'app en chauffe': 'bg-status-en-chauffe border-orange-500 text-orange-800',
  prêt: 'bg-status-pret border-green-500 text-green-800',
  BCS: 'bg-status-bcs border-teal-600 text-white', // text-white for contrast
  'libre/sale': 'bg-status-libre-sale border-pink-500 text-pink-800',
};

const statusDisplayNames: Record<ApartmentStatus, string> = {
    occupé: 'Occupé',
    'app en chauffe': 'En Chauffe',
    prêt: 'Prêt',
    BCS: 'BCS',
    'libre/sale': 'Libre/Sale',
};

const ApartmentStatsDisplay: React.FC<ApartmentStatsProps> = ({ stats, title }) => {
  if (!stats) {
    return <div className="p-4 bg-white rounded shadow">Chargement des statistiques...</div>;
  }

  // Simplified: text color is part of containerClass and will be inherited by children.
  const renderTypologyDetails = (typologies: TypologyStats) => {
    return Object.entries(typologies)
      .filter(([, count]) => count > 0)
      .map(([typo, num]) => (
        <div key={typo} className="text-xs">{`${typo.replace('-', '/')}: ${num}`}</div>
      ));
  };

  return (
    <div className="mb-4 p-3 bg-white rounded-lg shadow">
      {/* Use brand-header for title as per other components if desired, or keep specific styling */}
      <h2 className="text-lg font-semibold mb-2 text-center text-brand-header">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {(Object.keys(stats) as ApartmentStatus[]).map((statusKey) => {
          const containerClass = statusContainerClasses[statusKey] || 'bg-gray-200 border-gray-400 text-gray-800';
          return (
            <div key={statusKey} className={`p-2 rounded-md border-2 ${containerClass}`}>
              <div className="font-bold text-sm">{statusDisplayNames[statusKey]}</div>
              <div className="text-xl font-black">{stats[statusKey].count}</div>
              <div className="mt-1">{renderTypologyDetails(stats[statusKey].typologies)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApartmentStatsDisplay;
