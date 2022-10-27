//APP
// => Render all routes/pages
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./style.css";

import Feed from "./pages/Feed";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreatePost from "./pages/CreatePost";
import NotFound from "./pages/NotFound";
import { UserContext } from "../src/Context/index";
import { useState } from "react";
import "./style.css";
import { hasAuthenticated } from "./services";
import PrivateRoutes from "./components/PrivateRoutes";
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());

  return (
    <Router>
      <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Feed />} />
            <Route path="/createPost" element={<CreatePost />} />
          </Route>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Navigate to="/signIn" />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}
