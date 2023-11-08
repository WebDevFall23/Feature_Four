import React from "react";
import HomeList from "./HomeList";
import { Link } from "react-router-dom";

/* Home MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const HomeModule = () => {
  return (
    <div>
      This is the home module.
      <HomeList />
      <br />
      <Link to="/navbar">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default HomeModule;

