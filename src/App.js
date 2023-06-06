import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import RoomsTablePage from "./pages/RoomsTablePage";
import SingleRoomPage from "./pages/SingleRoomPage";
import "./sass/main.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/mainLayout" element={<RoomsTablePage />} />
      <Route path="/room/:key" element={<SingleRoomPage />} />
    </Routes>
  );
}

export default App;
