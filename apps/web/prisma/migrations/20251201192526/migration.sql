-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('CDB', 'LCI', 'LCA', 'DEBENTURE', 'OTHER');

-- CreateEnum
CREATE TYPE "ProfitabilityType" AS ENUM ('PREFIXED', 'CDI_POST_FIXED', 'IPCA_PLUS', 'HYBRID');

-- CreateEnum
CREATE TYPE "IndexerType" AS ENUM ('CDI', 'IPCA', 'SELIC');

-- CreateEnum
CREATE TYPE "LiquidityType" AS ENUM ('DAILY', 'MATURITY', 'GRACE_PERIOD');

-- CreateEnum
CREATE TYPE "IncomeTaxType" AS ENUM ('REGRESSIVE', 'EXEMPT', 'EXCLUSIVE');

-- CreateEnum
CREATE TYPE "InvestmentProductStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'COMING_SOON', 'EXPIRED');

-- CreateTable
CREATE TABLE "InvestmentProduct" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "productType" "ProductType" NOT NULL,
    "financialInstitutionId" TEXT NOT NULL,
    "profitabilityType" "ProfitabilityType" NOT NULL,
    "profitabilityValue" DECIMAL(6,2) NOT NULL,
    "indexer" "IndexerType",
    "termMonths" INTEGER NOT NULL,
    "liquidity" "LiquidityType" NOT NULL,
    "graceDays" INTEGER,
    "minValue" DECIMAL(18,2) NOT NULL,
    "maxValue" DECIMAL(18,2) NOT NULL,
    "startOfferDate" TIMESTAMP(3),
    "endOfferDate" TIMESTAMP(3),
    "adminFee" DECIMAL(5,4) DEFAULT 0,
    "incomeTax" "IncomeTaxType" NOT NULL,
    "description" TEXT,
    "status" "InvestmentProductStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestmentProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InvestmentProduct_financialInstitutionId_idx" ON "InvestmentProduct"("financialInstitutionId");

-- AddForeignKey
ALTER TABLE "InvestmentProduct" ADD CONSTRAINT "InvestmentProduct_financialInstitutionId_fkey" FOREIGN KEY ("financialInstitutionId") REFERENCES "FinancialInstitution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
