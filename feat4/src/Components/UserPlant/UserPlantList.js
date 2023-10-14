import React, { useEffect, useState } from "react";
import {
    createUserPlant,
    getById
  } from "../../Common/Services/UserPlantService";
  import UserPlantForm from "./UserPlantForm";



function UserPlantList() {
    const [newUserPlant, setNewUserPlant] = useState({plantName: "", light: "", water: "", toxicity: ""});

    const [add, setAdd] = useState(false);

 
    const onSubmitHandler = (e) => {
        console.log("onsubmit", newUserPlant.length);
        e.preventDefault();
        if (newUserPlant) {
            getById("kzFacP5Ym4").then((profile) => {
                createUserPlant(newUserPlant, profile).then((UserPlantCreated) => {
                setAdd(false);
                console.log("Creating a new plant");
                // Add the newly created plant to the plants array
          });
        });
    }
        // re-render list with new plant
        setAdd(true);

      };
    
      // Handler to track changes to the child input text
      const onChangeHandler = (e, name) => {
        e.preventDefault();
        console.log(e.target.value);
        // Continuously updating name to be added on submit
        const { value: newValue } = e.target;
        console.log(newValue);

        setNewUserPlant(prevState => ({
            ...prevState,
            [name]: newValue
        }));
      };

  return (
    <div>
      <h1>Add a New Plant</h1>
      <UserPlantForm userPlant={newUserPlant} onSubmit={onSubmitHandler} onChange={onChangeHandler} />
    </div>
  );
}

export default UserPlantList;
