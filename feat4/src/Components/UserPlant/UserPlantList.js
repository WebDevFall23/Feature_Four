import React, { useEffect, useState } from "react";
import {
    createUserPlant
  } from "../../Common/Services/UserPlantService";
  import UserPlantForm from "./UserPlantForm";
  import Parse from 'parse';
  import FileUpload from "./FileUpload";



function UserPlantList() {
    const [newUserPlant, setNewUserPlant] = useState({plantName: "", light: "", water: "", toxicity: ""});

    const [add, setAdd] = useState(false);
    const [file, setFile] = useState(null);
    const [imageURL, setImageURL] = useState(null);

    const onFileUpload = (uploadedFile) => {
      setFile(uploadedFile);

      // Display the image immediately after upload
      if (currentUser) {
        // Handle the image upload separately if needed
        // For example, set the imageURL state here or handle it differently
        const imageUrl = URL.createObjectURL(uploadedFile);
        setImageURL(imageUrl);
      }
    };

    const currentUser = Parse.User.current();
    const onSubmitHandler = (e) => {
        console.log("on-submit", newUserPlant);
        e.preventDefault();
        if (newUserPlant && currentUser) {
          const userId = currentUser;
          console.log("User ID:", userId);
          console.log("file out here", file);
          createUserPlant(newUserPlant, userId, file)
            .then((UserPlantCreated) => {
                setAdd(false);
                console.log("Creating a new plant");
                setNewUserPlant({
                  plantName: "",
                  light: "",
                  water: "",
                  toxicity: ""
                });
                setImageURL(null);
                // Add the newly created plant to the plants arr
                alert("Plant created successfully!");
              });
        }
        // re-render list with new plant
        setAdd(true);
    };
    
      // Handler to track changes to the child input text
      const onChangeHandler = (e, name) => {
        const { value, files } = e.target;
        // If it's a file input, handle the file separately
        if (name === 'plantImage' && files && files.length > 0) {
          const file = files[0];
          // Handle the file upload, you might want to use FileReader to convert it to a URL
          // and set it in the state
          onFileUpload(file);
        } else {
        setNewUserPlant(prevState => ({
            ...prevState,
            [name]: value
        }));
        }
      };

  return (
    <div>
      <h1>Add a New Plant</h1>
      <UserPlantForm userPlant={newUserPlant} onChange={onChangeHandler} onSubmit={onSubmitHandler} onFileUpload={onFileUpload} imageURL={imageURL}/>
    </div>
  );
}

export default UserPlantList;