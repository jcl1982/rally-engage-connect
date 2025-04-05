
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

  // Enhanced effect for more detailed logging
  useEffect(() => {
    if (!loading && user) {
      console.log("OrganizerRoute - User ID:", user.id);
      console.log("OrganizerRoute - User Email:", user.email);
      console.log("OrganizerRoute - Roles:", roles);
      console.log("OrganizerRoute - Is Organizer:", isOrganizer());
      
      if (!isOrganizer()) {
        console.warn("Access denied: User does not have organizer permissions");
        toast({
          title: "Accès refusé",
          description: "Vous n'avez pas les permissions nécessaires pour accéder à cette page. Si vous pensez qu'il s'agit d'une erreur, veuillez contacter l'administrateur.",
          variant: "destructive",
          duration: 6000
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
    console.log("OrganizerRoute: No user found, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (!isOrganizer()) {
    console.log("OrganizerRoute: User is not organizer, redirecting to profile");
    return <Navigate to="/profile" replace />;
  }

  console.log("OrganizerRoute: Access granted to organizer area");
  return <Outlet />;
};

export default OrganizerRoute;
