import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import UserPlant from "./UserPlant/UserPlant";
import NavBar from "./NavBar/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function Components() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/userplant" element={<UserPlant />} />
      </Routes>
      <NavBar />
    </Router>
  );
}