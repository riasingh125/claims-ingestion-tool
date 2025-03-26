// csvBuffer.tsx
import React, { createContext, useState, ReactNode, useEffect } from "react";

export interface ClaimData {
  icn: string;
  payer_name: string;
  remittance_number: string;
  pmt_date: string;
  provider_npi: string;
  patient_name: string;
  patient_control_number: string;
  tob: string;
  status_code: string;
  subscriber_id: string;
  clm_charge: number;
  clm_paid_amount: number;
  clm_allow_amount: number;
  clm_denied_amount: number;
  clm_non_covered_amount: number;
  clm_deductible_amount: number;
  clm_co_insurance_amount: number;
  clm_co_pay_amount: number;
  clm_cont_adj_amount: number;
}

interface CSVContextType {
  csvData: ClaimData[];
  setCSVData: React.Dispatch<React.SetStateAction<ClaimData[]>>;
}

export const CSVContext = createContext<CSVContextType | undefined>(undefined);

export const CSVProvider = ({ children }: { children: ReactNode }) => {
  const [csvData, setCSVData] = useState<ClaimData[]>([]);

  useEffect(() => {
    fetch("/api/claims-summary")
      .then((res) => res.json())
      .then((data) => {
        const mappedData: ClaimData[] = data.map((row: any) => ({
          icn: row.ICN,
          payer_name: row.PayerName,
          remittance_number: row.RemittanceNumber,
          pmt_date: row.PmtDate,
          provider_npi: row.ProviderNPI,
          patient_name: row.PatientName,
          patient_control_number: row.PatientControlNumber,
          tob: row.TOB,
          status_code: row.StatusCode,
          subscriber_id: row.SubscriberIDNumber,
          clm_charge: Number(row.ClmCharge),
          clm_paid_amount: Number(row.ClmPaidAmount),
          clm_allow_amount: Number(row.ClmAllowAmount),
          clm_denied_amount: Number(row.ClmDeniedAmount),
          clm_non_covered_amount: Number(row.ClmNonCoveredAmount),
          clm_deductible_amount: Number(row.ClmDeductibleAmount),
          clm_co_insurance_amount: Number(row.ClmCoInsuranceAmount),
          clm_co_pay_amount: Number(row.ClmCoPayAmount),
          clm_cont_adj_amount: Number(row.ClmContAdjAmount),
        }));
        setCSVData(mappedData);
      })
      .catch((error) => console.error("Error fetching claim data:", error));
  }, []);

  return (
    <CSVContext.Provider value={{ csvData, setCSVData }}>
      {children}
    </CSVContext.Provider>
  );
};
