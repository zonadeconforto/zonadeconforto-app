import { useEffect, useState } from "react";
import { OutputInvestmentProductDTO } from "@/modules/investment-product/dtos/output-investment-product.dto";
import { investmentProductHttpService } from "@/services/investmentProductService";

export function useInvestmentProducts() {
  const [data, setData] = useState<OutputInvestmentProductDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      const list = await investmentProductHttpService.list();
      setData(list);
    } catch {
      setError("Failed to load investment products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return { data, loading, error, reload: load };
}
