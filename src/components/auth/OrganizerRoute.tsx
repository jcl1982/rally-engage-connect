
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const OrganizerRoute = () => {
  const { user, loading: authLoading } = useAuth();
  const { isOrganizer, loading: roleLoading, refreshRoles } = useUserRole();
  const location = useLocation();
  
  const loading = authLoading || roleLoading;

  // Refresh roles when component mounts
  useEffect(() => {
    if (user) {
      refreshRoles();
    }
  }, [user]);

  // Debug information
  useEffect(() => {
    if (!loading && user) {
      console.log("OrganizerRoute check for user:", user.id);
      console.log("Is organizer:", isOrganizer());
    }
  }, [user, loading, isOrganizer]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin h-8 w-8 text-asag-red" />
      </div>
    );
  }

  if (!user) {
    // Rediriger vers la page de connexion avec l'URL actuelle comme redirect
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (!isOrganizer()) {
    toast.error("Vous n'avez pas les droits organisateur nécessaires pour accéder à cette page.");
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
};

export default OrganizerRoute;
