import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ReportHandig() {
    const navigate = useNavigate();

  const createReport = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No token found, please login");
      return;
    }
    const response = await fetch("http://localhost:5000/api/reportRegular", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        category,
        urgency,
        message,
        sourceType: "handing",
        imagePath,
      }),
    });
    if (!response.ok) {
      setCategory("");
      setUrgency("");
      setMessage("");
      setImagePath("");
      toast.error("there is problem with details or agent exist");
      return;
    }
    toast.success("report created");
    setCategory("");
    setUrgency("");
    setMessage("");
    setImagePath("");
    return;
  };

  const [category, setCategory] = useState("");
  const [urgency, setUrgency] = useState("");
  const [message, setMessage] = useState("");
  const [imagePath, setImagePath] = useState("");

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
      <button onClick={adminNavigate}>
        come back to admin page
      </button>
      <button onClick={agentNavigate}>
        come back to agent page
      </button>
      <form action="" onSubmit={createReport}>
        <input
          required
          type="text"
          name="category"
          id="category"
          value={category}
          placeholder="category"
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          required
          type="text"
          name="urgency"
          id="urgency"
          value={urgency}
          placeholder="urgency"
          onChange={(e) => setUrgency(e.target.value)}
        />

        <input
          required
          type="text"
          name="message"
          id="message"
          value={message}
          placeholder="message"
          onChange={(e) => setMessage(e.target.value)}
        />

        <input
          type="text"
          name="imagePath"
          id="imagePath"
          value={imagePath}
          placeholder="imagepath"
          onChange={(e) => setImagePath(e.target.value)}
        />
        <button type="submit">create report</button>
      </form>
    </div>
  );
}
