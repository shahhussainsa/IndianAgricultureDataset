// src/App.tsx

import React from "react";
import { Table } from "@mantine/core";
import { processData } from "./dataProcessing";
import "./App.css"; // Import your CSS file

const App: React.FC = () => {
  const { aggregatedData, averageData } = processData();

  const renderAggregatedTable = () => (
    <div className="table-container">
      <Table className="table">
        <thead>
          <tr>
            <th>Year</th>
            <th>Crop with Maximum Production</th>
            <th>Crop with Minimum Production</th>
          </tr>
        </thead>
        <tbody>
          {aggregatedData.map((data, index) => (
            <tr key={index}>
              <td>{data.year}</td>
              <td>{data.maxCrop}</td>
              <td>{data.minCrop}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

  const renderAverageTable = () => (
    <div className="table-container">
      <Table className="table">
        <thead>
          <tr>
            <th>Crop</th>
            <th>Average Yield (Kg/Ha)</th>
            <th>Average Cultivation Area (Ha)</th>
          </tr>
        </thead>
        <tbody>
          {averageData.map((data, index) => (
            <tr key={index}>
              <td>{data.crop}</td>
              <td>{data.avgYield}</td>
              <td>{data.avgArea}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Agriculture Analytics - India</h1>
      <h2 style={{ textAlign: "center" }}>Aggregated Data</h2>
      {renderAggregatedTable()}
      <h2 style={{ textAlign: "center" }}>Average Data</h2>
      {renderAverageTable()}
    </div>
  );
};

export default App;
