import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { Agent } from "../types/IAgent.ts";

export default function CreateAcount() {
  const [agentNew, setAgentNew] = useState<Agent>({
    username: "",
    password: "",
    agentCode: "",
    role: "",
  });
  const navigate = useNavigate();

  const creteAgent = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No token found, please login");
      return;
    }
    const response = await fetch("http://localhost:5000/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        username: agentNew.username,
        password: agentNew.password,
        agentCode: agentNew.agentCode,
        role: agentNew.role,
      }),
    });
    if (!response.ok) {
      setAgentNew({
        username: "",
        password: "",
        agentCode: "",
        role: "",
      });
      toast.error("there is problem with details or agent exist");
      return;
    }
    toast.success("agent created");
    setAgentNew({
      username: "",
      password: "",
      agentCode: "",
      role: "",
    });
    return;
  };

  if (localStorage.getItem("role") !== "admin") {
    toast.error("go back to the right page");
    return;
  }

  return (
    <div>
      <button onClick={() => navigate("/adminPage")}>
        come back to admin page
      </button>
      <form action="" onSubmit={creteAgent}>
        <input
          required
          type="text"
          name="username"
          id="username"
          value={agentNew.username}
          placeholder="username"
          onChange={(e) =>
            setAgentNew((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <input
          required
          type="password"
          name="password"
          id="password"
          value={agentNew.password}
          placeholder="password"
          onChange={(e) =>
            setAgentNew((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <input
          required
          type="text"
          name="agentCode"
          id="agentCode"
          value={agentNew.agentCode}
          placeholder="agentCode"
          onChange={(e) =>
            setAgentNew((prev) => ({ ...prev, agentCode: e.target.value }))
          }
        />
        <input
          type="text"
          name="role"
          id="role"
          value={agentNew.role}
          placeholder="role"
          onChange={(e) =>
            setAgentNew((prev) => ({ ...prev, role: e.target.value }))
          }
        />
        <button type="submit">create agent</button>
      </form>
    </div>
  );
}
