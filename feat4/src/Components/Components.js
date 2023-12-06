import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import UserPlant from "./UserPlant/UserPlant";
import NavBar from "./NavBar/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthModule from "./Auth/Auth.js";
import AuthLogin from "./Auth/AuthLogin"
import UserLogOut from "./Auth/AuthLogout"
import AuthRegister from "./Auth/AuthRegister"
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.js";
import Plant from "./Plant/Plant.js"

export default function Components() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/register" element={<AuthRegister />} />
        <Route path="/auth/login" element={<AuthLogin />} />
        <Route path="/auth/logout" element={<UserLogOut />} />
        <Route path="/home" element={<Home />} />
        <Route path="plant/:plantid" element={<Plant />} />
        <Route
          path="/profile"
          element={<ProtectedRoute path="/profile" element={Profile} />}
        />
        <Route
          path="/userplant"
          element={<ProtectedRoute path="/userplant" element={UserPlant} />}
        />
        <Route
          path="/navbar"
          element={<ProtectedRoute path="/navbar" element={NavBar} />}
        />
      </Routes>
    </Router>
  );
}