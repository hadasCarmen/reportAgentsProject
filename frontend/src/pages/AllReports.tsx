import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AllReports() {
   const [reports, setReports] = useState<any[]>([]);
    useEffect(() => {
      const myReportsNow = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("No token found, please login");
          return;
        }
        const response = await fetch("http://localhost:5000/api/allReports", {
          method: "GET",
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
  
        setReports([...data]) ;
      };
      myReportsNow();
    }, []);
  
    return (
      <div>
        {reports.map((report: any, idx: number) => {
          return (
            <div key={idx}>
              <strong>report {idx + 1}</strong>
              <br />
              agent:{report.agent}. category:{report.category}. urgency:
              {report.urgency}. message:{report.message}. imagePath:
              {report.imagePath}. sourceType:{report.sourceType}. <br />
            </div>
          );
        })}
      </div>
    );
}
