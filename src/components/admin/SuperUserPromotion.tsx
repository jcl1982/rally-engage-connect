
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, UserPlus } from "lucide-react";
import { toast } from "sonner";

const SuperUserPromotion: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePromoteToSuperUser = async () => {
    if (!email || !email.includes('@')) {
      toast.error("Veuillez saisir une adresse email valide");
      return;
    }

    setLoading(true);
    try {
      // Appel à la fonction edge pour promouvoir l'utilisateur
      const { data, error } = await supabase.functions.invoke('promote-to-admin', {
        body: { email }
      });

      if (error) {
        throw new Error(error.message || "Échec de la promotion en administrateur");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success(data.message || `L'utilisateur ${email} est maintenant un administrateur`);
      setEmail("");
    } catch (error: any) {
      console.error("Erreur lors de la promotion en super utilisateur:", error.message);
      toast.error(`Erreur: ${error.message || "Impossible de promouvoir cet utilisateur"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="bg-muted/50">
        <CardTitle className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-destructive" />
          Promotion Super Utilisateur
        </CardTitle>
        <CardDescription>
          Attribuer des droits administrateur à un utilisateur existant
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Email de l'utilisateur"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="max-w-sm"
          />
          <Button 
            onClick={handlePromoteToSuperUser} 
            disabled={loading || !email}
            className="gap-2"
          >
            <UserPlus className="h-4 w-4" />
            {loading ? "Attribution..." : "Attribuer droits admin"}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 text-sm text-muted-foreground">
        <p>⚠️ Cette action attribuera tous les droits d'administration sur la plateforme</p>
      </CardFooter>
    </Card>
  );
};

export default SuperUserPromotion;
