import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AllAgents() {
  const navigate = useNavigate();

  const [agents, setAgents] = useState<any[]>([]);
  useEffect(() => {
    const myAgentsNow = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found, please login");
        return;
      }
      const response = await fetch("http://localhost:5000/api/allUsers", {
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

      setAgents([...data]);
    };
    myAgentsNow();
  }, []);

  return (
    <div>
      <button onClick={() => navigate("/adminPage")}>
        come back to admin page
      </button>
      {agents.map((agent: any, idx: number) => {
        return (
          <div key={idx}>
            <strong>agent {idx + 1}</strong>
            <br />
            agentName:{agent.agent}. role:{agent.role}. agentCode:
            {agent.agentCode}. createdAt:{agent.createdAt}. updatedAt:
            {agent.updatedAt}. <br />
          </div>
        );
      })}
    </div>
  );
}
