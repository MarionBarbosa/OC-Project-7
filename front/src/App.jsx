import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.css";

import Feed from "./pages/Feed";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreatePost from "./pages/CreatePost";
import NotFound from "./pages/NotFound";
import { UserContext } from "../src/Context/index";
import { useState } from "react";
import "./style.css";
import PrivateRoutes from "./components/PrivateRoutes";
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Routes>
          <Route element={<PrivateRoutes />}></Route>
          <Route exact path="/home" element={<Feed />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}
