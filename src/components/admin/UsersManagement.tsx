
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { UserWithRoles } from "@/types/admin";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import UserTable from "@/components/admin/UserTable";
import UserRoleDialog from "@/components/admin/UserRoleDialog";
import UserSearch from "@/components/admin/UserSearch";
import { RoleManager } from "@/components/admin/RoleManager";
import { Database } from "@/integrations/supabase/types";

// Define the type for user roles
type UserRole = Database["public"]["Enums"]["app_role"];

// Configuration for pagination
const USERS_PER_PAGE = 10;

export const UsersManagement: React.FC = () => {
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
  const { assignRole, removeRole } = RoleManager({ fetchUsers });

  // Calculate pagination values
  const totalUsers = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalUsers / USERS_PER_PAGE));
  
  // Get current users for the page
  const getCurrentPageUsers = () => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    return filteredUsers.slice(startIndex, startIndex + USERS_PER_PAGE);
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
