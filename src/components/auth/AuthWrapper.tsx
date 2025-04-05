
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader } from "lucide-react";

interface AuthWrapperProps {
  children: React.ReactNode;
  requireAuth: boolean;
  allowedRoles?: string[];
  redirectTo?: string;
}

/**
 * Composant qui gère la protection des routes basée sur l'authentification
 * et les rôles utilisateurs
 */
const AuthWrapper = ({
  children,
  requireAuth,
  allowedRoles = [],
  redirectTo = "/login"
}: AuthWrapperProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    // Si l'authentification est requise mais l'utilisateur n'est pas connecté
    if (requireAuth && !user) {
      navigate(redirectTo, {
        state: { from: location.pathname },
        replace: true
      });
      return;
    }

    // Si l'utilisateur est déjà connecté et tente d'accéder à une page d'auth (login/register)
    if (user && !requireAuth && (location.pathname === '/login' || location.pathname === '/register')) {
      navigate('/', { replace: true });
      return;
    }

    // La vérification des rôles se fait dans les composants spécifiques (OrganizerRoute)
    // car elle nécessite un appel API asynchrone

  }, [loading, user, requireAuth, redirectTo, navigate, location.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin h-8 w-8 text-asag-red" />
      </div>
    );
  }

  // Si tout est OK, on affiche le contenu
  return <>{children}</>;
};

export default AuthWrapper;
