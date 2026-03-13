import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { Report } from "../types/IReport.ts";
import AllReportsFilter from "../components/AllReportsFilter.tsx";
import AllReportsDetails from "../components/AllReportsDetails.tsx";

export default function AllReports() {
  const navigate = useNavigate();
    const [reports, setReports] = useState<Report[]>([]);

  

  if (localStorage.getItem("role") !== "admin") {
    toast.error("go back to the right page");
    return;
  }
  return (
    <div className="page-wrapper">
      <button onClick={() => navigate("/adminPage")}>
        come back to admin page
      </button>
      <AllReportsFilter setReports={setReports}/>
      <AllReportsDetails setReports={setReports} reports={reports}/>
    </div>
  );
}
