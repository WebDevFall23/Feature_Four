import React from "react"; 

/* STATELESS CHILD COMPONENT */
const UserPlantForm = ({ userPlant, onChange, onSubmit, imageURL }) => {
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

        <label>Update Plant Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onChange(e, 'plantImage')} // Update the 'plantImage' attribute in the 'onChange' handler
        />
        <br />
        {imageURL && (
      <div>
        <h2>Uploaded Image</h2>
        <img src={imageURL} alt="Uploaded Plant" style={{ maxWidth: '100%', maxHeight: '400px' }} />
      </div>
    )}

        <button type="submit" onSubmit={onSubmit}>Submit</button>
        </form>
      </div>
  );
};

export default UserPlantForm;