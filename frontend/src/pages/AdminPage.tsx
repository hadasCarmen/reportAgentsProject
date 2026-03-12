import "./AdminPage.css";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();

  const reportHandig = () => {
    navigate("/reportHandig");
  };
  const reportCsv = () => {
    navigate("/reportCsv");
  };
  const myReports = () => {
    navigate("/myReports");
  };
  const createAcount = () => {
    navigate("/createAcount");
  };
  const allAgents = () => {
    navigate("/allAgents");
  };
  const allReports = () => {
    navigate("/allReports");
  };
  if (localStorage.getItem('role')!=='admin') {
      toast.error('go back to the right page')
      return;
    }
  return (
    <div className="allPage">
      <button  onClick={createAcount}>create acount agent</button>
      <button onClick={allAgents}>see all agents</button>
      <button onClick={reportHandig}>new report handing</button>
      <button onClick={reportCsv}>new report csv</button>
      <button onClick={myReports}>my reports</button>
      <button onClick={allReports}>see all reports</button>
    </div>
  );
}
