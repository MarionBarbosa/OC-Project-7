// Route to protect FEED and CREATEPOST pages
// => if isAuthenticated is false (when token expires) then the page can't be used.

import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../../Context";

const PrivateRoutes = () => {
  const { isAuthenticated } = useContext(UserContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="/signIn" />;
};
export default PrivateRoutes;
