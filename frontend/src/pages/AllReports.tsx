import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { Report } from "../types/IReport.ts";
import type { User } from "../types/IUser.ts";

export default function AllReports() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [reports, setReports] = useState<Report[]>([]);
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
  const [allAgent, setAllAgents] = useState<User[]>([]);

  const [agentName, setAgentName] = useState("");
  const [category, setCategory] = useState("");
  const [urgency, setUrgency] = useState("");
  useEffect(() => {
    const fetchi = async () => {
      if (!token) return toast.error("No token found, please login");

      const responseAgent = await fetch("http://localhost:5000/api/allUsers", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!responseAgent.ok) {
        toast.error("there is problem");
        return;
      }
      const dataAgents = await responseAgent.json();
      setAllAgents(dataAgents);
    };
    fetchi();
  }, []);
  const filtering = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!token) return toast.error("No token found, please login");

    const params = new URLSearchParams();

    if (agentName) params.append("agent", agentName);
    if (category) params.append("category", category);
    if (urgency) params.append("urgency", urgency);

    const response = await fetch(
      `http://localhost:5000/api/allReports?${params}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
    );
    const data = await response.json();
    setReports([...data]);
  };

  if (localStorage.getItem("role") !== "admin") {
    toast.error("go back to the right page");
    return;
  }
  return (
    <div className="page-wrapper">
      <button onClick={() => navigate("/adminPage")}>
        come back to admin page
      </button>
      <form action="" onSubmit={filtering}>
        <h3>input filter if yoe want</h3>
        <select
          name="agentName"
          id="agentName"
          value={agentName}
          onChange={(e) => setAgentName(e.target.value)}
        >
          <option value="">all agents</option>
          {allAgent.map((agent: User) => {
            return (
              <option key={agent._id} value={agent._id}>
                {agent.username}
              </option>
            );
          })}
        </select>

        <input
          type="text"
          name="category"
          id="category"
          value={category}
          placeholder="category"
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          name="urgency"
          id="urgency"
          value={urgency}
          placeholder="urgency"
          onChange={(e) => setUrgency(e.target.value)}
        />
        <button type="submit">filter</button>
      </form>
      <div className="items-container">
        {reports.map((report: any, idx: number) => {
          return (
            <div key={idx} className="item-card">
              <strong>report {idx + 1}</strong>
              <br />
              agent:{report.agent}. category:{report.category}. urgency:
              {report.urgency}. message:{report.message}. imagePath:
              {report.imagePath}. sourceType:{report.sourceType}. <br />
            </div>
          );
        })}
      </div>
    </div>
  );
}
