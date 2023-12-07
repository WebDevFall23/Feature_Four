import React, { useEffect, useState } from "react";
import {
    createUserPlant
  } from "../../Common/Services/UserPlantService";
  import UserPlantForm from "./UserPlantForm";
  import Parse from 'parse';



function UserPlantList() {
    const [newUserPlant, setNewUserPlant] = useState({plantName: "", light: "", water: "", toxicity: ""});

    const [add, setAdd] = useState(false);

    const currentUser = Parse.User.current();
    const onSubmitHandler = (e) => {
        console.log("on-submit", newUserPlant);
        e.preventDefault();
        if (newUserPlant && currentUser) {
          const userId = currentUser;
          console.log("User ID:", userId);
          createUserPlant(newUserPlant, userId)
        //.then((UserPlantCreated) => {
        //     setAdd(false);
        //     console.log("Creating a new plant");
        //     // Add the newly created plant to the plants array
        //   });
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
      <UserPlantForm userPlant={newUserPlant} onChange={onChangeHandler} onSubmit={onSubmitHandler}/>
    </div>
  );
}

export default UserPlantList;