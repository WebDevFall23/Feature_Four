import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    getPlantById, updatePlant
  } from "../../Common/Services/UserPlantService";
import Parse from 'parse';
import "./UpdatePlantDesign.css"

function UpdatePlantList() {
  const { plantId } = useParams();
  const history = useNavigate();
  const [updatedPlant, setUpdatedPlant] = useState({});
  const [file, setFile] = useState(null);

  //get the informaiton of the existing plant by the id used to reroute to this page
  useEffect(() => { 
    getPlantById(plantId).then((plant) => {
      //if there is an image then set the image as well else just do the plant info
      if (plant.plantImage && plant.plantImage.url) {
        setUpdatedPlant({ ...plant, plantImage: plant.plantImage.url });
      } else {
        console.log("No valid plantImage URL found:", plant.plantImage);
        setUpdatedPlant(plant);
      }
    });
  }, [plantId]);

  //has to get the current user for the user field in userPlants
  const currentUser = Parse.User.current();
  const onSubmit = (e) => {
    e.preventDefault();
    const userId = currentUser;
    //takes in the new info and updates the plant when user submits
    updatePlant(updatedPlant, userId, file).then(() => {
      alert('Plant information updated successfully!');
      history('/profile');
    });
  };

  //keeps track of the user inputs
  const onChange = (e, name) => {
    const { value, files } = e.target;
    //checks if there is a file so it can be handled as a file -image
    if (name === 'plantImage' && files && files.length > 0) {
      const file = files[0];
      handleImageUpload(file);
    } else {
      setUpdatedPlant((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  //handles the images
  const handleImageUpload = (file) => {
    setFile(file);
      //needs the url as a property for the image
      const imageUrl = URL.createObjectURL(file);
      //update the plant with this image
      setUpdatedPlant((prev) => ({
        ...prev,
        plantImage: imageUrl,
      })); 
  };
  
  return (
    <div className="update-plant-form"> 
    {/* Everything inisde the form prefilled  */}
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

        <label>Update Plant Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onChange(e, 'plantImage')} 
        />
        <br />

        <button type="submit">Update Plant</button>
      </form>
    </div>
  );
}

export default UpdatePlantList;