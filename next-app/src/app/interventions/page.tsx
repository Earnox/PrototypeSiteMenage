// next-app/src/app/interventions/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import InterventionTable from '@/components/interventions/InterventionTable';
import InterventionFormModal from '@/components/interventions/InterventionFormModal';
import { Intervention } from '@/models/Intervention';
import { fetchInterventions, submitIntervention, SubmitInterventionData } from '@/services/googleSheetsService';

export default function InterventionsPage() {
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIntervention, setEditingIntervention] = useState<Intervention | null>(null);

  const loadInterventions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchInterventions();
      setInterventions(data);
    } catch (err) {
      setError('Failed to load interventions. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInterventions();
  }, [loadInterventions]);

  const handleOpenNewInterventionModal = () => {
    setEditingIntervention(null);
    setIsModalOpen(true);
  };

  const handleEditIntervention = (intervention: Intervention) => {
    setEditingIntervention(intervention);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingIntervention(null);
  };

  const handleSaveIntervention = async (data: SubmitInterventionData) => {
    // Optimistic UI update can be tricky with 'no-cors' if IDs are assigned by backend on new.
    // For now, we will re-fetch the list after save.
    // If IDs are client-generated for new items, optimistic update is more straightforward.
    // The original app reloads the page.

    try {
      setError(null);
      await submitIntervention(data);
      setIsModalOpen(false);
      setEditingIntervention(null);
      await loadInterventions(); // Re-fetch data to show changes
    } catch (err) {
      setError(`Failed to save intervention. ${err instanceof Error ? err.message : ''}`);
      console.error(err);
      // Modal remains open for user to retry or close
    }
  };

  return (
    <MainLayout pageType="technique">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Interventions Techniques</h1>
        <button
          onClick={handleOpenNewInterventionModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span className="mr-2 text-xl">+</span> Nouvelle Intervention
        </button>
      </div>
      
      {loading && <p className="text-center text-gray-500">Chargement des interventions...</p>}
      {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}

      {!loading && !error && (
        <InterventionTable 
          interventions={interventions} 
          onEditIntervention={handleEditIntervention}
        />
      )}

      {(isModalOpen || editingIntervention) && ( // Ensure modal opens for new or edit
        <InterventionFormModal
          isOpen={isModalOpen}
          interventionToEdit={editingIntervention}
          onClose={handleCloseModal}
          onSave={handleSaveIntervention}
        />
      )}
    </MainLayout>
  );
}
