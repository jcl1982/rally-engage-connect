
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
      setError(null); // Reset error state before fetching
      
      console.log(`Fetching roles for user ${user.id}`, { forceRefresh });

      // Direct SQL query approach to avoid RLS recursion issues
      // Use type assertion to make TypeScript happy until the types are properly updated
      const { data, error } = await supabase.rpc(
        'get_user_roles' as any, 
        { user_id: user.id }
      );

      if (error) {
        console.error("Error retrieving roles:", error);
        setError(error.message);
        // Don't show toast here to avoid overwhelming the user
      } else {
        // Transform data to array of roles, default to empty array if data is null
        const userRoles = data || [];
        console.log("User roles fetched for", user.id, ":", userRoles);
        
        setRoles(userRoles as UserRole[]);
        setLastRefresh(Date.now());
      }
    } catch (err: any) {
      console.error("Exception when retrieving roles:", err);
      setError(err.message || "Error loading roles");
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
      setError(null);
    }
  }, [user, fetchUserRoles]);

  // Check if user has a specific role
  const hasRole = useCallback((role: UserRole): boolean => {
    return roles.includes(role);
  }, [roles]);

  // Check if user is an organizer or admin
  const isOrganizer = useCallback((): boolean => {
    return hasRole('organizer' as UserRole) || hasRole('admin' as UserRole);
  }, [hasRole]);

  // Check if user is an admin
  const isAdmin = useCallback((): boolean => {
    return hasRole('admin' as UserRole);
  }, [hasRole]);

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
