
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { Loader } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const OrganizerRoute = () => {
  const { user, loading: authLoading } = useAuth();
  const { isOrganizer, loading: roleLoading, roles } = useUserRole();
  const { toast } = useToast();
  
  const loading = authLoading || roleLoading;

  // Ajout d'un effet pour vérifier les rôles au chargement
  useEffect(() => {
    if (!loading && user) {
      console.log("OrganizerRoute - User ID:", user.id);
      console.log("OrganizerRoute - User Email:", user.email);
      console.log("OrganizerRoute - Roles:", roles);
      console.log("OrganizerRoute - Is Organizer:", isOrganizer());
      
      if (!isOrganizer()) {
        toast({
          title: "Accès refusé",
          description: "Vous n'avez pas les permissions nécessaires pour accéder à cette page.",
          variant: "destructive"
        });
      }
    }
  }, [loading, user, isOrganizer, roles, toast]);

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
