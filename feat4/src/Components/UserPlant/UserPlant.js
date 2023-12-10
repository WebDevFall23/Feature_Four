import React from "react";
import UserPlantList from "./UserPlantList";
import { Link } from "react-router-dom";
import "./UserPlantDesign.css";

/* Designated to keep track of the user created plants*/
const UserPlantModule = () => {
  return (
    <div>
      <UserPlantList />
      <br />
      <Link to="/profile">
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};

export default UserPlantModule;