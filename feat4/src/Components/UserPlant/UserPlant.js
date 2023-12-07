import React from "react";
import UserPlantList from "./UserPlantList";
import { Link } from "react-router-dom";

/* Home MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const UserPlantModule = () => {
  return (
    <div>
      This is the UserPlant module.
      <UserPlantList />
      <br />
      <Link to="/profile">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default UserPlantModule;