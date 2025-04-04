
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const AdminRoute = () => {
  const { user, loading: authLoading } = useAuth();
  const { 
    isAdmin, 
    loading: roleLoading, 
    roles, 
    refreshRoles,
    lastRefresh 
  } = useUserRole();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasAdminAccess, setHasAdminAccess] = useState(false);
  
  const loading = authLoading || roleLoading;

  // Refresh roles when component mounts and when user changes
  useEffect(() => {
    if (user) {
      console.log("AdminRoute: User authenticated, refreshing roles", user.id);
      refreshRoles();
    }
  }, [user, refreshRoles]);
  
  // Set state values based on auth and role status
  useEffect(() => {
    if (!loading) {
      setIsAuthenticated(!!user);
      setHasAdminAccess(isAdmin());
      
      console.log("AdminRoute: Authentication status", {
        userId: user?.id,
        roles,
        isAdmin: isAdmin(),
        lastRoleRefresh: new Date(lastRefresh).toISOString()
      });
    }
  }, [user, loading, roles, isAdmin, lastRefresh]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin h-8 w-8 text-asag-red" />
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("AdminRoute: User not authenticated, redirecting to login");
    // Rediriger vers la page de connexion avec l'URL actuelle comme redirect
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (!hasAdminAccess) {
    console.log("AdminRoute: User does not have admin access", {
      userId: user?.id,
      roles
    });
    toast.error("Vous n'avez pas les droits administrateur nécessaires pour accéder à cette page.");
    return <Navigate to="/profile" replace />;
  }

  console.log("AdminRoute: User has admin access, rendering admin page");
  return <Outlet />;
};

export default AdminRoute;
