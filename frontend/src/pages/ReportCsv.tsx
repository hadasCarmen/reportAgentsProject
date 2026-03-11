import React, { useState } from "react";

export default function ReportCsv() {
  const [fileCurrent, setFileCurrent] = useState<File | null>(null);
  const [numberOfReports,setNumberOfReports]=useState<number>(0)
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
    setNumberOfReports(created)
  };

  return (
    <div>
      
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFileCurrent(e.target.files?.[0] || null)}
      />
      <button onClick={sendCsv}>upload reports from csv</button>
    {numberOfReports?<div>{numberOfReports} send succses</div>:null}
    </div>
    
  );
}
