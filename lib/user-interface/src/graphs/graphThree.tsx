// Graph3.tsx
/*
import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { ClaimData } from "../components/csvBuffer";

interface Graph3Props {
  data: ClaimData[];
}

const Graph3: React.FC<Graph3Props> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    // Aggregate denial amounts by code (using svc_rc1)
    const aggregation: { [key: string]: number } = {};
    data.forEach((claim) => {
      if (claim.svc_rc1) {
        aggregation[claim.svc_rc1] =
          (aggregation[claim.svc_rc1] || 0) + (claim.svc_amt1 || 0);
      }
    });
    const labels = Object.keys(aggregation);
    const amounts = labels.map((label) => aggregation[label]);

    const chart = new Chart(canvasRef.current, {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            label: "Service Denial Amounts",
            data: amounts,
            backgroundColor: labels.map(
              () => "rgba(255, 159, 64, 0.6)"
            ),
          },
        ],
      },
      options: { responsive: true },
    });

    return () => chart.destroy();
  }, [data]);

  return <canvas ref={canvasRef} />;
};

export default Graph3;
*/

export {};