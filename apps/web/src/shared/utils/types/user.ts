export interface UserDTO {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  cpf: string | null;
  plan: "Gratuito" | "Premium" | "Pro";
  createdAt: string;
}
