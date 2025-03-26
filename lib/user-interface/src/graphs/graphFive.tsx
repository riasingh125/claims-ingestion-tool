// Graph5.tsx
import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { ClaimData } from "../components/csvBuffer";

interface Graph5Props {
  data: ClaimData[];
}

const Graph5: React.FC<Graph5Props> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    // Aggregate paid amounts by payer_name
    const aggregation: { [key: string]: number } = {};
    data.forEach((claim) => {
      const key = claim.payer_name;
      aggregation[key] = (aggregation[key] || 0) + claim.clm_paid_amount;
    });
    const labels = Object.keys(aggregation);
    const totalPaid = labels.map((label) => aggregation[label]);

    const chart = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Total Paid Amount",
            data: totalPaid,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
        ],
      },
      options: { responsive: true },
    });

    return () => chart.destroy();
  }, [data]);

  return <canvas ref={canvasRef} />;
};

export default Graph5;
