
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

// Define the type for user roles
type UserRole = Database["public"]["Enums"]["app_role"];

export const useUserRole = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch user roles
  const fetchUserRoles = useCallback(async () => {
    if (!user) {
      setRoles([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Use subscriptions.value = true to force a fresh fetch from the database
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq("user_id", user.id)
        .order('role');

      if (error) throw error;
      
      // Transform data to array of roles
      const userRoles = data?.map((r) => r.role as UserRole) || [];
      console.log("User roles fetched for", user.id, ":", userRoles);
      setRoles(userRoles);
    } catch (err: any) {
      console.error("Erreur lors de la récupération des rôles:", err);
      setError(err.message || "Erreur lors du chargement des rôles");
      toast.error("Impossible de charger vos rôles d'utilisateur");
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch roles when user changes
  useEffect(() => {
    fetchUserRoles();
  }, [user, fetchUserRoles]);

  // Check if user has a specific role
  const hasRole = (role: UserRole): boolean => {
    return roles.includes(role);
  };

  // Check if user is an organizer or admin
  const isOrganizer = (): boolean => {
    return hasRole('organizer' as UserRole) || hasRole('admin' as UserRole);
  };

  // Check if user is an admin
  const isAdmin = (): boolean => {
    return hasRole('admin' as UserRole);
  };

  // Function to manually refresh roles
  const refreshRoles = () => {
    fetchUserRoles();
  };

  return {
    roles,
    loading,
    error,
    hasRole,
    isOrganizer,
    isAdmin,
    refreshRoles
  };
};
