import React, { useEffect, useState } from "react";
import {
    createUserPlant
  } from "../../Common/Services/UserPlantService";
import UserPlantForm from "./UserPlantForm";
import Parse from 'parse';
import "./UserPlantDesign.css";



function UserPlantList() {
    const [newUserPlant, setNewUserPlant] = useState({plantName: "", light: "", water: "", toxicity: ""});
    const [add, setAdd] = useState(false);
    const [file, setFile] = useState(null);
    const [imageURL, setImageURL] = useState(null);

    //handles image uploads
    const onImageUpload = (uploadedFile) => {
      setFile(uploadedFile);
      if (currentUser) {
        //need the image url for parse
        const imageUrl = URL.createObjectURL(uploadedFile);
        setImageURL(imageUrl);
      }
    };

    //needs current user so the plant can belong to that user
    const currentUser = Parse.User.current();
    //when submitting
    const onSubmitHandler = (e) => {
        e.preventDefault();
        //checks that the plant and user are valid
        if (newUserPlant && currentUser) {
          const userId = currentUser;
          //sets the info to parse for UserPlant
          createUserPlant(newUserPlant, userId, file)
            .then((UserPlantCreated) => {
                setAdd(false);
                setNewUserPlant({
                  plantName: "",
                  light: "",
                  water: "",
                  toxicity: ""
                });
                setImageURL(null);
                alert("Plant created successfully!");
              });
        }
        setAdd(true);
    };
    
    //takes care of the user input (gets what the user is typing for the fields)
    const onChangeHandler = (e, name) => {
        const { value, files } = e.target;
        //if an image has been uploaded then allow it to be handled as a file
        if (name === 'plantImage' && files && files.length > 0) {
          const file = files[0];
          onImageUpload(file);
        } else {
          //otherwise checks the other fields
        setNewUserPlant(prevState => ({
            ...prevState,
            [name]: value
        }));
        }
    };

  //what is displayed on the page takes in the form to create a new plant
  return (
    <div>
      <h1 className="new-plant-title">Add a New Plant</h1>
      <UserPlantForm userPlant={newUserPlant} onChange={onChangeHandler} onSubmit={onSubmitHandler} onImageUpload={onImageUpload} imageURL={imageURL}/>
    </div>
  );
}

export default UserPlantList;