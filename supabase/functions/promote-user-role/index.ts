
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Gestion des requêtes CORS OPTIONS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Récupération des variables d'environnement
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Les variables d'environnement Supabase ne sont pas configurées");
    }

    // Création d'un client admin Supabase avec la clé de service
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Récupération des données de la requête
    const { email, role = "admin" } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email non fourni" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Vérifier que le rôle est valide
    if (!["admin", "organizer", "user"].includes(role)) {
      return new Response(
        JSON.stringify({ error: "Rôle non valide. Utilisez 'admin', 'organizer', ou 'user'." }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log(`Recherche de l'utilisateur par email: ${email}`);
    // Recherche de l'utilisateur par email
    const { data: users, error: userError } = await supabaseAdmin.auth.admin.listUsers({
      filter: {
        email: email,
      },
    });

    if (userError) {
      console.error("Erreur lors de la recherche de l'utilisateur:", userError);
      throw userError;
    }

    if (!users || users.users.length === 0) {
      return new Response(
        JSON.stringify({ error: `Utilisateur non trouvé avec l'email: ${email}` }),
        { 
          status: 404, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const user = users.users[0];
    const userId = user.id;
    console.log(`Utilisateur trouvé avec l'ID: ${userId}`);

    // Vérification si l'utilisateur a déjà le rôle spécifié
    const { data: existingRole, error: roleError } = await supabaseAdmin
      .from("user_roles")
      .select("*")
      .eq("user_id", userId)
      .eq("role", role);

    if (roleError) {
      console.error("Erreur lors de la vérification du rôle existant:", roleError);
      throw roleError;
    }

    if (existingRole && existingRole.length > 0) {
      console.log(`L'utilisateur a déjà le rôle ${role}`);
      return new Response(
        JSON.stringify({ message: `L'utilisateur est déjà un ${role}` }),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Attribution du rôle spécifié
    console.log(`Attribution du rôle ${role} à l'utilisateur ${userId}`);
    const { error: insertError } = await supabaseAdmin
      .from("user_roles")
      .insert([
        { user_id: userId, role: role }
      ]);

    if (insertError) {
      console.error("Erreur lors de l'insertion du rôle:", insertError);
      throw insertError;
    }

    console.log(`Rôle ${role} attribué avec succès à ${email}`);
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `L'utilisateur ${email} est maintenant un ${role}`,
        userId: userId,
        role: role
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error: any) {
    console.error("Erreur:", error.message);
    
    return new Response(
      JSON.stringify({ error: error.message || "Une erreur s'est produite" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
