import { Apartment, ApartmentStatus } from '@/models/Apartment';
import { Intervention } from '@/models/Intervention';

// URL to fetch apartment data from Google Apps Script
const APARTMENT_DATA_URL = 'https://script.google.com/macros/s/AKfycby0Wn8zAfWuV6452DEE60lXDmm24QYb78WPViknHcAvmNiTSvq5x1AwxzqPAeP6xMbj/exec';
// URL to update apartment data via Google Apps Script
const APARTMENT_UPDATE_URL = 'https://script.google.com/macros/s/AKfycbxlL-y_XcTtmCX8AK4YIkKxN5s7Y9-HJLggorsn1ngI1cwCBFkb7f3ivje028EJSoe1/exec';
// URL to fetch and submit intervention data via Google Apps Script
const INTERVENTION_URL = 'https://script.google.com/macros/s/AKfycbzNtaNcX8zovKIEx0mZetSageepeBjYRzeqOvXWozThYJwXA4R2hFm6N1fEdgTJuOW6/exec';

// Helper function to create a consistent date string if needed by Google Sheets.
// The old app uses createDate(date) which results in "D/M/YYYY".
// Google Sheets might be expecting dates in a specific format if it processes them.
// For now, we'll assume strings are fine, but this is a placeholder.
function formatDateForGoogleSheet(date: Date | string): string {
  if (typeof date === 'string') {
    // If it's already a string, assume it's in the correct format or doesn't need conversion
    // Or, attempt to parse and reformat if a specific output format is always needed
    return date;
  }
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('/'); // Example: DD/MM/YYYY
}

/**
 * Fetches the list of apartments from the Google Apps Script endpoint.
 * @returns A Promise that resolves to an array of Apartment objects.
 * @throws Throws an error if the network response is not ok or if fetching fails.
 */
export async function fetchApartments(): Promise<Apartment[]> {
  try {
    const response = await fetch(APARTMENT_DATA_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Apartment[] = await response.json();
    // Data cleansing/transformation: Ensure numeroApp is a string.
    return data.map(apt => ({
      ...apt,
      numeroApp: String(apt.numeroApp), // Keep as string to match original data handling
    }));
  } catch (error) {
    console.error("Failed to fetch apartments:", error);
    throw error; // Re-throw to allow caller to handle the error
  }
}

/**
 * Interface for the data required to update an apartment.
 * numeroApp is used as the ID.
 */
export interface ApartmentUpdateData {
  id: string | number; // numeroApp, which is the identifier for the apartment
  status: ApartmentStatus;
  commentaire: string;
}

/**
 * Submits updates for an apartment to the Google Apps Script endpoint.
 * Uses 'no-cors' mode, which means the response body and status are not directly readable.
 * This matches the behavior of the original application.
 * @param updateData The data for the apartment update.
 * @returns A Promise that resolves to the raw Response object.
 * @throws Throws an error if the fetch operation fails.
 */
export async function updateApartment(updateData: ApartmentUpdateData): Promise<Response> {
  try {
    const response = await fetch(APARTMENT_UPDATE_URL, {
      method: 'POST',
      mode: 'no-cors', // Important: 'no-cors' mode is used as in the original application.
                      // This means response details (status, body) are opaque.
      cache: 'no-cache',
      headers: {
        // 'Content-Type': 'application/json', // Commented out as in original app for some Google Script POSTs.
        // Google Apps Script POSTs often expect 'text/plain' or form data.
        // With 'no-cors', 'Content-Type' header might be restricted by the browser.
        // The original app sends a stringified JSON body, implying the script parses it.
      },
      body: JSON.stringify(updateData), // Body is stringified JSON as per original app.
    });
    // For 'no-cors' requests, the response body is opaque and status is often 0.
    // We cannot check response.ok or response.status meaningfully.
    // The original app often reloads the page or assumes success.
    return response; // Return the raw response, caller may need to assume success.
  } catch (error) {
    console.error("Failed to update apartment:", error);
    throw error; // Re-throw to allow caller to handle the error
  }
}

/**
 * Fetches the list of interventions from the Google Apps Script endpoint.
 * @returns A Promise that resolves to an array of Intervention objects.
 * @throws Throws an error if the network response is not ok or if fetching fails.
 */
export async function fetchInterventions(): Promise<Intervention[]> {
  try {
    const response = await fetch(INTERVENTION_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Intervention[] = await response.json();
    // Data cleansing/transformation: Ensure IDs are strings and dates are formatted.
    return data.map(intervention => ({
        ...intervention,
        id: String(intervention.id), // Ensure id is a string.
        // Format dates as "DD/MM/YYYY" strings, similar to the original app's createDate function.
        date: intervention.date ? formatDateForGoogleSheet(new Date(intervention.date)) : '',
        dateIntevention: intervention.dateIntevention ? formatDateForGoogleSheet(new Date(intervention.dateIntevention)) : '',
    }));
  } catch (error) {
    console.error("Failed to fetch interventions:", error);
    throw error; // Re-throw to allow caller to handle the error
  }
}

/**
 * Interface for submitting new or edited intervention data.
 * 'requet' field indicates if it's a new ("newInter") or an edit ("editIntevention") operation.
 * 'lieu' is an alias for 'appartement' used in forms.
 */
export interface SubmitInterventionData extends Omit<Intervention, 'id' | 'date' | 'dateIntevention'> {
    id?: string | number;       // id is not present for new interventions, but required for edits.
    requet: "newInter" | "editIntevention"; // Type of request.
    date: string;               // Expecting a pre-formatted date string.
    dateIntevention?: string;   // Expecting a pre-formatted date string (optional).
    lieu?: string;              // Optional alias for 'appartement', used in some forms.
}

/**
 * Submits a new or edited intervention to the Google Apps Script endpoint.
 * Handles mapping 'lieu' to 'appartement' for compatibility with form data.
 * Uses 'no-cors' mode, similar to updateApartment.
 * @param interventionData The intervention data to submit.
 * @returns A Promise that resolves to the raw Response object.
 * @throws Throws an error if the fetch operation fails.
 */
export async function submitIntervention(interventionData: SubmitInterventionData): Promise<Response> {
    // Map 'lieu' to 'appartement' if 'lieu' is provided (as in original forms)
    // This ensures compatibility with data structures used in the original application's forms.
    if (interventionData.lieu) {
        (interventionData as any).appartement = interventionData.lieu; // Type assertion to add property
        delete interventionData.lieu; // Remove the alias property
    }

  try {
    const response = await fetch(INTERVENTION_URL, {
      method: 'POST',
      mode: 'no-cors', // Important: 'no-cors' mode for Google Apps Script POSTs.
      cache: 'no-cache',
      headers: {
        // Content-Type considerations are similar to updateApartment due to 'no-cors'.
      },
      body: JSON.stringify(interventionData), // Body is stringified JSON.
    });
    // As with other 'no-cors' POSTs, the response is opaque.
    return response;
  } catch (error) {
    console.error("Failed to submit intervention:", error);
    throw error; // Re-throw to allow caller to handle the error
  }
}
