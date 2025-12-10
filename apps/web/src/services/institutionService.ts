export interface InstitutionPayload {
  name: string;
  cnpj: string;
  type: string;
  site?: string | null;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function createInstitution(payload: InstitutionPayload) {
  if (!API_BASE_URL) {
    console.error("❌ ERRO: NEXT_PUBLIC_API_BASE_URL não definida.");
    return { success: false, message: "Variável de ambiente ausente." };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/institutions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Falha ao cadastrar instituição.");
    }

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Erro no servidor." };
  }
}
