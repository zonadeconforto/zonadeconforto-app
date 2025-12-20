-- DropForeignKey
ALTER TABLE "public"."InvestmentProduct" DROP CONSTRAINT "InvestmentProduct_financialInstitutionId_fkey";

-- AddForeignKey
ALTER TABLE "InvestmentProduct" ADD CONSTRAINT "InvestmentProduct_financialInstitutionId_fkey" FOREIGN KEY ("financialInstitutionId") REFERENCES "FinancialInstitution"("id") ON DELETE CASCADE ON UPDATE CASCADE;
