//CONTEXT to set state regarding token expiration

import { createContext } from "react";
export const UserContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value) => {},
});
