import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbarcomp from "./components/Navbar.jsx";
import Login from "./components/Login";
import Signup from "./components/Signup";
import LandingPage from "./components/LandingPage";
function App() {
  return (
    <div className="bg-dark-background bg-scroll h-screen bg-no-repeat bg-cover ">
      <BrowserRouter>
        <Navbarcomp />
        <div className="contaner">
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/" element={<LandingPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
