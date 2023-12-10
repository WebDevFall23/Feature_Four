import React from "react";
import UpdateProfileList from "./UpdateProfileList";
import { Link } from "react-router-dom";
import './UpdateProfileDesign.css';

/* Update profile page */
const UpdateProfile = () => {
  return (
    <div>
      <UpdateProfileList />
      <br />
      <Link to="/profile">
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};

export default UpdateProfile;