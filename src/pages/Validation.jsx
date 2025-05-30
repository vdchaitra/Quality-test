function Validation() {
    const inspections = JSON.parse(localStorage.getItem("inspections") || "[]");
  
    const handleValidation = (index, status) => {
      const updated = [...inspections];
      updated[index].status = status;
      localStorage.setItem("inspections", JSON.stringify(updated));
      window.location.reload();
    };
  
    return (
      <div>
        <h2>Pending Validations</h2>
        {inspections.map((item, i) =>
          item.status === "pending" ? (
            <div key={i} style={{ border: "1px solid #ccc", padding: 10 }}>
              <h4>Inspection {i + 1}</h4>
              {Object.values(item.responses).map((r, idx) => (
                <p key={idx}>Answer: {r.answer}, Comment: {r.comment}</p>
              ))}
              <button onClick={() => handleValidation(i, "approved")}>Approve</button>
              <button onClick={() => handleValidation(i, "rejected")}>Reject</button>
            </div>
          ) : null
        )}
      </div>
    );
  }
  export default Validation;