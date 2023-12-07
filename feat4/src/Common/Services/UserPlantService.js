import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// CREATE operation - new plant with Name
export const createUserPlant = (newUserPlant, userId) => {
  const UserPlant = Parse.Object.extend("UserPlant");

  const userplant = new UserPlant();

  userplant.set("plantName", newUserPlant.plantName);
  userplant.set("light", newUserPlant.light);
  userplant.set("water", newUserPlant.water);
  userplant.set("toxicity", newUserPlant.toxicity);
  userplant.set("user", userId);

  return userplant.save().then((result) => {
    // Print the result's name to console log
    // returns new Plant object
    return result;
  });
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


