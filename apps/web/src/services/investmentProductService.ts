import { OutputInvestmentProductDTO } from "@/modules/investment-product/dtos/output-investment-product.dto";

export const investmentProductHttpService = {
  async list(): Promise<OutputInvestmentProductDTO[]> {
    const res = await fetch("/api/investment-product");

    if (!res.ok) {
      throw new Error("Failed to fetch investment products");
    }

    return res.json();
  },

  async create(payload: unknown) {
    const res = await fetch("/api/investment-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.json();
      throw error;
    }

    return res.json();
  },
};
