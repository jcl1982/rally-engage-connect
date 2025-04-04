
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Récupération et gestion de la session utilisateur
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      
      try {
        // Définir d'abord le listener pour les changements d'état d'authentification
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            console.log("Auth state changed:", _event, session?.user?.id);
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
          }
        );

        // Ensuite vérifier si une session existe déjà
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error);
          throw error;
        }
        
        console.log("Initial auth session:", data?.session?.user?.id);
        setSession(data.session);
        setUser(data.session?.user ?? null);
        setLoading(false);
        
        return () => subscription.unsubscribe();
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        setLoading(false);
        return () => {};
      }
    };
    
    const cleanup = initAuth();
    return () => {
      cleanup.then(unsubscribe => unsubscribe());
    };
  }, []);

  // Déconnexion
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      toast("Erreur lors de la déconnexion. Veuillez réessayer.");
    }
  };

  // Rafraîchir la session
  const refreshSession = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      
      if (data.session) {
        console.log("Session refreshed for user:", data.session.user.id);
        setSession(data.session);
        setUser(data.session.user);
      }
    } catch (error: any) {
      console.error("Erreur lors du rafraîchissement de la session:", error);
      toast("Erreur lors du rafraîchissement de la session. Veuillez vous reconnecter.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        signOut,
        refreshSession
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
