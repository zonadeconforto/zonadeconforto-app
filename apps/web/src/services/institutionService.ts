/**
 * Payload structure used when creating a new financial institution.
 *
 * @interface InstitutionPayload
 * @property {string} name - The institution's name.
 * @property {string} cnpj - A 14-digit unique identifier for Brazilian institutions.
 * @property {string} type - The type of institution (e.g., BANK, BROKER).
 * @property {string | null} [site] - Optional website URL for the institution.
 */
export interface InstitutionPayload {
  name: string;
  cnpj: string;
  type: string;
  site?: string | null;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Sends a POST request to the API to create a new financial institution.
 *
 * This function isolates API communication from the UI layer, ensuring that
 * components and hooks do not directly handle HTTP requests.
 *
 * Steps performed:
 * - Validates the presence of the API base URL
 * - Sends the payload to the backend
 * - Handles success and server/network errors
 *
 * @async
 * @function createInstitution
 * @param {InstitutionPayload} payload - The data required to register a new institution.
 * @returns {Promise<{ success: boolean; message?: string }>} The operation result.
 *
 * - `success: true` → Institution created successfully
 * - `success: false` → An error occurred (`message` provides additional info)
 */
export async function createInstitution(payload: InstitutionPayload) {
  if (!API_BASE_URL) {
    console.error("❌ ERROR: NEXT_PUBLIC_API_BASE_URL is not defined.");
    return { success: false, message: "Missing environment variable." };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/institutions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to create institution.");
    }

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Server error." };
  }
}
