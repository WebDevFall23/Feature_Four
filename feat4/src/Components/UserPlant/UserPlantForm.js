import React from "react"; 
import "./UserPlantDesign.css";

const UserPlantForm = ({ userPlant, onChange, onSubmit, imageURL }) => {
  //form to create plant with the fields to fill in
  return (
    <div className="user-plant-form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Plant Name:</label>
          <input
            type="plantName"
            value={userPlant.plantName}
            onChange={(e) => onChange(e, "plantName")}
            required
          />
        </div>

        <div className="form-group">
          <label>Light Requirement:</label>
          <input
            type="light"
            value={userPlant.light}
            onChange={(e) => onChange(e, "light")}
            required
          />
        </div>

        <div className="form-group">
          <label>Watering Frequency:</label>
          <input
            type="water"
            value={userPlant.water}
            onChange={(e) => onChange(e, "water")}
            required
          />
        </div>

        <div className="form-group">
          <label>Toxicity:</label>
          <input
            type="toxicity"
            value={userPlant.toxicity}
            onChange={(e) => onChange(e, "toxicity")}
            required
          />
        </div>

        <div className="form-group">
          <label>Update Plant Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onChange(e, "plantImage")}
          />
        </div>

        {imageURL && (
          <div>
            <h2>Uploaded Image</h2>
            <img
              src={imageURL}
              alt="Uploaded Plant"
              style={{ maxWidth: "100%", maxHeight: "400px" }}
            />
          </div>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserPlantForm;