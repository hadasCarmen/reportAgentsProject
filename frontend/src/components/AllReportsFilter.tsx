import React, { useEffect, useState } from "react";
import type { User } from "../types/IUser";
import { toast } from "react-toastify";
import type { Report } from "../types/IReport.ts";

type paramsType = {
  // setReports: React.Dispatch<React.SetStateAction<Report[]>>
  setReports: (r: Report[]) => void;
};

export default function AllReportsFilter(params: paramsType) {
  const token = localStorage.getItem("token");
  const { setReports } = params;
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
  return (
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
  );
}
