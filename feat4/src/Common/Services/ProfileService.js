import Parse from "parse";

// READ operation - get all plants in Parse class Plant
export const getProfile = () => {
    const Profile = Parse.Object.extend("Profile");
    const query = new Parse.Query(Profile);
    return query.find().then((results) => {
      // returns array of Plant objects
      return results;
    });
  };