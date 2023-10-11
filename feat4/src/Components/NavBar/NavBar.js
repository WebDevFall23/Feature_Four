import React from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom"; // useHistory

export default function NavBar() {
  const history = useNavigate();

  const buttonHandlerHome = () => {
    history("/");
  };
  const buttonHandlerLib = () => {
    history("/Library");
  };
  return (
    <section>
        <ul>
            <li><button onClick={buttonHandlerHome}>Home</button></li>
            <li><button onClick={buttonHandlerLib}>Library</button></li>
        </ul>
    </section>
  );
}