import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// CREATE operation - new plant with Name
export const createUserPlant = (newUserPlant, userId, file) => {
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



