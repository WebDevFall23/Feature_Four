import React, { useEffect, useState } from "react";
import {
    createUserPlant,
    getById
  } from "../../Common/Services/UserPlantService";
  import UserPlantForm from "./UserPlantForm";



function UserPlantList() {
    const [newUserPlant, setNewUserPlant] = useState([]);

  const [add, setAdd] = useState(false);

  
  // UseEffect that runs when changes
  // are made to the state variables/flags
  useEffect(() => {
    // Check for add flag and make sure name state variable is defined
    
    if (newUserPlant.length > 0 && add) {
        getById("kzFacP5Ym4").then((profile) => {
            createUserPlant(newUserPlant, profile).then((UserPlantCreated) => {
            setAdd(false);
            console.log("Creating a new plant");
            // Add the newly created plant to the plants array
            setNewUserPlant([...newUserPlant, UserPlantCreated]);
      });
    });
    } }, [newUserPlant, add]);
 
    const onSubmitHandler = (e) => {
        e.preventDefault();
        // Trigger add flag to create plant and
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
