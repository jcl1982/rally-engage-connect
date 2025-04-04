
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SuperUserPromotion: React.FC = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string>("admin");
  const [loading, setLoading] = useState(false);

  const handlePromoteUser = async () => {
    if (!email || !email.includes('@')) {
      toast.error("Veuillez saisir une adresse email valide");
      return;
    }

    setLoading(true);
    try {
      // Appel à la fonction edge pour promouvoir l'utilisateur
      const { data, error } = await supabase.functions.invoke('promote-user-role', {
        body: { email, role }
      });

      if (error) {
        throw new Error(error.message || "Échec de la promotion de l'utilisateur");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success(data.message || `L'utilisateur ${email} est maintenant un ${role}`);
      setEmail("");
    } catch (error: any) {
      console.error("Erreur lors de la promotion de l'utilisateur:", error.message);
      toast.error(`Erreur: ${error.message || "Impossible de promouvoir cet utilisateur"}`);
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: "admin", label: "Administrateur" },
    { value: "organizer", label: "Organisateur" },
  ];

  // Promotion automatique pour Jerome CLEONIS
  React.useEffect(() => {
    const promoteJeromeCleonis = async () => {
      const specificEmail = "j.cleonis1982@gmail.com";
      try {
        console.log("Tentative de promotion de Jerome CLEONIS comme organisateur");
        const { data, error } = await supabase.functions.invoke('promote-user-role', {
          body: { email: specificEmail, role: "organizer" }
        });

        if (error) {
          console.error("Erreur lors de la promotion automatique:", error.message);
          return;
        }

        if (data.error) {
          console.error("Erreur API lors de la promotion automatique:", data.error);
          return;
        }

        console.log("Promotion réussie:", data.message);
      } catch (error: any) {
        console.error("Exception lors de la promotion automatique:", error.message);
      }
    };

    // Exécuter la promotion automatique au chargement du composant
    promoteJeromeCleonis();
  }, []);

  return (
    <Card className="mb-6">
      <CardHeader className="bg-muted/50">
        <CardTitle className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-destructive" />
          Promotion Super Utilisateur
        </CardTitle>
        <CardDescription>
          Attribuer des droits spécifiques à un utilisateur existant
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <Input
              type="email"
              placeholder="Email de l'utilisateur"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="max-w-sm"
            />
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choisir un rôle" />
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={handlePromoteUser} 
              disabled={loading || !email}
              className="gap-2"
            >
              <UserPlus className="h-4 w-4" />
              {loading ? "Attribution..." : "Attribuer droits"}
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 text-sm text-muted-foreground">
        <p>⚠️ Cette action attribuera des droits spécifiques sur la plateforme</p>
      </CardFooter>
    </Card>
  );
};

export default SuperUserPromotion;
