// ReportPage.tsx
import React, { useState, useContext } from "react";
import { CSVContext } from "../components/csvBuffer";
import Graph1 from "../graphs/graphOne";
import Graph2 from "../graphs/graphTwo";
//import Graph3 from "../graphs/graphThree";
import Graph4 from "../graphs/graphFour";
import Graph5 from "../graphs/graphFive";

const ReportPage: React.FC = () => {
  const { csvData } = useContext(CSVContext)!;
  const [currentGraph, setCurrentGraph] = useState(0);
  const totalGraphs = 5;

  const nextGraph = () => {
    setCurrentGraph((prev) => (prev + 1) % totalGraphs);
  };

  const prevGraph = () => {
    setCurrentGraph((prev) => (prev - 1 + totalGraphs) % totalGraphs);
  };

  const renderGraph = () => {
    switch (currentGraph) {
      case 0:
        return <Graph1 data={csvData} />;
      case 1:
        return <Graph2 data={csvData} />;
      case 2:
        return <Graph4 data={csvData} />;
      case 3:
        return <Graph5 data={csvData} />;
      default:
        return null;
    }

    // Uncomment the following to add Graph3
    // case 3:
    //   return <Graph3 data={csvData} />;
  };

  return (
    <div>
      <h1>Generate Report</h1>
      <div>{renderGraph()}</div>
      <div style={{ marginTop: "1rem" }}>
        <button onClick={prevGraph} style={{ marginRight: "1rem" }}>
          Prev
        </button>
        <button onClick={nextGraph}>Next</button>
      </div>
    </div>
  );
};

export default ReportPage;
