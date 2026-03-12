import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function MyReports() {
  const navigate = useNavigate();

  const [reports, setReports] = useState<any[]>([]);
  useEffect(() => {
    const myReportsNow = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found, please login");
        return;
      }
      const response = await fetch("http://localhost:5000/api/myReports", {
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

      setReports([...data]);
    };
    myReportsNow();
  }, []);
  const adminNavigate = () => {
    if (localStorage.getItem("role") === "admin") {
      navigate("/adminPage");
      return;
    }
    toast.error("you not admin!");
    return;
  };
  const agentNavigate = () => {
    if (localStorage.getItem("role") === "agent") {
      navigate("/agentPage");
      return;
    }
    toast.error("you have admin page!");
    return;
  };
  return (
    <div>
      <button onClick={ adminNavigate}>
        come back to admin page
      </button>
      <button onClick={agentNavigate}>
        come back to agent page
      </button>
      {reports.length > 0 ? (
        reports.map((report: any, idx: number) => {
          return (
            <div key={idx}>
              <strong>report {idx + 1}</strong>
              <br />
              agent:{report.agent}. category:{report.category}. urgency:
              {report.urgency}. message:{report.message}. imagePath:
              {report.imagePath}. sourceType:{report.sourceType}. <br />
            </div>
          );
        })
      ) : (
        <h1>you dont have reports </h1>
      )}
    </div>
  );
}
