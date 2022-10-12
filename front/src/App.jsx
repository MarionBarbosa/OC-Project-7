import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.css";

import Feed from "./pages/Feed";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreatePost from "./pages/CreatePost";
import NotFound from "./pages/NotFound";
import { UserContext } from "../src/Context/index";
import { useState } from "react";
import "./style.css";
export default function App() {
  const [isLogged, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <UserContext.Provider value={{ isLogged, setIsLoggedIn }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Feed" element={<Feed />} />
          <Route exact path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}
