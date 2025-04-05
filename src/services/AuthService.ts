
import { supabase } from "@/integrations/supabase/client";
import { AuthError, AuthResponse } from "@supabase/supabase-js";

export type AuthFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = AuthFormData & {
  firstname: string;
  lastname: string;
};

export type PasswordResetFormData = {
  email: string;
};

export type NewPasswordFormData = {
  password: string;
};

export const AuthService = {
  /**
   * Connecte un utilisateur avec email et mot de passe
   */
  login: async (formData: AuthFormData): Promise<AuthResponse> => {
    return await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
  },

  /**
   * Inscription d'un nouvel utilisateur
   */
  register: async (formData: RegisterFormData): Promise<AuthResponse> => {
    return await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.firstname,
          last_name: formData.lastname
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });
  },

  /**
   * Déconnexion de l'utilisateur courant
   */
  logout: async (): Promise<{ error: AuthError | null }> => {
    return await supabase.auth.signOut();
  },

  /**
   * Demande de réinitialisation du mot de passe
   */
  resetPassword: async (formData: PasswordResetFormData): Promise<{ error: AuthError | null }> => {
    return await supabase.auth.resetPasswordForEmail(formData.email, {
      redirectTo: `${window.location.origin}/auth/new-password`,
    });
  },

  /**
   * Mise à jour du mot de passe (après réinitialisation)
   */
  updatePassword: async (formData: NewPasswordFormData): Promise<{ error: AuthError | null }> => {
    return await supabase.auth.updateUser({
      password: formData.password
    });
  },

  /**
   * Récupération de la session actuelle
   */
  getCurrentSession: async () => {
    return await supabase.auth.getSession();
  },

  /**
   * Récupération de l'utilisateur actuel
   */
  getCurrentUser: async () => {
    const { data } = await supabase.auth.getUser();
    return data?.user || null;
  }
};
