import React, { useContext } from "react";
import { userCon } from "../../contexts/userContext/UserContext";
import AdminBlokingPage from "../../Admin-Dashboard/adminPage/AdminBlokingPage";

const AdminRouting = ({ children }) => {
  const { user } = useContext(userCon);

  if (user.role !== "admin") return <AdminBlokingPage />;

  return children;
};

export default AdminRouting;
