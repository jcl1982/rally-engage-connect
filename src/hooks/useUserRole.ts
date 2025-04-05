
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { useAuth } from "@/context/AuthContext";

// Définir le type pour les rôles d'utilisateur
type UserRole = Database["public"]["Enums"]["app_role"];

export const useUserRole = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRoles = async () => {
      if (!user) {
        setRoles([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role_user') // Changed from 'role' to 'role_user' to match the database column
          .eq("user_id", user.id);

        if (error) throw error;
        
        // Transformer les données en tableau de rôles
        setRoles(data?.map((r) => r.role_user as UserRole) || []);
        
        // Logging des rôles pour le débogage
        console.log("Rôles de l'utilisateur:", data?.map((r) => r.role_user) || []);
      } catch (err: any) {
        console.error("Erreur lors de la récupération des rôles:", err);
        setError(err.message || "Erreur lors du chargement des rôles");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRoles();
  }, [user]);

  // Vérifier si l'utilisateur a un rôle spécifique
  const hasRole = (role: UserRole | string): boolean => {
    return roles.includes(role as UserRole);
  };

  // Vérifier si l'utilisateur est un organisateur ou un administrateur
  const isOrganizer = (): boolean => {
    return hasRole('organizer') || hasRole('admin');
  };

  // Vérifier si l'utilisateur est un administrateur
  const isAdmin = (): boolean => {
    return hasRole('admin');
  };

  return {
    roles,
    loading,
    error,
    hasRole,
    isOrganizer,
    isAdmin
  };
};
