import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/Auth";
import CsvUploadPage from "./pages/csvUpload";
import ReportPage from "./pages/viewCharts";
import NavbarComponent from "./components/Navbar";
import { CSVProvider } from "./components/csvBuffer";

function App() {
  return (
    <CSVProvider>
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path="/auth/login" element={<AuthPage />} />
          <Route path="/upload-csv" element={<CsvUploadPage />} />
          <Route path="/view-charts" element={<ReportPage />} />
          {/* Add other routes as needed */}
        </Routes>
      </Router>
    </CSVProvider>
  );
}

export default App;
