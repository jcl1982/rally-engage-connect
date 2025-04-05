
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { useAuth } from "@/context/AuthContext";

// Define the type for user roles
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
        console.log("Fetching roles for user:", user.id);
        console.log("User email:", user.email);
        
        // Modification de la requête pour récupérer le rôle correctement
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq("user_id", user.id);

        if (error) throw error;
        
        // Transform data to array of roles
        const userRoles = data?.map((r) => r.role as UserRole) || [];
        console.log("Fetched user roles:", userRoles);
        setRoles(userRoles);
      } catch (err: any) {
        console.error("Error fetching roles:", err);
        setError(err.message || "Error loading roles");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRoles();
  }, [user]);

  // Check if user has a specific role - memoized with useCallback
  const hasRole = useCallback((role: UserRole | string): boolean => {
    return roles.includes(role as UserRole);
  }, [roles]);

  // Check if user is an organizer or admin - memoized with useCallback
  const isOrganizer = useCallback((): boolean => {
    return hasRole('organizer') || hasRole('admin');
  }, [hasRole]);

  // Check if user is an admin - memoized with useCallback
  const isAdmin = useCallback((): boolean => {
    return hasRole('admin');
  }, [hasRole]);

  return {
    roles,
    loading,
    error,
    hasRole,
    isOrganizer,
    isAdmin
  };
};
