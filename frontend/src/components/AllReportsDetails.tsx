import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { Report } from "../types/IReport.ts";

type paramsType = {
  reports: Report[];
  setReports: (r: Report[]) => void;
};

export default function AllReportsDetails(params: paramsType) {
  const token = localStorage.getItem("token");
  const { setReports,reports } = params;


  useEffect(() => {
    const myReportsNow = async () => {
      if (!token) return toast.error("No token found, please login");

      const response = await fetch("http://localhost:5000/api/allReports", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) {
        toast.error("there is problem");
        return;
      }
      const data = await response.json();

      setReports([...data]);
    };
    myReportsNow();
  }, []);
  return (
    <div>
      <div className="items-container">
        {reports.map((report: any, idx: number) => {
          return (
            <div key={idx} className="item-card">
              <strong>report {idx + 1}</strong>
              <br />
              agent:{report.agent}. category:{report.category}. urgency:
              {report.urgency}. message:{report.message}. imagePath:
              {<img src={`http://localhost:5000/${report.imagePath}`} alt="" />}
              . sourceType:{report.sourceType}. <br />
            </div>
          );
        })}
      </div>
    </div>
  );
}
