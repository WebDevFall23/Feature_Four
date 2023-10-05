import React from "react";
import HomeList from "./HomeList";

/* Home MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const HomeModule = () => {
  return (
    <div>
      This is the home module.
      <HomeList />
    </div>
  );
};

export default HomeModule;

