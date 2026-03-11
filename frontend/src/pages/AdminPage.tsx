import "./AdminPage.css";

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

  return (
    <div className="allPage">
      <button  onClick={createAcount}>create acount agent</button>
      <button onClick={allAgents}>see all agents</button>
      <button onClick={reportHandig}>new report handing</button>
      <button onClick={reportCsv}>new report csv</button>
      <section onClick={myReports}>my reports</section>
      <button onClick={allReports}>see all reports</button>
    </div>
  );
}
