
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Enums } from "@/integrations/supabase/types";
import { useAuth } from "@/context/AuthContext";

type UserRole = Enums<"app_role"> | null;

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
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id);

        if (error) throw error;
        
        setRoles(data.map((r) => r.role) || []);
      } catch (err: any) {
        console.error("Erreur lors de la récupération des rôles:", err);
        setError(err.message || "Erreur lors du chargement des rôles");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRoles();
  }, [user]);

  const hasRole = (role: UserRole): boolean => {
    return roles.includes(role);
  };

  const isOrganizer = (): boolean => {
    return hasRole("organizer") || hasRole("admin");
  };

  const isAdmin = (): boolean => {
    return hasRole("admin");
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
