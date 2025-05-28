// next-app/src/utils/statistics.ts
import { Apartment, ApartmentStatus } from '@/models/Apartment';

// Define ApartmentStatsData interface here or import if it becomes shared
export interface TypologyStats {
  '2p4': number;
  '2p4-5': number;
  '3p6': number;
  '3p6-7': number;
  [key: string]: number; // Allow for other typologies like 'other' or 'staff'
}

export interface StatusDetail {
  count: number;
  typologies: TypologyStats;
}

export interface ApartmentStatsData {
  occupé: StatusDetail;
  'app en chauffe': StatusDetail;
  prêt: StatusDetail;
  BCS: StatusDetail;
  'libre/sale': StatusDetail;
  [key: string]: StatusDetail; // To allow for other statuses if any
}

export const calculateApartmentStats = (apartments: Apartment[]): ApartmentStatsData => {
  const initialTypologyStats = (): TypologyStats => ({ '2p4': 0, '2p4-5': 0, '3p6': 0, '3p6-7': 0, other: 0 });
  
  const stats: ApartmentStatsData = {
    occupé: { count: 0, typologies: initialTypologyStats() },
    'app en chauffe': { count: 0, typologies: initialTypologyStats() },
    prêt: { count: 0, typologies: initialTypologyStats() },
    BCS: { count: 0, typologies: initialTypologyStats() },
    'libre/sale': { count: 0, typologies: initialTypologyStats() },
  };

  apartments.forEach(apt => {
    // Ensure the status exists in our stats object, if not, initialize it (robustness)
    if (!stats[apt.status]) {
        stats[apt.status] = { count: 0, typologies: initialTypologyStats() };
    }
    
    stats[apt.status].count++;
    
    // Normalize typology key (e.g. '2p4/5' to '2p4-5') if needed, here assuming it matches
    const typoKey = apt.typologie as keyof TypologyStats; // Assuming typologie matches keys

    if (stats[apt.status].typologies[typoKey] !== undefined) {
      stats[apt.status].typologies[typoKey]++;
    } else {
      // If typology is not one of the predefined, add to 'other'
      stats[apt.status].typologies.other = (stats[apt.status].typologies.other || 0) + 1;
    }
  });
  return stats;
};
