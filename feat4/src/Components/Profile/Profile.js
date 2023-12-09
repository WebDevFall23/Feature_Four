import React from "react";
import ProfileList from "./ProfileList";
import { Link, useNavigate } from "react-router-dom";


/* Profile MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const ProfileModule = () => {
  const history = useNavigate();
  
  const buttonHandlerUserPlant = () => {
    history("/userplant");
  };

  return (
    <div>
        <h2><ProfileList /></h2>
        <br />
        <section>
        <ul>
            <li><button onClick={buttonHandlerUserPlant}>Add a Plant</button></li>
        </ul>
      </section>
      <Link to="/navbar">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default ProfileModule;