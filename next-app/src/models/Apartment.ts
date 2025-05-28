export type ApartmentStatus = "occupé" | "app en chauffe" | "prêt" | "BCS" | "libre/sale";

export interface Apartment {
  numeroApp: string | number; // number in old app, but might be fetched as string
  status: ApartmentStatus;
  typologie: string;
  name: string;
  arrive: "oui" | ""; // Represents boolean like
  depart: "oui" | ""; // Represents boolean like
  ck: "oui" | "";     // Represents boolean like
  commentaire: string;
  // This field was mentioned in OldIndex.html and main.js, might be relevant if data comes from there too
  // colorBagroud?: string; 
}
