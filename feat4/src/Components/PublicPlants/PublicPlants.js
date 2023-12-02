import React from "react";
import PublicPlantList from "./PublicPlantList";
import { Link } from "react-router-dom";
/* Home MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const PublicPlantModule = () => {
  return (
    <div>
      <PublicPlantList />
      <br />
      <Link to="/navbar">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default PublicPlantModule;