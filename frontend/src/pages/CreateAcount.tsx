import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateAcount() {
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
        username,
        password,
        agentCode,
        role,
      }),
    });
    if (!response.ok) {
      setPassword("");
      setUsername("");
      setAgentCode("");
      setRole("");
      toast.error("there is problem with details or agent exist");
      return;
    }
    toast.success("agent created");
    setPassword("");
    setUsername("");
    setAgentCode("");
    setRole("");
    return;
  };
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agentCode, setAgentCode] = useState("");
  const [role, setRole] = useState("");
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          required
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          required
          type="text"
          name="agentCode"
          id="agentCode"
          value={agentCode}
          onChange={(e) => setAgentCode(e.target.value)}
        />
        <input
          type="text"
          name="role"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button type="submit">create agent</button>
      </form>
    </div>
  );
}
