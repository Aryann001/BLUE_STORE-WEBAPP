import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading === false && isAuthenticated === false) {
    return <Navigate to={`/login`} />;
  }

  if (loading === false && isAdmin === true && user.role !== "admin") {
    return <Navigate to={"/login"} />;
  }

  return <Fragment>{loading === false && <Outlet />}</Fragment>;
};

export default ProtectedRoute;
