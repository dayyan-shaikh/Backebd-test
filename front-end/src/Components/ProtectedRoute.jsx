import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  let user = null;
  user = localStorage.getItem("user");
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
