import InstitutionsPage from "../admin/ListInstitutions/page";
import ListInvestmentProducts from "../admin/ListInvestmentProducts/page";

export default function HomeAdmin() {
  return (
    <h1 className="text-2xl font-bold p-8">
      <ListInvestmentProducts></ListInvestmentProducts>
      <InstitutionsPage></InstitutionsPage>
    </h1>
  );
}
