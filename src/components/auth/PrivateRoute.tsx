
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader } from "lucide-react";
import AuthWrapper from "./AuthWrapper";

const PrivateRoute = () => {
  return (
    <AuthWrapper requireAuth={true} redirectTo="/login">
      <Outlet />
    </AuthWrapper>
  );
};

export default PrivateRoute;
