// next-app/src/components/interventions/InterventionFormModal.tsx
import React, { useState, useEffect, FormEvent } from 'react';
import { Intervention, InterventionPost, InterventionRisque, InterventionStatus } from '@/models/Intervention';
import { SubmitInterventionData } from '@/services/googleSheetsService'; // To use for onSave payload

interface InterventionFormModalProps {
  isOpen: boolean;
  interventionToEdit?: Intervention | null; // If provided, it's an edit operation
  onClose: () => void;
  onSave: (data: SubmitInterventionData) => void;
}

const postOptions: InterventionPost[] = ["Reception", "Direction", "Gouvernante", "Technique"];
const risqueOptions: InterventionRisque[] = ["", "Animaux", "Enfant"];
const statusOptions: InterventionStatus[] = [
  "demande inter", "Arrivée du jour", "bloqué tech", "VTA", 
  "départ du client", "En Commande", "En Attente", "résolu", "Action prioritaire"
];

// Helper to get current date as YYYY-MM-DD for input type="date"
const getCurrentDateInput = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Helper to format D/M/YYYY from Google Sheet to YYYY-MM-DD for input
const formatDateForInput = (dateStr?: string): string => {
    if (!dateStr) return getCurrentDateInput();
    const parts = dateStr.split('/');
    if (parts.length === 3) {
        // Assuming D/M/YYYY
        const day = parts[0].padStart(2, '0');
        const month = parts[1].padStart(2, '0');
        const year = parts[2];
        if (year.length === 4 && month && day) {
             return `${year}-${month}-${day}`;
        }
    }
    // If format is already YYYY-MM-DD or unrecognized, try to use as is or default
    return dateStr || getCurrentDateInput();
};

// Helper to format YYYY-MM-DD from input to D/M/YYYY for Google Sheet
const formatDateForSheet = (dateStr: string): string => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        const [year, month, day] = parts;
        return `${day}/${month}/${year}`;
    }
    return dateStr; // fallback
};


const InterventionFormModal: React.FC<InterventionFormModalProps> = ({ isOpen, interventionToEdit, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Intervention>>({
    id: undefined,
    date: getCurrentDateInput(), // Input type="date" needs YYYY-MM-DD
    post: 'Reception',
    appartement: '',
    natureInervention: '',
    risque: '',
    information: '', // Read-only in original, not actively set in form
    dateIntevention: '', // Read-only in original, set if status is 'résolu'
    remarque: '',
    statut: 'demande inter',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (interventionToEdit) {
      setFormData({
        ...interventionToEdit,
        date: formatDateForInput(interventionToEdit.date),
        dateIntevention: interventionToEdit.dateIntevention ? formatDateForInput(interventionToEdit.dateIntevention) : '',
      });
    } else {
      // Reset for new intervention
      setFormData({
        id: undefined, // Or generate a temporary one if needed before save
        date: getCurrentDateInput(),
        post: 'Reception',
        appartement: '',
        natureInervention: '',
        risque: '',
        information: '',
        dateIntevention: '',
        remarque: '',
        statut: 'demande inter',
      });
    }
    setErrors({}); // Clear errors when modal opens or intervention changes
  }, [isOpen, interventionToEdit]);

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

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if(errors[name]) {
        setErrors(prev => ({...prev, [name]: ''})); // Clear error on change
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.date) newErrors.date = "La date est requise.";
    if (!formData.appartement?.trim()) newErrors.appartement = "Le lieu est requis.";
    if (!formData.natureInervention?.trim()) newErrors.natureInervention = "La nature de l'intervention est requise.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    let dateRealisation = formData.dateIntevention;
    if (formData.statut === 'résolu' && !dateRealisation) {
        dateRealisation = getCurrentDateInput(); // Set realisation date if status is resolved and date not set
    }

    const submissionData: SubmitInterventionData = {
      requet: interventionToEdit ? 'editIntevention' : 'newInter',
      id: interventionToEdit ? formData.id : undefined, // ID for edits, undefined for new
      date: formatDateForSheet(formData.date!), // Bang because validated
      post: formData.post!,
      lieu: formData.appartement!, // 'lieu' is used in original form, maps to 'appartement'
      natureIntevention: formData.natureInervention!,
      risque: formData.risque!,
      information: formData.information || '', // ensure it's a string
      dateRalisation: dateRealisation ? formatDateForSheet(dateRealisation) : '', // Renamed field from original form
      remarque: formData.remarque || '',
      statut: formData.statut!,
    };
    // Correct field name for service: dateIntevention instead of dateRalisation
    if (submissionData.dateRalisation !== undefined) {
        (submissionData as any).dateIntevention = submissionData.dateRalisation;
        delete submissionData.dateRalisation;
    }


    onSave(submissionData);
  };
  
  const modalTitle = interventionToEdit ? 'Modifier Intervention Tech' : 'Nouvelle Intervention Tech';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#438eb9]">{modalTitle}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
              <input type="text" name="id" id="id" value={formData.id || ''} readOnly className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date*</label>
              <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="post" className="block text-sm font-medium text-gray-700">Poste</label>
              <select name="post" id="post" value={formData.post} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                {postOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="appartement" className="block text-sm font-medium text-gray-700">Lieu (Appartement/Studio/Etage)*</label>
              <input type="text" name="appartement" id="appartement" value={formData.appartement} onChange={handleChange} required placeholder="Ex: A201, Studio B, Etage 1" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"/>
              {errors.appartement && <p className="text-red-500 text-xs mt-1">{errors.appartement}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="natureInervention" className="block text-sm font-medium text-gray-700">Nature d'intervention*</label>
            <textarea name="natureInervention" id="natureInervention" value={formData.natureInervention} onChange={handleChange} required rows={2} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
            {errors.natureInervention && <p className="text-red-500 text-xs mt-1">{errors.natureInervention}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="risque" className="block text-sm font-medium text-gray-700">Risque</label>
              <select name="risque" id="risque" value={formData.risque} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                {risqueOptions.map(opt => <option key={opt} value={opt}>{opt || 'Aucun'}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="information" className="block text-sm font-medium text-gray-700">Info (Client)</label>
              <input type="text" name="information" id="information" value={formData.information} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:ring-blue-500 focus:border-blue-500" readOnly placeholder="Info client si applicable"/>
            </div>
            <div>
              <label htmlFor="dateIntevention" className="block text-sm font-medium text-gray-700">Date Réalisation</label>
              <input type="date" name="dateIntevention" id="dateIntevention" value={formData.dateIntevention} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>

          <div>
            <label htmlFor="remarque" className="block text-sm font-medium text-gray-700">Remarque</label>
            <textarea name="remarque" id="remarque" value={formData.remarque} onChange={handleChange} rows={2} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>

          <div>
            <label htmlFor="statut" className="block text-sm font-medium text-gray-700">Statut</label>
            <select name="statut" id="statut" value={formData.statut} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
              {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              Annuler
            </button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterventionFormModal;
