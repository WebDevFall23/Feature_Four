import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import UserPlant from "./UserPlant/UserPlant";
import NavBar from "./NavBar/NavBar";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthLogin from "./Auth/AuthLogin"
import AuthRegister from "./Auth/AuthRegister"

export default function Components() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/register" element={<AuthRegister />} />
        <Route
          path="/"
          element={<ProtectedRoute path="/" element={<Profile />} />}
        />
        <Route
          path="/"
          element={<ProtectedRoute path="/" element={<UserPlant />} />}
        />
      </Routes>
      <NavBar />
    </Router>
  );
}