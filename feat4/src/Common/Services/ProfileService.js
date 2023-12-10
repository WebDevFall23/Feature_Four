import Parse from "parse";

  //sets all the new values for the profile
  export const updateUserProfile = (currentUser, newFirstName, newLastName, newBio) => {
    currentUser.set('firstName', newFirstName);
    currentUser.set('lastName', newLastName);
    currentUser.set('bio', newBio);
  
    return currentUser.save();
  };