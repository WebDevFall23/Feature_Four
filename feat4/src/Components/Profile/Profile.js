import React from "react";
import ProfileList from "./ProfileList";
import { Link } from "react-router-dom";

/* Profile MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const ProfileModule = () => {
  return (
    <div>
        <h1>This is the Profile module.</h1>
        <ProfileList />
        <br />
      <Link to="/navbar">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default ProfileModule;