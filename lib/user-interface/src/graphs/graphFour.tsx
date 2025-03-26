// Graph4.tsx
import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { ClaimData } from "../components/csvBuffer";

interface Graph4Props {
  data: ClaimData[];
}

const Graph4: React.FC<Graph4Props> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    // Aggregate claim charges by patient_name
    const aggregation: { [key: string]: number } = {};
    data.forEach((claim) => {
      const key = claim.patient_name;
      aggregation[key] = (aggregation[key] || 0) + claim.clm_charge;
    });
    const labels = Object.keys(aggregation);
    const totalCharges = labels.map((label) => aggregation[label]);

    const chart = new Chart(canvasRef.current, {
      type: "bar", // Horizontal bar chart if desired can be set using options or a plugin.
      data: {
        labels,
        datasets: [
          {
            label: "Total Claim Charge",
            data: totalCharges,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
        ],
      },
      options: {
        indexAxis: "y", // Makes it a horizontal bar chart.
        responsive: true,
      },
    });

    return () => chart.destroy();
  }, [data]);

  return <canvas ref={canvasRef} />;
};

export default Graph4;
