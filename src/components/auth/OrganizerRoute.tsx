
import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { Loader } from "lucide-react";

const OrganizerRoute = () => {
  const { user, loading: authLoading } = useAuth();
  const { hasRole, roles, loading: roleLoading } = useUserRole();
  
  // Logs pour débogage
  useEffect(() => {
    if (user) {
      console.log("OrganizerRoute: Current user:", user.email);
      console.log("OrganizerRoute: Roles loading:", roleLoading);
      console.log("OrganizerRoute: User roles:", roles);
      console.log("OrganizerRoute: Has organizer role:", hasRole('organizer'));
      console.log("OrganizerRoute: Has admin role:", hasRole('admin'));
    } else {
      console.log("OrganizerRoute: No user authenticated");
    }
  }, [user, roleLoading, roles, hasRole]);
  
  // Si chargement des données d'authentification ou des rôles
  if (authLoading || roleLoading) {
    return (
      <div className="container py-8 flex flex-col items-center justify-center min-h-[300px]">
        <Loader className="h-10 w-10 animate-spin mb-4 text-asag-red" />
        <p>Chargement des informations utilisateur...</p>
      </div>
    );
  }

  // Si l'utilisateur n'est pas connecté ou n'est pas organisateur/admin
  if (!user || (!hasRole('organizer') && !hasRole('admin'))) {
    console.log("OrganizerRoute: Access denied, redirecting to home");
    return <Navigate to="/" replace />;
  }

  console.log("OrganizerRoute: Access granted, rendering organizer content");
  return <Outlet />;
};

export default OrganizerRoute;
