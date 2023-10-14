import React from "react";
import ProfileList from "./ProfileList";

/* Profile MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const ProfileModule = () => {
  return (
    <div>
        <h1>This is the Profile module.</h1>
        <ProfileList />
    </div>
  );
};

export default ProfileModule;