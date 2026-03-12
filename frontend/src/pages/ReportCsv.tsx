import  { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ReportCsv() {
    const navigate = useNavigate();

  const [fileCurrent, setFileCurrent] = useState<File | null>(null);
  const sendCsv = async () => {
    if (!fileCurrent) return;

    const formData = new FormData();
    formData.append("csv", fileCurrent);

    const token=localStorage.getItem('token')

    const response=await fetch("http://localhost:5000/api/reportCsv",{
      method:'POST',
      headers:{
        
        Authorization:`${token}`
      },
      body:formData
    })
    const {created}=await response.json()
    created?toast.success(`created ${created} reports`):toast.error('not reports created')
  };
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
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFileCurrent(e.target.files?.[0] || null)}
      />
      <button onClick={sendCsv}>upload reports from csv</button>
    </div>
    
  );
}
