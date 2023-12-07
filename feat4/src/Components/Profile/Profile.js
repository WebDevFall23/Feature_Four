import React from "react";
import ProfileList from "./ProfileList";
import UserLogOut from "../Auth/AuthLogout"
import { Link, useNavigate } from "react-router-dom";
import UserPlantList from "../UserPlant/UserPlantList";


/* Profile MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const ProfileModule = () => {
  const history = useNavigate();
  
  const buttonHandlerUserPlant = () => {
    history("/userplant");
  };
  return (
    <div>
      <div>
        <UserLogOut/>
        <h2><ProfileList /></h2>
        <br />
        <section>
        <ul>
            <li><button onClick={buttonHandlerUserPlant}>UserPlant</button></li>
        </ul>
      </section>
      </div>
      <Link to="/navbar">
        <button>Back</button>
      </Link>
    </div>
    
  );
};

export default ProfileModule;