
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

// Import our new components
import UserTable from "@/components/admin/UserTable";
import UserRoleDialog from "@/components/admin/UserRoleDialog";
import UserSearch from "@/components/admin/UserSearch";
import AccessDenied from "@/components/admin/AccessDenied";

// Define the type for user roles
type UserRole = Database["public"]["Enums"]["app_role"];

// Type guard function to check if a string is a valid UserRole
function isValidUserRole(role: string): role is UserRole {
  return role === 'user' || role === 'organizer' || role === 'admin';
}

const AdminPage = () => {
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole();
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserWithRoles | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fonction pour récupérer tous les utilisateurs avec leurs rôles
  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Récupérer la liste des utilisateurs (limité aux informations disponibles via l'API publique)
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name');
      
      if (profilesError) throw profilesError;
      
      // Pour chaque utilisateur, récupérer ses rôles
      const usersWithRoles = await Promise.all(
        profilesData.map(async (profile) => {
          const { data: rolesData, error: rolesError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', profile.id);
          
          if (rolesError) throw rolesError;
          
          // On définit un email par défaut puisque nous n'avons pas accès aux emails via l'API publique
          return {
            id: profile.id,
            email: 'Email non disponible', // Email par défaut
            first_name: profile.first_name,
            last_name: profile.last_name,
            roles: rolesData.map(r => r.role)
          };
        })
      );
      
      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      toast({
        title: "Erreur",
        description: "Impossible de récupérer la liste des utilisateurs.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Récupérer les utilisateurs au chargement de la page
  useEffect(() => {
    if (!authLoading && !roleLoading && isAdmin()) {
      fetchUsers();
    }
  }, [authLoading, roleLoading]);

  // Fonction pour attribuer un rôle à un utilisateur
  const assignRole = async (userId: string, role: UserRole) => {
    try {
      // Vérifier si l'utilisateur a déjà ce rôle
      const user = users.find(u => u.id === userId);
      if (user && user.roles.includes(role)) {
        toast({
          title: "Information",
          description: `L'utilisateur possède déjà le rôle ${role}.`,
        });
        return;
      }

      // Ajouter le rôle
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

      // Rafraîchir la liste des utilisateurs
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

  // Fonction pour retirer un rôle à un utilisateur
  const removeRole = async (userId: string, role: string) => {
    try {
      // On ne peut pas retirer le rôle 'user' de base
      if (role === 'user' && users.find(u => u.id === userId)?.roles.length === 1) {
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

      // Rafraîchir la liste des utilisateurs
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

  // Filtrer les utilisateurs par le terme de recherche
  const filteredUsers = users.filter(user => 
    (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.first_name && user.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.last_name && user.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Si l'utilisateur actuel n'est pas admin, afficher un message d'erreur
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
              <CardTitle>Gestion des Rôles Utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <UserSearch 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm}
              />

              {loading ? (
                <div className="flex justify-center items-center py-10">
                  <Loader className="h-8 w-8 animate-spin text-rally-orange" />
                </div>
              ) : (
                <UserTable 
                  users={filteredUsers} 
                  onRemoveRole={removeRole}
                  onSelectUser={setSelectedUser}
                  loading={loading}
                />
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
