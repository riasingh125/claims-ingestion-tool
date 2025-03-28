// Graph2.tsx
import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { ClaimData } from "../components/csvBuffer";

interface Graph2Props {
  data: ClaimData[];
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 0.6)`;
}


const Graph2: React.FC<Graph2Props> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    // Count claims per provider (using provider_npi)
    const counts: { [key: string]: number } = {};
    data.forEach((claim) => {
      const key = claim.provider_npi;
      counts[key] = (counts[key] || 0) + 1;
    });
    const labels = Object.keys(counts);
    const claimCounts = labels.map((label) => counts[label]);
    const randomColors = labels.map(() => getRandomColor());

    const chart = new Chart(canvasRef.current, {
      type: "pie", // or "bar" if you prefer
      data: {
        labels,
        datasets: [
          {
            label: "Claims by Provider",
            data: claimCounts,
            backgroundColor: randomColors,
          },
        ],
      },
      options: { responsive: true },
    });

    return () => chart.destroy();
  }, [data]);

  return <canvas ref={canvasRef} />;
};

export default Graph2;
