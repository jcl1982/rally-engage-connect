
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserWithRoles } from "@/types/admin";
import { useToast } from "@/hooks/use-toast";

export function useAdminUsers() {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Function to filter users based on search term
  const filterUsers = (allUsers: UserWithRoles[], term: string) => {
    if (!term) return allUsers;
    
    return allUsers.filter(user => 
      (user.email && user.email.toLowerCase().includes(term.toLowerCase())) ||
      (user.first_name && user.first_name.toLowerCase().includes(term.toLowerCase())) ||
      (user.last_name && user.last_name.toLowerCase().includes(term.toLowerCase()))
    );
  };

  // Optimized function to fetch all users with their roles in a single query
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
      
      // First, fetch all profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name');
      
      if (profilesError) {
        throw profilesError;
      }

      // Then, fetch roles for each profile in a separate query
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role_user');
      
      if (rolesError) {
        throw rolesError;
      }

      // Group roles by user_id
      const rolesByUser: Record<string, string[]> = {};
      rolesData.forEach(role => {
        if (!rolesByUser[role.user_id]) {
          rolesByUser[role.user_id] = [];
        }
        rolesByUser[role.user_id].push(role.role_user);
      });
      
      // Map profiles to UserWithRoles objects
      const usersWithRoles: UserWithRoles[] = profilesData.map(profile => ({
        id: profile.id,
        email: null, // Email will be null as we don't have access to it
        first_name: profile.first_name,
        last_name: profile.last_name,
        roles: rolesByUser[profile.id] || []
      }));
      
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

  // Initial fetch
  useEffect(() => {
    fetchUsers();
  }, []);

  // Update filtered users when search term changes
  useEffect(() => {
    setFilteredUsers(filterUsers(users, searchTerm));
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, users]);

  return {
    users,
    filteredUsers,
    loading,
    loadingProgress,
    error,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    fetchUsers
  };
}
