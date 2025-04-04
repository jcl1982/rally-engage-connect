
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { Loader } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AdminRoute = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading, roles } = useUserRole();
  const { toast } = useToast();
  const location = useLocation();
  
  const loading = authLoading || roleLoading;

  // Afficher plus d'informations de diagnostic
  useEffect(() => {
    if (!loading && user) {
      console.log("AdminRoute check for user:", user.id);
      console.log("User roles:", roles);
      console.log("Is admin:", isAdmin());
    }
  }, [user, loading, roles]);

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

  if (!isAdmin()) {
    toast({
      title: "Accès refusé",
      description: "Vous n'avez pas les droits administrateur nécessaires pour accéder à cette page.",
      variant: "destructive",
    });
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
