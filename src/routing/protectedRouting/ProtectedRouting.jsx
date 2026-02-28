import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userCon } from "../../contexts/userContext/UserContext";

const ProtectedRouting = ({ children }) => {
  const { user } = useContext(userCon);
//   console.log(user);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRouting;
