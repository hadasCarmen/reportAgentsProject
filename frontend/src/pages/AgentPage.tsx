import { useNavigate } from "react-router-dom";

export default function AgentPage() {
  const navigate = useNavigate();

  const reportHandig=()=>{
    navigate('/reportHandig')
  }
  const reportCsv=()=>{
    navigate('/reportCsv')
  }
  const myReports=()=>{
    navigate('/myReports')
  }
  return (
    <div>
      <button onClick={reportHandig}>new report handing</button>
      <button onClick={reportCsv}>new report csv</button>
      <button onClick={myReports}>my reports</button>
    </div>
  );
}
