import React, { useState, useEffect } from 'react';
import Parse from 'parse';
import {
  getUserPlants
} from "../../Common/Services/UserPlantService";
import { Link } from 'react-router-dom';

const YourComponent = () => {
  const [editingBio, setEditingBio] = useState(false);
  const [newBio, setNewBio] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [add, setAdd] = useState(true);
  const [userPlants, setUserPlants] = useState([]);

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

  useEffect(() => {
    // Assuming you have a function to get the current user ID
    const userId = Parse.User.current();
    console.log("usertest", userId);

    // Fetch UserPlant data for the current user
    getUserPlants(userId)
      .then((plants) => {
        console.log("testing", userId);
        setUserPlants(plants);
      })
      .catch((error) => {
        // Handle error
        console.error("Error getting user plants:", error);
      });
  }, [currentUser, add]);

  const handleEditBioClick = () => {
    setEditingBio(true);
    setNewBio(currentUser.get('bio') || ''); // Set initial value to current bio
  };

  const handleSaveBio = () => {
    currentUser.set('bio', newBio);
    currentUser.save().then(() => {
      // After saving the bio, update the currentUser state to reflect the changes
      setCurrentUser(currentUser.clone());
      setEditingBio(false);
    });
  };

  const handlePlantButtonClick = (plant) => {
    // Define the behavior when a plant button is clicked
    // For example, you can update state, navigate to a new page, etc.
    console.log(`Button clicked for plant: ${plant.get("plantName")}`);
    // Add your custom logic here
  };

  console.log("User Plants State:", userPlants);
  return (
    <div>
      <div>
        {currentUser && (
          <div key={currentUser.id}>
            <p>
              Name: {currentUser.get('firstName')} {currentUser.get('lastName')}
              <br />
              Bio: {currentUser.get('bio')}
            </p>
          </div>
        )}
        {editingBio ? (
          <div>
            <textarea value={newBio} onChange={(e) => setNewBio(e.target.value)} />
            <button onClick={handleSaveBio}>Save Bio</button>
          </div>
        ) : (
          <div>
            <button onClick={handleEditBioClick}>Edit Bio</button>
          </div>
        )}
     <div>
        {userPlants.map((plant) => (
          <button
            key={plant.id}
            onClick={() => handlePlantButtonClick(plant)}
          >
            <Link to={`/plants/${plant.id}/update`}>
            {/* Display information about each plant as button text */}
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
            style={{ maxWidth: '100%', maxHeight: '200px' }}
          />
        )}
        </Link>
          </button>
        ))}
      </div>
      </div>
    </div>
  );
};

export default YourComponent;
