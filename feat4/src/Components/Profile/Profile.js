import React from "react";
import ProfileList from "./ProfileList";
import { Link, useNavigate } from "react-router-dom";
import "./ProfileNavDesign.css";


const ProfileModule = () => {
  const history = useNavigate();
  
  //takes you to create a plant
  const buttonHandlerUserPlant = () => {
    history("/userplant");
  };

  //look of the website
  //takes everything in from profilelist
  return (
    <div>
      <h2><ProfileList /></h2>
      <br />
      <section>
        <ul>
          <li><button onClick={buttonHandlerUserPlant} className="add-plant-button">Add a Plant</button></li>
        </ul>
      </section>
      <div className="button-container">
        <Link to="/navbar">
          <button className="back-button">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileModule;