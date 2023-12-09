import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    getPlantById, updatePlant
  } from "../../Common/Services/UserPlantService";
import Parse from 'parse';

function UpdatePlantList() {
  const { plantId } = useParams();
  const history = useNavigate();
  const [updatedPlant, setUpdatedPlant] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Fetch the plant data by ID and set it to the state
    getPlantById(plantId).then((plant) => {
      console.log("Type of plantImage:", typeof plant.plantImage);
      console.log("Plant data:", plant);
      if (plant.plantImage && plant.plantImage.url) {
        // Set the URL of the plant image to display it
        console.log("Image URL:", plant.plantImage.url);
        setUpdatedPlant({ ...plant, plantImage: plant.plantImage.url });
      } else {
        console.log("No valid plantImage URL found:", plant.plantImage);
        setUpdatedPlant(plant);
      }
    });
  }, [plantId]);

  const currentUser = Parse.User.current();
  const onSubmit = (e) => {
    e.preventDefault();
    // Call your updatePlant function to update the plant information
    console.log(updatedPlant)
    const userId = currentUser;
    updatePlant(updatedPlant, userId, file).then(() => {
      alert('Plant information updated successfully!');
      history('/profile');
    });
  };

  const onChange = (e, name) => {
    const { value, files } = e.target;
    // If it's a file input, handle the file separately
    if (name === 'plantImage' && files && files.length > 0) {
      const file = files[0];
      // Handle the file upload, you might want to use FileReader to convert it to a URL
      // and set it in the state
      handleFileUpload(file);
    } else {
      // For other input fields, update the state normally
      setUpdatedPlant((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileUpload = (file) => {
    setFile(file);

    // Display the image immediately after upload

      // Handle the image upload separately if needed
      // For example, set the imageURL state here or handle it differently
      const imageUrl = URL.createObjectURL(file);

      // Set the updatedPlant state with the new image URL
      setUpdatedPlant((prev) => ({
        ...prev,
        plantImage: imageUrl,
      }));
  
  };
  

  return (
    <div>
      <h1>Update Plant Information</h1>
      <form onSubmit={onSubmit}>
        <label>Plant Name:</label>
        <input
          type="text"
          value={updatedPlant.plantName || ''}
          onChange={(e) => onChange(e, 'plantName')}
          required
        />
        <br />

        <label>Light Requirement:</label>
        <input
          type="text"
          value={updatedPlant.light || ''}
          onChange={(e) => onChange(e, 'light')}
          required
        />
        <br />

        <label>Water:</label>
        <input
          type="text"
          value={updatedPlant.water || ''}
          onChange={(e) => onChange(e, 'water')}
          required
        />
        <br />

        <label>Toxicity:</label>
        <input
          type="text"
          value={updatedPlant.toxicity || ''}
          onChange={(e) => onChange(e, 'toxicity')}
          required
        />
        <br />

        {updatedPlant.plantImage && (
          <div>
            <h2>Current Plant Image</h2>
            <img src={updatedPlant.plantImage} alt="Current Plant" style={{ maxWidth: '100%', maxHeight: '400px' }} />
          </div>
        )}

        {/* Input for updating the plant image */}
        <label>Update Plant Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onChange(e, 'plantImage')} // Update the 'plantImage' attribute in the 'onChange' handler
        />
        <br />

        {/* Add other input fields for water, toxicity, etc. */}

        <button type="submit">Update Plant</button>
      </form>
    </div>
  );
}

export default UpdatePlantList;