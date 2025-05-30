import { useState } from "react";
import './InspectionForm.css';

const checkpoints = [
  "Is the surface clean and dust-free?",
  "Are all materials used approved and in good condition?",
  "Are measurements as per design?",
  "Has the curing been done properly?",
  "Is the workmanship satisfactory?"
];

function InspectionForm() {
  const [responses, setResponses] = useState({});
  const [images, setImages] = useState({});

  const handleChange = (index, field, value) => {
    setResponses({
      ...responses,
      [index]: { ...responses[index], [field]: value }
    });
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages({
          ...images,
          [index]: reader.result, 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const data = JSON.parse(localStorage.getItem("inspections") || "[]");
    data.push({ responses, status: "pending", images });
    localStorage.setItem("inspections", JSON.stringify(data));
    alert("Inspection Submitted");
  };

  return (
    <div className="inspection-form">
      <h2>Inspection Checklist</h2>
      {checkpoints.map((question, i) => (
        <div key={i} className="form-group">
          <p>{question}</p>
          <select onChange={(e) => handleChange(i, "answer", e.target.value)}>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="na">Not Applicable</option>
          </select>
          <br />
          <input
            placeholder="Comments"
            onChange={(e) => handleChange(i, "comment", e.target.value)}
          />
          <br />
          <label htmlFor={`imageUpload-${i}`}>Upload Image (Optional):</label>
          <input
            type="file"
            id={`imageUpload-${i}`}
            accept="image/*"
            onChange={(e) => handleImageChange(i, e)}
          />
          {images[i] && <img src={images[i]} alt="Uploaded Preview" className="image-preview" />}
        </div>
      ))}
      <br />
      <button onClick={handleSubmit} className="submit-button">Submit</button>
    </div>
  );
}

export default InspectionForm;
