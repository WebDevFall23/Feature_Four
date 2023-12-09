import Parse from "parse";

// READ operation - get all plants in Parse class Plant
export const getProfile = () => {
    const Profile = Parse.Object.extend("Profile");
    const query = new Parse.Query(Profile);

    // Get the current user
    const currentUser = Parse.User.current();

    // Check if the current user exists and has the getSessionToken method
    if (currentUser && typeof currentUser.getSessionToken === 'function') {
      // Get the session token
      const sessionToken = currentUser.getSessionToken();

      // Include the session token in the query for authentication
      if (sessionToken) {
        query._sessionToken = sessionToken;
      }
    }

    return query.find().then((results) => {
      // Returns an array of Profile objects
      return results;
    });
  };