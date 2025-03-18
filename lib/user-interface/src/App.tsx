import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AuthPage from "./pages/Auth";
import CsvUploadPage from "./pages/csvUpload";

function App() {
  return (
    <div className="App">
      <div>
        <AuthPage />
      </div>

      <div>
        <CsvUploadPage />
      </div>
    </div>
  );
}

export default App;
