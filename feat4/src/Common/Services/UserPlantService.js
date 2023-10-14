import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// CREATE operation - new plant with Name
export const createUserPlant = (newUserPlant, profile) => {
  const UserPlant = Parse.Object.extend("UserPlant");
  //const Profile = Parse.Object.extend("Profile"); 
  //const profile = new Profile();
  // const query = new Parse.Query(Profile);
  const userplant = new UserPlant();
  // const profile = query.get("LI2oGNlMlY");
  // using setter to UPDATE the object
  userplant.set("plantName", newUserPlant.plantName);
  userplant.set("light", newUserPlant.Light);
  userplant.set("water", newUserPlant.Water);
  userplant.set("toxicity", newUserPlant.Toxicity);
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

