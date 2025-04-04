
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";
import { Loader, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { useUserRole } from "@/hooks/useUserRole";
import { Database } from "@/integrations/supabase/types";
import { UserWithRoles } from "@/types/admin";

// Import our components
import UserTable from "@/components/admin/UserTable";
import UserRoleDialog from "@/components/admin/UserRoleDialog";
import UserSearch from "@/components/admin/UserSearch";
import AccessDenied from "@/components/admin/AccessDenied";
import { Progress } from "@/components/ui/progress";

// Define the type for user roles
type UserRole = Database["public"]["Enums"]["app_role"];

// Type guard function to check if a string is a valid UserRole
function isValidUserRole(role: string): role is UserRole {
  return role === 'user' || role === 'organizer' || role === 'admin';
}

// Configuration for pagination
const USERS_PER_PAGE = 10;

const AdminPage = () => {
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole();
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserWithRoles[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserWithRoles | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to filter users based on search term
  const filterUsers = (allUsers: UserWithRoles[], term: string) => {
    if (!term) return allUsers;
    
    return allUsers.filter(user => 
      (user.email && user.email.toLowerCase().includes(term.toLowerCase())) ||
      (user.first_name && user.first_name.toLowerCase().includes(term.toLowerCase())) ||
      (user.last_name && user.last_name.toLowerCase().includes(term.toLowerCase()))
    );
  };

  // Calculate pagination values
  const totalUsers = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalUsers / USERS_PER_PAGE));
  
  // Ensure current page is valid
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [totalPages, currentPage]);

  // Get current users for the page
  const getCurrentPageUsers = () => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    return filteredUsers.slice(startIndex, startIndex + USERS_PER_PAGE);
  };

  // Function to fetch all users with their roles
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Start progress animation
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 5;
        if (progress > 90) {
          clearInterval(progressInterval);
        }
        setLoadingProgress(progress);
      }, 100);
      
      // Fetch profiles data
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name');
      
      if (profilesError) {
        throw profilesError;
      }
      
      // For each profile, fetch their roles
      const usersWithRoles = await Promise.all(
        profilesData.map(async (profile) => {
          try {
            const { data: rolesData, error: rolesError } = await supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', profile.id);
            
            if (rolesError) throw rolesError;
            
            return {
              id: profile.id,
              email: null, // Email will be null as we don't have access to it
              first_name: profile.first_name,
              last_name: profile.last_name,
              roles: rolesData.map(r => r.role)
            };
          } catch (error) {
            console.error(`Error fetching roles for user ${profile.id}:`, error);
            return {
              id: profile.id,
              email: null,
              first_name: profile.first_name,
              last_name: profile.last_name,
              roles: []
            };
          }
        })
      );
      
      setUsers(usersWithRoles);
      const filtered = filterUsers(usersWithRoles, searchTerm);
      setFilteredUsers(filtered);
      
      // Complete the progress
      clearInterval(progressInterval);
      setLoadingProgress(100);
      
      // Small delay to show the completed progress before removing it
      setTimeout(() => {
        setLoading(false);
        setLoadingProgress(0);
      }, 500);
      
    } catch (error: any) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      setError("Impossible de récupérer la liste des utilisateurs.");
      toast({
        title: "Erreur",
        description: "Impossible de récupérer la liste des utilisateurs.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  // Fetch users when the component loads
  useEffect(() => {
    if (!authLoading && !roleLoading && isAdmin()) {
      fetchUsers();
    } else if (!authLoading && !roleLoading) {
      setLoading(false);
    }
  }, [authLoading, roleLoading]);

  // Update filtered users when search term changes
  useEffect(() => {
    setFilteredUsers(filterUsers(users, searchTerm));
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, users]);

  // Function to assign a role to a user
  const assignRole = async (userId: string, role: UserRole) => {
    try {
      // Check if the user already has this role
      const user = users.find(u => u.id === userId);
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
      const user = users.find(u => u.id === userId);
      if (role === 'user' && user?.roles.length === 1) {
        toast({
          title: "Information",
          description: "Impossible de retirer le rôle 'user' de base.",
        });
        return;
      }

      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', role);

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

  // If the user is not an admin, show access denied message
  if (!authLoading && !roleLoading && !isAdmin()) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container max-w-6xl mx-auto py-8 px-4">
          <AccessDenied />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container max-w-6xl mx-auto py-8 px-4">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="h-8 w-8 text-rally-orange" />
              Administration des Utilisateurs
            </h1>
          </div>

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
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      
      <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <UserRoleDialog 
          selectedUser={selectedUser} 
          onAssignRole={assignRole}
          onRemoveRole={removeRole}
        />
      </Dialog>
    </div>
  );
};

export default AdminPage;
