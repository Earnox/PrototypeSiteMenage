export type InterventionPost = "Reception" | "Direction" | "Gouvernante" | "Technique";
export type InterventionRisque = "" | "Animaux" | "Enfant";
export type InterventionStatus =
  | "demande inter"
  | "Arrivée du jour"
  | "bloqué tech"
  | "VTA"
  | "départ du client"
  | "En Commande"
  | "En Attente"
  | "résolu"
  | "Action prioritaire";

export interface Intervention {
  id: string | number;
  date: string; // Assuming date strings e.g., "DD/MM/YYYY" or ISO
  post: InterventionPost;
  appartement: string; // Lieu
  natureInervention: string;
  risque: InterventionRisque;
  information: string;
  dateIntevention: string; // Date de réalisation
  remarque: string;
  statut: InterventionStatus;
  photo?: string; // Optional photo URL or identifier
}
