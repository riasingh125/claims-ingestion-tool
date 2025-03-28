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
        console.log("First row keys:", Object.keys(data[0]));
        const mappedData: ClaimData[] = data.map((row: any) => ({
          icn: row.icn,
          payer_name: row.payer_name,
          remittance_number: row.remittance_number,
          pmt_date: row.pmt_date,
          provider_npi: row.provider_npi,
          patient_name: row.patient_name,
          patient_control_number: row.patient_control_number,
          tob: row.tob,
          status_code: row.status_code,
          subscriber_id: row.subscriber_id,
          clm_charge: Number(row.clm_charge),
          clm_paid_amount: Number(row.clm_paid_amount),
          clm_allow_amount: Number(row.clm_allow_amount),
          clm_denied_amount: Number(row.clm_denied_amount),
          clm_non_covered_amount: Number(row.clm_non_covered_amount),
          clm_deductible_amount: Number(row.clm_deductible_amount),
          clm_co_insurance_amount: Number(row.clm_co_insurance_amount),
          clm_co_pay_amount: Number(row.clm_co_pay_amount),
          clm_cont_adj_amount: Number(row.clm_cont_adj_amount),
        }));        
        setCSVData(mappedData);
       console.log("Mapped CSV data:", mappedData);
       console.log("First row:", data[0]);

      })
      .catch((error) => console.error("Error fetching claim data:", error));
  }, []);

  return (
    <CSVContext.Provider value={{ csvData, setCSVData }}>
      {children}
    </CSVContext.Provider>
  );
};
