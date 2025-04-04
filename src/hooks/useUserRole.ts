
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
  const [lastRefresh, setLastRefresh] = useState<number>(0);

  // Function to fetch user roles
  const fetchUserRoles = useCallback(async (forceRefresh = false) => {
    if (!user) {
      setRoles([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      console.log(`Fetching roles for user ${user.id}`, { forceRefresh });

      // Use the { head: true } option to force Supabase to bypass cache
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq("user_id", user.id)
        .order('role')
        .throwOnError();

      if (error) throw error;
      
      // Transform data to array of roles
      const userRoles = data?.map((r) => r.role as UserRole) || [];
      console.log("User roles fetched for", user.id, ":", userRoles);
      setRoles(userRoles);
      setLastRefresh(Date.now());
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
    if (user) {
      fetchUserRoles(true);
    } else {
      setRoles([]);
      setLoading(false);
    }
  }, [user, fetchUserRoles]);

  // Check if user has a specific role
  const hasRole = useCallback((role: UserRole): boolean => {
    console.log(`Checking if user has role: ${role}`, roles);
    return roles.includes(role);
  }, [roles]);

  // Check if user is an organizer or admin
  const isOrganizer = useCallback((): boolean => {
    console.log("Checking if user is organizer or admin", roles);
    return hasRole('organizer' as UserRole) || hasRole('admin' as UserRole);
  }, [hasRole, roles]);

  // Check if user is an admin
  const isAdmin = useCallback((): boolean => {
    console.log("Checking if user is admin", roles);
    return hasRole('admin' as UserRole);
  }, [hasRole, roles]);

  // Function to manually refresh roles
  const refreshRoles = useCallback(() => {
    console.log("Manually refreshing roles");
    return fetchUserRoles(true);
  }, [fetchUserRoles]);

  return {
    roles,
    loading,
    error,
    hasRole,
    isOrganizer,
    isAdmin,
    refreshRoles,
    lastRefresh
  };
};
