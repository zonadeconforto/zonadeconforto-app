/**
 * Payload structure used when creating a new financial institution.
 *
 * @interface InstitutionPayload
 * @property {string} name - The institution's name.
 * @property {string} cnpj - A 14-digit unique identifier for Brazilian institutions.
 * @property {string} type - The type of institution (e.g., BANK, BROKERAGE).
 * @property {string | null} [site] - Optional website URL for the institution.
 */
export interface InstitutionPayload {
  name: string;
  cnpj: string;
  type: string;
  site?: string | null;
}

/**
 * Institution representation returned by the API.
 * Used mainly for selects and relationships (id → name).
 */
export interface Institution {
  id: string;
  name: string;
  cnpj: string;
  type: string;
  site?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Sends a POST request to the API to create a new financial institution.
 *
 * @async
 * @function createInstitution
 * @param {InstitutionPayload} payload - The data required to register a new institution.
 * @returns {Promise<{ success: boolean; message?: string }>}
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
/**
 * Fetches all registered financial institutions.
 *
 * This is used by forms that need to associate entities by ID
 * (e.g. Investment Products creation).
 *
 * @async
 * @function listInstitutions
 * @returns {Promise<Institution[]>}
 */
export async function listInstitutions(): Promise<Institution[]> {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined.");
  }

  const response = await fetch(`${API_BASE_URL}/institutions`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch institutions.");
  }

  return response.json();
}
