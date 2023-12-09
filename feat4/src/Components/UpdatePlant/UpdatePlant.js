import React from "react";
import UpdatePlantList from "./UpdatePlantList";
import { Link } from "react-router-dom";


/* Home MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const UserPlantModule = () => {
  return (
    <div>
      This is the UserPlant module.
      <UpdatePlantList />
      <br />
      <Link to="/profile">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default UserPlantModule;