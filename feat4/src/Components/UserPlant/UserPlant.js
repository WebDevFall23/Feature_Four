import React from "react";
import UserPlantList from "./UserPlantList";

/* Home MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const UserPlantModule = () => {
  return (
    <div>
      This is the UserPlant module.
      <UserPlantList />
    </div>
  );
};

export default UserPlantModule;