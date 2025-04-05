
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User, AuthError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { AuthService } from "@/services/AuthService";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Récupération et gestion de la session utilisateur
  useEffect(() => {
    // Définir d'abord le listener pour les changements d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Afficher une notification selon l'événement
        if (event === 'SIGNED_IN') {
          toast({
            title: "Connecté",
            description: "Vous êtes maintenant connecté à votre compte.",
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Déconnecté",
            description: "Vous avez été déconnecté avec succès.",
          });
        } else if (event === 'PASSWORD_RECOVERY') {
          toast({
            title: "Réinitialisation de mot de passe",
            description: "Veuillez définir votre nouveau mot de passe.",
          });
        }
      }
    );

    // Ensuite vérifier si une session existe déjà
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Erreur lors de la récupération de la session:", error);
        setError(error.message);
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  // Déconnexion
  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await AuthService.logout();
      
      if (error) {
        throw error;
      }
      
      setSession(null);
      setUser(null);
    } catch (err: any) {
      console.error("Erreur lors de la déconnexion:", err);
      setError(err.message || "Erreur lors de la déconnexion");
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de la déconnexion.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Rafraîchir la session
  const refreshSession = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error) {
        throw error;
      }
      
      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
      }
    } catch (err: any) {
      console.error("Erreur lors du rafraîchissement de la session:", err);
      setError(err.message || "Erreur lors du rafraîchissement de la session");
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors du rafraîchissement de la session.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Effacer les erreurs
  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        error,
        signOut,
        refreshSession,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
};
