
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { Loader } from "lucide-react";

const OrganizerRoute = () => {
  const { user, loading: authLoading } = useAuth();
  const { isOrganizer, loading: roleLoading } = useUserRole();
  
  const loading = authLoading || roleLoading;

  // Add logs for debugging
  console.log("OrganizerRoute - User:", user);
  console.log("OrganizerRoute - Roles Loading:", roleLoading);
  console.log("OrganizerRoute - Is Organizer:", isOrganizer());

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin h-8 w-8 text-asag-red" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isOrganizer()) {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
};

export default OrganizerRoute;
