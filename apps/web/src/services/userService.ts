export interface SignupUserPayload {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function userSignup(payload: SignupUserPayload) {
  if (!API_BASE_URL) {
    console.error("❌ ERROR: NEXT_PUBLIC_API_BASE_URL is not defined.");
    return { success: false, message: "Missing environment variable." };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to create user.");
    }

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Server error." };
  }
}
