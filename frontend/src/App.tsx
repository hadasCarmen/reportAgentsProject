import "./App.css";
import AdminPage from "./pages/AdminPage.tsx";
import AgentPage from "./pages/AgentPage.tsx";
import Login from "./pages/Login.tsx";
import ReportHandig from "./pages/ReportHandig.tsx";
import ReportCsv from "./pages/ReportCsv.tsx";
import MyReports from "./pages/MyReports.tsx";
import CreateAcount from "./pages/CreateAcount.tsx";
import AllAgents from "./pages/AllAgents.tsx";
import AllReports from "./pages/AllReports.tsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Protected from "./pages/Protected.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Protected />}>
            <Route path="/adminPage" element={<AdminPage />} />
            <Route path="/agentPage" element={<AgentPage />} />
            <Route path="/reportHandig" element={<ReportHandig />} />
            <Route path="/reportCsv" element={<ReportCsv />} />
            <Route path="/myReports" element={<MyReports />} />
            <Route path="/createAcount" element={<CreateAcount />} />
            <Route path="/allAgents" element={<AllAgents />} />
            <Route path="/allReports" element={<AllReports />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
