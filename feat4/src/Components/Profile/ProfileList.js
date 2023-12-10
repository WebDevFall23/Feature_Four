import React, { useState, useEffect } from 'react';
import Parse from 'parse';
import {
  getUserPlants, removePlant
} from "../../Common/Services/UserPlantService";
import { Link } from 'react-router-dom';
import "./ProfileDesign.css"


const ProfileList = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [add, setAdd] = useState(true);
  const [userPlants, setUserPlants] = useState([]);

  //gets the current user so that is can be displayed in the profile
  //triggered with a new current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = Parse.User.current();
        if (user) {
          setCurrentUser(user);
          setAdd(false);
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };
    if (currentUser === null && add) {
      fetchCurrentUser();
    }
  }, [currentUser, add]);


  //trigged when there is a differnt user
  useEffect(() => {

    //gets the current user
    const userId = Parse.User.current();

    //get the plants based on the current user id
    getUserPlants(userId)
      .then((plants) => {
        console.log("testing", userId); 
        //set the plants that have been retrieved
        setUserPlants(plants);
      })
      .catch((error) => {
        // Handle error
        console.error("Error getting user plants:", error);
      });
  }, [currentUser]);

  //removes a plant
  const handleRemovePlant = (plantId) => {
    
     //calls the service that has the function to remove the plant based of the plant id
    removePlant(plantId)
      .then(() => {
        setUserPlants((prevUserPlants) =>
          prevUserPlants.filter((plant) => plant.id !== plantId)
        );
      })
      .catch((error) => {
        console.error(`Error removing plant with ID ${plantId}:`, error);
      });
  };

  //allows for the plant info to be in the button that can be clicked to navigate to its edit page
  const handlePlantButtonClick = (plant) => {
    console.log(`Button clicked for plant: ${plant.get("plantName")}`);
  };

  return (
    <div className="your-component">
      <div className="user-info">
        {/* User info not in loop for plants*/}
        {currentUser && (
          <div key={currentUser.id}>
            <h1 className="user-name">
              {currentUser.get('firstName')} {currentUser.get('lastName')}
            </h1>
            <p className="bio"> Bio: {currentUser.get('bio')}</p>
          </div>
        )}

        {/* User info update button not in loop for plants */}
        <Link to="/updateprofile">
          <button className="update-profile-button">Update Profile</button>
        </Link>
          {/* Display all plants for user */}
        <div className="plant-buttons-container">
          {userPlants.map((plant) => (
            <div key={plant.id} className="plant-button-container">
              <button
                onClick={() => handlePlantButtonClick(plant)}
                className="plant-button"
              >
                <Link to={`/plants/${plant.id}/update`} className="plant-button-link">
                  Plant Name: {plant.get("plantName")}
                  <br />
                  Light: {plant.get("light")}
                  <br />
                  Water: {plant.get("water")}
                  <br />
                  Toxicity: {plant.get("toxicity")}
                  <br />
                  {plant.get("plantImage") && (
                    <img
                      src={plant.get("plantImage").url()}
                      alt={`Image of ${plant.get("plantName")}`}
                      className="plant-image"
                    />
                  )}
                </Link>
              </button>
              
              {/* Remove the plant */}
              <div>
                <button
                  onClick={() => handleRemovePlant(plant.id)}
                  className="remove-plant-button"
                >
                  Remove Plant
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default ProfileList;
