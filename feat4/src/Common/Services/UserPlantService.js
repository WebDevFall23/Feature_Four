import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// CREATE operation - new plant with Name
export const createUserPlant = (newUserPlant, profile) => {
  console.log(newUserPlant);
  const UserPlant = Parse.Object.extend("UserPlant");

  const userplant = new UserPlant();

  userplant.set("plantName", newUserPlant.plantName);
  userplant.set("light", newUserPlant.light);
  userplant.set("water", newUserPlant.water);
  userplant.set("toxicity", newUserPlant.toxicity);
  userplant.set("profile", profile);

  return userplant.save().then((result) => {
    // Print the result's name to console log
    // returns new Plant object
    return result;
  });
};

export const getById = (id) => {
  const Profile = Parse.Object.extend("Profile");
  const query = new Parse.Query(Profile);
  return query.get(id).then((result) => {
    // return Lesson object with objectId: id
    return result;
  });
};

