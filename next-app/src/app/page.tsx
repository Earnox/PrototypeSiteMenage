// next-app/src/app/page.tsx
'use client'; // This directive is necessary for using hooks like useState, useEffect

import React, { useState, useEffect, useCallback } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ApartmentTable from '@/components/apartments/ApartmentTable';
import ApartmentStatsDisplay from '@/components/apartments/ApartmentStats';
import ApartmentEditModal from '@/components/apartments/ApartmentEditModal';
import { Apartment, ApartmentStatus } from '@/models/Apartment';
import { fetchApartments, updateApartment, ApartmentUpdateData } from '@/services/googleSheetsService';
import { calculateApartmentStats, ApartmentStatsData as LocalApartmentStatsData } from '@/utils/statistics';


export default function GouvernancePage() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [stats, setStats] = useState<LocalApartmentStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);

  const loadApartments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchApartments();
      setApartments(data);
      setStats(calculateApartmentStats(data));
    } catch (err) {
      setError('Failed to load apartments. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadApartments();
  }, [loadApartments]);

  const handleStatusChange = async (apartmentId: string | number, newStatus: ApartmentStatus) => {
    const originalApartments = [...apartments];
    setApartments(prev => prev.map(apt => apt.numeroApp === apartmentId ? { ...apt, status: newStatus } : apt));
    
    // Update stats optimistically
    const updatedAptsForStats = apartments.map(apt => apt.numeroApp === apartmentId ? { ...apt, status: newStatus } : apt);
    setStats(calculateApartmentStats(updatedAptsForStats));

    const aptToUpdate = originalApartments.find(a => a.numeroApp === apartmentId);
    if (!aptToUpdate) return;

    const updateData: ApartmentUpdateData = { id: apartmentId, status: newStatus, commentaire: aptToUpdate.commentaire };

    try {
      await updateApartment(updateData);
      // Data is updated in Google Sheets, page will reflect optimistic update.
      // Optionally, re-fetch all data if 'no-cors' makes confirmation hard: await loadApartments();
    } catch (err) {
      setError(`Failed to update status for apartment ${apartmentId}. Reverting.`);
      console.error(err);
      setApartments(originalApartments); // Revert optimistic update
      setStats(calculateApartmentStats(originalApartments));
    }
  };

  const handleEditApartment = (apartment: Apartment) => {
    setSelectedApartment(apartment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedApartment(null);
  };

  const handleSaveComment = async (apartmentId: string | number, newComment: string) => {
    const originalApartments = [...apartments];
    setApartments(prev => prev.map(apt => apt.numeroApp === apartmentId ? { ...apt, commentaire: newComment } : apt));
    
    const aptToUpdate = originalApartments.find(a => a.numeroApp === apartmentId);
    if (!aptToUpdate) return;
    
    const updateData: ApartmentUpdateData = { id: apartmentId, status: aptToUpdate.status, commentaire: newComment };

    try {
      await updateApartment(updateData);
      // Comment updated.
      setIsModalOpen(false);
      setSelectedApartment(null);
      // Optionally re-fetch: await loadApartments();
    } catch (err) {
      setError(`Failed to save comment for apartment ${apartmentId}. Reverting.`);
      console.error(err);
      setApartments(originalApartments); // Revert
      setIsModalOpen(false);
      setSelectedApartment(null);
    }
  };
  
  // TODO: UI for stat display type selection (Arrivée, Départ, etc.)

  return (
    <MainLayout pageType="gouvernance">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Gouvernance des Appartements</h1>
      
      {loading && <p className="text-center text-gray-500">Chargement des données...</p>}
      {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
      
      {!loading && !error && (
        <>
          <ApartmentStatsDisplay stats={stats} title="Statistiques Générales des Appartements" />
          {/* Add buttons for Stat Arrivée / Stat Départ here if needed */}
          <ApartmentTable 
            apartments={apartments} 
            onStatusChange={handleStatusChange}
            onEditApartment={handleEditApartment}
          />
        </>
      )}

      {selectedApartment && (
        <ApartmentEditModal
          isOpen={isModalOpen}
          apartment={selectedApartment}
          onClose={handleCloseModal}
          onSave={handleSaveComment}
        />
      )}
    </MainLayout>
  );
}
