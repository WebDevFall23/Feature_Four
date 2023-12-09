import React from "react";
import HomeMUI from "./HomeMUI";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
/* Home MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const HomeModule = () => {
  return (
    <div>
      <HomeMUI />
    </div>
  );
};

export default HomeModule;

