import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React from "react";
import { useAuthStore } from "../store/authStore.ts";

export default function Login() {
  const { username, password, setUsername, setPassword } = useAuthStore();
  const navigate = useNavigate();

  const adminPage = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (!response.ok) {
      setPassword("");
      setUsername("");
      toast.error("username or password incorrect");
      return;
    }
    const data = await response.json();
    localStorage.setItem("token",`Bearer ${data.token}`);
    localStorage.setItem("role", data.role);
    toast.success("enjoy in your work");
    if (data.role === "admin") {
      navigate("/adminPage");
    }
    if (data.role === "agent") {
      navigate("/agentPage");
    }
  };

  return (
    <div>
      <h1>Welcome to reports agents system</h1>
      <label htmlFor="username">to login input your name and password</label>
      <form action="" onSubmit={adminPage}>
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
        <button type="submit">login</button>
      </form>
    </div>
  );
}
