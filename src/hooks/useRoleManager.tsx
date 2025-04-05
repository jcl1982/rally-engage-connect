
import React from "react";
import { Database } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UserWithRoles } from "@/types/admin";

// Define the type for user roles
type UserRole = Database["public"]["Enums"]["app_role"];

export function useRoleManager(fetchUsers: () => Promise<void>) {
  const { toast } = useToast();

  // Function to assign a role to a user
  const assignRole = async (userId: string, role: UserRole) => {
    try {
      // Check if the user already has this role
      const { data: existingRoles, error: checkError } = await supabase
        .from('user_roles')
        .select('role_user')
        .eq('user_id', userId);

      if (checkError) throw checkError;

      if (existingRoles?.some(r => r.role_user === role)) {
        toast({
          title: "Information",
          description: `L'utilisateur possède déjà le rôle ${role}.`,
        });
        return;
      }

      // Add the role
      const { error } = await supabase
        .from('user_roles')
        .insert([
          { user_id: userId, role_user: role }
        ]);

      if (error) throw error;

      toast({
        title: "Succès",
        description: `Rôle ${role} attribué avec succès.`,
      });

      // Refresh the list of users
      fetchUsers();
    } catch (error) {
      console.error('Erreur lors de l\'attribution du rôle:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'attribuer le rôle.",
        variant: "destructive",
      });
    }
  };

  // Function to remove a role from a user
  const removeRole = async (userId: string, role: string) => {
    try {
      // Check if this is the user's only 'user' role
      const { data: existingRoles, error: checkError } = await supabase
        .from('user_roles')
        .select('role_user')
        .eq('user_id', userId);

      if (checkError) throw checkError;

      if (role === 'user' && existingRoles?.length === 1 && existingRoles[0].role_user === 'user') {
        toast({
          title: "Information",
          description: "Impossible de retirer le rôle 'user' de base.",
        });
        return;
      }

      // Type guard to ensure role is a valid UserRole
      if (role !== 'user' && role !== 'organizer' && role !== 'admin') {
        throw new Error(`Invalid role: ${role}`);
      }

      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role_user', role as UserRole);

      if (error) throw error;

      toast({
        title: "Succès",
        description: `Rôle ${role} retiré avec succès.`,
      });

      // Refresh the list of users
      fetchUsers();
    } catch (error) {
      console.error('Erreur lors de la suppression du rôle:', error);
      toast({
        title: "Erreur",
        description: "Impossible de retirer le rôle.",
        variant: "destructive",
      });
    }
  };

  return {
    assignRole,
    removeRole
  };
}
