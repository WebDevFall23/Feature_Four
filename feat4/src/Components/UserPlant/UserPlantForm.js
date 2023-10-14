import React from "react";

/* STATELESS CHILD COMPONENT */
const UserPlantForm = ({ userPlant, onChange, onSubmit }) => {
  return (
      <div>
        <form onSubmit={onSubmit}>
          <label>Plant Name:</label>
          <input
            type="plantName"
            value={userPlant.plantName}
            onChange={(e)=>onChange(e,"plantName")}
            required
          /><br/>

          <label>Light Requirement:</label>
          <input
            type="light"
            value={userPlant.light}
            onChange={(e)=>onChange(e,"light")}
            required
          /><br/>

          <label>Watering Frequency:</label>
          <input
            type="water"
            value={userPlant.water}
            onChange={(e)=>onChange(e,"water")}
            required
          /><br/>

        <label>Toxicity:</label>
          <input
            type="toxicity"
            value={userPlant.toxicity}
            onChange={(e)=>onChange(e,"toxicity")}
            required
          /><br/>

        <button type="submit" onSubmit={onSubmit}>Submit</button>
        </form>
      </div>
  );
};

export default UserPlantForm;