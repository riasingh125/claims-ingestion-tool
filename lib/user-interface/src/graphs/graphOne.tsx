// Graph1.tsx
import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { ClaimData } from "../components/csvBuffer";

interface Graph1Props {
  data: ClaimData[];
}

const Graph1: React.FC<Graph1Props> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    // Aggregate data by, for example, payer_name.
    const aggregation: { [key: string]: { totalCharge: number; totalPaid: number } } = {};
    data.forEach((claim) => {
      const key = claim.payer_name;
      if (!aggregation[key]) {
        aggregation[key] = { totalCharge: 0, totalPaid: 0 };
      }
      aggregation[key].totalCharge += claim.clm_charge;
      aggregation[key].totalPaid += claim.clm_paid_amount;
    });
    const labels = Object.keys(aggregation);
    const totalCharges = labels.map((label) => aggregation[label].totalCharge);
    const totalPaid = labels.map((label) => aggregation[label].totalPaid);

    const chart = new Chart(canvasRef.current, {
      type: "bar", // Or "line" depending on your preference
      data: {
        labels,
        datasets: [
          {
            label: "Total Claim Charge",
            data: totalCharges,
            backgroundColor: "rgba(75,192,192,0.4)",
          },
          {
            label: "Total Paid Amount",
            data: totalPaid,
            backgroundColor: "rgba(153,102,255,0.4)",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: { beginAtZero: true },
          y: { beginAtZero: true },
        },
      },
    });

    return () => chart.destroy();
  }, [data]);

  return <canvas ref={canvasRef} />;
};

export default Graph1;
