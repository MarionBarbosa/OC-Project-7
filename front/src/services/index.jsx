//Functions to check token expiration and to set state according to result.

import jwtDecode from "jwt-decode";

export function hasAuthenticated() {
  const token = localStorage.getItem("token");
  const isValid = token ? tokenIsValid(token) : false;

  if (!isValid) {
    localStorage.clear();
    return false;
  } else {
    return isValid;
  }
}

function tokenIsValid(token) {
  const { exp } = jwtDecode(token);
  if (exp * 1000 > new Date().getTime()) {
    return true;
  } else {
    return false;
  }
}
