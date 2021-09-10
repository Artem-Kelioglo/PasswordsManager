import React from 'react';
import Table from './Table.js';
export default function PanelPassword() {

  return (
    <div style={{ width: "60%", margin: "0 auto "}}>
      <div style={{ display: "flex", justifyContent: "space-between",  backgroundColor: "#1E90FF", padding:"10px",borderRadius:"5px"}}>
        <div>Your data</div>
      </div>
      <div>
      </div>
      <div>
        <Table/>
      </div>
    </div>
  )
}