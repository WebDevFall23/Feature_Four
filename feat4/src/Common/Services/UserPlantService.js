import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// CREATE operation - new plant with Name
export const createUserPlant = async (newUserPlant, userId, file) => {
  const UserPlant = Parse.Object.extend("UserPlant");

  const userplant = new UserPlant();

  userplant.set("plantName", newUserPlant.plantName);
  userplant.set("light", newUserPlant.light);
  userplant.set("water", newUserPlant.water);
  userplant.set("toxicity", newUserPlant.toxicity);
  userplant.set("user", userId);

  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const userIdString = getUserIdString(userId);

  if (file && allowedImageTypes.includes(file.type)) {
    const originalFilename = file.name;
    const sanitizedFilename = originalFilename.replace(/[^a-zA-Z0-9_.]/g, '_');
    const fileName = `${userIdString}_${Date.now()}_${sanitizedFilename}`;

    const parseFile = new Parse.File(fileName, file);

    return parseFile.save().then(() => {
      // Attach the file to the UserPlant object
      userplant.set('plantImage', parseFile);

      // Save the UserPlant object
      return userplant.save().then((result) => {
        console.log("Plant created successfully:", result);
        return result;
      });
    }).catch(error => {
      console.error('Error saving file:', error);
      throw error;
    });
  } else {
    // Handle invalid file type
    console.error('Invalid file type. Please upload a valid image.');
    throw new Error('Invalid file type');
  }
};

export const getUserPlants = async (userId) => {
  const UserPlant = Parse.Object.extend("UserPlant");
  const query = new Parse.Query(UserPlant);
  console.log("Query Parameters:", query.toJSON());

  // Set up query to retrieve UserPlant data for the current user
  query.equalTo("user", userId);
  console.log("useridinservice", userId);
  return query.find()
    .then((userPlants) => {
      console.log("userplantinservecie", userPlants);
      return userPlants;
    })
    .catch((error) => {
      console.error("Error retrieving user plants:", error);
      throw error;
    });
};

const getUserIdString = (userId) => {
  if (userId && userId.className === '_User' && userId.id) {
    return userId.id;
  } else {
    console.error('Invalid userId. Unable to extract user ID.');
    throw new Error('Invalid userId');
  }
};

export const getPlantById = (plantId) => {
  const Plant = Parse.Object.extend('UserPlant');
  const query = new Parse.Query(Plant);

  return query.get(plantId)
    .then((plant) => plant.toJSON())
    .catch((error) => {
      console.error('Error fetching plant by ID:', error);
      throw error;
    });
};

// Function to update plant data
export const updatePlant = (updatedPlant, userId, file) => {
  const Plant = Parse.Object.extend('UserPlant');
  const query = new Parse.Query(Plant);
  console.log('plant id', updatedPlant.objectId);

  return query
    .get(updatedPlant.objectId)
    .then((plant) => {
      // Update plant fields
      plant.set('plantName', updatedPlant.plantName);
      plant.set('light', updatedPlant.light);
      plant.set('water', updatedPlant.water);
      plant.set('toxicity', updatedPlant.toxicity);

      // Check if a new file is provided
      if (file && file.type) {
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

        // Validate file type
        if (allowedImageTypes.includes(file.type)) {
          const userIdString = getUserIdString(userId);
          const originalFilename = file.name;
          const sanitizedFilename = originalFilename.replace(/[^a-zA-Z0-9_.]/g, '_');
          const fileName = `${userIdString}_${Date.now()}_${sanitizedFilename}`;

          const parseFile = new Parse.File(fileName, file);

          // Save the new file
          return parseFile.save().then(() => {
            // Attach the file to the UserPlant object
            plant.set('plantImage', parseFile);

            // Save the updated UserPlant object
            return plant.save().then((result) => {
              console.log('Plant updated successfully:', result);
              return result;
            });
          });
        } else {
          // Handle invalid file type
          console.error('Invalid file type. Please upload a valid image.');
          throw new Error('Invalid file type');
        }
      } else {
        // If no new file, simply save the updated UserPlant object
        return plant.save().then((result) => {
          console.log('Plant updated successfully:', result);
          return result;
        });
      }
    })
    .catch((error) => {
      console.error('Error updating plant:', error);
      throw error;
    });
};



