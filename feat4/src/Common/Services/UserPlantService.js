import Parse from "parse";

export const createUserPlant = async (newUserPlant, userId, file) => {
  const UserPlant = Parse.Object.extend("UserPlant");

  const userplant = new UserPlant();
  //set all the valuse to create a new plant
  userplant.set("plantName", newUserPlant.plantName);
  userplant.set("light", newUserPlant.light);
  userplant.set("water", newUserPlant.water);
  userplant.set("toxicity", newUserPlant.toxicity);
  userplant.set("user", userId);

  //which images are allowed
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
  //gets the user id
  const userIdString = getUserIdString(userId);

  if (file && allowedImageTypes.includes(file.type)) {
    const originalFilename = file.name;
    //cleans the name of the file so that it's accesptable by parse and can keep track of images that belong to the user
    const sanitizedFilename = originalFilename.replace(/[^a-zA-Z0-9_.]/g, '_');
    const fileName = `${userIdString}_${Date.now()}_${sanitizedFilename}`;

    const parseFile = new Parse.File(fileName, file);

    return parseFile.save().then(() => {
      //set the image as well
      userplant.set('plantImage', parseFile);
      return userplant.save().then((result) => {
        console.log("Plant created successfully:", result);
        return result;
      });
    }).catch(error => {
      //error handling
      console.error('Error saving file:', error);
      throw error;
    });
  } else {
    // Handle invalid files
    console.error('Invalid file type. Please upload a valid image.');
    throw new Error('Invalid file type');
  }
};

export const getUserPlants = async (userId) => {
  const UserPlant = Parse.Object.extend("UserPlant");
  const query = new Parse.Query(UserPlant);
  //gets all the plants with the same id
  query.equalTo("user", userId);
  //returns these plants
  return query.find()
    .then((userPlants) => {
      return userPlants;
    })
    .catch((error) => {
      //error handling
      console.error("Error retrieving user plants:", error);
      throw error;
    });
};

const getUserIdString = (userId) => {
  //retrieves the user id
  if (userId && userId.className === '_User' && userId.id) {
    return userId.id;
  } else {
    console.error('Invalid userId. Unable to extract user ID.');
    throw new Error('Invalid userId');
  }
};

//gets a plant by it's id so id is passed in
export const getPlantById = (plantId) => {
  const Plant = Parse.Object.extend('UserPlant');
  const query = new Parse.Query(Plant);
  //gets the plant
  return query.get(plantId)
    .then((plant) => plant.toJSON())
    .catch((error) => {
      console.error('Error fetching plant by ID:', error);
      throw error;
    });
};


export const updatePlant = (updatedPlant, userId, file) => {
  const Plant = Parse.Object.extend('UserPlant');
  const query = new Parse.Query(Plant);
  
  //gets the info about the updated plant values, the new image, and the user making this mdoification
  //sets the new values
  return query
    .get(updatedPlant.objectId)
    .then((plant) => {

      plant.set('plantName', updatedPlant.plantName);
      plant.set('light', updatedPlant.light);
      plant.set('water', updatedPlant.water);
      plant.set('toxicity', updatedPlant.toxicity);

      //handles the images same as before 
      if (file && file.type) {
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

        if (allowedImageTypes.includes(file.type)) {
          const userIdString = getUserIdString(userId);
          const originalFilename = file.name;
          //cleaning up the file name
          const sanitizedFilename = originalFilename.replace(/[^a-zA-Z0-9_.]/g, '_');
          const fileName = `${userIdString}_${Date.now()}_${sanitizedFilename}`;

          const parseFile = new Parse.File(fileName, file);
          //set the image
          return parseFile.save().then(() => {
            plant.set('plantImage', parseFile);
            //save it
            return plant.save().then((result) => {
              return result;
            });
          });
        } else {
          //error handling
          throw new Error('Invalid file type');
        }
      } else {
        return plant.save().then((result) => {
          return result;
        });
      }
    })
    .catch((error) => {
      console.error('Error updating plant:', error);
      throw error;
    });
};

//removes a plant from user plants
export const removePlant = (plantId) => {
  const PlantObject = Parse.Object.extend('UserPlant'); 
  const plantQuery = new Parse.Query(PlantObject);
  //gets the id and removes it from parse
  return plantQuery
    .get(plantId)
    .then((plant) => {
      return plant.destroy();
    })
    .then(() => {
      console.log(`${plantId} removed successfully.`);
    })
    .catch((error) => {
      //error handling
      console.error(`Error removing plant with ID ${plantId}:`, error);
      throw error; 
    });
};



