import Home from "./Home/Home";
import Library from "./Library/Library";
import NavBar from "./NavBar/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function Components() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
      </Routes>
      <NavBar />
    </Router>
  );
}