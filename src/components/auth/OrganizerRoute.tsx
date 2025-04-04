
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const OrganizerRoute = () => {
  const { user, loading: authLoading } = useAuth();
  const { 
    isOrganizer, 
    loading: roleLoading, 
    roles, 
    refreshRoles,
    lastRefresh 
  } = useUserRole();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasOrganizerAccess, setHasOrganizerAccess] = useState(false);
  
  const loading = authLoading || roleLoading;

  // Refresh roles when component mounts and when user changes
  useEffect(() => {
    if (user) {
      console.log("OrganizerRoute: User authenticated, refreshing roles", user.id);
      refreshRoles();
    }
  }, [user, refreshRoles]);
  
  // Set state values based on auth and role status
  useEffect(() => {
    if (!loading) {
      setIsAuthenticated(!!user);
      setHasOrganizerAccess(isOrganizer());
      
      console.log("OrganizerRoute: Authentication status", {
        userId: user?.id,
        roles,
        isOrganizer: isOrganizer(),
        lastRoleRefresh: new Date(lastRefresh).toISOString()
      });
    }
  }, [user, loading, roles, isOrganizer, lastRefresh]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin h-8 w-8 text-asag-red" />
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("OrganizerRoute: User not authenticated, redirecting to login");
    // Rediriger vers la page de connexion avec l'URL actuelle comme redirect
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (!hasOrganizerAccess) {
    console.log("OrganizerRoute: User does not have organizer access", {
      userId: user?.id,
      roles
    });
    toast.error("Vous n'avez pas les droits organisateur nécessaires pour accéder à cette page.");
    return <Navigate to="/profile" replace />;
  }

  console.log("OrganizerRoute: User has organizer access, rendering organizer page");
  return <Outlet />;
};

export default OrganizerRoute;
