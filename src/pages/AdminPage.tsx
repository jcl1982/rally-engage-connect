
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";
import AccessDenied from "@/components/admin/AccessDenied";
import UsersManagement from "@/components/admin/UsersManagement";
import { toast } from "sonner";

const AdminPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading, refreshRoles, roles } = useUserRole();
  const [hasCheckedRoles, setHasCheckedRoles] = useState(false);

  // Refresh roles when component mounts to ensure latest permissions
  useEffect(() => {
    if (user) {
      console.log("AdminPage: Refreshing roles for user", user.id);
      refreshRoles().then(() => {
        setHasCheckedRoles(true);
      });
    }
  }, [user, refreshRoles]);

  // Show diagnostic information in console to help troubleshoot
  useEffect(() => {
    if (!authLoading && user) {
      console.log("AdminPage: User authenticated as", user.email);
      console.log("AdminPage: Admin status:", isAdmin());
      console.log("AdminPage: User roles:", roles);
    }
  }, [user, authLoading, isAdmin, roles]);

  // If the user is not an admin, show access denied message
  if (hasCheckedRoles && !authLoading && !roleLoading && !isAdmin()) {
    toast.error("Vous n'avez pas les droits administrateur nécessaires");
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

          {roleLoading || authLoading ? (
            <div className="text-center py-8">
              <p>Chargement des permissions d'administrateur...</p>
            </div>
          ) : (
            <UsersManagement />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
