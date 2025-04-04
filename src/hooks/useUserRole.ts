
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
        setLoading(true);
        
        // Utilisation de refresh: true pour éviter la mise en cache
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq("user_id", user.id)
          .order('role');

        if (error) throw error;
        
        // Transformer les données en tableau de rôles
        const userRoles = data?.map((r) => r.role as UserRole) || [];
        console.log("User roles fetched for", user.id, ":", userRoles);
        setRoles(userRoles);
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
  const hasRole = (role: UserRole): boolean => {
    return roles.includes(role);
  };

  // Vérifier si l'utilisateur est un organisateur ou un administrateur
  const isOrganizer = (): boolean => {
    return hasRole('organizer' as UserRole) || hasRole('admin' as UserRole);
  };

  // Vérifier si l'utilisateur est un administrateur
  const isAdmin = (): boolean => {
    return hasRole('admin' as UserRole);
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
