import React from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom"; // useHistory

export default function NavBar() {
  const history = useNavigate();

  const buttonHandlerHome = () => {
    history("/home");
  };
  const buttonHandlerProfile = () => {
    history("/profile");
  };


  return (
    <section>
        <ul>
            <li><button onClick={buttonHandlerHome}>Home</button></li>
            <li><button onClick={buttonHandlerProfile}>Profile</button></li>
        </ul>
    </section>
  );
}