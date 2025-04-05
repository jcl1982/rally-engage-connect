
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";

const OrganizerRoute = () => {
  const { user, loading: authLoading } = useAuth();
  const { hasRole, loading: roleLoading } = useUserRole();
  
  // Si chargement des données d'authentification ou des rôles
  if (authLoading || roleLoading) {
    return <div className="container py-8">Chargement...</div>;
  }

  // Si l'utilisateur n'est pas connecté ou n'est pas organisateur/admin
  if (!user || (!hasRole('organizer') && !hasRole('admin'))) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default OrganizerRoute;
