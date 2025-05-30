import React from 'react';
import './History.css';  

function History() {
  const inspections = JSON.parse(localStorage.getItem("inspections") || "[]");

  return (
    <div className="history-container">
      <h2 className="history-title">Inspection History</h2>
      {inspections.map((item, i) => (
        <div key={i} className="inspection-item">
          <h4 className="inspection-title">Inspection {i + 1} - {item.status}</h4>
          {Object.values(item.responses).map((r, idx) => (
            <div key={idx} className="inspection-response">
              <p><strong>Answer:</strong> {r.answer}</p>
              <p><strong>Comment:</strong> {r.comment}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default History;
