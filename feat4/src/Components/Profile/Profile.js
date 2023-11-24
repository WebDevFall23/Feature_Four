import React from "react";
import ProfileList from "./ProfileList";
import { Link } from "react-router-dom";
import UserLogOut from "../Auth/AuthLogout"

/* Profile MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const ProfileModule = () => {
  return (
    <div>
      <div>
        <UserLogOut/>
      </div>
        <h1>This is the Profile module.</h1>
        <ProfileList />
        <br />
      <Link to="/auth/login">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default ProfileModule;