import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import SignIn from "./Components/SignIn";
import Profile from "./Components/Profile";
import RoomsPreview from "./Components/RoomsPreview";
import RoomListing from "./Components/RoomListing";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/rooms" element={<RoomsPreview />} />
          <Route path="/rooms/listing" element={<RoomListing />} />
        </Routes>
      </Navbar>
    </BrowserRouter>
  );
}

export default App;
