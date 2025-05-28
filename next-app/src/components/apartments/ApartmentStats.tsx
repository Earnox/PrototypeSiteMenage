// next-app/src/components/apartments/ApartmentStats.tsx
import React from 'react';
import { ApartmentStatus } from '@/models/Apartment';
import { ApartmentStatsData, TypologyStats as UtilTypologyStats } from '@/utils/statistics';

interface ApartmentStatsProps {
  stats: ApartmentStatsData | null;
  title: string;
}

const statusStyles: Record<ApartmentStatus, string> = {
  occupé: 'bg-yellow-200 border-yellow-400', // #ffe599
  'app en chauffe': 'bg-orange-200 border-orange-400', // lightsalmon
  prêt: 'bg-green-200 border-green-400', // #b6d7a8
  BCS: 'bg-teal-200 border-teal-400', // #29ab87
  'libre/sale': 'bg-pink-200 border-pink-400', // lightpink
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

  const renderTypologyDetails = (typologies: UtilTypologyStats) => {
    return Object.entries(typologies)
      .filter(([, count]) => count > 0)
      .map(([typo, num]) => (
        <div key={typo} className="text-xs">{`${typo.replace('-', '/')}: ${num}`}</div>
      ));
  };

  return (
    <div className="mb-4 p-3 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2 text-center text-[#438eb9]">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {(Object.keys(stats) as ApartmentStatus[]).map((statusKey) => (
          <div key={statusKey} className={`p-2 rounded-md border-2 ${statusStyles[statusKey]}`}>
            <div className="font-bold text-sm">{statusDisplayNames[statusKey]}</div>
            <div className="text-xl font-black">{stats[statusKey].count}</div>
            <div className="mt-1">{renderTypologyDetails(stats[statusKey].typologies)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApartmentStatsDisplay;
