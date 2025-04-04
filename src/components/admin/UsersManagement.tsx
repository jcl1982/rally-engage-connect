
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { UserWithRoles } from "@/types/admin";
import { Database } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import UserTable from "@/components/admin/UserTable";
import UserRoleDialog from "@/components/admin/UserRoleDialog";
import UserSearch from "@/components/admin/UserSearch";
import { useAdminUsers } from "@/hooks/useAdminUsers";

// Define the type for user roles
type UserRole = Database["public"]["Enums"]["app_role"];

// Configuration for pagination
const USERS_PER_PAGE = 10;

export const UsersManagement: React.FC = () => {
  const { toast } = useToast();
  const {
    filteredUsers,
    loading,
    loadingProgress,
    error,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    fetchUsers
  } = useAdminUsers();

  const [selectedUser, setSelectedUser] = useState<UserWithRoles | null>(null);

  // Calculate pagination values
  const totalUsers = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalUsers / USERS_PER_PAGE));
  
  // Ensure current page is valid
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [totalPages, currentPage, setCurrentPage]);

  // Get current users for the page
  const getCurrentPageUsers = () => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    return filteredUsers.slice(startIndex, startIndex + USERS_PER_PAGE);
  };

  // Function to assign a role to a user
  const assignRole = async (userId: string, role: UserRole) => {
    try {
      // Check if the user already has this role
      const user = filteredUsers.find(u => u.id === userId);
      if (user && user.roles.includes(role)) {
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
          { user_id: userId, role }
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
      const user = filteredUsers.find(u => u.id === userId);
      if (role === 'user' && user?.roles.length === 1) {
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
        .eq('role', role as UserRole);

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

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Gestion des Rôles Utilisateurs</span>
          {loading && <span className="text-sm font-normal text-muted-foreground">Chargement des données...</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loadingProgress > 0 && (
          <div className="mb-4">
            <Progress value={loadingProgress} className="h-2" />
          </div>
        )}

        {error ? (
          <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-md p-4 mb-4">
            <p className="font-semibold">Erreur</p>
            <p>{error}</p>
            <button 
              onClick={fetchUsers} 
              className="mt-2 text-sm underline hover:no-underline"
            >
              Réessayer
            </button>
          </div>
        ) : (
          <>
            <UserSearch 
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm}
            />

            <UserTable 
              users={getCurrentPageUsers()} 
              onRemoveRole={removeRole}
              onSelectUser={setSelectedUser}
              loading={loading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}

        <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
          <UserRoleDialog 
            selectedUser={selectedUser} 
            onAssignRole={assignRole}
            onRemoveRole={removeRole}
          />
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default UsersManagement;
