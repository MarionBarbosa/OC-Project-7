import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.css";

import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreatePost from "./pages/CreatePost";
import { UserContext } from "../src/Context/index";
import { useState } from "react";
import "./style.css";
export default function App() {
  const [isLogged, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <UserContext.Provider value={{ isLogged, setIsLoggedIn }}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route exact path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/createPost" element={<CreatePost />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}
